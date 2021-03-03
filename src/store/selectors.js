import { get } from 'lodash'
import { createSelector } from 'reselect'
import moment from 'moment'
import { ETHER_ADDRESS, tokens, ether } from '../helpers'

const account = (state) => get(state, 'web3.account')
export const accountSelector = createSelector(account, (a) => a)

const tokenLoaded = (state) => get(state, 'token.loaded', false)
export const tokenLoadedSelector = createSelector(tokenLoaded, (tl) => tl)

const exchangeLoaded = (state) => get(state, 'exchange.loaded', false)
export const exchangeLoadedSelector = createSelector(exchangeLoaded, (el) => el)

const exchange = (state) => get(state, 'exchange.contract')
export const exchangeSelector = createSelector(exchange, (e) => e)

export const contractsLoadedSelector = createSelector(
  tokenLoaded,
  exchangeLoaded,
  (tl, el) => tl && el,
)

const filledOrdersLoaded = (state) =>
  get(state, 'exchange.filledOrders.loaded', false)
export const filledOrdersLoadedSelector = createSelector(
  filledOrdersLoaded,
  (fol) => fol,
)

const filledOrders = (state) => get(state, 'exchange.filledOrders.data', [])
export const filledOrdersSelector = createSelector(filledOrders, (orders) => {
  // Decorate the orders
  orders = decorateFilledOrders(orders)

  // Sort orders by date descending for display
  orders = orders.sort((a, b) => b.timestamp - a.timestamp)
})

const decorateFilledOrders = (orders) => {
  return orders.map((order) => {
    order = decorateOrder(order)
    return order
  })
}

const decorateOrder = (order) => {
  let etherAmount
  let tokenAmount

  if (order.tokenGive === ETHER_ADDRESS) {
    etherAmount = order.amountGive
    tokenAmount = order.amountGet
  } else {
    etherAmount = order.amountGet
    tokenAmount = order.amountGive
  }

  // Calculate token price to 5 decimal places
  const precision = 100_000
  let tokenPrice = etherAmount / tokenAmount
  tokenPrice = Math.round(tokenPrice * precision) / precision

  return {
    ...order,
    etherAmount: ether(etherAmount),
    tokenAmount: tokens(tokenAmount),
    tokenPrice,
    formattedTimestamp: moment.unix(order.timestamp).format('h:mm:ss a M/D'),
  }
}
