### Architect a Blockchain Supply Chain Solution - Part B

Write Up

| CRITERIA                     | MEETS SPECIFICATIONS                                         |
| :--------------------------- | :----------------------------------------------------------- |
| Project write-up - UML       | Project write-up include the following UML diagrams:ActivitySequenceStateClasses (Data Model) |
| Project write-up - Libraries | If libraries are used, the project write-up discusses why these libraries were adopted. |
| Project write-up - IPFS      | If IPFS is used, the project write-up discusses how IPFS is used in this project. |
| General Write Up             | A general write up exists to items like steps and contracts address. |

Write smart contracts with functions

| CRITERIA                                                     | MEETS SPECIFICATIONS                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| SupplyChain.sol contains required tracking functions.        | Smart contract implements functions to track.For example:Product ID Product UPC Origination Information Farm Misc organization info Longitude & Latitude of geo coordinates Product notes |
| Ownable.sol contains required functions that establish owner and the transfer of ownership. | Ownable.sol has required functions that establish owner and the transfer of ownership. |
| ConsumerRole.sol contains required functions that manage the consumer role. | ConsumerRole.sol has required functions that manage the consumer role. |
| RetailerRole.sol contains required functions that manage the consumer role. | RetailerRole.sol has required functions that manage the consumer role. |
| DistributorRole.sol contains required functions that manage the consumer role. | DistributorRole.sol has required functions that manage the consumer role. |
| Additional roles implemented are integrated correctly.       | Student has implemented additional roles correctly.          |

Test smart contract code coverage

| CRITERIA                                          | MEETS SPECIFICATIONS                                         |
| :------------------------------------------------ | :----------------------------------------------------------- |
| Test smart contract tests all required functions. | Project contains tests for the boiler plate functions and all tests are approved without error. |

Deploy smart contract on a public test network (Rinkeby)

| CRITERIA                                                     | MEETS SPECIFICATIONS                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| Deploy smart contract on a public test network.              | Smart contract is deployed on on the Ethereum RINKEBY test network. |
| Project submission includes transaction ID and contract address | Project submission includes a document (.md, .txt) that includes:Transaction IDContract addressHint: You can view Transaction ID and Contract ID from a blockchain explorer (e.g. Etherscan). Example Contract ID: https://rinkeby.etherscan.io/address/0xfb0720c0715e68f80c0c0437c9c491abfed9e7ab#code |

Modify client code to interact with a smart contract

| CRITERIA                                   | MEETS SPECIFICATIONS                                         |
| :----------------------------------------- | :----------------------------------------------------------- |
| Client code interacts with smart contract. | Front-end is configured to:Submit a product for shipment (farmer to the distributor, distributor to retailer, etc).Receive product from shipment.Validate the authenticity of the product. |

### Suggestions to Make Your Project Stand Out!

Optional: Implement Infura to store product image

- Ex: Farmer harvests coffee and upload pics w/ UPC hash
- Potentially only 2 methods needed upload() and read()