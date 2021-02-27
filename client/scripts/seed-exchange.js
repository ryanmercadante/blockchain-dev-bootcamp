// Contracts
const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')

// Utils
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
const ether = (n) => {
  return new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'))
}
const tokens = (n) => ether(n)

const makeOrder = async (
  exchange,
  tokenAddress,
  tokenAmount,
  etherAmount,
  user,
) => {
  const result = await exchange.makeOrder(
    tokenAddress,
    tokens(tokenAmount),
    ETHER_ADDRESS,
    ether(etherAmount),
    { from: user },
  )
  console.log(`Made order from ${user}`)
  return result
}

const fillOrder = async (exchange, result, user) => {
  const orderId = result.logs[0].args.id
  await exchange.fillOrder(orderId, { from: user })
  console.log(`Filled order from ${user}`)
}

const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

module.exports = async function (callback) {
  try {
    // Fetch accounts from wallet - these are unlocked
    const accounts = await web3.eth.getAccounts()

    // Fetch the deployed token
    const token = await Token.deployed()
    console.log('Token fetched', token.address)

    // Fetch the deployed exchange
    const exchange = await Exchange.deployed()
    console.log('Exchange fetched', exchange.address)

    // Give tokens to account[1]
    const sender = accounts[0]
    const receiver = accounts[1]
    let amount = web3.utils.toWei('10000', 'ether') // 10,000 tokens

    await token.transfer(receiver, amount, { from: sender })
    console.log(`Transferred ${amount} tokens from ${sender} to ${receiver}`)

    // Setup exchange users
    const user1 = accounts[0]
    const user2 = accounts[1]

    // User 1 deposits Ether
    amount = 1
    await exchange.depositEther({ from: user1, value: ether(amount) })
    console.log(`Deposited ${amount} Ether from ${user1}`)

    // User 2 approves Tokens
    amount = 10_000
    await token.approve(exchange.address, tokens(amount), { from: user2 })
    console.log(`Approved ${amount} tokens from ${user2}`)

    // User 2 deposits Tokens
    await exchange.depositToken(token.address, tokens(amount), { from: user2 })
    console.log(`Deposited ${amount} tokens from ${user2}`)

    ///////////////////////////////////////////////////////
    // Seed a Cancelled Order
    //

    // User 1 makes order to get tokens
    let result
    let orderId
    result = await makeOrder(exchange, token.address, 100, 0.1, user1)

    // User 1 cancells order
    orderId = result.logs[0].args.id
    await exchange.cancelOrder(orderId, { from: user1 })
    console.log(`Cancelled order from ${user1}`)

    ///////////////////////////////////////////////////////
    // Seed Filled Orders
    //

    // User 1 makes an order
    result = await makeOrder(exchange, token.address, 100, 0.1, user1)

    // User 2 fills order
    await fillOrder(exchange, result, user2)

    await wait(1)

    // User 1 makes another order
    result = await makeOrder(exchange, token.address, 50, 0.01, user1)

    // User 2 fills another order
    await fillOrder(exchange, result, user2)

    await wait(1)

    // User 1 makes final order
    result = await makeOrder(exchange, token.address, 200, 0.15, user1)

    // User 2 fills final order
    await fillOrder(exchange, result, user2)

    await wait(1)

    ///////////////////////////////////////////////////////
    // Seed Open Orders
    //

    // User 1 makes 10 orders
    for (let i = 1; i <= 10; i++) {
      result = await makeOrder(exchange, token.address, 10 * i, 0.01, user1)
      await wait(1)
    }

    // User 2 makes 10 orders
    for (let i = 1; i <= 10; i++) {
      result = await exchange.makeOrder(
        ETHER_ADDRESS,
        ether(0.01),
        token.address,
        tokens(10 * i),
        { from: user2 },
      )
      console.log(`Made order from ${user2}`)
      await wait(1)
    }
  } catch (err) {
    console.error(err)
  }

  callback()
}
