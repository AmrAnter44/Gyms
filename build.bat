@echo off
chcp 65001 >nul
cls

echo ========================================================
echo        BUILD NEXT + ELECTRON (NO MAIN MODIFICATION)
echo ========================================================
echo.

REM Check Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not installed!
    pause
    exit /b 1
)
echo ✓ Node.js OK
echo.

REM Install electron dependencies
echo Installing Electron dependencies...
call npm install --save-dev electron electron-builder concurrently wait-on
call npm install electron-is-dev
echo ✓ Electron deps installed
echo.

REM Prisma generate (if exists)
if exist prisma (
  echo Running Prisma...
  call npx prisma generate
  echo ✓ Prisma generated
  echo.
)

REM Build Next.js
echo Building Next.js...
call npm run build
if errorlevel 1 (
    echo [ERROR] Next.js build failed!
    pause
    exit /b 1
)
echo ✓ Next.js build complete
echo.

REM Ensure build folder exists
if not exist build mkdir build

REM Copy .next & server.js into resources/app for Electron
echo Preparing production server...
rmdir /s /q app 2>nul
mkdir app
xcopy /E /I /Y .next\server app\server\
copy /Y server.js app\server.js >nul
echo ✓ Next.js server ready
echo.

REM Manual check
echo Make sure your package.json contains:
echo ------------------------------------------------------------
echo   "main": "electron/main.js",
echo   "scripts": {
echo       "electron:dev": "concurrently \"npm run dev\" \"wait-on http://localhost:4001 && electron .\"",
echo       "electron:build": "electron-builder",
echo       "electron:build:win": "electron-builder --win --x64"
echo   }
echo ------------------------------------------------------------
echo.

pause

REM Build Electron EXE
echo Building Electron EXE...
call npm run electron:build:win

if errorlevel 1 (
    echo [ERROR] Electron build failed!
    pause
    exit /b 1
)

echo.
echo ========================================================
echo        ✓✓✓ BUILD COMPLETE! CHECK /dist  ✓✓✓
echo ========================================================
pause
