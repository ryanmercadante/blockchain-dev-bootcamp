import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadWeb3, loadAccount, selectAccount } from './web3Slice'

const Web3Provider = ({ children }) => {
  const dispatch = useDispatch()
  const account = useSelector(selectAccount)

  useEffect(() => {
    dispatch(loadWeb3())
    dispatch(loadAccount())

    console.log('account', account)
  }, [])

  return <div>{children}</div>
}
