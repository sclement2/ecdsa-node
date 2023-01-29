const secp = require("ethereum-cryptography/secp256k1");
const {
  utf8ToBytes,
  toHex,
  hexToBytes,
} = require("ethereum-cryptography/utils");
require("dotenv").config();
const hashMessage = require("./hashMessage");

const PRIVATE_KEY = process.env.KEY;
//const PRIVATE_KEY =("6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e");

let wallets = process.env.WALLETS.split(",");
let privatekeys = process.env.PRIVATE_KEYS.split(",");

function twoArraysToObject(arr1, arr2) {
  return arr1.reduce((obj, item, index) => {
    obj[item] = arr2[index];
    return obj;
  }, {});
}

async function signMessage(msg) {
  const keyWallet = twoArraysToObject(wallets, privatekeys);
  let randomWallet = wallets[Math.floor(Math.random() * wallets.length)];
  console.log(randomWallet);
  console.log(keyWallet[randomWallet]);

  const hash = hashMessage(msg);
  //const signatureE = await secp.sign(hash, PRIVATE_KEY, { recovered: true });

  const signatureE = await secp.sign(hash, keyWallet[randomWallet], {
    recovered: true,
  });
  //console.log(signatureE[0]); // Uint8Array format for signature
  //const hexSignature = toHex(signatureE[0]); // hex format for Unint8Array signature
  //console.log(hexSignature);
  //console.log(signatureE[1]); //recovery bit
  //console.log(toString(hexToBytes(hexSignature)) === toString(signatureE[0])); // check to make sure round trip conversion works

  return signatureE;
}

console.log(twoArraysToObject(wallets, privatekeys));
console.log(privatekeys);
signMessage("hello world");
module.exports = signMessage;
