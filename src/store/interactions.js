import Web3 from 'web3'
import { loadAccount, loadExchange, loadToken, loadWeb3 } from './actions'
import Token from '../abis/Token.json'
import Exchange from '../abis/Exchange.json'

export const loadWeb3Interaction = (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545')
  dispatch(loadWeb3(web3))
  return web3
}

export const loadAccountInteraction = async (web3, dispatch) => {
  const [account] = await web3.eth.getAccounts()
  dispatch(loadAccount(account))
  return account
}

const _loadContract = (web3, networkId, dispatch, smartContract) => {
  const { abi, networks, contractName } = smartContract
  try {
    const contract = new web3.eth.Contract(abi, networks[networkId].address)
    switch (contractName) {
      case 'Token':
        dispatch(loadToken(contract))
        break
      case 'Exchange':
        dispatch(loadExchange(contract))
        break
      default:
        break
    }
    return contract
  } catch (err) {
    alert(
      'Contract not deployed to the current network. Please select another network with Metamask.',
    )
    return null
  }
}

export const loadTokenInteraction = (web3, networkId, dispatch) => {
  return _loadContract(web3, networkId, dispatch, Token)
}

export const loadExchangeInteraction = (web3, networkId, dispatch) => {
  return _loadContract(web3, networkId, dispatch, Exchange)
}
