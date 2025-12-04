const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("🚀 Starting deployment...");
  console.log("📡 Network: localhost");
  console.log("⏳ Deploying CertificateRegistry contract...\n");

  const CertificateRegistry = await hre.ethers.getContractFactory("CertificateRegistry");
  const certificateRegistry = await CertificateRegistry.deploy();

  await certificateRegistry.waitForDeployment();

  const address = await certificateRegistry.getAddress();

  console.log("\n✅ CertificateRegistry deployed successfully!");
  console.log("📍 Contract Address:", address);
  console.log("\n📝 Next steps:");
  console.log("   1. Copy the contract address above");
  console.log("   2. Update web/config.js with this address (if needed)");
  console.log("   3. Open web/index.html in your browser");
  console.log("   4. Connect MetaMask to Hardhat Local network");
  console.log("   5. Start issuing certificates!\n");

  // Save the address for the frontend to use
  const configPath = path.join(__dirname, '..', 'web', 'config.js');
  const config = `const CONTRACT_ADDRESS = "${address}";`;
  fs.writeFileSync(configPath, config);
  
  console.log("✅ Contract address saved to web/config.js");
}

main().catch((error) => {
  console.error("\n❌ Deployment failed!");
  console.error(error);
  process.exitCode = 1;
});
