import server from "./server";
import { secp256k1 } from '@noble/curves/secp256k1';
import { keccak256 } from "ethereum-cryptography/keccak"
import { toHex } from "ethereum-cryptography/utils";
// import { sha256 } from "ethereum-cryptography/sha256.js";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    console.log(privateKey)

    console.log("Private Key is:", privateKey);

    const publicKey = secp256k1.getPublicKey(privateKey);
    console.log("Public Key is:", toHex(publicKey));

    const address = toHex(keccak256(publicKey.slice(1)).slice(-20));
    console.log("Address is:", address);

    setAddress(address)
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
        Private Key
        <input placeholder="Type in a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
