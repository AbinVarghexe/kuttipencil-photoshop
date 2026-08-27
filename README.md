# ✏️ കുട്ടിപെൻസിൽ for Adobe Photoshop (KuttiPencil-PS)

<p align="center">
  <img src="https://raw.githubusercontent.com/AbinVarghexe/kuttipencil-photoshop/main/CSXS/manifest.xml" alt="KuttiPencil Logo" width="0" height="0">
  <h2 align="center">കുട്ടിപെൻസിൽ — Malayalam Typography & FML/ML-TT Converter Extension</h2>
  <p align="center">
    <strong>Type in Manglish or Malayalam Unicode directly inside Adobe Photoshop and render beautiful legacy ML/FML fonts with one click.</strong>
  </p>
  <p align="center">
    <a href="#-features"><img src="https://img.shields.io/badge/Photoshop-CC%202015%20--%202024%2B-blue?style=for-the-badge&logo=adobephotoshop" alt="Photoshop Version"></a>
    <a href="#-installation"><img src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS-informational?style=for-the-badge" alt="Platform"></a>
    <a href="#-license"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"></a>
    <a href="https://kuttipencil.in"><img src="https://img.shields.io/badge/Inspired%20by-Kuttipencil.in-red?style=for-the-badge" alt="Kuttipencil"></a>
  </p>
</p>

---

## 📖 Overview

Standard Malayalam Unicode text (e.g. `മലയാളം`) does not render correctly when using decorative, vintage, or classic Malayalam publishing fonts (**ML-TT**, **FML**, **Scribe-ML**, **Indulekha**, **Thunchan**, **Karthika**, etc.) in Adobe Photoshop.

**KuttiPencil-PS** brings the full typing and transliteration power of [kuttipencil.in](https://kuttipencil.in) directly into a native Photoshop panel extension. You can type in **Manglish** (phonetic English) or paste **Malayalam Unicode**, and KuttiPencil instantly re-encodes the characters into the proper ASCII glyph sequence, creates a new centered text layer on your active canvas at **100pt**, and applies your installed **ML-TT font** automatically!

---

## ✨ Features

- 🔤 **Real-Time Manglish Transliteration**: Type English letters (`namaskaram`, `keralam`, `ente peru`) and see live Malayalam script suggestions as you type.
- ⚡ **Direct Unicode Input**: Paste standard Malayalam Unicode text for instant FML conversion.
- 🎯 **1-Click Text Layer Creation**: Automatically spawns a text layer on your Photoshop canvas, **dead-center**, set to **100pt size**, with your **`ML-TT` font applied**.
- 🔄 **Layer Synchronization**: Select any existing text layer in Photoshop and update its contents in real-time.
- 🔍 **Reverse Decode Mode**: Paste existing legacy FML text or read directly from a Photoshop layer to decode it back into readable Malayalam Unicode.
- 📥 **Direct Downloads Export**: 1-Click transparent PNG and JPG canvas export directly into your system `Downloads` folder.
- 🎨 **Authentic Kuttipencil Design**: Clean, modern interface styled directly after the official Kuttipencil.in utility with zero emojis and clean vector icons.

---

## 🚀 Quick Installation (Windows)

### Option A: Automatic 1-Click Install (Recommended)

1. **Clone or Download** this repository to your computer:
   ```bash
   git clone https://github.com/AbinVarghexe/kuttipencil-photoshop.git
   ```
2. Double-click **`enable-debug-mode.bat`** (this allows Photoshop to run local developer extensions).
3. Double-click **`install-extension.bat`** (this automatically links the extension into your Photoshop CEP folder).
4. Restart Adobe Photoshop.
5. In Photoshop, open: **`Window`** $\rightarrow$ **`Extensions (legacy)`** $\rightarrow$ **`Kutti Pencil`**.

---

### Option B: Manual Installation

#### Windows:
1. Enable `PlayerDebugMode` in Windows Registry:
   - Press `Win + R`, type `regedit`, and navigate to:
     `HKEY_CURRENT_USER\Software\Adobe\CSXS.9` (also create keys for `CSXS.10`, `CSXS.11`, `CSXS.12`, `CSXS.13`, `CSXS.14` if present).
   - Add a new **String Value (`REG_SZ`)** named `PlayerDebugMode` with value `1`.
2. Copy the `kuttipencil` folder into:
   ```
   C:\Users\<YourUsername>\AppData\Roaming\Adobe\CEP\extensions\kuttipencil
   ```
3. Restart Adobe Photoshop.

#### macOS:
1. Open Terminal and enable PlayerDebugMode:
   ```bash
   defaults write com.adobe.CSXS.9 PlayerDebugMode 1
   defaults write com.adobe.CSXS.10 PlayerDebugMode 1
   defaults write com.adobe.CSXS.11 PlayerDebugMode 1
   defaults write com.adobe.CSXS.12 PlayerDebugMode 1
   defaults write com.adobe.CSXS.13 PlayerDebugMode 1
   defaults write com.adobe.CSXS.14 PlayerDebugMode 1
   ```
2. Copy the `kuttipencil` folder into:
   ```
   ~/Library/Application Support/Adobe/CEP/extensions/kuttipencil
   ```
3. Restart Adobe Photoshop.

---

## 🎨 Supported Fonts

KuttiPencil-PS works seamlessly with all legacy ASCII Malayalam font families:

- **ML-TT Series**: `ML-TTIndulekhaHeavy`, `ML-TTThunchan`, `ML-TTVishu`, `ML-TTVisakham`, `ML-TTAswathi`, `ML-TTNila`, `ML-TTChandrika`, `ML-TTBhavana`, `ML-TTGopika`, `ML-TTGuruvayur`, `ML-TTKaumudi`, `ML-TTNandini`, `ML-TTOnam`, `ML-TTRohini`, `ML-TTRavivarma`, `ML-TTSankara`, `ML-TTThiruvathira`, `ML-TTJyothy`, `ML-TTChithiraHeavy`, `ML-TTAshtamudiExBold`
- **FML Series**: `FML-Indulekha`, `FML-Akhila`, `FML-Thunchan`, `FML-Karthika`, `FML-Revathi`
- **Scribe & Traditional Series**: `Scribe-ML-Badusha`, `ML-KV-Anamika`, `ML-KV-Ananya`, `M_Kairali`, `Indu No_1`, `Aruna`, `Indira`, `Thoolika`, `Panchami`, `Manorama`

> [!TIP]
> Ensure you have your desired `.ttf` or `.otf` font installed on your operating system. If you install new fonts while Photoshop is open, click the **🔄 Refresh** button in the KuttiPencil panel to update the font list!

---

## 🖥️ How to Use

1. Open Photoshop and create or open any canvas.
2. Open the panel: **Window** > **Extensions (legacy)** > **Kutti Pencil**.
3. In the **Convert** tab:
   - Select **Manglish** to type phonetically in English (e.g. `namaskaram`).
   - Or select **Direct Unicode** to paste Malayalam text (`നമസ്കാരം`).
4. Click the red **Insert to PS** button:
   - A new text layer is generated **dead-center**, scaled to **100pt**, and styled with **`ML-TTIndulekhaHeavy`** (or your selected font).
5. Switch to the **Decode** tab to convert legacy text back to Unicode, or the **Export** tab to save full-resolution PNGs directly to your `Downloads` folder!

---

## 🛠️ Project Structure

```
kuttipencil/
├── CSXS/
│   └── manifest.xml          # Extension bundle configuration & host targets
├── css/
│   └── style.css             # Authentic Kuttipencil.in web brand styling
├── js/
│   ├── converter.js          # Bidirectional Malayalam <-> FML engine + transliterator
│   ├── libs/
│   │   └── CSInterface.js    # Adobe CEP communication bridge
│   └── main.js               # Frontend controller, word counters, event handlers
├── jsx/
│   └── hostscript.jsx        # Photoshop ExtendScript backend (DOM & ActionManager)
├── .debug                    # Remote Chrome DevTools debug port (8088)
├── enable-debug-mode.bat     # 1-Click Windows registry debug mode activator
├── install-extension.bat    # 1-Click Windows CEP extensions installer
├── index.html                # 3-Tab Panel UI layout
└── README.md                 # Complete documentation & usage guide
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<p align="center">
  <sub>Inspired by <a href="https://kuttipencil.in">kuttipencil.in</a>. Built with ❤️ for the Malayalam design and typography community.</sub>
</p>
