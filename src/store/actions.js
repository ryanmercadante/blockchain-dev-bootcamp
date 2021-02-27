import { LOAD_ACCOUNT, LOAD_WEB3, LOAD_TOKEN } from './types'

export const loadWeb3 = (web3) => ({
  type: LOAD_WEB3,
  payload: web3,
})

export const loadAccount = (account) => ({
  type: LOAD_ACCOUNT,
  payload: account,
})

export const loadToken = (contract) => ({ type: LOAD_TOKEN, payload: contract })
