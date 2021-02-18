// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./Token.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

// Deposit & Withdraw Funds
// Manage Orders - Make or Cancel
// Handle Trades - Charge fees

// TODO:
// [X] Set the fee account
// [X] Deposit Ether
// [] Withdraw Ether
// [X] Deposit tokens
// [] Withdraw tokens
// [] Check Balances
// [] Make order
// [] Cancel order
// [] Fill order
// [] Charge fees

contract Exchange {
  using SafeMath for uint;

  // Variables
  address public feeAccount; // the account that receives exchange fees
  uint256 public feePercent; // the fee percentage
  address constant ETHER = address(0); // store Ether in tokens mapping with blank address
  mapping(address => mapping(address => uint256)) public tokens;

  // Events
  event Deposit(address token, address user, uint256 amount, uint256 balance);
  event Withdraw(address token, address user, uint256 amount, uint256 balance);

  constructor(address _feeAccount, uint256 _feePercent) {
    feeAccount = _feeAccount;
    feePercent = _feePercent;
  }

  // Fallback: reverts if Ether is sent to this smart contract by mistake
  fallback() external {
    revert();
  }

  function depositEther() payable public {
    tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
    emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
  }

  function withdrawEther(uint256 _amount) public {
    require(tokens[ETHER][msg.sender] >= _amount);
    tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].sub(_amount);
    msg.sender.transfer(_amount);
    emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
  }

  function depositToken(address _token, uint _amount) public {
    // Don't allow ether deposits
    require(_token != ETHER);

    // Send tokens to this contract
    require(Token(_token).transferFrom(msg.sender, address(this), _amount));

    // Manage deposit - update balance
    tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);

    // Emit event
    emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
  }
}
