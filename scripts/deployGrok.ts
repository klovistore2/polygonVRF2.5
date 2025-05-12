const { ethers } = require("hardhat");

async function main() {
  console.log("Déploiement du contrat Grok...");

  // Obtenir le compte déployeur
  const [deployer] = await ethers.getSigners();
  console.log("Compte déployeur:", deployer.address);

  // ID d'abonnement Chainlink VRF
  // Assurez-vous que cet ID est correct pour le réseau que vous ciblez avec --network poly
  const subscriptionId = "YOUR_SUB_ID";

  
  console.log("Utilisation du Subscription ID:", subscriptionId);

  // Compiler et déployer le contrat
  console.log("Obtention de la ContractFactory pour Grok...");
  const Grok = await ethers.getContractFactory("Grok");

  console.log("Déploiement de Grok en cours...");
  const grok = await Grok.deploy(subscriptionId);
  console.log("Contrat Grok soumis pour déploiement...");


  // Attendre que le déploiement soit confirmé et miné
  await grok.waitForDeployment(); // <--- CORRECTION ICI
  console.log("Déploiement de Grok confirmé !");

  const contractAddress = await grok.getAddress(); // <--- CORRECTION ICI
  const deploymentTx = grok.deploymentTransaction(); // <--- CORRECTION ICI pour obtenir l'objet transaction

  // Le nom "VRFD20" dans votre log semble être un ancien nom ou une typo,
  // car vous déployez le contrat "Grok".
  console.log("Contrat Grok déployé à l'adresse:", contractAddress);

  if (deploymentTx) {
    console.log("Transaction hash:", deploymentTx.hash);
  } else {
    console.log("Impossible de récupérer les détails de la transaction de déploiement.");
  }
}

// Exécuter la fonction principale
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erreur lors du déploiement:", error);
    process.exit(1);
  });