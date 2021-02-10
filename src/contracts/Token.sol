// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Token {
  string public name = "Merc Token";
  string public symbol = "MERC";
  uint public decimals = 18;
  uint public totalSupply;

  constructor() public {
    totalSupply = 1000000 * (10 ** decimals);
  }
}
