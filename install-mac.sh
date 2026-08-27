#!/bin/bash

# =======================================================
#   കുട്ടിപെൻസിൽ for Photoshop & Illustrator - 1-Click Installer (macOS)
# =======================================================

echo "======================================================="
echo "   കുട്ടിപെൻസിൽ for Photoshop & Illustrator - Installer"
echo "======================================================="
echo ""

# 1. Enable PlayerDebugMode in macOS plist preferences
echo "[1/3] Enabling Adobe CEP PlayerDebugMode on macOS..."
for v in 9 10 11 12 13 14 15 16; do
    defaults write com.adobe.CSXS.$v PlayerDebugMode 1 2>/dev/null
done
echo "   -- PlayerDebugMode enabled for CSXS 9 through 16."
echo ""

# 2. Target Directory
TARGET_DIR="$HOME/Library/Application Support/Adobe/CEP/extensions/kuttipencil"
echo "[2/3] Preparing CEP extensions directory..."
mkdir -p "$TARGET_DIR"
echo "   -- Target: $TARGET_DIR"
echo ""

# 3. Copy extension files
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "[3/3] Copying extension files..."

cp -R "$SCRIPT_DIR/CSXS" "$TARGET_DIR/"
cp -R "$SCRIPT_DIR/css" "$TARGET_DIR/"
cp -R "$SCRIPT_DIR/js" "$TARGET_DIR/"
cp -R "$SCRIPT_DIR/jsx" "$TARGET_DIR/"
cp -R "$SCRIPT_DIR/assets" "$TARGET_DIR/"
cp "$SCRIPT_DIR/index.html" "$TARGET_DIR/"
cp "$SCRIPT_DIR/.debug" "$TARGET_DIR/" 2>/dev/null || true

echo "   -- KuttiPencil extension installed successfully!"
echo ""
echo "======================================================="
echo " INSTALLATION COMPLETE!"
echo ""
echo " How to use in Photoshop:"
echo " 1. Restart Photoshop -> Window -> Extensions (legacy) -> Kutti Pencil"
echo ""
echo " How to use in Illustrator:"
echo " 1. Restart Illustrator -> Window -> Extensions -> Kutti Pencil"
echo "======================================================="
echo ""
