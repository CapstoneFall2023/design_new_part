const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const nid = require("./models/nidModel");
const { regUser, getUsers, createWallet, getWalletAddress, getAllWallets,
  submitKYC, grantAccess, revokeAccess } = require("./smartcontract");
const { createMerkleTree, generateProof, verifyProof } = require("./proof");
const { bufferToHex, toBuffer } = require('ethereumjs-util');
const multer = require("multer");

const SECRET_KEY = "super-secret-key";

const KycSchema = new mongoose.Schema({
  nidNumber: String,
  fullNameEnglish: String,
  fullNameBangla: String,
  dateOfBirth: String,
});

const approvedSchema = new mongoose.Schema({
  nidPicture: { data: Buffer, contentType: String },
  nidPictureBack: { data: Buffer, contentType: String },
  eWallet: String,
});

const Kyc = mongoose.model("Kyc", KycSchema);
const Approved = mongoose.model("Approved", approvedSchema);

const app = express();
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const dbURI =
  "mongodb+srv://adnan:3zKiSiUqlRZuPgKV@cluster2.k0i66ig.mongodb.net/UserDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () => {
      console.log("Server connected to port 3001 and MongoDb");
    });
  })
  .catch((error) => {
    console.log("Unable to connect to Server and/or MongoDB", error);
  });

// middleware
app.use(bodyParser.json());
app.use(cors());

//Routes

// REGISTER
//POST REGISTER
app.post("/register", async (req, res) => {
  try {
    const { fullName, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();

    // smart contract part
    const phoneHash = await bcrypt.hash(phoneNumber, 10);
    const recoveryHash = await bcrypt.hash(phoneNumber, 10);
    const tx = await regUser(phoneHash, hashedPassword, recoveryHash);
    console.log(tx);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error signing up" });
  }
});

app.post(
  "/approved",
  upload.fields([
    { name: "nidPicture", maxCount: 1 },
    { name: "nidPictureBack", maxCount: 1 },
  ]),
  async (req, res) => {
    const file = req.files.nidPicture[0];
    const fileBack = req.files.nidPictureBack[0];
    const eWallet = req.body.eWallet;
    const approved = new Approved({
      nidPicture: { data: file.buffer, contentType: file.mimetype },
      nidPictureBack: { data: fileBack.buffer, contentType: fileBack.mimetype },
      eWallet: eWallet,
    });
    try {
      await approved.save();
      res.status(201).send("Your information has been stored successfully.");
    } catch (error) {
      res.status(500).send("Something went wrong. Please try again.");
    }
  }
);

//GET Registered Users
app.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get users" });
  }
});

app.get("/users", async (req, res) => {
  // working fine with smart contract
  try {
    const users = await getUsers();
    console.log({ users });
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get users" });
  }
});

app.post("/kyc", async (req, res) => {
  try {
    // Get the input data from the request body
    const { nidNumber, fullNameEnglish, fullNameBangla, dateOfBirth } =
      req.body;

    // Validate the input data and check if they are not empty
    if (!nidNumber || !fullNameEnglish || !fullNameBangla || !dateOfBirth) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }

    // Find a document in the people collection that matches the input data
    const match = await nid.findOne({
      nidNumber,
      fullNameEnglish,
      fullNameBangla,
      dateOfBirth,
    });

    // If no match is found, return an error response
    if (!match) {
      return res
        .status(400)
        .json({ message: "Submission failed. No matching record found." });
    }

    // If a match is found, save the input data as a new document in the people collection
    const newKyc = new Kyc({
      nidNumber,
      fullNameEnglish,
      fullNameBangla,
      dateOfBirth,
    });

    await newKyc.save();

    // Return a success response
    res.json({
      message: "Submission successful. Data stored in the database.",
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/user/:nidNumber", async (req, res) => {
  try {
    const { nidNumber } = req.params;
    const user = await nid.findOne({ nidNumber });
    if (!user) {
      return res
        .status(404)
        .json({ error: "No user found with this NID number" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error getting user details" });
  }
});

//LOGIN

app.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});


// SMART CONTRACT PART
app.post("/createWallet", async (req, res) => {
  try {
    const { nidNumber } = req.body;
    const walletAddresses = await getAllWallets();
    const { root, tree } = createMerkleTree(walletAddresses);
    const tx = await createWallet(nidNumber, bufferToHex(root));
    console.log(tx);
    res.status(201).json({ message: "Wallet created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating wallet" });
  }
});

app.post("/getWalletAddress", async (req, res) => {
  try {
    const { nidNumber } = req.body;
    const walletAddress = await getWalletAddress(nidNumber); // replace with nid
    res.status(200).json({ walletAddress: walletAddress });
  } catch (error) {
    res.status(500).json({ error: "Unable to get wallet address" });
  }
});

app.get("/generateTree", async (req, res) => {
  try {
    const walletAddresses = await getAllWallets();
    const { root, tree } = createMerkleTree(walletAddresses);
    res.status(201).json(bufferToHex(root));
  } catch (error) {
    res.status(500).json({ error: "Unable to generate tree" });
  }
});

app.get("/generateProof", async (req, res) => {
  try {
    const { element } = req.body;
    const walletAddresses = await getAllWallets();
    const { root, tree } = createMerkleTree(walletAddresses);
    const proof = generateProof(tree, element).map(bufferToHex);
    res.status(201).json(proof);
  } catch (error) {
    res.status(500).json({ error: "Unable to generate proof" });
  }
});

app.get("/getData", async (req, res) => {
  try {
    const { nidNumber } = req.body;
    const address = await getWalletAddress(nidNumber);
    const walletAddresses = await getAllWallets();
    const { root, tree } = createMerkleTree(walletAddresses);
    const proof = generateProof(tree, address[0].toLowerCase()).map(bufferToHex);
    res.status(201).json(proof);
  } catch (error) {
    res.status(500).json({ error: "Unable to generate proof" });
  }
});

app.post("/submitKYC", async (req, res) => {
  try {
    const { ipfsHash, nid } = req.body; // element means nid against wallet
    const address = await getWalletAddress(nid);
    const walletAddresses = await getAllWallets();
    const { root, tree } = createMerkleTree(walletAddresses);
    const proof = await generateProof(tree, address[0].toLowerCase()).map(bufferToHex);

    console.log(ipfsHash, nid, proof, root)

    // ipfsHash, nid, proof, newRoot
    if (ipfsHash === undefined || nid === undefined || proof === undefined || root === undefined) {
      console.log(ipfsHash, nid, proof, root)
    }
    else {
      const tx = await submitKYC(ipfsHash, nid, proof, root);
      console.log(tx)
      res.status(201).json(tx.hash);
    }
  } catch (error) {
    res.status(500).json({ error: "Error submit kyc", error });
  }
});

app.post("/grantVerifier", async (req, res) => {
  try {
    const { verifier, nid } = req.body; // element means nid against wallet
    console.log(verifier, nid)
    const address = await getWalletAddress(nid);
    const walletAddresses = await getAllWallets();
    const { root, tree } = createMerkleTree(walletAddresses);
    const proof = await generateProof(tree, address[0].toLowerCase()).map(bufferToHex);

    // verifier, nid, proof, newRoot
    const tx = await grantAccess(verifier, nid, proof, root);
    console.log(tx)
    res.status(201).json(tx.hash);
  } catch (error) {
    res.status(500).json({ error: "Error while adding verifier", error });
  }
});

app.post("/revokeVerifier", async (req, res) => {
  try {
    const { verifier, nid } = req.body; // element means nid against wallet
    const address = await getWalletAddress(nid);
    const walletAddresses = await getAllWallets();
    const { root, tree } = createMerkleTree(walletAddresses);
    const proof = await generateProof(tree, address[0].toLowerCase()).map(bufferToHex);

    // verifier, nid, proof, newRoot
    const tx = await revokeAccess(verifier, nid, proof, root);
    console.log(tx)
    res.status(201).json({ message: proof });
  } catch (error) {
    res.status(500).json({ error: "Error while revoke verifier", error});
  }
});