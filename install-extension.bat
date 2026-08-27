@echo off
echo ===================================================
echo  Installing Kutti Pencil into Adobe CEP Extensions
echo ===================================================
echo.

set "TARGET_DIR=%APPDATA%\Adobe\CEP\extensions"
set "LINK_DIR=%TARGET_DIR%\kuttipencil"
set "SOURCE_DIR=%~dp0"

if "%SOURCE_DIR:~-1%"=="\" set "SOURCE_DIR=%SOURCE_DIR:~0,-1%"

if not exist "%TARGET_DIR%" (
    echo Creating CEP extensions directory at: "%TARGET_DIR%"
    mkdir "%TARGET_DIR%"
)

if exist "%LINK_DIR%" (
    echo Removing existing link/folder at: "%LINK_DIR%"
    rmdir /S /Q "%LINK_DIR%" 2>nul
)

echo Attempting to create directory symbolic link...
mklink /D "%LINK_DIR%" "%SOURCE_DIR%" >nul 2>&1

if exist "%LINK_DIR%" (
    echo [SUCCESS] Symbolic link created successfully!
) else (
    echo Symbolic link requires Administrator privileges. Copying directory instead...
    xcopy "%SOURCE_DIR%" "%LINK_DIR%\" /E /I /H /Y >nul
    if exist "%LINK_DIR%" (
        echo [SUCCESS] Extension folder copied successfully!
    ) else (
        echo [ERROR] Failed to install extension.
    )
)

echo.
echo Extension Location: "%LINK_DIR%"
echo Restart Photoshop and open: Window -> Extensions (legacy) -> Kutti Pencil
echo.
pause
