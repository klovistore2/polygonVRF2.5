# Sample Hardhat Project
# polygonVRF2.5

This is configured to run on POLYGON MAINNET with HardHat: 

- git clone https://github.com/klovistore2/polygonVRF2.5

- npm install

- Create a chainlink VRF subscription here : https://vrf.chain.link/polygon 

- add SUBSCRIPTION_ID in : scripts/deployGrok.ts (to deploying the contract)

- Add your PRIVATE_KEY (from the adress used to create the subscription on https://vrf.chain.link) and <YOUR_INFURA_PROJECT_ID> in : hardhat.config.ts

- run : npx hardhat run scripts/deployGrok.ts --network poly

- add the deployment adress of the contract as a consumer : https://vrf.chain.link/polygon

- fund the VRF subscription with Link (TOKEN) use their tool to 'PegSwap'

- add the deployment adress of the contract in : scripts/testGrok.ts

- run : npx hardhat run scripts/test.ts --network poly

Directly in testGrok.ts
So you don't have to redeploy and add consumer each time

VRF adress vrfCoordinator is HARD CODED in contracts/Grok.sol for polygon MAINNET

Generate a random number, earn 100USDC on polygon

