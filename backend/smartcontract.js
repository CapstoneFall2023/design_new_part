require('dotenv').config();
const { Defender } = require('@openzeppelin/defender-sdk');
const { ethers } = require('ethers');
const Citizens = require('./abis/Citizens.json');
const CitizenWalletFactory = require('./abis/CitizenWalletFactory.json');
const KYCReg = require('./abis/KYCRegistry.json')

const credentials = { relayerApiKey: process.env.RELAYER_API_KEY, relayerApiSecret: process.env.RELAYER_API_SECRET };
const client = new Defender(credentials);
const provider = client.relaySigner.getProvider();
const signer = client.relaySigner.getSigner(provider, { speed: 'fast' });

// not using
const regUser = async (phoneHash, passHash, recoveryHash) => {
    const citizens = "0x5d926c09d30d85f31e4caf23a76682a4d5608d5a";
    const contract = new ethers.Contract(citizens, Citizens.abi, signer);
    const tx = await contract.functions.registation(phoneHash, passHash, recoveryHash);
    const mined = await tx.wait();
    return mined;
};
const getUsers = async () => {
    const citizens = "0x5d926c09d30d85f31e4caf23a76682a4d5608d5a";
    const contract = new ethers.Contract(citizens, Citizens.abi, signer);
    const tx = await contract.functions.getCitizens();
    return tx;
};
// not using

//api contract functions

const createWallet = async (nid, merkleRoot) => {
    const factory_address = process.env.WALLET_FACTORY;
    const factoryInstance = new ethers.Contract(factory_address, CitizenWalletFactory.abi, signer);
    const tx = await factoryInstance.functions.createCitizenWallet(nid, merkleRoot);
    const mined = await tx.wait();
    return mined;
}

const getWalletAddress = async (nid) => {
    const factory_address = process.env.WALLET_FACTORY;
    const factoryInstance = new ethers.Contract(factory_address, CitizenWalletFactory.abi, signer);
    const tx = await factoryInstance.functions.Citizens(nid); // nid number
    return tx;
};

const getAllWallets = async () => {
    const factory_address = process.env.WALLET_FACTORY;
    const factoryInstance = new ethers.Contract(factory_address, CitizenWalletFactory.abi, signer);
    const tx = await factoryInstance.functions.getWalletAddresses();
    const addresses = tx.flat().map(address => address.toLowerCase());
    return addresses;
};
// getAllWallets().then(console.log)

const submitKYC = async (ipfsHash, nid, proof, newRoot) => {
    const factory_address = process.env.WALLET_FACTORY;
    const factoryInstance = new ethers.Contract(factory_address, CitizenWalletFactory.abi, signer);
    const tx = await factoryInstance.functions.submitKYC(ipfsHash, nid, proof, newRoot);
    return tx;
}

const grantAccess = async (verifier, nid, proof, newRoot) => {
    const factory_address = process.env.WALLET_FACTORY;
    const factoryInstance = new ethers.Contract(factory_address, CitizenWalletFactory.abi, signer);
    const tx = await factoryInstance.functions.grantAccess(verifier, nid, proof, newRoot);
    return tx;
}

const revokeAccess = async (verifier, nid, proof, newRoot) => {
    const factory_address = process.env.WALLET_FACTORY;
    const factoryInstance = new ethers.Contract(factory_address, CitizenWalletFactory.abi, signer);
    const tx = await factoryInstance.functions.revokeAccess(verifier, nid, proof, newRoot);
    return tx;
}


module.exports = { regUser, getUsers, createWallet, getWalletAddress, getAllWallets, submitKYC, grantAccess, revokeAccess }