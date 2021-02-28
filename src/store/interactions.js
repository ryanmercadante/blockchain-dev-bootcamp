import Web3 from 'web3'
import {
  loadAccount,
  loadAllOrders,
  loadCancelledOrders,
  loadExchange,
  loadFilledOrders,
  loadToken,
  loadWeb3,
} from './actions'
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
    console.log(
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

export const loadAllOrdersInteraction = async (exchange, dispatch) => {
  // Fetch cancelled orders with the "Cancel" event stream
  const cancelStream = await exchange.getPastEvents('Cancel', {
    fromBlock: 0,
    toBlock: 'latest',
  })
  // Format cancelled orders
  const cancelledOrders = cancelStream.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(loadCancelledOrders(cancelledOrders))

  // Fetch filled orders with the "Trade" event stream
  const tradeStream = await exchange.getPastEvents('Trade', {
    fromBlock: 0,
    toBlock: 'latest',
  })
  // Format filled orders
  const filledOrders = tradeStream.map((event) => event.returnValues)
  // Add filled orders to the redux store
  dispatch(loadFilledOrders(filledOrders))

  // Fetch all orders with the "Order" event stream
  const orderStream = await exchange.getPastEvents('Order', {
    fromBlock: 0,
    toBlock: 'latest',
  })
  // Format all orders
  const allOrders = orderStream.map((event) => event.returnValues)
  // Add all orders to the redux store
  dispatch(loadAllOrders(allOrders))
}
