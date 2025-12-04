@echo off
echo ========================================
echo Compiling Contract...
echo ========================================
call npx hardhat compile

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Compilation failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Deploying Contract...
echo ========================================
call npx hardhat run scripts/deploy.js --network localhost

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Deployment failed!
    echo Make sure Hardhat node is running in another terminal!
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Contract redeployed!
echo ========================================
echo.
echo Next steps:
echo 1. Refresh your browser (F5)
echo 2. Try the transaction again
echo.
pause

