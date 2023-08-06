import { useState } from "react";
import server from "./server";
import { secp256k1 } from '@noble/curves/secp256k1';
import { keccak256 } from "ethereum-cryptography/keccak"
import { toHex } from "ethereum-cryptography/utils";
import { utf8ToBytes } from 'ethereum-cryptography/utils';


// Function to convert an ECDSA signature to a hash
function signatureToHash(signature) {
  // Assuming signature is a Uint8Array containing the signature data
  const r = signature.toString().slice(0, 32); // Extract the r component (first 32 bytes)
  const s = signature.toString().slice(32); // Extract the s component (remaining bytes)

  // Concatenate r and s components and hash them using keccak256
  const signatureData = new Uint8Array([...r, ...s]);
  return signatureData
  // return keccak256(signatureData);
}


function signatureToHex(signature) {
  // Assuming signature is a Uint8Array containing the signature data
  return Array.from(signature, (byte) => byte.toString(16).padStart(2, "0")).join("");
}


// function signatureToHex(signature) {
//   // Assuming signature is a Uint8Array containing the signature data
//   return Array.from(signature, (byte) => byte.toString(16).padStart(2, "0")).join("").padStart(64, "0");
// }



function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  
  
  async function transfer(evt) {
    evt.preventDefault();
    
    const bytes = utf8ToBytes("hello");
    const msg = keccak256(bytes)

    const signature = secp256k1.sign(msg, privateKey)

    const publicKey = signature.recoverPublicKey(msg).toRawBytes();
    const publicKeyHex = toHex(publicKey);

    console.log("hash is:", toHex(msg));

    const serializedSignature = signature.r.toString(16).padStart(64, '0') + signature.s.toString(16).padStart(64, '0');


  
    console.log("Original signature is:", signature);
    // console.log("signature is:", toHex(keccak256(sig)));

    try {

      const {
        data: { balance },
      } = await server.post(`send`, {
        serializedSignature,
        publicKey: publicKeyHex,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      console.log("done")
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }



  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
