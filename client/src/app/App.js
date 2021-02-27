import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'
import {
  loadAccount,
  loadWeb3,
  selectAccount,
} from '../features/web3/web3Slice'

function App() {
  const dispatch = useDispatch()
  const account = useSelector(selectAccount)

  const loadBlockchainData = async () => {
    console.log('account before', account)
    const web3 = dispatch(loadWeb3())
    console.log('web3', web3)
    const networkId = await web3.eth.net.getId()
    await dispatch(loadAccount())
    // const tokenContract = await loadTokenInteraction(web3, networkId, dispatch)
    // const totalSupply = await tokenContract.methods.totalSupply().call()
    console.log('account', account)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  )
}

export default App
