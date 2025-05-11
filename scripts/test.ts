import { ethers } from "hardhat";
import { Grok as GrokContractType } from "../typechain-types";

async function main() {
    
    //////////// TO TEST THE CONTRACT ON POLYGON MAINNET //////////
    const contractAddress = "deployed_contract_address"; // Remplacez par l'adresse de votre contrat déployé
    //////////////////////////////////////////////////////////////////

    const [signer] = await ethers.getSigners();
    console.log(`Utilisation du compte: ${signer.address}`);

    const GrokFactory = await ethers.getContractFactory("Grok");
    const grok = GrokFactory.attach(contractAddress) as GrokContractType;
    console.log(`Connecté au contrat Grok à l'adresse: ${await grok.getAddress()}`);

    // (OPTIONNEL) Changer dynamiquement les paramètres
    const updateParams = false;
    if (updateParams) {
       
        ///////// TO TEST THE CONTRACT ON POLYGON MAINNET //////////
        const newKeyHash = "0x0ffbbd0c1c18c0263dd778dadd1d64240d7bc338d95fec1cf0473928ca7eaf9e"; // Polygon 200 GWEI CHANGE IT HERE SEE THE DOC 
        const newGasLimit = 400000; // CHANGE IT HERE 
        ///////////////////////////////////////////////

        console.log(`Mise à jour du keyHash et callbackGasLimit...`);
        const tx1 = await grok.setKeyHash(newKeyHash);
        await tx1.wait();
        console.log("✅ keyHash mis à jour");

        const tx2 = await grok.setCallbackGasLimit(newGasLimit);
        await tx2.wait();
        console.log("✅ callbackGasLimit mis à jour");
    }

    // Appel à rollDice()
    try {
        console.log("\nAppel de la fonction rollDice()...");
        const tx = await grok.rollDice();
        console.log(`Transaction envoyée. Hash: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log("🎲 Transaction rollDice() confirmée !");
    } catch (error) {
        console.error("\n❌ Erreur lors de l'appel à rollDice():", error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
