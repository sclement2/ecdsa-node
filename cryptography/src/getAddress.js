const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
  const ethAddress = publicKey.slice(1);
  const ethHash = keccak256(ethAddress);
  return ethHash.slice(-20);
}

module.exports = getAddress;
