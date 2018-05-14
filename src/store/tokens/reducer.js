// import storage from 'redux-persist/lib/storage'
//
// export const initialState = {
//   tokens: {},
//   tokenDAOs: {}
// }
//
// export default ({ web3 }) => {
//   const persistConfig = {
//     key: 'tokens',
//     storage: storage,
//     transforms: typeof window === 'undefined'
//       ? []
//       : [ decryptedWalletTransform({ web3 }) ],
//   }
//
//   const wallet = (state = initialState, action) => {
//     switch (action.type) {
//       case a.WALLETS_ADD :
//         return {
//           ...state,
//           walletsList: [
//             ...state.walletsList,
//             action.wallet,
//           ],
//         }
