@echo off
REM ========================================
REM تشغيل PostgreSQL Portable
REM ========================================

REM تحديد مسار PostgreSQL (غيّره حسب المكان اللي حطيت فيه الملف)
SET PGSQL_PATH=C:\Program Files\pgsql
SET PGDATA=%PGSQL_PATH%\data
SET PGPORT=5432

echo ========================================
echo  PostgreSQL Portable - Gym System
echo ========================================
echo.

REM التحقق من وجود المجلد
if not exist "%PGSQL_PATH%" (
    echo ERROR: PostgreSQL not found at %PGSQL_PATH%
    echo Please update PGSQL_PATH in this script
    pause
    exit /b 1
)

REM إضافة bin للـ PATH
SET PATH=%PGSQL_PATH%\bin;%PATH%

REM التحقق من تهيئة قاعدة البيانات
if not exist "%PGDATA%\postgresql.conf" (
    echo [1/3] Initializing database for first time...
    "%PGSQL_PATH%\bin\initdb.exe" -D "%PGDATA%" -U postgres -E UTF8 --locale=C
    
    if errorlevel 1 (
        echo ERROR: Failed to initialize database
        pause
        exit /b 1
    )
    
    echo.
    echo [SUCCESS] Database initialized!
    echo.
)

REM بدء PostgreSQL Server
echo [2/3] Starting PostgreSQL Server...
echo.
"%PGSQL_PATH%\bin\pg_ctl.exe" -D "%PGDATA%" -l "%PGSQL_PATH%\logfile.log" start

if errorlevel 1 (
    echo ERROR: Failed to start PostgreSQL
    echo Check log: %PGSQL_PATH%\logfile.log
    pause
    exit /b 1
)

echo.
echo [SUCCESS] PostgreSQL is running on port %PGPORT%
echo.

REM الانتظار قليلاً حتى يكتمل التشغيل
timeout /t 3 /nobreak >nul

REM إنشاء قاعدة البيانات للجيم (إذا لم تكن موجودة)
echo [3/3] Creating gym_database...
"%PGSQL_PATH%\bin\psql.exe" -U postgres -c "SELECT 1 FROM pg_database WHERE datname='gym_database'" | findstr /C:"1 row" >nul

if errorlevel 1 (
    "%PGSQL_PATH%\bin\psql.exe" -U postgres -c "CREATE DATABASE gym_database;"
    "%PGSQL_PATH%\bin\psql.exe" -U postgres -c "CREATE USER gymadmin WITH PASSWORD 'Gym@2024#Secure';"
    "%PGSQL_PATH%\bin\psql.exe" -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE gym_database TO gymadmin;"
    
    echo [SUCCESS] Database gym_database created!
) else (
    echo [INFO] Database gym_database already exists
)

echo.
echo ========================================
echo  PostgreSQL Ready!
echo ========================================
echo.
echo  Server: localhost
echo  Port: 5432
echo  Database: gym_database
echo  User: gymadmin
echo  Password: Gym@2024#Secure
echo.
echo  Connection String:
echo  postgresql://gymadmin:Gym@2024#Secure@localhost:5432/gym_database
echo.
echo ========================================
echo.
echo Press any key to continue...
pause >nul