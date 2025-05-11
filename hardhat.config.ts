import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const INFURA_POLYGIN_RPC_URL = "https://polygon-mainnet.infura.io/v3/<YOUR_INFURA_PROJECT_ID>";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    poly: {
      url: INFURA_POLYGIN_RPC_URL,
      chainId: 137,
      accounts: [
        "PRIVATE_KEY",
      ],
      gasPrice: "auto",
    },
  },
};

export default config;