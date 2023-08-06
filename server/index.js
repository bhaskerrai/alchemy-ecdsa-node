const express = require("express");

const {secp256k1} = require ('@noble/curves/secp256k1');
// const secp = require("ethereum-cryptography/secp256k1")
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")


const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "e9ea5f371b5ad45c31439d88ab62e00e6270ed63": 100,
  "43488f8d0565752a1871bf2c2d39acdb338b6480": 50,
  "4eb76e3f47df9f41e72ce1fb50b1346cb8b0b1d4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { serializedSignature, publicKey, recipient, amount } = req.body;
  
  // const signatureBytes = Uint8Array.from(Buffer.from(serializedSignature, 'hex'));
  const publicKeyBytes = Uint8Array.from(Buffer.from(publicKey, 'hex'));

  const r = BigInt(`0x${serializedSignature.slice(0, 64)}`);
  const s = BigInt(`0x${serializedSignature.slice(64)}`);
  const signature = { r, s };

  const bytes = utf8ToBytes("hello");
  const msg = keccak256(bytes);
 
  // Verify the signature and recover the public key
  const isSignatureValid = secp256k1.verify(signature, msg, publicKey);
  
  // const publicKeyR = signature.recoverPublicKey(msg).toRawBytes();
  // const publicKeyR = secp.recoverPublicKey(msg, signatureBytes, 0)
  
  let sender;

  if (isSignatureValid) {
    sender = toHex(keccak256(publicKeyBytes.slice(1)).slice(-20));
    console.log(`Sender - ${sender} verfied!`)
    console.log("Proceeding...")
    setInitialBalance(sender);
    setInitialBalance(recipient);

  }
  else {
    res.status(400).send({ message: "Sender not verified!" });
  }
  
  

  // const recoveredPubKey = signature.recoverPublicKey(msg).toRawBytes();
  // const recoveredPubKey = secp256k1.recover(signatureData, msg);
  // const sender = toHex(keccak256(recoveredPubKey.slice(1)).slice(-20));
  // console.log(sender)
  


  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    console.log("Sent!")
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
