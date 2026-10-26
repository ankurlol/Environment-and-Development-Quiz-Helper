@echo off
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/ankurkure/nptel-platform.git): "
if "%REPO_URL%"=="" (
  echo No URL entered. Exiting.
  pause
  exit /b
)
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main
echo.
echo =========================================================
echo Pushed successfully to GitHub!
echo Next: Go to Repo Settings -> Pages -> Source: GitHub Actions
echo =========================================================
pause
