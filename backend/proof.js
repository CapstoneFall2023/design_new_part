const { keccak256 } = require('js-sha3');
const MerkleTree = require('merkletreejs').MerkleTree;
const { bufferToHex, toBuffer } = require('ethereumjs-util');
const { getAllWallets } = require('./smartcontract');

function createMerkleTree(elements) {
    // Ensure addresses are lowercase and properly hashed as in Solidity
    const leaves = elements.map(addr => keccak256(toBuffer(addr.toLowerCase())));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = tree.getRoot();
    return { root, tree };
}

function generateProof(tree, element) {
    const leaf = keccak256(toBuffer(element.toLowerCase()));
    const proof = tree.getProof(leaf).map(obj => obj.data);
    return proof;
}

function verifyProof(proof, root, element) {
    const leaf = keccak256(toBuffer(element.toLowerCase()));
    const tree = new MerkleTree([], keccak256, { sortPairs: true });
    return tree.verify(proof, leaf, root);
}

// api that fetch all created address from the smart contract(wallet factory)
// const addresses = [
//     '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'.toLowerCase(),
//     '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2'.toLowerCase(),
//     '0xB6A8ece75F656376c770cEF30d2F546558431ACD'.toLowerCase(),
//     '0x80922Db6752eCe1C2DeFA54Beb8FB984E649308B'.toLowerCase()
// ];

/* const addresses = getAllWallets();

const { root, tree } = createMerkleTree(addresses);
console.log('Merkle Root:', bufferToHex(root));

const element = '0x80922Db6752eCe1C2DeFA54Beb8FB984E649308B'.toLowerCase(); // Ensure the address is lowercase
const proof = generateProof(tree, element).map(bufferToHex);
console.log('Proof for', element, ':', proof); */

/* const isValid = verifyProof(proof.map(hex => Buffer.from(hex.slice(2), 'hex')), bufferToHex(root), element);
console.log('Is valid:', isValid); */

module.exports = { createMerkleTree, generateProof, verifyProof };