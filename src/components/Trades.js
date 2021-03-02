import React from 'react'
import { useSelector } from 'react-redux'
import {
  filledOrdersLoadedSelector,
  filledOrdersSelector,
} from '../store/selectors'

export const Trades = () => {
  const filledOrders = useSelector(filledOrdersSelector)
  const filledOrdersLoaded = useSelector(filledOrdersLoadedSelector)

  return (
    <div className="card bg-dark text-white">
      <div className="card-header">Card Title</div>
      <div className="card-body">
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Time</th>
              <th>MERC</th>
              <th>MERC/ETH</th>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}
