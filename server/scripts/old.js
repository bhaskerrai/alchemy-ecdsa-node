const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require('ethereum-cryptography/utils');

async function main(privateKey) {
    console.log("Your private Key is:", privateKey);

    const publicKey = secp256k1.getPublicKey(privateKey);
    console.log("Your public Key is:", toHex(publicKey));

    const address = keccak256(publicKey.slice(1)).slice(-20);
    console.log("Your address is:", toHex(address));

    const bytes = utf8ToBytes("hello");
    const hash = keccak256(bytes);

    const signature = await secp256k1.sign(hash, privateKey);
    signature.addRecoveryBit();

    const signatureUint8Array = new Uint8Array(Buffer.from(signature, "hex"));

    console.log("\nMessage has been signed from your private key!\n");

    console.log("Now recovering your address from the signature...");
    const publicKeyRecovered = secp.recoverPublicKey(hash, signatureUint8Array, 1);
    console.log("Public key recovered! ");

    const sender = toHex(keccak256(publicKeyRecovered.slice(1)).slice(-20));
    console.log(sender);
}

main("3d244e6095dd08998b7d4a970f71a28cf07a02800b207aad482500a246ef542f");