Write-Host "Compiling contract..." -ForegroundColor Cyan
npx hardhat compile

Write-Host "`nDeploying contract..." -ForegroundColor Cyan
npx hardhat run scripts/deploy.js --network localhost

Write-Host "`n✅ Done! Please refresh your browser and try again." -ForegroundColor Green

