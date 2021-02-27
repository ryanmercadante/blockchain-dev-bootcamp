import { createReducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { LOAD_ACCOUNT, LOAD_WEB3 } from './constants'

// function web3(state = {}, { type, payload }) {
//   switch (type) {
//     case LOAD_WEB3:
//       return { ...state, connection: payload.connection }
//     default:
//       return state
//   }
// }

const web3Reducer = createReducer([], (builder) => {
  builder
    .addCase(LOAD_WEB3, (state, { payload }) => {
      return { ...state, connection: payload.connection }
    })
    .addCase(LOAD_ACCOUNT, (state, { payload }) => {
      return { ...state, account: payload.account }
    })
    .addDefaultCase((state) => {
      return state
    })
})

const rootReducer = combineReducers({
  web3Reducer,
})

export default rootReducer
