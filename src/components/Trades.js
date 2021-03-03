import React from 'react'
import { useSelector } from 'react-redux'
import {
  filledOrdersLoadedSelector,
  filledOrdersSelector,
} from '../store/selectors'
import { Spinner } from './Spinner'

const showFilledOrders = (orders) => (
  <tbody>
    {orders.map((order) => (
      <tr key={order.id} className={`order-${order.id}`}>
        <td className="text-muted">{order.formattedTimestamp}</td>
        <td>{order.tokenAmount}</td>
        <td className={`text-${order.tokenPriceClass}`}>{order.tokenPrice}</td>
      </tr>
    ))}
  </tbody>
)

export const Trades = () => {
  const filledOrders = useSelector(filledOrdersSelector)
  const filledOrdersLoaded = useSelector(filledOrdersLoadedSelector)

  return (
    <div className="vertical">
      <div className="card bg-dark text-white">
        <div className="card-header">Trades</div>
        <div className="card-body">
          <table className="table table-dark table-sm small">
            <thead>
              <tr>
                <th>Time</th>
                <th>MERC</th>
                <th>MERC/ETH</th>
              </tr>
            </thead>
            {filledOrdersLoaded ? (
              showFilledOrders(filledOrders)
            ) : (
              <Spinner type="table" />
            )}
          </table>
        </div>
      </div>
    </div>
  )
}
