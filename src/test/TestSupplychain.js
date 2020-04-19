// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function (accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.utils.toWei("1", "ether")
    var itemState = 0
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    async function AssertEventTriggeredAndState(supplyChain, caller, eventEmitted) {
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], caller, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], itemState, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')
    }
    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async () => {
        const supplyChain = await SupplyChain.deployed();
        var caller = originFarmerID;
        await supplyChain.addFarmer(originFarmerID);

        // Declare and Initialize a variable for event
        var eventEmitted = false;


        // Watch the emitted event Harvested()
        var event = await supplyChain.Harvested({}, (err, res) => {
            eventEmitted = true;
        });

        // Mark an item as Harvested by calling function harvestItem()
        await supplyChain.harvestItem(upc, originFarmerID, originFarmName, originFarmInformation,
            originFarmLatitude, originFarmLongitude, productNotes)

        await AssertEventTriggeredAndState(supplyChain, caller, eventEmitted);
    })

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async () => {
        const supplyChain = await SupplyChain.deployed()
        itemState++
        var caller = originFarmerID;

        // Declare and Initialize a variable for event
        var eventEmitted = false;

        // Watch the emitted event Processed()
        var event = await supplyChain.Processed({}, (err, res) => {
            eventEmitted = true;
        });

        // Mark an item as Processed by calling function processtItem()
        await supplyChain.processItem(upc, {from: caller});

        await AssertEventTriggeredAndState(supplyChain, caller, eventEmitted);
    })

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        itemState++
        var caller = originFarmerID;
        var eventEmitted = false;

        // Watch the emitted event Packed()
        var event = await supplyChain.Packed({}, (err, res) => {
            eventEmitted = true;
        });

        // Mark an item as Packed by calling function packItem()
        await supplyChain.packItem(upc, {from: caller});

        await AssertEventTriggeredAndState(supplyChain, caller, eventEmitted);

    })

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        itemState++
        var caller = originFarmerID;
        var eventEmitted = false;

        // Watch the emitted event ForSale()
        var event = await supplyChain.ForSale({}, (err, res) => {
            eventEmitted = true;
        });

        // Mark an item as ForSale by calling function sellItem()
        await supplyChain.sellItem(upc, productPrice, {from: caller});

        await AssertEventTriggeredAndState(supplyChain, caller, eventEmitted);
    })

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {
        const supplyChain = await SupplyChain.deployed()
        await supplyChain.addDistributor(distributorID);

        // Declare and Initialize a variable for event
        itemState++
        var caller = distributorID; // caller now changes to distributor
        var eventEmitted = false;

        // Watch the emitted event Sold()
        var event = supplyChain.Sold({}, (err, res) => {
            eventEmitted = true;
        });


        // Mark an item as Sold by calling function buyItem()
        await supplyChain.buyItem(upc, {from: caller, value: productPrice, gasPrice: 0})

        await AssertEventTriggeredAndState(supplyChain, caller, eventEmitted);
    })

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        itemState++
        var caller = distributorID; // caller now changes to distributor
        var eventEmitted = false;

        // Watch the emitted event Shipped()
        var event = supplyChain.Shipped({}, (err, res) => {
            eventEmitted = true;
        });

        // Mark an item as Sold by calling function buyItem()
        await supplyChain.shipItem(upc, {from: caller});

        await AssertEventTriggeredAndState(supplyChain, caller, eventEmitted);
    })

// 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {
        const supplyChain = await SupplyChain.deployed()
        await supplyChain.addRetailer(retailerID);
        itemState++
        var caller = retailerID; // caller now changes to retailer

        // Declare and Initialize a variable for event
        var eventEmitted = false;

        // Watch the emitted event Received()
        var event = supplyChain.Received({}, (err, res) => {
            eventEmitted = true;
        });

        // Mark an item as Sold by calling function buyItem()
        await supplyChain.receiveItem(upc, {from: caller});
        await AssertEventTriggeredAndState(supplyChain, caller, eventEmitted);
    })

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {
        const supplyChain = await SupplyChain.deployed()
        await supplyChain.addConsumer(consumerID);
        itemState++
        var caller = consumerID; // caller now changes to retailer

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event Purchased()
        let event = await supplyChain.Purchased({}, (err, res) => {
            eventEmitted = true;
        });

        // Mark an item as Sold by calling function buyItem()
        await supplyChain.purchaseItem(upc, {from: caller});

        await AssertEventTriggeredAndState(supplyChain, caller, eventEmitted);
    })

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed()
        let caller = consumerID;
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc, {from: caller})

        // Verify the result set:
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], caller, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed()
        let caller = consumerID;
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc, {from: caller})

        // Verify the result set:
        assert.equal(resultBufferTwo[0], sku, 'Error: Invalid SKU');
        assert.equal(resultBufferTwo[1], upc, 'Error: Invalid UPC');
        assert.equal(resultBufferTwo[2], 2, 'Error: Invalid ProductID');
        assert.equal(resultBufferTwo[3], productNotes, 'Error: Invalid Product Notes');
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid Product Price');
        assert.equal(resultBufferTwo[5], 7, 'Error: Invalid Item State');
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid DistributorID');
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid RetailerID');
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid ConsumerID');
    })

});

