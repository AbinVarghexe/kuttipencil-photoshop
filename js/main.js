/**
 * Kutti Pencil - Authentic Web-aligned Controller (3-Tab Architecture)
 * Malayalam to FML / ML-TT Converter & Photoshop Integration
 */

(function () {
    'use strict';

    var csInterface = new CSInterface();

    // Mode State
    var isManglishMode = true;

    // DOM Elements - Header & Status
    var statusText = document.getElementById('status-text');
    var countWords = document.getElementById('count-words');
    var countChars = document.getElementById('count-chars');

    // Navigation Tabs
    var tabBtns = document.querySelectorAll('.kp-tab-btn');
    var tabPanes = document.querySelectorAll('.kp-tab-pane');

    // DOM Elements - Tab 1: Convert
    var modeManglishRadio = document.getElementById('mode-manglish');
    var modeUnicodeRadio = document.getElementById('mode-unicode');
    var fontSelect = document.getElementById('font-select');
    var btnRefreshFonts = document.getElementById('btn-refresh-fonts');

    var inputText = document.getElementById('input-text');
    var outputFml = document.getElementById('output-fml');
    var copyFeedback = document.getElementById('copy-feedback');
    var suggestionBar = document.getElementById('suggestion-bar');
    var suggestTags = [
        document.getElementById('suggest-1'),
        document.getElementById('suggest-2'),
        document.getElementById('suggest-3')
    ];

    var btnClearInput = document.getElementById('btn-clear-input');
    var btnCopyFml = document.getElementById('btn-copy-fml');
    var btnInsertLayer = document.getElementById('btn-insert-layer');
    var btnUpdateLayer = document.getElementById('btn-update-layer');

    // DOM Elements - Tab 2: Decode
    var reverseInput = document.getElementById('reverse-input');
    var reverseOutput = document.getElementById('reverse-output');
    var btnReadPsLayer = document.getElementById('btn-read-ps-layer');
    var btnCopyUnicode = document.getElementById('btn-copy-unicode');

    // DOM Elements - Tab 3: Export
    var btnExportPngTab = document.getElementById('btn-export-png-tab');
    var btnExportJpgTab = document.getElementById('btn-export-jpg-tab');

    /**
     * Update Status Bar
     */
    function updateStatus(message, isError) {
        if (statusText) {
            statusText.textContent = message;
            statusText.style.color = isError ? "#dc2626" : "#64748b";
        }
    }

    /**
     * Update Word and Character Counts (Matches Kuttipencil.in)
     */
    function updateCounts(text) {
        var len = text ? text.length : 0;
        var words = text && text.trim() ? text.trim().split(/\s+/).length : 0;

        if (countChars) countChars.textContent = len;
        if (countWords) countWords.textContent = words;
    }

    /**
     * Safe Bridge Call to ExtendScript using URI encoding
     */
    function callHost(fnName, args, callback) {
        var encodedArgs = (args || []).map(function (arg) {
            return '"' + encodeURIComponent(arg === undefined || arg === null ? "" : String(arg)) + '"';
        }).join(", ");

        var script = fnName + "_URI(" + encodedArgs + ")";

        csInterface.evalScript(script, function (res) {
            if (res === "EvalScript error.") {
                console.error("ExtendScript eval error for: " + script);
                if (callback) callback({ success: false, message: "Photoshop ExtendScript error." });
                return;
            }
            try {
                var data = JSON.parse(res);
                if (callback) callback(data);
            } catch (e) {
                if (callback) callback({ success: true, message: res });
            }
        });
    }

    /**
     * Copy text to clipboard with feedback
     */
    function copyToClipboard(text, successMessage) {
        if (!text || text.trim() === '') {
            updateStatus("Nothing to copy!", true);
            return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                showCopySuccess(successMessage);
            }).catch(function () {
                fallbackCopy(text, successMessage);
            });
        } else {
            fallbackCopy(text, successMessage);
        }
    }

    function showCopySuccess(msg) {
        updateStatus(msg || "Copied to clipboard!", false);
        if (copyFeedback) {
            copyFeedback.textContent = "Copied!";
            copyFeedback.style.color = "#16a34a";
            setTimeout(function () {
                copyFeedback.textContent = "Click to Copy";
                copyFeedback.style.color = "#dc2626";
            }, 1800);
        }
    }

    function fallbackCopy(text, successMessage) {
        var tempInput = document.createElement("textarea");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand("copy");
            showCopySuccess(successMessage);
        } catch (e) {
            updateStatus("Copy failed.", true);
        }
        document.body.removeChild(tempInput);
    }

    /**
     * Tab Navigation Handlers
     */
    function setupTabs() {
        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetId = this.getAttribute('data-tab');

                tabBtns.forEach(function (b) { b.classList.remove('active'); });
                tabPanes.forEach(function (p) { p.classList.remove('active'); });

                this.classList.add('active');
                var targetPane = document.getElementById(targetId);
                if (targetPane) targetPane.classList.add('active');
            });
        });
    }

    /**
     * Scan and populate installed ML/FML fonts
     */
    function scanPhotoshopFonts() {
        csInterface.evalScript("kuttipencil_getAvailableMLFonts()", function (res) {
            try {
                var data = JSON.parse(res);
                var savedFont = localStorage.getItem('kuttipencil_selected_font') || "auto";

                if (data.success) {
                    fontSelect.innerHTML = '<option value="auto">ML-TTIndulekhaHeavy (Default)</option>';

                    var mlList = data.mlFonts || [];
                    if (mlList.length > 0) {
                        mlList.forEach(function (f) {
                            var opt = document.createElement('option');
                            opt.value = f.postScriptName;
                            opt.textContent = (f.isPreferred ? "★ " : "") + f.family + (f.style ? " (" + f.style + ")" : "");
                            fontSelect.appendChild(opt);
                        });
                        updateStatus("Loaded " + mlList.length + " ML fonts", false);
                    }

                    if (savedFont && savedFont !== "auto") {
                        fontSelect.value = savedFont;
                    }
                }
            } catch (e) {}
        });
    }

    /**
     * Handle Live Translation and Conversion
     */
    var transliterateTimer = null;

    function processConversion() {
        var raw = inputText.value;
        updateCounts(raw);

        if (!raw || raw.trim() === '') {
            outputFml.value = "";
            if (suggestionBar) suggestionBar.style.display = "none";
            return;
        }

        if (isManglishMode) {
            // 1. Instant offline transliteration
            var instantMalayalam = KuttiConverter.offlineTransliterate(raw);
            outputFml.value = KuttiConverter.unicodeToFML(instantMalayalam);

            // 2. Fetch enhanced suggestions via Google API
            clearTimeout(transliterateTimer);
            transliterateTimer = setTimeout(function () {
                KuttiConverter.transliterateManglish(raw, function (mlText, suggestions) {
                    outputFml.value = KuttiConverter.unicodeToFML(mlText);

                    if (suggestions && suggestions.length > 1 && suggestionBar) {
                        suggestionBar.style.display = "flex";
                        suggestTags.forEach(function (tag, idx) {
                            if (suggestions[idx]) {
                                tag.textContent = suggestions[idx];
                                tag.style.display = "inline-block";
                                tag.onclick = function () {
                                    outputFml.value = KuttiConverter.unicodeToFML(suggestions[idx]);
                                    suggestionBar.style.display = "none";
                                };
                            } else {
                                tag.style.display = "none";
                            }
                        });
                    } else if (suggestionBar) {
                        suggestionBar.style.display = "none";
                    }
                });
            }, 250);
        } else {
            if (suggestionBar) suggestionBar.style.display = "none";
            outputFml.value = KuttiConverter.unicodeToFML(raw);
        }
    }

    /**
     * Mode Toggle Setup
     */
    function setupModeToggle() {
        if (modeManglishRadio && modeUnicodeRadio) {
            modeManglishRadio.addEventListener('change', function () {
                if (this.checked) {
                    isManglishMode = true;
                    inputText.placeholder = "ഇവിടെ മലയാളത്തിൽ ടൈപ്പ് ചെയ്യുക (Type in Manglish e.g. namaskaram)...";
                    processConversion();
                }
            });

            modeUnicodeRadio.addEventListener('change', function () {
                if (this.checked) {
                    isManglishMode = false;
                    inputText.placeholder = "മലയാളം യൂണികോഡ് ടെക്സ്റ്റ് ഇവിടെ പേസ്റ്റ് ചെയ്യുക (Paste Unicode)...";
                    if (suggestionBar) suggestionBar.style.display = "none";
                    processConversion();
                }
            });
        }
    }

    /**
     * Hook Input and Button Events
     */
    function setupEvents() {
        // Tab 1: Convert Events
        if (inputText) {
            inputText.addEventListener('input', processConversion);
        }

        if (btnClearInput) {
            btnClearInput.addEventListener('click', function () {
                inputText.value = "";
                outputFml.value = "";
                updateCounts("");
                if (suggestionBar) suggestionBar.style.display = "none";
                updateStatus("Cleared text", false);
            });
        }

        if (btnCopyFml) {
            btnCopyFml.addEventListener('click', function () {
                copyToClipboard(outputFml.value, "FML code copied!");
            });
        }

        if (copyFeedback) {
            copyFeedback.addEventListener('click', function () {
                copyToClipboard(outputFml.value, "FML code copied!");
            });
        }

        // Insert new Text Layer in Photoshop
        if (btnInsertLayer) {
            btnInsertLayer.addEventListener('click', function () {
                var fml = outputFml.value;
                if (!fml || fml.trim() === '') {
                    if (inputText.value.trim() !== '') {
                        var ml = isManglishMode ? KuttiConverter.offlineTransliterate(inputText.value) : inputText.value;
                        fml = KuttiConverter.unicodeToFML(ml);
                        outputFml.value = fml;
                    }
                }

                if (!fml || fml.trim() === '') {
                    updateStatus("Type some text first to insert!", true);
                    return;
                }

                var selectedFont = fontSelect ? fontSelect.value : "auto";
                updateStatus("Inserting text layer...", false);

                callHost("kuttipencil_insertTextLayer", [fml, selectedFont], function (res) {
                    if (res && res.success) {
                        updateStatus(res.message || "Created text layer!", false);
                    } else {
                        updateStatus((res && res.message) || "Failed to create text layer.", true);
                    }
                });
            });
        }

        // Update active Text Layer in Photoshop
        if (btnUpdateLayer) {
            btnUpdateLayer.addEventListener('click', function () {
                var fml = outputFml.value;
                if (!fml || fml.trim() === '') {
                    if (inputText.value.trim() !== '') {
                        var ml = isManglishMode ? KuttiConverter.offlineTransliterate(inputText.value) : inputText.value;
                        fml = KuttiConverter.unicodeToFML(ml);
                        outputFml.value = fml;
                    }
                }

                if (!fml || fml.trim() === '') {
                    updateStatus("No text to update!", true);
                    return;
                }

                var selectedFont = fontSelect ? fontSelect.value : "auto";
                updateStatus("Updating text layer...", false);

                callHost("kuttipencil_updateActiveTextLayer", [fml, selectedFont], function (res) {
                    if (res && res.success) {
                        updateStatus(res.message || "Updated text layer!", false);
                    } else {
                        updateStatus((res && res.message) || "Failed to update layer.", true);
                    }
                });
            });
        }

        // Tab 2: Decode Events
        if (reverseInput) {
            reverseInput.addEventListener('input', function () {
                var val = reverseInput.value;
                reverseOutput.value = KuttiConverter.fmlToUnicode(val);
            });
        }

        if (btnCopyUnicode) {
            btnCopyUnicode.addEventListener('click', function () {
                copyToClipboard(reverseOutput.value, "Malayalam Unicode copied!");
            });
        }

        if (btnReadPsLayer) {
            btnReadPsLayer.addEventListener('click', function () {
                updateStatus("Reading active text layer...", false);
                csInterface.evalScript('kuttipencil_getActiveTextLayerContent()', function (res) {
                    try {
                        var data = JSON.parse(res);
                        if (data.success && data.text) {
                            reverseInput.value = data.text;
                            reverseOutput.value = KuttiConverter.fmlToUnicode(data.text);
                            updateStatus("Read layer content!", false);
                        } else {
                            updateStatus(data.message || "Selected layer has no text", true);
                        }
                    } catch (e) {
                        updateStatus("Could not read text layer", true);
                    }
                });
            });
        }

        // Tab 3: Export Events
        if (btnExportPngTab) {
            btnExportPngTab.addEventListener('click', function () {
                updateStatus("Exporting PNG to Downloads...", false);
                csInterface.evalScript("kuttipencil_quickExport('png')", function (res) {
                    try {
                        var data = JSON.parse(res);
                        updateStatus(data.message, !data.success);
                    } catch (e) {
                        updateStatus("Exported PNG to Downloads folder", false);
                    }
                });
            });
        }

        if (btnExportJpgTab) {
            btnExportJpgTab.addEventListener('click', function () {
                updateStatus("Exporting JPG to Downloads...", false);
                csInterface.evalScript("kuttipencil_quickExport('jpg')", function (res) {
                    try {
                        var data = JSON.parse(res);
                        updateStatus(data.message, !data.success);
                    } catch (e) {
                        updateStatus("Exported JPG to Downloads folder", false);
                    }
                });
            });
        }

        // Font Select Changes
        if (fontSelect) {
            fontSelect.addEventListener('change', function () {
                localStorage.setItem('kuttipencil_selected_font', fontSelect.value);
                updateStatus("Target font: " + (fontSelect.options[fontSelect.selectedIndex] ? fontSelect.options[fontSelect.selectedIndex].text : fontSelect.value), false);
            });
        }

        if (btnRefreshFonts) {
            btnRefreshFonts.addEventListener('click', function () {
                updateStatus("Refreshing font library...", false);
                scanPhotoshopFonts();
            });
        }
    }

    /**
     * Initialization
     */
    function init() {
        var hostEnv = csInterface.getHostEnvironment();
        var appId = hostEnv ? hostEnv.appId : "";
        var isIllustrator = (appId === "ILST");

        if (btnInsertLayer) {
            var btnLabel = btnInsertLayer.querySelector('span:not(.kp-icon)');
            if (btnLabel) {
                btnLabel.textContent = isIllustrator ? "Insert to AI" : "Insert to PS";
            }
        }

        setupTabs();
        setupModeToggle();
        setupEvents();
        scanPhotoshopFonts();
        updateCounts("");
        updateStatus(isIllustrator ? "Illustrator Ready" : "Photoshop Ready", false);
    }

    window.addEventListener('DOMContentLoaded', init);

})();
