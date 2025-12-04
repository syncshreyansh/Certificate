const hre = require("hardhat");

async function main() {
  console.log("🔐 Authorizing issuer account...\n");

  // Get the account to authorize (you can change this address)
  const [deployer] = await hre.ethers.getSigners();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  // The account you want to authorize (change this to your MetaMask account)
  const accountToAuthorize = process.argv[2] || deployer.address;
  
  console.log("📍 Contract Address:", contractAddress);
  console.log("👤 Account to authorize:", accountToAuthorize);
  console.log("🔑 Authorizing from:", deployer.address, "\n");

  const CertificateRegistry = await hre.ethers.getContractAt(
    "CertificateRegistry",
    contractAddress
  );

  try {
    const tx = await CertificateRegistry.authorizeIssuer(accountToAuthorize);
    console.log("⏳ Transaction sent:", tx.hash);
    await tx.wait();
    console.log("✅ Account authorized successfully!");
    
    // Verify authorization
    const isAuthorized = await CertificateRegistry.authorizedIssuers(accountToAuthorize);
    console.log("✅ Verification: Authorized =", isAuthorized);
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.message.includes("Only owner")) {
      console.log("\n💡 Tip: You need to use the deployer account to authorize.");
      console.log("   The deployer is Account #0 from Hardhat node.");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

