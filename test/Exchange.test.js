import { tokens, ether, EVM_REVERT, ETHER_ADDRESS } from './helpers'

const Exchange = artifacts.require('./Exchange')
const Token = artifacts.require('./Token')

require('chai').use(require('chai-as-promised')).should()

contract('Exchange', ([deployer, feeAccount, user1]) => {
  let exchange
  let token
  const feePercent = 10

  beforeEach(async () => {
    // Deploy token
    token = await Token.new()
    // Transfer some tokens to user1
    await token.transfer(user1, tokens(100), { from: deployer })
    // Deploy Exchange
    exchange = await Exchange.new(feeAccount, feePercent)
  })

  describe('deployment', () => {
    it('tracks the fee account', async () => {
      const result = await exchange.feeAccount()
      result.should.equal(feeAccount)
    })

    it('tracks the fee percent', async () => {
      const result = await exchange.feePercent()
      result.toString().should.equal(feePercent.toString())
    })
  })

  describe('fallback', () => {
    it('reverts when Ether is sent', async () => {
      await exchange
        .sendTransaction({ value: 1, from: user1 })
        .should.be.rejectedWith(EVM_REVERT)
    })
  })

  describe('depositing Ether', () => {
    let result
    let amount

    beforeEach(async () => {
      amount = ether(1)
      result = await exchange.depositEther({
        from: user1,
        value: amount,
      })
    })

    it('tracks the Ether deposit', async () => {
      const balance = await exchange.tokens(ETHER_ADDRESS, user1)
      balance.toString().should.equal(amount.toString())
    })

    it('emits a Deposit event', async () => {
      const log = result.logs[0]
      log.event.should.equal('Deposit')
      const event = log.args
      event.token.should.equal(ETHER_ADDRESS, 'token address is correct')
      event.user.should.equal(user1, 'user address is correct')
      event.amount
        .toString()
        .should.equal(amount.toString(), 'amount is correct')
      event.balance
        .toString()
        .should.equal(amount.toString(), 'balance is correct')
    })
  })

  describe('withdrawing Ether', () => {
    let result
    let amount

    beforeEach(async () => {
      // Deposit Ether first
      amount = ether(1)
      await exchange.depositEther({
        from: user1,
        value: amount,
      })
    })

    describe('success', () => {
      beforeEach(async () => {
        // Withdraw Ether
        result = await exchange.withdrawEther(amount, { from: user1 })
      })

      it('withdraws Ether funds', async () => {
        const balance = await exchange.tokens(ETHER_ADDRESS, user1)
        balance.toString().should.equal('0')
      })

      it('emits a Withdraw event', async () => {
        const [{ event, args }] = result.logs
        event.should.equal('Withdraw')
        args.token.should.equal(ETHER_ADDRESS)
        args.user.should.equal(user1)
        args.amount.toString().should.equal(amount.toString())
        args.balance.toString().should.equal('0')
      })
    })

    describe('failure', () => {
      it('rejects withdraws for insufficient balances', async () => {
        // We only deposited 1 ether, so 100 ether should fail
        await exchange
          .withdrawEther(ether(100), { from: user1 })
          .should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('depositing tokens', () => {
    let result
    let amount

    describe('success', () => {
      beforeEach(async () => {
        amount = tokens(10)
        await token.approve(exchange.address, amount, { from: user1 })
        result = await exchange.depositToken(token.address, amount, {
          from: user1,
        })
      })

      it('tracks the token deposit', async () => {
        // Check exchange token balance
        let balance = await token.balanceOf(exchange.address)
        balance.toString().should.equal(amount.toString())

        // Check tokens on exchange
        balance = await exchange.tokens(token.address, user1)
        balance.toString().should.equal(amount.toString())
      })

      it('emits a Deposit event', async () => {
        const log = result.logs[0]
        log.event.should.equal('Deposit')
        const event = log.args
        event.token.should.equal(token.address, 'token address is correct')
        event.user.should.equal(user1, 'user address is correct')
        event.amount
          .toString()
          .should.equal(amount.toString(), 'amount is correct')
        event.balance
          .toString()
          .should.equal(amount.toString(), 'balance is correct')
      })
    })

    describe('failure', () => {
      it('rejects Ether deposits', async () => {
        await exchange
          .depositToken(ETHER_ADDRESS, tokens(10), {
            from: user1,
          })
          .should.be.rejectedWith(EVM_REVERT)
      })

      it('fials when no tokens are approved', async () => {
        // Don't approve any tokens before depositing
        await exchange
          .depositToken(token.address, tokens(10), { from: user1 })
          .should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})
