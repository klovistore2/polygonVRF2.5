const { ethers } = require("hardhat");

async function main() {
  console.log("Déploiement du contrat Grok...");

  const [deployer] = await ethers.getSigners();
  console.log("Compte déployeur:", deployer.address);

  



  // Paramètres pour le constructeur
  const subscriptionId = "SUBSCRIPTION_ID"; // your VRF sub ID

  //////////TO TEST THE CONTRACT ON POLYGON MAINNET //////////
  const keyHash = "0x0ffbbd0c1c18c0263dd778dadd1d64240d7bc338d95fec1cf0473928ca7eaf9e"; // Polygon  200 GWEI
  const callbackGasLimit = 300000;
  /////////////////////////////////////////////////////////





  console.log("Utilisation du Subscription ID:", subscriptionId);

  const Grok = await ethers.getContractFactory("Grok");

  console.log("Déploiement de Grok en cours...");
  const grok = await Grok.deploy(subscriptionId, keyHash, callbackGasLimit);

  await grok.waitForDeployment();
  const contractAddress = await grok.getAddress();
  const deploymentTx = grok.deploymentTransaction();

  console.log("Contrat Grok déployé à l'adresse:", contractAddress);
  if (deploymentTx) {
    console.log("Transaction hash:", deploymentTx.hash);
  } else {
    console.log("Impossible de récupérer les détails de la transaction de déploiement.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erreur lors du déploiement:", error);
    process.exit(1);
  });
