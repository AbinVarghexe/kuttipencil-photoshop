<div align="center">

<img src="assets/banner.svg" alt="KuttiPencil for Adobe Photoshop" width="100%"/>

<br/>

[![Version](https://img.shields.io/badge/Release-v1.0.0-DC2626?style=for-the-badge&logo=github)](https://github.com/AbinVarghexe/kuttipencil-photoshop/releases/tag/v1.0.0)
[![Photoshop](https://img.shields.io/badge/Adobe%20Photoshop-CC%202015%20--%202024%2B-31A8FF?style=for-the-badge&logo=adobephotoshop&logoColor=white)](#-system-requirements)
[![Platform](https://img.shields.io/badge/OS-Windows%20%7C%20macOS-475569?style=for-the-badge)](#-installation)
[![License](https://img.shields.io/badge/License-MIT-16A34A?style=for-the-badge)](LICENSE)
[![Inspired by](https://img.shields.io/badge/Inspired%20by-Kuttipencil.in-DC2626?style=for-the-badge&logo=google-chrome&logoColor=white)](https://kuttipencil.in)

<br/>

# 📦 Download v1.0.0 Release

### **[👉 Click Here to Download KuttiPencil-PS-v1.0.0.zip](https://github.com/AbinVarghexe/kuttipencil-photoshop/releases/download/v1.0.0/KuttiPencil-PS-v1.0.0.zip)**

*Includes 1-Click Automated Installers for both Windows and macOS.*

---

<p align="center">
  <strong>The Essential Malayalam Typography &amp; FML/ML-TT Font Converter Extension for Adobe Photoshop.</strong><br/>
  <em>Type in Manglish or Malayalam Unicode directly inside Photoshop and render legacy ML/FML fonts with one click.</em>
</p>

</div>

---

## ⚡ Quick 1-Click Installation Guide

Installing KuttiPencil is completely automated for both **Windows** and **macOS**:

### 🪟 For Windows Users

1. **Download and Extract**:
   - Download **[KuttiPencil-PS-v1.0.0.zip](https://github.com/AbinVarghexe/kuttipencil-photoshop/releases/download/v1.0.0/KuttiPencil-PS-v1.0.0.zip)** and extract the zip file.
2. **Run the Installer**:
   - Double-click **`install-windows.bat`**.
   - *(It will automatically configure Photoshop registry permissions and copy the extension to your Adobe CEP directory)*.
3. **Launch in Photoshop**:
   - Restart **Adobe Photoshop**.
   - Open **`Window`** $\rightarrow$ **`Extensions (legacy)`** $\rightarrow$ **`Kutti Pencil`**.

---

### 🍎 For macOS Users

1. **Download and Extract**:
   - Download **[KuttiPencil-PS-v1.0.0.zip](https://github.com/AbinVarghexe/kuttipencil-photoshop/releases/download/v1.0.0/KuttiPencil-PS-v1.0.0.zip)** and extract the folder.
2. **Run the Installer**:
   - Open **Terminal**, navigate to the extracted folder, and run:
     ```bash
     chmod +x install-mac.sh && ./install-mac.sh
     ```
   - *(Alternatively, right-click `install-mac.sh` and choose Open with Terminal)*.
3. **Launch in Photoshop**:
   - Restart **Adobe Photoshop**.
   - Open **`Window`** $\rightarrow$ **`Extensions (legacy)`** $\rightarrow$ **`Kutti Pencil`**.

---

## 📖 Overview

Standard Malayalam Unicode text (e.g. `മലയാളം`) cannot be rendered correctly when using classic Malayalam desktop publishing fonts (**ML-TT**, **FML**, **Scribe-ML**, **Indulekha**, **Thunchan**, **Vishu**, etc.) in Adobe Photoshop.

**KuttiPencil for Photoshop** is a native Adobe CEP Panel Extension inspired by [kuttipencil.in](https://kuttipencil.in). It bridges the gap between modern phonetic typing and legacy Malayalam typography, enabling designers to type in **Manglish** and generate **100pt centered text layers** styled with their preferred **ML-TT font** instantly!

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
| 🔤 **Manglish Transliteration** | Real-time phonetic Malayalam typing with interactive suggestion chips (`namaskaram` $\rightarrow$ `നമസ്കാരം`). |
| ⚡ **Direct Unicode Mode** | Paste standard Malayalam Unicode text for instant ASCII glyph conversion. |
| 🎯 **1-Click Centered Layer** | Spawns a text layer positioned at `[width/2, height/2]` at **100pt size** with **`ML-TTIndulekhaHeavy`** applied. |
| 🔄 **Layer Synchronizer** | Select any existing text layer on canvas and update its contents in-place. |
| 🔍 **Reverse Decode Mode** | Paste legacy FML/ML-TT text or read directly from a Photoshop layer to decode back to readable Unicode. |
| 📥 **Downloads Folder Export** | 1-Click transparent PNG and high-quality JPG export directly into your system `Downloads` folder. |
| 📊 **Real-time Statistics** | Live `Words: X` and `Characters: Y` counters matching the official Kuttipencil web utility. |

---

## 🗂️ 3-Tab Architecture

```
┌──────────────────────────┬──────────────────────────┬──────────────────────────┐
│       01. CONVERT        │        02. DECODE        │        03. EXPORT        │
├──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ • Manglish Transliterate │ • FML to Unicode Decode  │ • Quick PNG to Downloads │
│ • Direct Unicode Paste   │ • Read active PS Layer   │ • Quick JPG to Downloads │
│ • Target Font Selection  │ • Copy Decoded Unicode   │ • Zero Compression Loss  │
│ • Insert 100pt to PS     │                          │                          │
└──────────────────────────┴──────────────────────────┴──────────────────────────┘
```

---

## 🎨 Supported Font Library

KuttiPencil-PS automatically connects with your system's installed Malayalam fonts:

| Category | Supported Font Families |
| :--- | :--- |
| **⭐ Preferred Default** | `ML-TTIndulekhaHeavy` (BoldItalic, Regular) |
| **ML-TT Series** | `ML-TTThunchan`, `ML-TTVishu`, `ML-TTVisakham`, `ML-TTVinay`, `ML-TTAswathi`, `ML-TTNila`, `ML-TTChandrika`, `ML-TTBhavana`, `ML-TTGopika`, `ML-TTGuruvayur`, `ML-TTKaumudi`, `ML-TTNandini`, `ML-TTOnam`, `ML-TTRohini`, `ML-TTRavivarma`, `ML-TTSankara`, `ML-TTThiruvathira`, `ML-TTJyothy`, `ML-TTChithiraHeavy`, `ML-TTAshtamudiExBold` |
| **ML1-TT Series** | `ML1-TTIndulekha`, `ML1-TTAswathi`, `ML1-TTAmbili` |
| **FML Series** | `FML-Indulekha`, `FML-Akhila`, `FML-Thunchan`, `FML-Karthika`, `FML-Revathi` |
| **Publishing Series** | `Scribe-ML-Badusha`, `ML-KV-Anamika`, `ML-KV-Ananya`, `M_Kairali`, `Indu No_1`, `Aruna`, `Indira`, `Manorama`, `Mathrubhumi` |

> [!NOTE]
> Modern Unicode fonts (*Noto Sans Malayalam, Manjari, Gayathri*) are excluded from conversion as they use Unicode encoding rather than legacy ASCII glyph maps.

---

## 📁 Repository Structure

```
kuttipencil/
├── assets/
│   ├── banner.svg            # Official brand header banner
│   ├── ui-preview.svg        # Vector extension UI mockup
│   └── workflow.svg          # 3-step conversion pipeline diagram
├── CSXS/
│   └── manifest.xml          # Extension metadata & Photoshop CSXS target bundle
├── css/
│   └── style.css             # Authentic Kuttipencil web design stylesheet
├── js/
│   ├── converter.js          # Malayalam <-> FML engine + transliterator
│   ├── libs/
│   │   └── CSInterface.js    # Official Adobe CEP Host Bridge
│   └── main.js               # UI controller, 3-tab router, live counters
├── jsx/
│   └── hostscript.jsx        # Photoshop ExtendScript engine (ActionManager & font resolver)
├── .debug                    # Remote Chrome DevTools debug port (8088)
├── .gitignore                # Git ignore rules
├── LICENSE                   # MIT License
├── install-windows.bat       # Automated 1-click Windows installer
├── install-mac.sh           # Automated 1-click macOS installer
├── index.html                # 3-Tab Kuttipencil Panel UI
└── README.md                 # Complete documentation & usage guide
```

---

## ⚖️ Disclaimer & Attribution

- **Inspiration**: This project is an independent, open-source community extension inspired by [kuttipencil.in](https://kuttipencil.in), created by **LEO Softwares / Sindhu PV** (Kozhikode, Kerala).
- **Trademarks**: "കുട്ടിപെൻസിൽ" and "Kuttipencil" are properties of their respective owners. This extension is not officially affiliated with LEO Softwares, but was built with profound respect for their contribution to Malayalam digital computing.

---

## 📄 License

This project is licensed under the **[MIT License](LICENSE)**.

<div align="center">
  <sub>Built with ❤️ for Malayalam Graphic Designers &amp; Typographers.</sub>
</div>
