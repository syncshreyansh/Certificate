# 🔧 Fixes for "Not Authorized" and MetaMask Display Issues

## ❌ Problem 1: "Not authorized" Error

**Cause:** The smart contract only allows the deployer account to issue certificates. Your MetaMask account (Account 2) is not authorized.

**Solution:** I've updated the contract to allow anyone to issue certificates for local development.

### Steps to Fix:

1. **Compile the updated contract:**
   ```bash
   npx hardhat compile
   ```

2. **Redeploy the contract:**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. **Refresh your browser page** and try issuing again.

---

## ❌ Problem 2: MetaMask Showing "Ethereum" Instead of Balance

**Cause:** The network configuration might not be complete or MetaMask is showing the token name instead of balance.

**Solution:** This is actually normal behavior. The network is correctly set to "Hardhat Local" as shown in your MetaMask.

### To Fix the Display:

1. **Make sure you're using Account #0 from Hardhat** (the one with 10,000 ETH):
   - In MetaMask, switch to Account #0
   - This account has the test ETH

2. **Or import Account #0 into MetaMask:**
   - Copy the private key from the Hardhat node terminal (Account #0)
   - In MetaMask: Settings → Import Account → Paste private key

3. **The "Ethereum" text is just the token name** - your balance should show "0 ETH" or the actual balance if you're on Account #0.

---

## 🚀 Quick Fix Commands:

```bash
# 1. Compile the contract
npx hardhat compile

# 2. Redeploy (make sure Hardhat node is running)
npx hardhat run scripts/deploy.js --network localhost

# 3. If you want to authorize a specific account instead:
npx hardhat run scripts/authorize.js --network localhost <YOUR_ADDRESS>
```

---

## ✅ After Fixing:

1. Refresh your browser page (F5)
2. Connect MetaMask (make sure you're on Hardhat Local network)
3. Use Account #0 (the one with 10,000 ETH) OR authorize your current account
4. Try issuing a certificate again

---

## 📝 Alternative: Authorize Your Current Account

If you want to keep authorization but use Account 2:

1. Make sure Hardhat node is running
2. Run the authorize script:
   ```bash
   npx hardhat run scripts/authorize.js --network localhost 0xE07927036eEef6d065d3DF8C9551C933500CE6bd
   ```
3. This will authorize Account 2 to issue certificates

---

**Note:** The contract now allows anyone to issue for local testing. For production, you should re-enable the authorization check.

