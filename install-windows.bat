@echo off
setlocal enabledelayedexpansion
title KuttiPencil Extension - 1-Click Installer (Photoshop & Illustrator)

echo =======================================================
echo    കുട്ടിപെൻസിൽ for Photoshop & Illustrator - Installer
echo =======================================================
echo.

echo [1/3] Enabling Adobe CEP PlayerDebugMode in Windows Registry...
for %%v in (9 10 11 12 13 14 15 16) do (
    reg add "HKCU\Software\Adobe\CSXS.%%v" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
    reg add "HKLM\Software\Adobe\CSXS.%%v" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
)
echo    -- Registry keys enabled successfully.
echo.

echo [2/3] Preparing Adobe CEP extensions directory...
set "TARGET_DIR=%APPDATA%\Adobe\CEP\extensions\kuttipencil"
if not exist "%TARGET_DIR%" (
    mkdir "%TARGET_DIR%"
)
echo    -- Target: %TARGET_DIR%
echo.

echo [3/3] Copying extension files...
set "SRC_DIR=%~dp0"
xcopy "%SRC_DIR%CSXS" "%TARGET_DIR%\CSXS\" /E /I /H /Y >nul 2>&1
xcopy "%SRC_DIR%css" "%TARGET_DIR%\css\" /E /I /H /Y >nul 2>&1
xcopy "%SRC_DIR%js" "%TARGET_DIR%\js\" /E /I /H /Y >nul 2>&1
xcopy "%SRC_DIR%jsx" "%TARGET_DIR%\jsx\" /E /I /H /Y >nul 2>&1
xcopy "%SRC_DIR%assets" "%TARGET_DIR%\assets\" /E /I /H /Y >nul 2>&1
copy /Y "%SRC_DIR%index.html" "%TARGET_DIR%\" >nul 2>&1
copy /Y "%SRC_DIR%.debug" "%TARGET_DIR%\" >nul 2>&1

echo    -- KuttiPencil extension installed successfully!
echo.
echo =======================================================
echo  INSTALLATION COMPLETE!
echo.
echo  How to use in Photoshop:
echo  1. Restart Photoshop -> Window -> Extensions (legacy) -> Kutti Pencil
echo.
echo  How to use in Illustrator:
echo  1. Restart Illustrator -> Window -> Extensions -> Kutti Pencil
echo =======================================================
echo.
pause
