import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadWeb3Interaction,
  loadAccountInteraction,
  loadTokenInteraction,
  loadExchangeInteraction,
} from '../store/interactions'
import { accountSelector } from '../store/selectors'
import { Navbar } from './Navbar'

import './App.css'

function App() {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)

  const loadBlockchainData = async () => {
    const web3 = loadWeb3Interaction(dispatch)
    const account = await loadAccountInteraction(web3, dispatch)
    const networkId = await web3.eth.net.getId()
    const tokenContract = loadTokenInteraction(web3, networkId, dispatch)
    const exchangeContract = loadExchangeInteraction(web3, networkId, dispatch)
    // const totalSupply = await tokenContract.methods.totalSupply().call()
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className="App">
      <Navbar />
    </div>
  )
}

export default App
