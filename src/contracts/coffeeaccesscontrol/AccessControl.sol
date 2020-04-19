pragma solidity ^0.5.0;

import "./ConsumerRole.sol";
import "./DistributorRole.sol";
import "./FarmerRole.sol";
import "./RetailerRole.sol";

contract AccessControl is ConsumerRole, DistributorRole, FarmerRole, RetailerRole {
    constructor()
    ConsumerRole()
    DistributorRole()
    FarmerRole()
    RetailerRole()
    public
    {}

}
