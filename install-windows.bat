@echo off
setlocal enabledelayedexpansion
title KuttiPencil Photoshop Extension - 1-Click Installer (Windows)

echo =======================================================
echo    കുട്ടിപെൻസിൽ for Adobe Photoshop - Installer v1.0.0
echo =======================================================
echo.

echo [1/3] Enabling Photoshop CEP PlayerDebugMode in Windows Registry...
for %%v in (9 10 11 12 13 14 15 16) do (
    reg add "HKCU\Software\Adobe\CSXS.%%v" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
    reg add "HKLM\Software\Adobe\CSXS.%%v" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
)
echo    -- Registry keys enabled successfully.
echo.

echo [2/3] Preparing Photoshop CEP extensions directory...
set "TARGET_DIR=%APPDATA%\Adobe\CEP\extensions\kuttipencil"
if not exist "%TARGET_DIR%" (
    mkdir "%TARGET_DIR%"
)
echo    -- Target: %TARGET_DIR%
echo.

echo [3/3] Copying extension files...
set "SRC_DIR=%~dp0"
xcopy "%SRC_DIR%*" "%TARGET_DIR%\" /E /I /H /Y /EXCLUDE:%SRC_DIR%exclude.txt >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    rem Fallback standard copy if exclude file not present
    xcopy "%SRC_DIR%CSXS" "%TARGET_DIR%\CSXS\" /E /I /H /Y >nul 2>&1
    xcopy "%SRC_DIR%css" "%TARGET_DIR%\css\" /E /I /H /Y >nul 2>&1
    xcopy "%SRC_DIR%js" "%TARGET_DIR%\js\" /E /I /H /Y >nul 2>&1
    xcopy "%SRC_DIR%jsx" "%TARGET_DIR%\jsx\" /E /I /H /Y >nul 2>&1
    xcopy "%SRC_DIR%assets" "%TARGET_DIR%\assets\" /E /I /H /Y >nul 2>&1
    copy /Y "%SRC_DIR%index.html" "%TARGET_DIR%\" >nul 2>&1
    copy /Y "%SRC_DIR%.debug" "%TARGET_DIR%\" >nul 2>&1
)

echo    -- KuttiPencil extension installed successfully!
echo.
echo =======================================================
echo  INSTALLATION COMPLETE!
echo.
echo  How to use:
echo  1. Restart Adobe Photoshop.
echo  2. Go to: Window -> Extensions (legacy) -> Kutti Pencil
echo =======================================================
echo.
pause
