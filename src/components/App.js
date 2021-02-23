import React, { useEffect } from 'react'
import Web3 from 'web3'
import { abi, networks } from '../abis/Token.json'

import './App.css'

function App() {
  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545')
    const networkId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()
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
