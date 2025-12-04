# 🎓 Blockchain Document Verification System

A decentralized application for issuing and verifying educational documents on the Ethereum blockchain.

## 📋 Features

- **Issue Documents**: Administrators can issue certificates, marksheets, and legal documents
- **Verify Authenticity**: Anyone can verify document authenticity using the hash
- **Student Portfolio**: Students can view all their issued documents by Student ID
- **Immutable Records**: All documents are stored on the blockchain and cannot be tampered with

## 🛠️ Technologies Used

- **Smart Contract**: Solidity 0.8.20
- **Development Framework**: Hardhat 2.22.5
- **Frontend**: HTML, CSS, JavaScript
- **Blockchain Library**: Ethers.js v6
- **Wallet**: MetaMask

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MetaMask browser extension
- Git

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Local Blockchain

Open a terminal and run:

```bash
npx hardhat node
```

**Keep this terminal running!** You'll see 20 test accounts with 10,000 ETH each.

Example output:

```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
```

### Step 3: Deploy Smart Contract

Open a **new terminal** (keep the previous one running) and run:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

You should see:

```
✅ CertificateRegistry deployed successfully!
📍 Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Step 4: Configure MetaMask

#### Add Hardhat Network to MetaMask:

1. Open MetaMask
2. Click the network dropdown (top left)
3. Click "Add Network" → "Add a network manually"
4. Enter the following details:

```
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
```

5. Click "Save"

#### Import Test Account:

1. In MetaMask, click your account icon → "Import Account"
2. Select "Private Key"
3. Copy the private key from Account #0 in your Hardhat terminal
4. Paste it: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
5. Click "Import"

You should now have 10,000 ETH in this account!

### Step 5: Run the Application

1. Navigate to the `web` directory
2. Open `index.html` in your browser

**OR** use VS Code Live Server:

- Install "Live Server" extension in VS Code
- Right-click on `web/index.html`
- Click "Open with Live Server"

### Step 6: Connect Wallet

1. Click the **"Connect Wallet"** button
2. MetaMask will pop up → Click "Connect"
3. You should see your address: "Connected: 0xf39F..."

## 📖 How to Use

### For Administrators (Issue Documents)

1. Click the **"📝 Issue (Admin)"** tab
2. Fill in the form:
   - Document Type: Certificate/Marksheet/Legal/etc.
   - Student Name: e.g., "John Doe"
   - Student ID: e.g., "STU-1001"
   - Course/Purpose: e.g., "Computer Science B.Tech"
   - Data: e.g., "95%" or "A Grade"
3. Click **"🚀 Issue to Blockchain"**
4. MetaMask will ask for confirmation → Click "Confirm"
5. Wait a few seconds for the transaction to complete
6. **SAVE THE HASH** displayed in the success message!

### For HR/Verifiers (Verify Documents)

1. Click the **"🔍 Verify (HR)"** tab
2. Paste the document hash (starts with `0x...`)
3. Click **"🔍 Verify Now"**
4. You'll see:
   - ✅ Valid Document (if exists on blockchain)
   - Issuer address
   - Issuance date
   - Document details (if available)

### For Students (View Portfolio)

1. Click the **"🎒 Student Portfolio"** tab
2. Enter your Student ID (e.g., "STU-1001")
3. Click **"📂 Fetch My Documents"**
4. View all your issued documents
5. Click **"📋 Copy Hash"** to copy any document hash for verification

## 🔧 Troubleshooting

### Problem: "Connect Wallet" button not working

**Solution**: Make sure MetaMask is installed and you're on the Hardhat Local network.

### Problem: "Transaction failed" error

**Solutions**:
- Check if Hardhat node is still running
- Make sure you have enough ETH (you should have 10,000 ETH)
- Try refreshing the page and reconnecting

### Problem: "Nonce too high" error

**Solution**: 
1. Go to MetaMask Settings → Advanced
2. Click "Clear activity tab data"
3. Refresh the page

### Problem: Contract address not found

**Solution**: Redeploy the contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## 📂 Project Structure

```
blockchain-certificates/
├── contracts/
│   └── CertificateRegistry.sol    # Smart contract
├── scripts/
│   └── deploy.js                  # Deployment script
├── web/
│   ├── index.html                 # Frontend UI
│   ├── app.js                     # Frontend logic
│   ├── style.css                  # Styling
│   └── config.js                  # Contract address (auto-generated)
├── hardhat.config.js              # Hardhat configuration
└── package.json                   # Dependencies
```

## 🔐 Security Notes

- ⚠️ **Never use test private keys on mainnet!**
- ⚠️ The private key in this tutorial is for **local testing only**
- 🔒 In production, use proper key management solutions
- 📝 Document hashes are publicly visible on the blockchain
- 🛡️ Only authorized issuers can issue certificates (configurable in contract)

## 📝 Smart Contract Details

### Functions

- `issueCertificate(bytes32 _certificateHash)`: Issue a new certificate
- `verifyCertificate(bytes32 _certificateHash)`: Verify a certificate

### Events

- `CertificateIssued(bytes32 indexed certificateHash, address indexed issuer, uint256 issuedDate)`

## 🎯 Common Use Cases

1. **Universities**: Issue degree certificates and transcripts
2. **Schools**: Issue marksheets and character certificates
3. **Companies**: Issue experience certificates
4. **Government**: Issue legal documents and licenses
5. **Training Centers**: Issue course completion certificates

## 🚦 Testing on Real Networks

### For Testnet Deployment (e.g., Sepolia):

1. Get testnet ETH from a faucet
2. Update `hardhat.config.js`:

```javascript
networks: {
  sepolia: {
    url: "YOUR_INFURA_URL",
    accounts: ["YOUR_PRIVATE_KEY"]
  }
}
```

3. Deploy: `npx hardhat run scripts/deploy.js --network sepolia`

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors (F12)
2. Check the Hardhat node terminal for transaction logs
3. Make sure all steps were followed correctly

## 📄 License

ISC

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ using Hardhat, Solidity, and Ethers.js**
# blockchain
