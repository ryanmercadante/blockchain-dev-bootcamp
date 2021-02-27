import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Web3 from 'web3'
import { abi, networks } from '../abis/Token.json'
import {
  loadWeb3Interaction,
  loadAccountInteraction,
} from '../store/interactions'

import './App.css'

function App() {
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    const web3 = loadWeb3Interaction(dispatch)
    console.log('web3', web3)
    const networkId = await web3.eth.net.getId()
    const account = await loadAccountInteraction(web3, dispatch)
    const { address } = networks[networkId]
    const tokenContract = await new web3.eth.Contract(abi, address)
    const totalSupply = await tokenContract.methods.totalSupply().call()
    console.log('supplu', totalSupply)
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
