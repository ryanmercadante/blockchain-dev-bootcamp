// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

// Deposit & Withdraw Funds
// Manage Orders - Make or Cancel
// Handle Trades - Charge fees

// TODO:
// [] Set the fee account
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

  constructor(address _feeAccount) {
    feeAccount = _feeAccount;
  }
}
