import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadWeb3Interaction,
  loadAccountInteraction,
  loadTokenInteraction,
  loadExchangeInteraction,
} from '../store/interactions'
import { contractsLoadedSelector } from '../store/selectors'
import { Navbar } from './Navbar'
import { Content } from './Content'

import './App.css'

function App() {
  const dispatch = useDispatch()
  const contractsLoaded = useSelector(contractsLoadedSelector)

  const loadBlockchainData = async () => {
    const web3 = loadWeb3Interaction(dispatch)
    await loadAccountInteraction(web3, dispatch)
    const networkId = await web3.eth.net.getId()
    loadTokenInteraction(web3, networkId, dispatch)
    loadExchangeInteraction(web3, networkId, dispatch)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className="App">
      <Navbar />
      {contractsLoaded ? <Content /> : <div className="content"></div>}
    </div>
  )
}

export default App
