// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

// Deposit & Withdraw Funds
// Manage Orders - Make or Cancel
// Handle Trades - Charge fees

// TODO:
// [X] Set the fee account
// [] Deposit Ether
// [] Withdraw Ether
// [] Deposit tokens
// [] Withdraw tokens
// [] Check Balances
// [] Make order
// [] Cancel order
// [] Fill order
// [] Charge fees

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Exchange {
  // Variables
  address public feeAccount; // the account that receives exchange fees
  uint256 public feePercent; // the fee percentage

  constructor(address _feeAccount, uint256 _feePercent) {
    feeAccount = _feeAccount;
    feePercent = _feePercent;
  }
}
