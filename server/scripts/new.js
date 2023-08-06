import * as secp from '@noble/secp256k1';
// const { toHex } = require("ethereum-cryptography/utils");
// const { keccak256 } = require("ethereum-cryptography/keccak");
// const { utf8ToBytes } = require('ethereum-cryptography/utils');

async function main() {

    const privKey = "3d244e6095dd08998b7d4a970f71a28cf07a02800b207aad482500a246ef542f"
    // sha256 of 'hello world'
    const msgHash = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
    const pubKey = secp.getPublicKey(privKey);
    console.log("Ok")
    console.log(pubKey)
    console.log("Ok OK")


    const signature = await secp.signAsync(msgHash, privKey); // Sync methods below
    console.log(signature)

    const p = signature.recoverPublicKey(msgHash); // Public key recovery
    console.log(p)
}

main()