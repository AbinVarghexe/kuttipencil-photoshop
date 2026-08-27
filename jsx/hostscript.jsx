/**
 * Kutti Pencil - Universal ExtendScript Host Engine
 * Unified Support for Adobe Photoshop (PHSP) and Adobe Illustrator (ILST)
 * Direct Centered Text Creation (100pt) & ML-TTIndulekhaHeavy Priority Engine
 */

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

// Host detection
function isIllustratorHost() {
    return (app.name && app.name.indexOf("Illustrator") !== -1);
}

// Font Matching Patterns
var PREFERRED_FONT_REGEX = /indulekha.*heavy|indulekhaheavy|ml.*indulekha.*heavy/i;
var STRICT_ML_FONT_REGEX = /ml1-tt|ml-tt|mltt|ml-kv|ml-|fml|thunchan|indulekha|vishu|visakham|vinay|aswathi|aswathy|ambili|nila|chandrika|bhavana|gopika|guruvayur|kaumudi|nandini|onam|rohini|ravivarma|sankara|thiruvathira|jyothy|chithira|ashtamudi|kairali|anamika|ananya|aruna|indira|karthika|badusha|scribe-ml/i;
var UNICODE_EXCLUDE_REGEX = /noto|sans|unicode|manjari|gayathri|chilanka|anjali|rachana|meera|dyuthi|keraleeyam|uroob/i;

function isLegacyMLFont(psName, family) {
    if (UNICODE_EXCLUDE_REGEX.test(psName) || UNICODE_EXCLUDE_REGEX.test(family)) {
        return false;
    }
    return STRICT_ML_FONT_REGEX.test(psName) || STRICT_ML_FONT_REGEX.test(family);
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

// ============================================================================
// 1. FONT SCANNING (Photoshop & Illustrator)
// ============================================================================

function kuttipencil_getAvailableMLFonts() {
    try {
        var preferredFonts = [];
        var otherMLFonts = [];
        var seen = {};

        var fontsCollection = isIllustratorHost() ? app.textFonts : app.fonts;
        var totalCount = fontsCollection.length;

        for (var i = 0; i < totalCount; i++) {
            var f = fontsCollection[i];
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
            hostApp: isIllustratorHost() ? "Illustrator" : "Photoshop",
            totalSystemFonts: totalCount
        });
    } catch (e) {
        return JSON.stringify({ success: false, mlFonts: [], message: e.toString() });
    }
}

// ============================================================================
// 2. TEXT INSERTION & UPDATING
// ============================================================================

/**
 * Main Text Insertion Router (Photoshop & Illustrator)
 */
function kuttipencil_insertTextLayer(text, fontName) {
    if (isIllustratorHost()) {
        return ilst_insertText(text, fontName);
    } else {
        return phsp_insertText(text, fontName);
    }
}

/**
 * Main Text Update Router (Photoshop & Illustrator)
 */
function kuttipencil_updateActiveTextLayer(text, fontName) {
    if (isIllustratorHost()) {
        return ilst_updateText(text, fontName);
    } else {
        return phsp_updateText(text, fontName);
    }
}

/**
 * Read active text layer contents (Photoshop & Illustrator)
 */
function kuttipencil_getActiveTextLayerContent() {
    if (isIllustratorHost()) {
        return ilst_getActiveContent();
    } else {
        return phsp_getActiveContent();
    }
}

/**
 * Quick Export to Downloads (Photoshop & Illustrator)
 */
function kuttipencil_quickExport(format) {
    if (isIllustratorHost()) {
        return ilst_quickExport(format);
    } else {
        return phsp_quickExport(format);
    }
}

// ============================================================================
// ADOBE ILLUSTRATOR (ILST) IMPLEMENTATION
// ============================================================================

function ilst_getMatchingFont(requestedFont) {
    // 1. Explicit requested font
    if (requestedFont && requestedFont !== "" && requestedFont !== "auto") {
        for (var i = 0; i < app.textFonts.length; i++) {
            var fReq = app.textFonts[i];
            var psReq = fReq.name || "";
            if (psReq === requestedFont || fReq.family === requestedFont) {
                return fReq;
            }
        }
    }

    // 2. Preferred IndulekhaHeavy
    for (var p = 0; p < app.textFonts.length; p++) {
        var fPref = app.textFonts[p];
        var psPref = fPref.name || "";
        var famPref = fPref.family || "";
        if (!UNICODE_EXCLUDE_REGEX.test(psPref) && !UNICODE_EXCLUDE_REGEX.test(famPref)) {
            if (PREFERRED_FONT_REGEX.test(psPref) || PREFERRED_FONT_REGEX.test(famPref)) {
                return fPref;
            }
        }
    }

    // 3. Any ML series font
    for (var j = 0; j < app.textFonts.length; j++) {
        var fML = app.textFonts[j];
        var psML = fML.name || "";
        var famML = fML.family || "";
        if (isLegacyMLFont(psML, famML)) {
            return fML;
        }
    }

    // 4. Direct Name Check
    try {
        return app.textFonts.getByName("ML-TTIndulekhaHeavy-BoldItalic");
    } catch (e1) {
        try {
            return app.textFonts.getByName("ML-TTThunchan-Normal");
        } catch (e2) {}
    }

    return null;
}

function ilst_insertText(text, fontName) {
    try {
        if (!text || text === "") {
            return JSON.stringify({ success: false, message: "Input is empty." });
        }

        var doc;
        if (app.documents.length === 0) {
            doc = app.documents.add(DocumentColorSpace.RGB, 1920, 1080);
        } else {
            doc = app.activeDocument;
        }

        var ab = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        var abRect = ab.artboardRect; // [left, top, right, bottom]
        var centerX = (abRect[0] + abRect[2]) / 2;
        var centerY = (abRect[1] + abRect[3]) / 2;

        var tf = doc.textFrames.add();
        tf.contents = text;
        tf.position = [centerX, centerY];

        var tr = tf.textRange;
        tr.characterAttributes.size = 100;
        tr.paragraphAttributes.justification = Justification.CENTER;

        var fontObj = ilst_getMatchingFont(fontName);
        if (fontObj) {
            try {
                tr.characterAttributes.textFont = fontObj;
            } catch (errF) {}
        }

        doc.selection = [tf];

        return JSON.stringify({
            success: true,
            message: "Created in Illustrator @ 100pt with: " + (fontObj ? fontObj.name : "ML font"),
            fontName: fontObj ? fontObj.name : ""
        });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}

function ilst_updateText(text, fontName) {
    try {
        if (app.documents.length === 0) {
            return JSON.stringify({ success: false, message: "No active document in Illustrator." });
        }
        var doc = app.activeDocument;
        if (doc.selection.length === 0) {
            return JSON.stringify({ success: false, message: "Please select a text frame in Illustrator." });
        }

        var updated = 0;
        var fontObj = ilst_getMatchingFont(fontName);

        for (var i = 0; i < doc.selection.length; i++) {
            var item = doc.selection[i];
            if (item.typename === "TextFrame") {
                item.contents = text;
                var tr = item.textRange;
                tr.characterAttributes.size = 100;
                tr.paragraphAttributes.justification = Justification.CENTER;
                if (fontObj) {
                    try {
                        tr.characterAttributes.textFont = fontObj;
                    } catch (eF) {}
                }
                updated++;
            }
        }

        if (updated > 0) {
            return JSON.stringify({ success: true, message: "Updated " + updated + " text frame(s) in Illustrator!" });
        }
        return JSON.stringify({ success: false, message: "Selected item is not a TextFrame." });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}

function ilst_getActiveContent() {
    try {
        if (app.documents.length === 0) {
            return JSON.stringify({ success: false, message: "No active document." });
        }
        var doc = app.activeDocument;
        if (doc.selection.length === 0) {
            return JSON.stringify({ success: false, message: "No text frame selected." });
        }

        for (var i = 0; i < doc.selection.length; i++) {
            var item = doc.selection[i];
            if (item.typename === "TextFrame") {
                return JSON.stringify({
                    success: true,
                    text: item.contents,
                    font: item.textRange.characterAttributes.textFont ? item.textRange.characterAttributes.textFont.name : ""
                });
            }
        }

        return JSON.stringify({ success: false, message: "Selected item is not a TextFrame." });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}

function ilst_quickExport(format) {
    try {
        if (app.documents.length === 0) {
            return JSON.stringify({ success: false, message: "No active document." });
        }
        var doc = app.activeDocument;
        var saveFolder = getDownloadsFolder();
        var baseName = doc.name.replace(/\.[^\.]+$/, "");

        if (format === "png") {
            var pngFile = new File(saveFolder + "/" + baseName + "_export.png");
            var pngOpts = new ExportOptionsPNG24();
            pngOpts.antiAliasing = true;
            pngOpts.transparency = true;
            pngOpts.artBoardClipping = true;
            doc.exportFile(pngFile, ExportType.PNG24, pngOpts);
            return JSON.stringify({ success: true, message: "Exported PNG to Downloads folder" });
        } else if (format === "jpg") {
            var jpgFile = new File(saveFolder + "/" + baseName + "_export.jpg");
            var jpgOpts = new ExportOptionsJPEG();
            jpgOpts.antiAliasing = true;
            jpgOpts.qualitySetting = 90;
            jpgOpts.artBoardClipping = true;
            doc.exportFile(jpgFile, ExportType.JPEG, jpgOpts);
            return JSON.stringify({ success: true, message: "Exported JPG to Downloads folder" });
        }

        return JSON.stringify({ success: false, message: "Unknown format: " + format });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}

// ============================================================================
// ADOBE PHOTOSHOP (PHSP) IMPLEMENTATION
// ============================================================================

function phsp_getMatchingFont(requestedFont) {
    if (requestedFont && requestedFont !== "" && requestedFont !== "auto") {
        for (var i = 0; i < app.fonts.length; i++) {
            var fReq = app.fonts[i];
            var psReq = fReq.postScriptName || fReq.name || "";
            if (psReq === requestedFont || fReq.family === requestedFont || fReq.name === requestedFont) {
                return fReq;
            }
        }
    }

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

    for (var j = 0; j < app.fonts.length; j++) {
        var fML = app.fonts[j];
        var psML = fML.postScriptName || fML.name || "";
        var famML = fML.family || "";
        if (isLegacyMLFont(psML, famML)) {
            return fML;
        }
    }

    return null;
}

function phsp_applyStyleActionManager(fontPostScriptName, fontStyleName, fontSizePt, textLen) {
    try {
        var idset = charIDToTypeID("setd");
        var desc = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("TxLr"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        desc.putReference(idnull, ref);

        var textDesc = new ActionDescriptor();

        var pList = new ActionList();
        var pRange = new ActionDescriptor();
        pRange.putInteger(charIDToTypeID("From"), 0);
        pRange.putInteger(charIDToTypeID("T   "), textLen || 9999);
        var pStyle = new ActionDescriptor();
        pStyle.putEnumerated(charIDToTypeID("Algn"), charIDToTypeID("AlgN"), charIDToTypeID("Cntr"));
        pRange.putObject(charIDToTypeID("ParagraphSheet"), charIDToTypeID("ParagraphSheet"), pStyle);
        pList.putObject(charIDToTypeID("ParagraphSheet"), pRange);
        textDesc.putList(charIDToTypeID("ParagraphSheet"), pList);

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

function phsp_insertText(text, fontName) {
    try {
        if (!text || text === "") {
            return JSON.stringify({ success: false, message: "Input is empty." });
        }

        var doc;
        if (app.documents.length === 0) {
            doc = app.documents.add(1920, 1080, 72, "Kutti Pencil Canvas", NewDocumentMode.RGB, DocumentFill.WHITE);
        } else {
            doc = app.activeDocument;
        }

        var docWidth = doc.width.as('px');
        var docHeight = doc.height.as('px');

        var textLayer = doc.artLayers.add();
        textLayer.kind = LayerKind.TEXT;
        textLayer.name = "Kutti: " + (text.length > 12 ? text.substring(0, 12) + "..." : text);

        var textItem = textLayer.textItem;
        textItem.justification = Justification.CENTER;
        textItem.position = [new UnitValue(docWidth / 2, 'px'), new UnitValue(docHeight / 2, 'px')];
        textItem.contents = text;
        var targetFontSize = 100;
        textItem.size = new UnitValue(targetFontSize, 'pt');

        var fontObj = phsp_getMatchingFont(fontName);
        var appliedFontName = "ML-TTIndulekhaHeavy-BoldItalic";
        var appliedFontStyle = "BoldItalic";

        if (fontObj) {
            appliedFontName = fontObj.postScriptName || fontObj.name;
            appliedFontStyle = fontObj.style || "BoldItalic";
            try { textItem.font = appliedFontName; } catch (errDOM) {}
        }

        phsp_applyStyleActionManager(appliedFontName, appliedFontStyle, targetFontSize, text.length);

        return JSON.stringify({
            success: true,
            message: "Created @ 100pt with font: " + appliedFontName,
            fontName: appliedFontName
        });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}

function phsp_updateText(text, fontName) {
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

        var fontObj = phsp_getMatchingFont(fontName);
        var appliedFontName = "";
        var appliedFontStyle = "BoldItalic";

        if (fontObj) {
            appliedFontName = fontObj.postScriptName || fontObj.name;
            appliedFontStyle = fontObj.style || "BoldItalic";
            try { textItem.font = appliedFontName; } catch (errDOM) {}
        }

        phsp_applyStyleActionManager(appliedFontName, appliedFontStyle, targetFontSize, text.length);

        return JSON.stringify({
            success: true,
            message: "Updated @ 100pt with: " + (appliedFontName || "ML font"),
            fontName: appliedFontName
        });
    } catch (e) {
        return JSON.stringify({ success: false, message: e.toString() });
    }
}

function phsp_getActiveContent() {
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

function phsp_quickExport(format) {
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

// ============================================================================
// URI BRIDGE HELPERS (100% Fail-Safe)
// ============================================================================

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
