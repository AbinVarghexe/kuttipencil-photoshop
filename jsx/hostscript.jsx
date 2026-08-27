/**
 * Kutti Pencil - ExtendScript Host Engine
 * Direct Centered Text Layer Creation (100pt+) & ML-TTIndulekhaHeavy Priority Engine
 */

#target photoshop

var JSON = JSON || {};
if (typeof JSON.stringify !== 'function') {
    JSON.stringify = function (obj) {
        var t = typeof (obj);
        if (t !== "object" || obj === null) {
            if (t === "string") return '"' + obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
            return String(obj);
        }
        var json = [];
        var isArr = (obj && obj.constructor === Array);
        for (var n in obj) {
            if (obj.hasOwnProperty(n)) {
                var v = obj[n];
                t = typeof (v);
                if (t === "function") continue;
                if (t === "string") v = '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
                else if (t === "object" && v !== null) v = JSON.stringify(v);
                json.push((isArr ? "" : '"' + n + '":') + String(v));
            }
        }
        return (isArr ? "[" : "{") + String(json) + (isArr ? "]" : "}");
    };
}

var PREFERRED_FONT_REGEX = /indulekha.*heavy|indulekhaheavy|ml.*indulekha.*heavy/i;
var STRICT_ML_FONT_REGEX = /ml1-tt|ml-tt|mltt|ml-kv|ml-|fml|thunchan|indulekha|vishu|visakham|vinay|aswathi|aswathy|ambili|nila|chandrika|bhavana|gopika|guruvayur|kaumudi|nandini|onam|rohini|ravivarma|sankara|thiruvathira|jyothy|chithira|ashtamudi|kairali|anamika|ananya|aruna|indira|karthika|badusha|scribe-ml/i;
var UNICODE_EXCLUDE_REGEX = /noto|sans|unicode|manjari|gayathri|chilanka|anjali|rachana|meera|dyuthi|keraleeyam|uroob/i;

function isLegacyMLFont(psName, family) {
    if (UNICODE_EXCLUDE_REGEX.test(psName) || UNICODE_EXCLUDE_REGEX.test(family)) {
        return false;
    }
    return STRICT_ML_FONT_REGEX.test(psName) || STRICT_ML_FONT_REGEX.test(family);
}

/**
 * Scan Photoshop for all installed legacy ML/FML fonts
 */
function kuttipencil_getAvailableMLFonts() {
    try {
        var preferredFonts = [];
        var otherMLFonts = [];
        var seen = {};

        for (var i = 0; i < app.fonts.length; i++) {
            var f = app.fonts[i];
            var psName = f.postScriptName || f.name || "";
            var family = f.family || "";
            var style = f.style || "";

            if (isLegacyMLFont(psName, family)) {
                if (!seen[psName]) {
                    seen[psName] = true;
                    var isPref = PREFERRED_FONT_REGEX.test(psName) || PREFERRED_FONT_REGEX.test(family);
                    var item = {
                        postScriptName: psName,
                        family: family,
                        style: style,
                        isPreferred: isPref
                    };

                    if (isPref) {
                        preferredFonts.push(item);
                    } else {
                        otherMLFonts.push(item);
                    }
                }
            }
        }

        var combined = preferredFonts.concat(otherMLFonts);
        return JSON.stringify({
            success: true,
            mlFonts: combined,
            hasPreferred: preferredFonts.length > 0,
            totalSystemFonts: app.fonts.length
        });
    } catch (e) {
        return JSON.stringify({ success: false, mlFonts: [], message: e.toString() });
    }
}

/**
 * Find exact matching font object from app.fonts
 */
function getMatchingFontObject(requestedFont) {
    // 1. If explicit font requested by user, find it in app.fonts
    if (requestedFont && requestedFont !== "" && requestedFont !== "auto") {
        for (var i = 0; i < app.fonts.length; i++) {
            var fReq = app.fonts[i];
            var psReq = fReq.postScriptName || fReq.name || "";
            if (psReq === requestedFont || fReq.family === requestedFont || fReq.name === requestedFont) {
                return fReq;
            }
        }
    }

    // 2. High Priority #1: ML-TTIndulekhaHeavy
    for (var p = 0; p < app.fonts.length; p++) {
        var fPref = app.fonts[p];
        var psPref = fPref.postScriptName || fPref.name || "";
        var famPref = fPref.family || "";
        if (!UNICODE_EXCLUDE_REGEX.test(psPref) && !UNICODE_EXCLUDE_REGEX.test(famPref)) {
            if (PREFERRED_FONT_REGEX.test(psPref) || PREFERRED_FONT_REGEX.test(famPref)) {
                return fPref;
            }
        }
    }

    // Direct name checks for ML-TTIndulekhaHeavy
    var heavyNames = [
        "ML-TTIndulekhaHeavy-BoldItalic", "ML-TTIndulekhaHeavy", "ML-IndulekhaHeavy-vy BoldItalic",
        "ML-IndulekhaHeavy", "ML_TT_Indulekha_HeavyBold"
    ];
    for (var h = 0; h < heavyNames.length; h++) {
        try {
            var testH = app.fonts.getByName(heavyNames[h]);
            if (testH) return testH;
        } catch (eH) {}
    }

    // 3. Fallback: Any random font under the ML-series
    var mlPool = [];
    for (var j = 0; j < app.fonts.length; j++) {
        var fML = app.fonts[j];
        var psML = fML.postScriptName || fML.name || "";
        var famML = fML.family || "";
        if (isLegacyMLFont(psML, famML)) {
            mlPool.push(fML);
        }
    }

    if (mlPool.length > 0) {
        // Pick one from installed ML series
        return mlPool[0];
    }

    // 4. Common fallback
    try {
        var fallbackIndulekha = app.fonts.getByName("ML-TTIndulekha-BoldItalic");
        if (fallbackIndulekha) return fallbackIndulekha;
    } catch (eI) {}

    return null;
}

/**
 * Ensure an active document exists
 */
function ensureDocument() {
    if (app.documents.length === 0) {
        app.documents.add(1920, 1080, 72, "Kutti Pencil Canvas", NewDocumentMode.RGB, DocumentFill.WHITE);
    }
    return app.activeDocument;
}

/**
 * Style text layer via ActionManager: Center align + ML Font + 100pt size
 */
function applyStyleViaActionManager(fontPostScriptName, fontStyleName, fontSizePt, textLen) {
    try {
        var idset = charIDToTypeID("setd");
        var desc = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("TxLr"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        desc.putReference(idnull, ref);

        var textDesc = new ActionDescriptor();

        // 1. Paragraph style: Center Alignment
        var pList = new ActionList();
        var pRange = new ActionDescriptor();
        pRange.putInteger(charIDToTypeID("From"), 0);
        pRange.putInteger(charIDToTypeID("T   "), textLen || 9999);
        var pStyle = new ActionDescriptor();
        pStyle.putEnumerated(charIDToTypeID("Algn"), charIDToTypeID("AlgN"), charIDToTypeID("Cntr"));
        pRange.putObject(charIDToTypeID("ParagraphSheet"), charIDToTypeID("ParagraphSheet"), pStyle);
        pList.putObject(charIDToTypeID("ParagraphSheet"), pRange);
        textDesc.putList(charIDToTypeID("ParagraphSheet"), pList);

        // 2. Character style: Font + 100pt Font Size
        var styleList = new ActionList();
        var rangeDesc = new ActionDescriptor();
        rangeDesc.putInteger(charIDToTypeID("From"), 0);
        rangeDesc.putInteger(charIDToTypeID("T   "), textLen || 9999);

        var styleDesc = new ActionDescriptor();
        if (fontPostScriptName && fontPostScriptName !== "") {
            styleDesc.putString(charIDToTypeID("FntN"), fontPostScriptName);
            styleDesc.putString(charIDToTypeID("FntS"), fontStyleName || "BoldItalic");
        }
        styleDesc.putUnitDouble(charIDToTypeID("Sz  "), charIDToTypeID("#Pnt"), fontSizePt || 100.0);

        rangeDesc.putObject(charIDToTypeID("TxtS"), charIDToTypeID("TxtS"), styleDesc);
        styleList.putObject(charIDToTypeID("Txtt"), rangeDesc);
        textDesc.putList(charIDToTypeID("Txtt"), styleList);

        desc.putObject(charIDToTypeID("T   "), charIDToTypeID("TxLr"), textDesc);
        executeAction(idset, desc, DialogModes.NO);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Insert new Text Layer in Photoshop: Centered, 100px size, ML Font
 */
function kuttipencil_insertTextLayer(text, fontName) {
    try {
        if (!text || text === "") {
            return JSON.stringify({ success: false, message: "Input is empty." });
        }

        var doc = ensureDocument();
        var docWidth = doc.width.as('px');
        var docHeight = doc.height.as('px');

        // Create new text layer
        var textLayer = doc.artLayers.add();
        textLayer.kind = LayerKind.TEXT;
        textLayer.name = "Kutti: " + (text.length > 12 ? text.substring(0, 12) + "..." : text);

        var textItem = textLayer.textItem;

        // 1. Center alignment & Center position
        textItem.justification = Justification.CENTER;
        textItem.position = [new UnitValue(docWidth / 2, 'px'), new UnitValue(docHeight / 2, 'px')];

        // 2. Set contents & Font size (100pt)
        textItem.contents = text;
        var targetFontSize = 100;
        textItem.size = new UnitValue(targetFontSize, 'pt');

        // 3. Find ML Font Object from user library (Prioritizing ML-TTIndulekhaHeavy)
        var fontObj = getMatchingFontObject(fontName);
        var appliedFontName = "ML-TTIndulekhaHeavy-BoldItalic";
        var appliedFontStyle = "BoldItalic";

        if (fontObj) {
            appliedFontName = fontObj.postScriptName || fontObj.name;
            appliedFontStyle = fontObj.style || "BoldItalic";

            try {
                textItem.font = appliedFontName;
            } catch (errDOM) {}
        }

        // Apply via ActionManager (Guarantees Centering + ML-TTIndulekhaHeavy + 100pt Size)
        applyStyleViaActionManager(appliedFontName, appliedFontStyle, targetFontSize, text.length);

        return JSON.stringify({
            success: true,
            message: "Created @ 100pt with font: " + appliedFontName,
            fontName: appliedFontName
        });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}

/**
 * Update selected active text layer contents, center it, and set font to 100pt ML Font
 */
function kuttipencil_updateActiveTextLayer(text, fontName) {
    try {
        if (app.documents.length === 0) {
            return JSON.stringify({ success: false, message: "No active document." });
        }
        var doc = app.activeDocument;
        var activeLayer = doc.activeLayer;

        if (!activeLayer || activeLayer.kind !== LayerKind.TEXT) {
            return JSON.stringify({ success: false, message: "Selected layer is not a Text Layer." });
        }

        var textItem = activeLayer.textItem;
        textItem.contents = text;
        textItem.justification = Justification.CENTER;

        var docWidth = doc.width.as('px');
        var docHeight = doc.height.as('px');
        textItem.position = [new UnitValue(docWidth / 2, 'px'), new UnitValue(docHeight / 2, 'px')];

        var targetFontSize = 100;
        textItem.size = new UnitValue(targetFontSize, 'pt');

        var fontObj = getMatchingFontObject(fontName);
        var appliedFontName = "";
        var appliedFontStyle = "BoldItalic";

        if (fontObj) {
            appliedFontName = fontObj.postScriptName || fontObj.name;
            appliedFontStyle = fontObj.style || "BoldItalic";
            try {
                textItem.font = appliedFontName;
            } catch (errDOM) {}
        }

        applyStyleViaActionManager(appliedFontName, appliedFontStyle, targetFontSize, text.length);

        return JSON.stringify({
            success: true,
            message: "Updated @ 100pt with: " + (appliedFontName || "ML font"),
            fontName: appliedFontName
        });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}

/**
 * URI Decoded Bridge Handlers (100% Fail-Safe)
 */
function kuttipencil_insertTextLayer_URI(encodedText, encodedFont) {
    var text = decodeURIComponent(encodedText);
    var fontName = decodeURIComponent(encodedFont);
    return kuttipencil_insertTextLayer(text, fontName);
}

function kuttipencil_updateActiveTextLayer_URI(encodedText, encodedFont) {
    var text = decodeURIComponent(encodedText);
    var fontName = decodeURIComponent(encodedFont);
    return kuttipencil_updateActiveTextLayer(text, fontName);
}

/**
 * Get active text layer contents
 */
function kuttipencil_getActiveTextLayerContent() {
    try {
        if (app.documents.length === 0) {
            return JSON.stringify({ success: false, message: "No active document." });
        }
        var doc = app.activeDocument;
        var activeLayer = doc.activeLayer;

        if (!activeLayer || activeLayer.kind !== LayerKind.TEXT) {
            return JSON.stringify({ success: false, message: "Selected layer is not a Text Layer." });
        }

        return JSON.stringify({
            success: true,
            text: activeLayer.textItem.contents,
            font: activeLayer.textItem.font
        });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}

function getDownloadsFolder() {
    var dlFolder = new Folder("~/Downloads");
    if (dlFolder.exists) return dlFolder;

    var userProfile = $.getenv("USERPROFILE");
    if (userProfile) {
        var pFolder = new Folder(userProfile + "/Downloads");
        if (pFolder.exists) return pFolder;
    }

    return Folder.desktop;
}

/**
 * Quick Export to Downloads
 */
function kuttipencil_quickExport(format) {
    try {
        if (app.documents.length === 0) {
            return JSON.stringify({ success: false, message: "No active document." });
        }
        var doc = app.activeDocument;
        var saveFolder = getDownloadsFolder();
        var baseName = doc.name.replace(/\.[^\.]+$/, "");

        if (format === "png") {
            var pngFile = new File(saveFolder + "/" + baseName + "_export.png");
            var pngOptions = new ExportOptionsSaveForWeb();
            pngOptions.format = SaveDocumentType.PNG;
            pngOptions.PNG8 = false;
            pngOptions.transparency = true;
            pngOptions.interlaced = false;
            pngOptions.includeProfile = false;
            doc.exportDocument(pngFile, ExportType.SAVEFORWEB, pngOptions);
            return JSON.stringify({ success: true, message: "Exported PNG to Downloads folder" });
        } else if (format === "jpg") {
            var jpgFile = new File(saveFolder + "/" + baseName + "_export.jpg");
            var jpgOptions = new JPEGSaveOptions();
            jpgOptions.quality = 10;
            jpgOptions.embedColorProfile = true;
            doc.saveAs(jpgFile, jpgOptions, true, Extension.LOWERCASE);
            return JSON.stringify({ success: true, message: "Exported JPG to Downloads folder" });
        }

        return JSON.stringify({ success: false, message: "Unknown format: " + format });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}
