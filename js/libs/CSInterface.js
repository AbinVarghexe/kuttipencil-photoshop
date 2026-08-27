/**
 * CSInterface - v11.0.0 (CEP Extension Bridge)
 * Adobe Systems Incorporated
 */

function CSInterface() {}

/**
 * User interface color theme.
 */
function UIColors(r, g, b, a) {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
}

function RGBColor(r, g, b, a) {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
}

function ColorType() {}
ColorType.RGB = "rgb";
ColorType.GRADIENT = "gradient";

function GradientStop(offset, rgbColor) {
    this.offset = offset;
    this.rgbColor = rgbColor;
}

function GradientColor(type, direction, numStops, arrGradientStop) {
    this.type = type;
    this.direction = direction;
    this.numStops = numStops;
    this.arrGradientStop = arrGradientStop;
}

function UIColor(type, antialiasLevel, color) {
    this.type = type;
    this.antialiasLevel = antialiasLevel;
    this.color = color;
}

function AppSkinInfo(baseFontFamily, baseFontSize, appBarBackgroundColor, panelBackgroundColor, appBarBackgroundColorSRGB, panelBackgroundColorSRGB, systemHighlightColor) {
    this.baseFontFamily = baseFontFamily;
    this.baseFontSize = baseFontSize;
    this.appBarBackgroundColor = appBarBackgroundColor;
    this.panelBackgroundColor = panelBackgroundColor;
    this.appBarBackgroundColorSRGB = appBarBackgroundColorSRGB;
    this.panelBackgroundColorSRGB = panelBackgroundColorSRGB;
    this.systemHighlightColor = systemHighlightColor;
}

function HostEnvironment(appId, appVersion, appLocale, appUILocale, appIdVersion, isAppOnline, appSkinInfo) {
    this.appId = appId;
    this.appVersion = appVersion;
    this.appLocale = appLocale;
    this.appUILocale = appUILocale;
    this.appIdVersion = appIdVersion;
    this.isAppOnline = isAppOnline;
    this.appSkinInfo = appSkinInfo;
}

function CSEvent(type, scope, appId, extensionId) {
    this.type = type;
    this.scope = scope;
    this.appId = appId;
    this.extensionId = extensionId;
    this.data = "";
}

CSInterface.THEME_COLOR_CHANGED_EVENT = "com.adobe.csxs.events.ThemeColorChanged";

CSInterface.prototype.getHostEnvironment = function() {
    var hostEnvString = window.__adobe_cep__ ? window.__adobe_cep__.getHostEnvironment() : "{}";
    var obj = JSON.parse(hostEnvString);
    var skin = obj.appSkinInfo;
    if (skin) {
        var panelBg = skin.panelBackgroundColor;
        if (panelBg && panelBg.color) {
            skin.panelBackgroundColor = new UIColor(panelBg.type, panelBg.antialiasLevel, new RGBColor(panelBg.color.red, panelBg.color.green, panelBg.color.blue, panelBg.color.alpha));
        }
    }
    return obj;
};

CSInterface.prototype.closeExtension = function() {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.closeExtension();
    }
};

CSInterface.prototype.getSystemPath = function(pathType) {
    var path = "";
    if (window.__adobe_cep__) {
        path = window.__adobe_cep__.getSystemPath(pathType);
    }
    return path;
};

CSInterface.prototype.evalScript = function(script, callback) {
    if (window.__adobe_cep__) {
        if (callback === null || callback === undefined) {
            callback = function(result) {};
        }
        window.__adobe_cep__.evalScript(script, callback);
    } else {
        console.warn("window.__adobe_cep__ is not available. Script not run in CEP host: " + script);
        if (callback) {
            callback("EvalScript mock return - running outside Photoshop CEP host");
        }
    }
};

CSInterface.prototype.addEventListener = function(type, listener, obj) {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.addEventListener(type, listener, obj);
    }
};

CSInterface.prototype.removeEventListener = function(type, listener, obj) {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.removeEventListener(type, listener, obj);
    }
};

CSInterface.prototype.dispatchEvent = function(event) {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.dispatchEvent(JSON.stringify(event));
    }
};

CSInterface.prototype.openURLInDefaultBrowser = function(url) {
    if (window.__adobe_cep__) {
        cep.util.openURLInDefaultBrowser(url);
    } else {
        window.open(url, "_blank");
    }
};

window.CSInterface = CSInterface;
