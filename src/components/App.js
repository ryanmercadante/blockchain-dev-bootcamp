import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  loadWeb3Interaction,
  loadAccountInteraction,
  loadTokenInteraction,
} from '../store/interactions'

import './App.css'

function App() {
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    const web3 = loadWeb3Interaction(dispatch)
    const account = await loadAccountInteraction(web3, dispatch)
    const networkId = await web3.eth.net.getId()
    const tokenContract = loadTokenInteraction(web3, networkId, dispatch)
    // const totalSupply = await tokenContract.methods.totalSupply().call()
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
