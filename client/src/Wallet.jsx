import server from "./server";
//import getKeyFromName from "./getKeyFromName";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import * as dotenv from "dotenv";

//dotenv.config();
//let wallets = [dan, alice, william];
/*let wallets = process.env.WALLETS.split(",");
let privatekeys = process.env.PRIVATE_KEYS.split(",");
const keyWallet = twoArraysToObject(wallets, privatekeys);
*/

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
  keyWallet,
  setKeyWallet,
}) {
  async function onChange(evt) {
    dotenv.config();
    let wallets = process.env.WALLETS.split(",");
    let privatekeys = process.env.PRIVATE_KEYS.split(",");
    //let keyWallet = twoArraysToObject(wallets, privatekeys);
    setKeyWallet(keyWallet);
    let privateKey = evt.target.value;
    if (privateKey.toLowerCase() in keyWallet) {
      //privateKey = keyWallet[privateKey.toLowerCase()];
      //setPrivateKey(privateKey);
      //const address = toHex(secp.getPublicKey(privateKey));
      //setAddress(address);
    }
    setPrivateKey(privateKey);
    const address = toHex(secp.getPublicKey(privateKey));
    setAddress(address);
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
        Wallet Address
        <input
          placeholder="Type an address, for example: Dan0x1"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <div>Address: {address.slice(0, 10)}...</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

function twoArraysToObject(arr1, arr2) {
  return arr1.reduce((obj, item, index) => {
    obj[item] = arr2[index];
    return obj;
  }, {});
}

export default Wallet;
