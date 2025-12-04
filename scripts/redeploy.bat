@echo off
echo Compiling contract...
call npx hardhat compile

echo.
echo Deploying contract...
call npx hardhat run scripts/deploy.js --network localhost

echo.
echo Done! Please refresh your browser and try again.

