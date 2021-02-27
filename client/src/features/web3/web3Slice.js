import { createSlice } from '@reduxjs/toolkit'
import Web3 from 'web3'

export const web3Slice = createSlice({
  name: 'web3',
  initialState: {
    connection: null,
    account: null,
  },
  reducers: {
    loadWeb3: (state) => {
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545')
      state.connection = web3.eth
    },
    loadAccount: (state, action) => {
      state.account += action.account
    },
  },
})

export const { loadWeb3, loadAccount } = web3Slice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWeb3 = (state) => state.connection
export const selectAccount = (state) => state.account

export default web3Slice.reducer
