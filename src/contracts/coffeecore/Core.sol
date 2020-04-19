pragma solidity ^0.5.0;

import "./Ownable.sol";
import "../coffeebase/SupplyChain.sol";

contract Core is SupplyChain, Ownable {
    constructor()
        SupplyChain()
        Ownable()
        public
    {}
}
