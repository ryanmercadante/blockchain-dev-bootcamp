import Web3 from 'web3'
import { loadAccount, loadToken, loadWeb3 } from './actions'
import { abi, networks } from '../abis/Token.json'

export const loadWeb3Interaction = (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545')
  dispatch(loadWeb3({ connection: web3 }))
}

export const loadAccountInteraction = async (web3, dispatch) => {
  const [account] = await web3.eth.getAccounts()
  dispatch(loadAccount({ account }))
  return account
}

export const loadTokenInteraction = async (web3, networkId, dispatch) => {
  try {
    const token = await web3.eth.Contract(abi, networks[networkId].address)
    dispatch(loadToken({ token }))
    return token
  } catch (err) {
    alert(
      'Contract not deployed to the current network. Please select another network with Metamask.',
    )
    return null
  }
}
