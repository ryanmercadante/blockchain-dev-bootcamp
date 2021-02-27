import Web3 from 'web3'
import { loadAccount, loadWeb3 } from './actions'

export const loadWeb3Interaction = (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545')
  dispatch(loadWeb3({ connection: web3 }))
}

export const loadAccountInteraction = async (web3, dispatch) => {
  const [account] = await web3.eth.getAccounts()
  dispatch(loadAccount({ account }))
  return account
}
