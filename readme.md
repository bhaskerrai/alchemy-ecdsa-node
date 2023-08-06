## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.



# Some Random Accounts:

Private Key is: 1a0ddb798da062efbeb2816b141fe6d4ac7e2ce4e2a59e5dcd9fdf32bc02f44a
Public Key is: 0205afffe25e0583822a61500ed39131c439f6f9a608052522e07477819b7c33b5
Address is: e9ea5f371b5ad45c31439d88ab62e00e6270ed63
    ------------------------------------
Private Key is: c44d88daa31327217de6f9c166d4cf6252f5f3b88a9aa3860ed16daca6e43497
Public Key is: 02f7fb93fad0ea985e559145912f372d7226311c755d3417078acaa8d1496acf6f
Address is: 43488f8d0565752a1871bf2c2d39acdb338b6480
    ------------------------------------
Private Key is: 25fb4b2e8dad2bc4175bccdd0b47d18337b21cc81bc6c66ff54c36e2d9e230bd
Public Key is: 0277882ac3a62bbd0aff5d3936faaba70cdb0f429adb1855fb10f830bc934a43f4
Address is: 4eb76e3f47df9f41e72ce1fb50b1346cb8b0b1d4