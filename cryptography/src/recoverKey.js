const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
  const messageHash = hashMessage(message);
  const recovered = await secp.recoverPublicKey(
    messageHash,
    signature,
    recoveryBit
  );
  return recovered;
}

module.exports = recoverKey;
