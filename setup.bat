@echo off
chcp 65001 >nul
color 0A
title 🏋️ Gym Management System - Complete Setup

echo.
echo ========================================
echo   نظام إدارة الجيم - الإعداد الكامل
echo ========================================
echo.

REM ========================================
REM 1️⃣ إعداد PostgreSQL Portable
REM ========================================

:CHECK_PGSQL
echo [الخطوة 1/6] التحقق من PostgreSQL...
echo.

REM اسأل عن مسار pgsql
echo أين وضعت مجلد pgsql؟
echo.
echo أمثلة:
echo   1. C:\PostgreSQL\pgsql
echo   2. D:\pgsql
echo   3. C:\Program Files\pgsql
echo.
set /p PGSQL_PATH="اكتب المسار الكامل: "

if not exist "%PGSQL_PATH%" (
    echo.
    echo ❌ المسار غير موجود: %PGSQL_PATH%
    echo.
    goto CHECK_PGSQL
)

if not exist "%PGSQL_PATH%\bin\postgres.exe" (
    echo.
    echo ❌ مجلد pgsql غير صحيح - لا يحتوي على bin\postgres.exe
    echo تأكد أن المجلد يحتوي على: bin, lib, share
    echo.
    goto CHECK_PGSQL
)

echo ✅ تم العثور على PostgreSQL
echo.

REM ========================================
REM 2️⃣ تهيئة قاعدة البيانات
REM ========================================

echo [الخطوة 2/6] تهيئة قاعدة البيانات...
echo.

SET PGDATA=%PGSQL_PATH%\data
SET PGPORT=5432
SET PATH=%PGSQL_PATH%\bin;%PATH%

if not exist "%PGDATA%\postgresql.conf" (
    echo جاري إنشاء قاعدة البيانات لأول مرة...
    "%PGSQL_PATH%\bin\initdb.exe" -D "%PGDATA%" -U postgres -E UTF8 --locale=C
    
    if errorlevel 1 (
        echo ❌ فشل في إنشاء قاعدة البيانات
        pause
        exit /b 1
    )
    
    echo ✅ تم إنشاء قاعدة البيانات
) else (
    echo ✅ قاعدة البيانات موجودة بالفعل
)

echo.

REM ========================================
REM 3️⃣ تشغيل PostgreSQL
REM ========================================

echo [الخطوة 3/6] تشغيل PostgreSQL Server...
echo.

REM إيقاف أي نسخة قديمة
"%PGSQL_PATH%\bin\pg_ctl.exe" -D "%PGDATA%" stop >nul 2>&1

REM تشغيل جديد
"%PGSQL_PATH%\bin\pg_ctl.exe" -D "%PGDATA%" -l "%PGSQL_PATH%\logfile.log" start

if errorlevel 1 (
    echo ❌ فشل تشغيل PostgreSQL
    echo راجع الملف: %PGSQL_PATH%\logfile.log
    pause
    exit /b 1
)

echo ✅ PostgreSQL يعمل الآن
echo.

REM الانتظار 3 ثواني
timeout /t 3 /nobreak >nul

REM ========================================
REM 4️⃣ إنشاء قاعدة بيانات الجيم
REM ========================================

echo [الخطوة 4/6] إنشاء قاعدة بيانات الجيم...
echo.

REM التحقق من وجود gym_database
"%PGSQL_PATH%\bin\psql.exe" -U postgres -lqt | findstr /C:"gym_database" >nul

if errorlevel 1 (
    echo جاري إنشاء gym_database...
    "%PGSQL_PATH%\bin\psql.exe" -U postgres -c "CREATE DATABASE gym_database;"
    "%PGSQL_PATH%\bin\psql.exe" -U postgres -c "CREATE USER gymadmin WITH PASSWORD 'Gym@2024#Secure';"
    "%PGSQL_PATH%\bin\psql.exe" -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE gym_database TO gymadmin;"
    
    echo ✅ تم إنشاء قاعدة البيانات
) else (
    echo ✅ قاعدة البيانات موجودة بالفعل
)

echo.

REM ========================================
REM 5️⃣ إنشاء ملف .env
REM ========================================

echo [الخطوة 5/6] إنشاء ملف الإعدادات (.env)...
echo.

if exist ".env" (
    echo ⚠️  ملف .env موجود بالفعل
    echo هل تريد استبداله؟ (Y/N)
    set /p REPLACE_ENV=
    
    if /i "%REPLACE_ENV%" NEQ "Y" (
        echo تم تخطي إنشاء .env
        goto SKIP_ENV
    )
)

(
echo # ====================================
echo # 🏋️ نظام إدارة الجيم - الإعدادات
echo # ====================================
echo.
echo # قاعدة البيانات
echo DATABASE_URL="postgresql://gymadmin:Gym@2024#Secure@localhost:5432/gym_database"
echo.
echo # إعدادات السيرفر
echo PORT=4001
echo HOSTNAME=0.0.0.0
echo.
echo # الأمان
echo JWT_SECRET=change-this-to-random-long-string-in-production-minimum-32-characters
echo.
echo # البيئة
echo NODE_ENV=production
) > .env

echo ✅ تم إنشاء ملف .env
echo.

:SKIP_ENV

REM ========================================
REM 6️⃣ تطبيق Schema على قاعدة البيانات
REM ========================================

echo [الخطوة 6/6] تطبيق Schema على قاعدة البيانات...
echo.

echo جاري تشغيل: npx prisma generate
call npx prisma generate

if errorlevel 1 (
    echo ❌ فشل prisma generate
    pause
    exit /b 1
)

echo.
echo جاري تشغيل: npx prisma db push
call npx prisma db push

if errorlevel 1 (
    echo ❌ فشل prisma db push
    pause
    exit /b 1
)

echo ✅ تم تطبيق Schema بنجاح
echo.

REM ========================================
REM ✅ اكتمل الإعداد
REM ========================================

cls
echo.
echo ========================================
echo   🎉 اكتمل الإعداد بنجاح!
echo ========================================
echo.
echo 📊 معلومات الاتصال:
echo ────────────────────────────────────────
echo   Server:   localhost
echo   Port:     5432
echo   Database: gym_database
echo   User:     gymadmin
echo   Password: Gym@2024#Secure
echo.
echo 🌐 عنوان النظام:
echo ────────────────────────────────────────
echo   Local:    http://localhost:4001
echo   Network:  http://YOUR_IP:4001
echo.
echo 👤 حساب Admin الافتراضي:
echo ────────────────────────────────────────
echo   Email:    admin@gym.com
echo   Password: admin123456
echo   ⚠️  غيّر كلمة المرور فوراً بعد أول تسجيل دخول!
echo.
echo ========================================
echo.
echo 🚀 لتشغيل النظام الآن:
echo.
echo    npm run start:network
echo.
echo ────────────────────────────────────────
echo 📝 ملاحظات مهمة:
echo.
echo 1. PostgreSQL شغال الآن في الخلفية
echo 2. لإيقاف PostgreSQL: شغّل stop-postgres.bat
echo 3. ملف .env يحتوي على الإعدادات
echo 4. غيّر JWT_SECRET في ملف .env
echo.
echo ========================================
echo.
echo هل تريد تشغيل النظام الآن؟ (Y/N)
set /p START_NOW=

if /i "%START_NOW%"=="Y" (
    echo.
    echo جاري تشغيل النظام...
    echo.
    start cmd /k "npm run start:network"
    
    timeout /t 3 /nobreak >nul
    echo.
    echo ✅ تم تشغيل النظام في نافذة جديدة
    echo.
    echo افتح المتصفح على: http://localhost:4001
    echo.
)

echo.
echo 💡 نصائح للاستخدام:
echo ────────────────────────────────────────
echo   • للتشغيل: npm run start:network
echo   • للتطوير: npm run dev
echo   • للنسخ الاحتياطي: npm run backup
echo   • لمراقبة الاتصالات: npm run monitor:connections
echo.
pause