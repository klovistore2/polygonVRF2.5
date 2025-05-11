# Sample Hardhat Project
# polygonVRF2.5

THis is configured to run on POLYGON MAINNET with HardHat: 

- Create a chainlink VRF subscription here : https://vrf.chain.link/polygon 

- add SUBSCRIPTION_ID in : scripts/deploy.ts (to deploying the contract)

- Add your PRIVATE_KEY (from the adress used to creat the subscription on https://vrf.chain.link) and <YOUR_INFURA_PROJECT_ID> in : hardhat.config.ts

- run : npx hardhat run scripts/deploy.ts --network poly

- add the deployment adress of the contract as a consumer : https://vrf.chain.link/polygon

- fund the VRF subscription with Link 

- add the deployment adress of the contract in : scripts/test.ts

- run : npx hardhat run scripts/test.ts --network poly

you can dynamically test :    
        const newKeyHash = "0x0ffbbd0c1c18c0263dd778dadd1d64240d7bc338d95fec1cf0473928ca7eaf9e"; // Polygon 200 GWEI CHANGE IT HERE SEE THE DOC 
        const newGasLimit = 400000; 

    So you don't have to redeploy and add consumer each time

VRF adress vrfCoordinator is HARD CODED in contracts/GrokDynamic.sol for polygon MAINNET

