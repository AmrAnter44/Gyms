@echo off
cls
echo ================================================
echo     GYM MANAGEMENT SYSTEM - BUILD SCRIPT
echo ================================================
echo.

REM التأكد من وجود Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM تنظيف المجلدات القديمة
echo [1/11] Cleaning old builds...
if exist dist rmdir /s /q dist
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
echo Done!
echo.

REM تثبيت المكتبات المفقودة
echo [2/11] Installing dependencies...
call npm install --force
call npm install client-only styled-jsx @next/env @swc/helpers --force
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)
echo Done!
echo.

REM إعداد Prisma
echo [3/11] Generating Prisma client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo [WARNING] Prisma generate failed, continuing...
)
call npx prisma db push --accept-data-loss
if %errorlevel% neq 0 (
    echo [WARNING] Database push failed, continuing...
)
echo Done!
echo.

REM بناء Next.js
echo [4/11] Building Next.js standalone...
call npm run build:standalone
if %errorlevel% neq 0 (
    echo [ERROR] Next.js build failed!
    pause
    exit /b 1
)
echo Done!
echo.

REM التحقق من وجود standalone
echo [5/11] Verifying standalone folder...
if not exist .next\standalone (
    echo [ERROR] Standalone build not created!
    echo Please ensure next.config.js includes output: 'standalone'
    pause
    exit /b 1
)
echo Verified!
echo.

REM تحضير ملفات إضافية
echo [6/11] Preparing standalone files...
if exist scripts\prepare-standalone.js (
    node scripts\prepare-standalone.js
) else (
    echo [INFO] prepare-standalone.js not found, skipping...
)
echo Done!
echo.

REM تجهيز موارد البناء
echo [7/11] Checking build resources...
if not exist build mkdir build
if not exist build\icon.ico (
    echo [WARNING] icon.ico not found, creating placeholder...
    echo. > build\icon.ico
)
echo Done!
echo.

REM نسخ ملفات Electron
echo [8/11] Copying Electron files...
if not exist electron mkdir electron
copy /Y main.js electron\main.js >nul 2>&1
echo Done!
echo.

REM تنظيف الكاش
echo [9/11] Cleaning npm cache...
call npm cache clean --force >nul 2>&1
echo Done!
echo.

REM قتل أي عملية على المنفذ 4001
echo [10/11] Killing port 4001 if active...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":4001"') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo Done!
echo.

REM بناء تطبيق ويندوز
echo [11/11] Building Windows Installer...
call npx electron-builder --win --x64
if %errorlevel% neq 0 (
    echo [ERROR] Electron Builder failed!
    echo Check package.json build.files and .next/standalone existence.
    pause
    exit /b 1
)
echo Done!
echo.

echo ================================================
echo SUCCESS! Installer built successfully.
echo Location: dist\GymSystem-Setup-1.0.0.exe
echo ================================================
explorer dist
pause
