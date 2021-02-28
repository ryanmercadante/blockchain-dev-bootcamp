import { combineReducers } from 'redux'
import {
  LOAD_ACCOUNT,
  LOAD_TOKEN,
  LOAD_WEB3,
  LOAD_EXCHANGE,
  LOAD_CANCELLED_ORDERS,
} from './types'

function web3(state = {}, { type, payload }) {
  switch (type) {
    case LOAD_WEB3:
      return { ...state, connection: payload }
    case LOAD_ACCOUNT:
      return { ...state, account: payload }
    default:
      return state
  }
}

function token(state = {}, { type, payload }) {
  switch (type) {
    case LOAD_TOKEN:
      return { ...state, loaded: true, contract: payload }
    default:
      return state
  }
}

function exchange(state = {}, { type, payload }) {
  switch (type) {
    case LOAD_EXCHANGE:
      return { ...state, loaded: true, contract: payload }
    case LOAD_CANCELLED_ORDERS:
      return { ...state, cancelledOrders: { loaded: true, data: payload } }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  web3,
  token,
  exchange,
})

export default rootReducer
