import { ethers } from "hardhat";
import { Grok as GrokContractType } from "../typechain-types"; // Optionnel: pour l'autocomplétion si TypeChain est utilisé

async function main() {
    const contractAddress = "0xDEPLOYED_CONTRACT_ADRESSE"; // Votre adresse de contrat

    // Récupère le signataire (compte qui va interagir)
    const [signer] = await ethers.getSigners();
    console.log(`Utilisation du compte: ${signer.address} pour appeler rollDice().`);

    // Se connecte au contrat Grok
    const GrokFactory = await ethers.getContractFactory("Grok");
    const grok = GrokFactory.attach(contractAddress) as GrokContractType; // Cast optionnel

    console.log(`Connecté au contrat Grok à l'adresse: ${await grok.getAddress()}`);

    try {
        // Appelle la fonction rollDice()
        console.log("\nAppel de la fonction rollDice()...");
        const tx = await grok.rollDice();

        console.log(`Transaction rollDice() envoyée. Hash: ${tx.hash}`);
        console.log("En attente de la confirmation de la transaction...");

        // Attend que la transaction soit minée et confirmée
        const receipt = await tx.wait();
        console.log("Transaction rollDice() confirmée !");
    } catch (error) {
        console.error("\nErreur lors de l'appel de rollDice():", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });