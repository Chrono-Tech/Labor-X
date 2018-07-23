import Web3 from 'web3'
// const web3 = new Web3()

// // const privateKey = '0x7cd7c0509e6a77ee9cd4778ef4c69a05513936f75fb4d03e7e6bb96cb216861d'
// //
// // const account = web3.eth.accounts.privateKeyToAccount(privateKey)
//
// // const walletList = [
// //     {
// //         "key":"jjrmrcb8",
// //         "name":"client",
// //         "types":null,
// //         "encrypted":[
// //             {
// //                 "version":3,
// //                 "id":"d0544a1a-2131-46e8-854a-69b3cb45f9c6",
// //                 "address":"00b436db5bd741285b98d6bcf488eceadb4c410e",
// //                 "crypto":{
// //                     "ciphertext":"8cc33ab2c494e6ed58b83daee98fc806d3c1bb68ca6f2aea4b57917b5ee21027",
// //                     "cipherparams":{"iv":"b91783f97392941213de37ce583e5e38"},
// //                     "cipher":"aes-128-ctr",
// //                     "kdf":"scrypt",
// //                     "kdfparams":{"dklen":32,"salt":"5032e462142eb1c97362f437040a1d3f9547bde255d88e40aa71f1f2100f2fbe","n":8192,"r":8,"p":1},
// //                     "mac":"2d7ca9ce3837315e4b71c02a8e958002b847a41818ecd7cce7f98613bfd1255a"
// //                 }
// //             }
// //         ]
// //     }
// // ]
// //
// // const account = web3.eth.accounts.decrypt(walletList[0].encrypted[0], 'pass')
//
// const decryptedWallet = {
//     "key":"jjrmrcb8",
//     "name":"client",
//     "encrypted":[
//         {
//             "version":3,
//             "id":"8866438c-b8f5-44db-b1d3-c59401a8896b",
//             "address":"00b436db5bd741285b98d6bcf488eceadb4c410e",
//             "crypto":{
//                 "ciphertext":"c3d0a689dbbef9700826f25566f15e3a9ac518cbc0762fe667f457e4dabce6c3",
//                 "cipherparams":{"iv":"39ec7034c3d64852cdad7d70d450cbd4"},
//                 "cipher":"aes-128-ctr",
//                 "kdf":"scrypt",
//                 "kdfparams":{"dklen":32,"salt":"ff679e5e1d62d5f094eaf0a17554167a5f26a64df8e5d1c6c07556ef4920539a","n":8192,"r":8,"p":1},
//                 "mac":"c2050fae359cd8e976427a2bd4b2a0a3606e85cf946842ef17ca01a8c93a1ec3"
//             }
//         }
//     ],
//     "types":{}
// }
//
// const account = web3.eth.accounts.decrypt(decryptedWallet.encrypted[0], decryptedWallet.key)
//
// console.log(account)
//
