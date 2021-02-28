import {
  LOAD_ACCOUNT,
  LOAD_WEB3,
  LOAD_TOKEN,
  LOAD_EXCHANGE,
  LOAD_CANCELLED_ORDERS,
  LOAD_FILLED_ORDERS,
  LOAD_ALL_ORDERS,
} from './types'

// WEB3
export const loadWeb3 = (web3) => ({
  type: LOAD_WEB3,
  payload: web3,
})

export const loadAccount = (account) => ({
  type: LOAD_ACCOUNT,
  payload: account,
})

// TOKEN
export const loadToken = (contract) => ({ type: LOAD_TOKEN, payload: contract })

// EXCHANGE
export const loadExchange = (contract) => ({
  type: LOAD_EXCHANGE,
  payload: contract,
})

export const loadCancelledOrders = (orders) => ({
  type: LOAD_CANCELLED_ORDERS,
  payload: orders,
})

export const loadFilledOrders = (orders) => ({
  type: LOAD_FILLED_ORDERS,
  payload: orders,
})

export const loadAllOrders = (orders) => ({
  type: LOAD_ALL_ORDERS,
  payload: orders,
})
