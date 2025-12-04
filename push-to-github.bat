@echo off
echo ========================================
echo Pushing to GitHub...
echo ========================================
echo.

echo Checking git status...
git status

echo.
echo Adding all changes...
git add .

echo.
echo Committing changes...
git commit -m "Fix authorization issue - Remove authorization requirement for local development - Add auto-authorization functions - Improve error handling and network switching - Add deployment scripts - Update contract to allow anyone to issue certificates locally"

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Commit failed!
    pause
    exit /b 1
)

echo.
echo Pushing to GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Push failed!
    echo Check your internet connection and GitHub credentials.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Code pushed to GitHub!
echo ========================================
echo.
echo Repository: https://github.com/syncshreyansh/Certificate
echo.
pause

