<div align="center">

<img src="assets/banner.svg" alt="KuttiPencil for Adobe Photoshop & Illustrator" width="100%"/>

<br/>

[![Version](https://img.shields.io/badge/Release-v1.1.0-DC2626?style=for-the-badge&logo=github)](https://github.com/AbinVarghexe/kuttipencil-photoshop/releases/tag/v1.1.0)
[![Photoshop](https://img.shields.io/badge/Adobe%20Photoshop-CC%202015%20--%202024%2B-31A8FF?style=for-the-badge&logo=adobephotoshop&logoColor=white)](#-supported-hosts)
[![Illustrator](https://img.shields.io/badge/Adobe%20Illustrator-CC%202015%20--%202024%2B-FF9A00?style=for-the-badge&logo=adobeillustrator&logoColor=white)](#-supported-hosts)
[![Platform](https://img.shields.io/badge/OS-Windows%20%7C%20macOS-475569?style=for-the-badge)](#-installation)
[![License](https://img.shields.io/badge/License-MIT-16A34A?style=for-the-badge)](LICENSE)

<br/>

# 📦 Download v1.1.0 Release

### **[👉 Click Here to Download KuttiPencil-v1.1.0.zip](https://github.com/AbinVarghexe/kuttipencil-photoshop/releases/download/v1.1.0/KuttiPencil-v1.1.0.zip)**

*Includes 1-Click Automated Installers for both Photoshop & Illustrator on Windows and macOS.*

---

<p align="center">
  <strong>The Essential Malayalam Typography &amp; FML/ML-TT Font Converter Extension for Adobe Photoshop &amp; Illustrator.</strong><br/>
  <em>Created &amp; Developed by <strong><a href="https://github.com/AbinVarghexe">Abin Varghese</a></strong></em><br/>
  <em>Type in Manglish or Malayalam Unicode directly inside Photoshop &amp; Illustrator and render legacy ML/FML fonts with one click.</em>
</p>

</div>

---

## ⚡ Quick 1-Click Installation Guide

Installing KuttiPencil automatically sets up the extension for **both Adobe Photoshop and Adobe Illustrator**:

### 🪟 For Windows Users

1. **Download and Extract**:
   - Download **[KuttiPencil-v1.1.0.zip](https://github.com/AbinVarghexe/kuttipencil-photoshop/releases/download/v1.1.0/KuttiPencil-v1.1.0.zip)** and extract the zip file.
2. **Run the Installer**:
   - Double-click **`install-windows.bat`**.
   - *(It will automatically configure Adobe registry permissions and copy the extension to your Adobe CEP directory)*.
3. **Launch**:
   - **In Photoshop**: Restart Photoshop $\rightarrow$ **`Window`** $\rightarrow$ **`Extensions (legacy)`** $\rightarrow$ **`Kutti Pencil`**.
   - **In Illustrator**: Restart Illustrator $\rightarrow$ **`Window`** $\rightarrow$ **`Extensions`** $\rightarrow$ **`Kutti Pencil`**.

---

### 🍎 For macOS Users

1. **Download and Extract**:
   - Download **[KuttiPencil-v1.1.0.zip](https://github.com/AbinVarghexe/kuttipencil-photoshop/releases/download/v1.1.0/KuttiPencil-v1.1.0.zip)** and extract the folder.
2. **Run the Installer**:
   - Open **Terminal**, navigate to the extracted folder, and run:
     ```bash
     chmod +x install-mac.sh && ./install-mac.sh
     ```
   - *(Alternatively, right-click `install-mac.sh` and choose Open with Terminal)*.
3. **Launch**:
   - **In Photoshop**: Restart Photoshop $\rightarrow$ **`Window`** $\rightarrow$ **`Extensions (legacy)`** $\rightarrow$ **`Kutti Pencil`**.
   - **In Illustrator**: Restart Illustrator $\rightarrow$ **`Window`** $\rightarrow$ **`Extensions`** $\rightarrow$ **`Kutti Pencil`**.

---

## 📖 Overview

Standard Malayalam Unicode text (e.g. `മലയാളം`) cannot be rendered correctly when using classic Malayalam desktop publishing fonts (**ML-TT**, **FML**, **Scribe-ML**, **Indulekha**, **Thunchan**, **Vishu**, etc.) in Adobe Photoshop and Adobe Illustrator.

**KuttiPencil** is a native Adobe CEP Panel Extension inspired by [kuttipencil.in](https://kuttipencil.in). It bridges the gap between modern phonetic typing and legacy Malayalam typography, enabling designers to type in **Manglish** and generate **100pt centered text layers / text frames** styled with their preferred **ML-TT font** instantly!

<br/>

<div align="center">
  <img src="assets/workflow.svg" alt="KuttiPencil Workflow" width="100%"/>
</div>

---

## 🖥️ Extension UI Preview

<div align="center">
  <img src="assets/ui-preview.svg" alt="KuttiPencil Extension UI Mockup" width="100%"/>
</div>

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🎨 **Dual Host Support** | Runs natively inside both **Adobe Photoshop** and **Adobe Illustrator** with auto-detection. |
| 🔤 **Manglish Transliteration** | Real-time phonetic Malayalam typing with interactive suggestion chips (`namaskaram` $\rightarrow$ `നമസ്കാരം`). |
| ⚡ **Direct Unicode Mode** | Paste standard Malayalam Unicode text for instant ASCII glyph conversion. |
| 🎯 **1-Click Centered Layer** | Spawns a text layer / frame centered on canvas or active artboard at **100pt size** with **`ML-TTIndulekhaHeavy`** applied. |
| 🔄 **Selection Synchronizer** | Select any text layer (Photoshop) or text frame (Illustrator) and update its contents in-place. |
| 🔍 **Reverse Decode Mode** | Paste legacy FML/ML-TT text or read directly from the active canvas selection to decode back to readable Unicode. |
| 📥 **Downloads Folder Export** | 1-Click transparent PNG-24 and high-quality JPG export directly into your system `Downloads` folder. |
| 📊 **Real-time Statistics** | Live `Words: X` and `Characters: Y` counters matching the official Kuttipencil web utility. |

---

## 🗂️ 3-Tab Architecture

```
┌──────────────────────────┬──────────────────────────┬──────────────────────────┐
│       01. CONVERT        │        02. DECODE        │        03. EXPORT        │
├──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ • Manglish Transliterate │ • FML to Unicode Decode  │ • Quick PNG to Downloads │
│ • Direct Unicode Paste   │ • Read active Selection  │ • Quick JPG to Downloads │
│ • Target Font Selection  │ • Copy Decoded Unicode   │ • Zero Compression Loss  │
│ • Insert 100pt to Canvas │                          │                          │
└──────────────────────────┴──────────────────────────┴──────────────────────────┘
```

---

## 🎨 Supported Font Library

KuttiPencil automatically connects with your system's installed Malayalam fonts in both Photoshop and Illustrator:

| Category | Supported Font Families |
| :--- | :--- |
| **⭐ Preferred Default** | `ML-TTIndulekhaHeavy` (BoldItalic, Regular) |
| **ML-TT Series** | `ML-TTThunchan`, `ML-TTVishu`, `ML-TTVisakham`, `ML-TTVinay`, `ML-TTAswathi`, `ML-TTNila`, `ML-TTChandrika`, `ML-TTBhavana`, `ML-TTGopika`, `ML-TTGuruvayur`, `ML-TTKaumudi`, `ML-TTNandini`, `ML-TTOnam`, `ML-TTRohini`, `ML-TTRavivarma`, `ML-TTSankara`, `ML-TTThiruvathira`, `ML-TTJyothy`, `ML-TTChithiraHeavy`, `ML-TTAshtamudiExBold` |
| **ML1-TT Series** | `ML1-TTIndulekha`, `ML1-TTAswathi`, `ML1-TTAmbili` |
| **FML Series** | `FML-Indulekha`, `FML-Akhila`, `FML-Thunchan`, `FML-Karthika`, `FML-Revathi` |
| **Publishing Series** | `Scribe-ML-Badusha`, `ML-KV-Anamika`, `ML-KV-Ananya`, `M_Kairali`, `Indu No_1`, `Aruna`, `Indira`, `Manorama`, `Mathrubhumi` |

---

## 📁 Repository Structure

```
kuttipencil/
├── assets/
│   ├── banner.svg            # Brand header banner (Photoshop & Illustrator)
│   ├── icon.png              # High-resolution 256x256 app icon
│   ├── icons/                # Photoshop & Illustrator panel tab & dock icons
│   ├── ui-preview.svg        # Vector extension UI mockup
│   └── workflow.svg          # 3-step conversion pipeline diagram
├── CSXS/
│   └── manifest.xml          # Extension metadata & Host targeting (PHSP, PHXS, ILST)
├── css/
│   └── style.css             # Authentic Kuttipencil web design stylesheet
├── js/
│   ├── converter.js          # Malayalam <-> FML engine + transliterator
│   ├── libs/
│   │   └── CSInterface.js    # Official Adobe CEP Host Bridge
│   └── main.js               # UI controller, dual-host awareness, live counters
├── jsx/
│   └── hostscript.jsx        # Unified Photoshop & Illustrator ExtendScript engine
├── .debug                    # Remote Chrome DevTools debug port (8088)
├── .gitignore                # Git ignore rules
├── LICENSE                   # MIT License
├── install-windows.bat       # Automated 1-click Windows installer (PS & AI)
├── install-mac.sh           # Automated 1-click macOS installer (PS & AI)
├── index.html                # 3-Tab Kuttipencil Panel UI
└── README.md                 # Complete documentation & usage guide
```

---

## 👨‍💻 Author & Creator

This Adobe Photoshop & Illustrator Extension was designed, developed, and engineered by:

**Abin Varghese**
- **GitHub**: [@AbinVarghexe](https://github.com/AbinVarghexe)
- **Repository**: [kuttipencil-photoshop](https://github.com/AbinVarghexe/kuttipencil-photoshop)

---

## ⚖️ Credits & Inspiration

- **Extension Developer**: **Abin Varghese** built and open-sourced this native Photoshop & Illustrator plugin.
- **Inspiration**: The typing utility and conversion concept was inspired by the online web utility [kuttipencil.in](https://kuttipencil.in) (developed by LEO Softwares / Sindhu PV). We express our gratitude for their pioneering work in Malayalam web typing.
- **Trademarks**: "കുട്ടിപെൻസിൽ" and "Kuttipencil" brand names are properties of their respective owners.

---

## 📄 License

This project is licensed under the **[MIT License](LICENSE)**.

<div align="center">
  <sub>Created with ❤️ by <strong>Abin Varghese</strong> for Malayalam Graphic Designers &amp; Typographers.</sub>
</div>
