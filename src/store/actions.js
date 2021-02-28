import { LOAD_ACCOUNT, LOAD_WEB3, LOAD_TOKEN, LOAD_EXCHANGE } from './types'

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
