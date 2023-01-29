import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex, hexToBytes } from "ethereum-cryptography/utils";

//const keyWallet = twoArraysToObject(wallets, privatekeys);

function Wallet({
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
  address,
  setAddress,
  signature,
  setSignature,
}) {
  async function onChange(evt) {
    let privateKey = evt.target.value;
    /*if (privateKey.toLowerCase() in keyWallet) {
      privateKey = keyWallet[privateKey.toLowerCase()];
      setPrivateKey(privateKey);
      const address = toHex(secp.getPublicKey(privateKey));
      setAddress(address);
    } else {
      throw new UserException("InvalidWallet");
    } */
    setPrivateKey(privateKey);
    let signature = new Object();
    let signed = keccak256(utf8ToBytes(""));
    //console.log(signature);
    signed = await secp.sign(signed, privateKey, {
      recovered: true,
    });
    signature.sig = toHex(signed[0]);
    signature.recoveryBit = signed[1];
    /*let address =
      "047a84f3829399dfe6e4612c878a48125a66d25f29dc5a990f7f550c882ea909c9bd06f45b982421252fad34afdaf9dd6ceca1516930232b695e162304b255499c"; //dummy for testing */
    let address = toHex(secp.getPublicKey(privateKey));
    setAddress(address);
    signature.address = address;
    setSignature(signature);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet ID
        <input
          placeholder="Type in your Wallet ID"
          type="password"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <div className="publickey">
        PUBLIC ADDRESS: 0x{address.slice(0, 10)}...
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
