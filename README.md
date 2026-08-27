<div align="center">

# ✏️ കുട്ടിപെൻസിൽ
### **KuttiPencil for Adobe Photoshop**
*The Native Malayalam Typography & FML / ML-TT Font Converter Panel*

---

<!-- Badges -->
[![Photoshop](https://img.shields.io/badge/Adobe%20Photoshop-CC%202015%20--%202024%2B-31A8FF?style=flat-square&logo=adobephotoshop&logoColor=white)](#-system-requirements)
[![CEP Version](https://img.shields.io/badge/CEP-9.0%20--%2014.0-E53935?style=flat-square)](#-system-requirements)
[![Platform](https://img.shields.io/badge/OS-Windows%20%7C%20macOS-475569?style=flat-square)](#-installation)
[![License](https://img.shields.io/badge/License-MIT-16A34A?style=flat-square)](LICENSE)
[![Community Project](https://img.shields.io/badge/Inspired%20by-Kuttipencil.in-DC2626?style=flat-square&logo=google-chrome&logoColor=white)](https://kuttipencil.in)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 Red   🟠 Orange   🟡 Yellow   🟢 Green   🔵 Blue  (Signature KuttiPencil System)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</div>

---

## 📌 Introduction

When designing Malayalam posters, social media banners, and typography in **Adobe Photoshop**, standard Malayalam Unicode (e.g. `മലയാളം`) fails to render with vintage and artistic Malayalam fonts (**ML-TT**, **FML**, **Scribe-ML**, **Indulekha**, **Thunchan**, **Vishu**, etc.).

**KuttiPencil for Photoshop** is a native CEP Extension that brings the real-time conversion power of [kuttipencil.in](https://kuttipencil.in) directly into your Photoshop workspace.

> [!TIP]
> **No more switching between Chrome and Photoshop!** Type phonetically in Manglish or paste Malayalam Unicode, and insert perfectly encoded **100pt centered text layers** styled with your favorite **ML-TT font** with a single click.

---

## 🗂️ 3-Tab Feature Architecture

KuttiPencil-PS is structured into three dedicated workflows:

```
┌─────────────────┬─────────────────┬─────────────────┐
│   01. CONVERT   │   02. DECODE    │   03. EXPORT    │
└─────────────────┴─────────────────┴─────────────────┘
```

### 01. 🔤 Convert Tab (Malayalam $\rightarrow$ FML / ML-TT)
- **Live Manglish Transliteration**: Type in phonetic English (`namaskaram`, `keralam`, `chithiram`) and receive instant Malayalam suggestions.
- **Direct Unicode Mode**: Toggle with one click to paste standard Malayalam Unicode text.
- **Smart Glyph Reordering Engine**: Handles complex Malayalam vowel prefixes (`െ`, `േ`, `ൈ`, `ൊ`, `ോ`, `ൌ`), conjuncts (`ക്ക`, `ത്ത`, `ന്ത`, `സ്റ്റ`), and chillus (`ൺ`, `ൻ`, `ർ`, `ൽ`, `ൾ`, `ൿ`).
- **1-Click Photoshop Text Insertion**:
  - Automatically centers the layer on your active canvas (`[width/2, height/2]`).
  - Sets size to **100pt**.
  - Styles the text with **`ML-TTIndulekhaHeavy`** (or any chosen ML font).
- **Layer Synchronizer**: Select any text layer in Photoshop and click **Update Layer** to replace its text in-place.

---

### 02. 🔄 Decode Tab (FML / ML-TT $\rightarrow$ Malayalam Unicode)
- **Read from Active Photoshop Layer**: Extracts the raw FML encoded characters from any selected Photoshop text layer with one click.
- **Reverse Transcoder**: Decodes legacy ASCII glyphs back into clean, searchable, and shareable **Malayalam Unicode**.
- **Instant Copy**: Copy decoded Unicode directly to your clipboard.

---

### 03. 🚀 Export Tab (Direct to Downloads)
- **1-Click PNG Export**: Exports the canvas as a high-resolution transparent PNG directly into your user **`Downloads`** folder (`~/Downloads`).
- **1-Click JPG Export**: Exports a crisp, print-ready JPG directly to your **`Downloads`** folder.

---

## 🎨 Supported Font Library

KuttiPencil-PS includes an intelligent font resolver that automatically connects to your installed legacy font library:

| Series | Supported Font Families |
| :--- | :--- |
| **⭐ Preferred Default** | `ML-TTIndulekhaHeavy` (BoldItalic, Regular) |
| **ML-TT Series** | `ML-TTThunchan`, `ML-TTVishu`, `ML-TTVisakham`, `ML-TTVinay`, `ML-TTAswathi`, `ML-TTNila`, `ML-TTChandrika`, `ML-TTBhavana`, `ML-TTGopika`, `ML-TTGuruvayur`, `ML-TTKaumudi`, `ML-TTNandini`, `ML-TTOnam`, `ML-TTRohini`, `ML-TTRavivarma`, `ML-TTSankara`, `ML-TTThiruvathira`, `ML-TTJyothy`, `ML-TTChithiraHeavy`, `ML-TTAshtamudiExBold` |
| **ML1-TT Series** | `ML1-TTIndulekha`, `ML1-TTAswathi`, `ML1-TTAmbili` |
| **FML Series** | `FML-Indulekha`, `FML-Akhila`, `FML-Thunchan`, `FML-Karthika`, `FML-Revathi` |
| **Scribe & Publishing** | `Scribe-ML-Badusha`, `ML-KV-Anamika`, `ML-KV-Ananya`, `M_Kairali`, `Indu No_1`, `Aruna`, `Indira`, `Manorama`, `Mathrubhumi` |

> [!NOTE]
> Modern Unicode Malayalam fonts (*Noto Sans Malayalam, Manjari, Gayathri*) are excluded from conversion as they use Unicode blocks rather than legacy ASCII glyph maps.

---

## ⚡ Installation Guide

### Option 1: Automated 1-Click Install (Windows)

1. **Clone or Download** the repository:
   ```bash
   git clone https://github.com/AbinVarghexe/kuttipencil-photoshop.git
   ```
2. Double-click **`enable-debug-mode.bat`** (enables CEP unsigned extension loading).
3. Double-click **`install-extension.bat`** (copies the extension into your Photoshop CEP folder).
4. Restart **Adobe Photoshop**.
5. Go to **`Window`** $\rightarrow$ **`Extensions (legacy)`** $\rightarrow$ **`Kutti Pencil`**.

---

### Option 2: Manual Installation

<details>
<summary><strong>Windows Instructions</strong> (Click to Expand)</summary>

1. Press <kbd>Win</kbd> + <kbd>R</kbd>, type `regedit`, and press <kbd>Enter</kbd>.
2. Navigate to `HKEY_CURRENT_USER\Software\Adobe\CSXS.9` (create key if missing).
3. Add a new **String Value (`REG_SZ`)** named `PlayerDebugMode` with value `1`. Repeat for `CSXS.10` through `CSXS.14`.
4. Copy the entire `kuttipencil` directory to:
   ```
   C:\Users\<YourUsername>\AppData\Roaming\Adobe\CEP\extensions\kuttipencil
   ```
5. Restart Photoshop and launch from **Window > Extensions (legacy) > Kutti Pencil**.

</details>

<details>
<summary><strong>macOS Instructions</strong> (Click to Expand)</summary>

1. Open **Terminal** and enable `PlayerDebugMode`:
   ```bash
   defaults write com.adobe.CSXS.9 PlayerDebugMode 1
   defaults write com.adobe.CSXS.10 PlayerDebugMode 1
   defaults write com.adobe.CSXS.11 PlayerDebugMode 1
   defaults write com.adobe.CSXS.12 PlayerDebugMode 1
   defaults write com.adobe.CSXS.13 PlayerDebugMode 1
   defaults write com.adobe.CSXS.14 PlayerDebugMode 1
   ```
2. Copy the `kuttipencil` folder into:
   ```bash
   ~/Library/Application Support/Adobe/CEP/extensions/kuttipencil
   ```
3. Restart Photoshop and launch from **Window > Extensions (legacy) > Kutti Pencil**.

</details>

---

## 🖥️ Usage Walkthrough

```
1. Open Canvas ──▶ 2. Type Manglish ──▶ 3. Click 'Insert to PS' ──▶ 4. Centered 100pt Layer Created!
   (Photoshop)       ("namaskaram")       (Red Action Button)           (ML-TTIndulekhaHeavy)
```

1. **Launch**: In Photoshop, open **Window > Extensions (legacy) > Kutti Pencil**.
2. **Type**: In the **Convert** tab, type `namaskaram` or `ente keralam`.
3. **Insert**: Click **`Insert to PS`**.
4. **Canvas Result**: A new text layer is created in the exact center of your active document, set to **100pt size**, and rendered in **ML-TTIndulekhaHeavy**!

---

## 🛠️ Repository Architecture

```
kuttipencil/
├── CSXS/
│   └── manifest.xml          # Extension metadata & Photoshop host CSXS 9.0-14.0 targets
├── css/
│   └── style.css             # Authentic Kuttipencil red & white brand design system
├── js/
│   ├── converter.js          # Unicode <-> FML transliteration & glyph reordering engine
│   ├── libs/
│   │   └── CSInterface.js    # Official Adobe CEP Host Bridge
│   └── main.js               # UI controller, 3-tab router, live word & character counters
├── jsx/
│   └── hostscript.jsx        # Photoshop ExtendScript backend (ActionManager & font scanner)
├── .debug                    # Chrome remote debugging configuration (Port 8088)
├── .gitignore                # Git ignore rules
├── LICENSE                   # MIT License
├── enable-debug-mode.bat     # Automated Windows PlayerDebugMode registry script
├── install-extension.bat    # Automated Windows CEP extension deployment script
├── index.html                # 3-Tab Kuttipencil Panel UI
└── README.md                 # Project documentation & installation guide
```

---

## ⚖️ Disclaimer & Attribution

- **Inspiration**: This project is an independent, community-driven open-source extension inspired by [kuttipencil.in](https://kuttipencil.in), created by **LEO Softwares / Sindhu PV** (Kozhikode, Kerala).
- **Trademarks**: "കുട്ടിപെൻസിൽ" and "Kuttipencil" are properties of their respective owners. This extension is not officially affiliated with LEO Softwares, but was built with profound respect for their contribution to Malayalam digital computing.

---

## 📄 License

This software is released under the **[MIT License](LICENSE)**.

<div align="center">
  <sub>Built with ❤️ for Malayalam Graphic Designers & Typographers.</sub>
</div>
