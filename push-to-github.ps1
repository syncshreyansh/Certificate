Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "Adding all changes..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Fix authorization issue - Remove authorization requirement for local development - Add auto-authorization functions - Improve error handling and network switching - Add deployment scripts - Update contract to allow anyone to issue certificates locally"

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Commit failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Push failed!" -ForegroundColor Red
    Write-Host "Check your internet connection and GitHub credentials." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Repository: https://github.com/syncshreyansh/Certificate" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"

