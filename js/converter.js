/**
 * Kutti Pencil - Malayalam Unicode to FML / ML-TT Converter Engine
 * Includes Offline Manglish Phonetic Converter + Google Input Tools Transliteration
 */

(function (window) {
    'use strict';

    // Base Malayalam to FML Character & Conjunct Map
    var FML_MAP = {
        // Anusvaram & Visargam
        "ം": "w",
        "ഃ": "x",

        // Swarangal (Vowels)
        "അ": "A",
        "ആ": "B",
        "ഇ": "C",
        "ഈ": "Cu",
        "ഉ": "D",
        "ഊ": "Du",
        "ഋ": "E",
        "ഌ": "\\p",
        "എ": "F",
        "ഏ": "G",
        "ഐ": "sF",
        "ഒ": "H",
        "ഓ": "Hm",
        "ഔ": "Hu",

        // Vyanjanangal (Consonants)
        "ക": "I",
        "ഖ": "J",
        "ഗ": "K",
        "ഘ": "L",
        "ങ": "M",
        "ച": "N",
        "ഛ": "O",
        "ജ": "P",
        "ഝ": "Q",
        "ഞ": "R",
        "ട": "S",
        "ഠ": "T",
        "ഡ": "U",
        "ഢ": "V",
        "ണ": "W",
        "ത": "X",
        "ഥ": "Y",
        "ദ": "Z",
        "ധ": "[",
        "ന": "\\",
        "പ": "]",
        "ഫ": "^",
        "ബ": "_",
        "ഭ": "`",
        "മ": "a",
        "യ": "b",
        "ര": "c",
        "റ": "d",
        "ല": "e",
        "ള": "f",
        "ഴ": "g",
        "വ": "h",
        "ശ": "i",
        "ഷ": "j",
        "സ": "k",
        "ഹ": "l",

        // Chillus
        "ൺ": "¬",
        "ണ്‍": "¬",
        "ൻ": "³",
        "ന്‍": "³",
        "ർ": "À",
        "ര്‍": "À",
        "ൽ": "Â",
        "ല്‍": "Â",
        "ൾ": "Ä",
        "ള്‍": "Ä",
        "ൿ": "ª",

        // Matras (Vowel Signs)
        "ാ": "m",
        "ി": "n",
        "ീ": "o",
        "ു": "p",
        "ൂ": "q",
        "ൃ": "r",
        "െ": "s",
        "േ": "t",
        "ൈ": "ss",
        "ൊ": "sm",
        "ോ": "tm",
        "ൌ": "su",
        "ൗ": "u",
        "്": "v",
        "്‌": "v", // ZWNJ

        // Conjuncts / Koottaksharangal
        "ക്ക": "¡",
        "ക്ല": "¢",
        "ക്ഷ": "£",
        "ഗ്ഗ": "¤",
        "ഗ്ല": "¥",
        "ങ്ക": "¦",
        "ങ്ങ": "§",
        "ച്ച": "¨",
        "ഞ്ച": "©",
        "ഞ്ഞ": "ª",
        "ട്ട": "«",
        "ണ്ട": "ï",
        "ണ്ണ": "®",
        "ത്ത": "¯",
        "ത്ഥ": "°",
        "ദ്ദ": "±",
        "ദ്ധ": "²",
        "ന്ത": "´",
        "ന്ദ": "µ",
        "ന്ന": "¶",
        "ന്മ": "·",
        "പ്പ": "¸",
        "പ്ല": "¹",
        "ബ്ബ": "º",
        "ബ്ല": "»",
        "മ്പ": "¼",
        "മ്മ": "½",
        "മ്ല": "Ÿ",
        "യ്യ": "¿",
        "റ്റ": "ä",
        "ല്ല": "Ã",
        "ള്ള": "Å",
        "വ്വ": "Æ",
        "ശ്ല": "Ç",
        "ശ്ശ": "È",
        "സ്ല": "É",
        "സ്സ": "Ê",
        "ഹ്ല": "Ë",
        "സ്റ്റ": "Ì",
        "ഡ്ഡ": "Í",
        "ക്ട": "Î",
        "ബ്ധ": "Ï",
        "ബ്ദ": "Ð",
        "ച്ഛ": "Ñ",
        "ഹ്മ": "Ò",
        "ഹ്ന": "Ó",
        "ന്ധ": "Ô",
        "ത്സ": "Õ",
        "ജ്ജ": "Ö",
        "ണ്മ": "×",
        "സ്ഥ": "Ø",
        "ന്ഥ": "Ù",
        "ജ്ഞ": "Ú",
        "ത്ഭ": "Û",
        "ഗ്മ": "Ü",
        "ശ്ച": "Ý",
        "ണ്ഡ": "Þ",
        "ത്മ": "ß",
        "ക്ത": "à",
        "ഗ്ന": "á",
        "ന്റ": "â",
        "ഷ്ട": "ã",

        // Medials
        "്യ": "y",
        "്വ": "z",
        "്ര": "{"
    };

    // Sort keys descending by length to match longest conjuncts first
    var sortedKeys = Object.keys(FML_MAP).sort(function (a, b) {
        return b.length - a.length;
    });

    // Reverse map for FML to Unicode
    var REVERSE_MAP = {};
    Object.keys(FML_MAP).forEach(function (k) {
        var v = FML_MAP[k];
        if (!REVERSE_MAP[v]) {
            REVERSE_MAP[v] = k;
        }
    });

    // Offline Phonetic Manglish Rules for Instant Transliteration
    var MANGLISH_RULES = [
        // Complex clusters
        { m: /nnum/g, r: "ന്നും" },
        { m: /kku/g, r: "ക്കു" },
        { m: /nnu/g, r: "ന്നു" },
        { m: /ttu/g, r: "ട്ടു" },
        { m: /thth/g, r: "ത്ത" },
        { m: /chch/g, r: "ച്ച" },
        { m: /shsh/g, r: "ശ്ശ" },
        { m: /pp/g, r: "പ്പ" },
        { m: /kk/g, r: "ക്ക" },
        { m: /mm/g, r: "മ്മ" },
        { m: /ll/g, r: "ല്ല" },
        { m: /LL/g, r: "ള്ള" },
        { m: /nn/g, r: "ന്ന" },
        { m: /nj/g, r: "ഞ്ഞ" },
        { m: /ng/g, r: "ങ്ങ" },
        { m: /nd/g, r: "ണ്ട" },
        { m: /nth/g, r: "ന്ത" },
        { m: /mb/g, r: "മ്പ" },
        { m: /ksh/g, r: "ക്ഷ" },
        { m: /zh/g, r: "ഴ" },
        { m: /th/g, r: "ത" },
        { m: /ch/g, r: "ച" },
        { m: /sh/g, r: "ശ" },
        { m: /ph/g, r: "ഫ" },
        { m: /bh/g, r: "ഭ" },
        { m: /dh/g, r: "ധ" },
        { m: /gh/g, r: "ഘ" },
        { m: /jh/g, r: "ഝ" },
        { m: /kh/g, r: "ഖ" },

        // Single letters
        { m: /k/g, r: "ക" },
        { m: /g/g, r: "ഗ" },
        { m: /j/g, r: "ജ" },
        { m: /t/g, r: "ട" },
        { m: /d/g, r: "ദ" },
        { m: /n/g, r: "ന" },
        { m: /p/g, r: "പ" },
        { m: /b/g, r: "ബ" },
        { m: /m/g, r: "മ" },
        { m: /y/g, r: "യ" },
        { m: /r/g, r: "ര" },
        { m: /R/g, r: "റ" },
        { m: /l/g, r: "ല" },
        { m: /L/g, r: "ള" },
        { m: /v/g, r: "വ" },
        { m: /w/g, r: "വ" },
        { m: /s/g, r: "സ" },
        { m: /h/g, r: "ഹ" },

        // Vowels at word starts / standalone
        { m: /\baa/g, r: "ആ" },
        { m: /\bA/g, r: "ആ" },
        { m: /\ba/g, r: "അ" },
        { m: /\bee/g, r: "ഈ" },
        { m: /\bi/g, r: "ഇ" },
        { m: /\boo/g, r: "ഊ" },
        { m: /\bu/g, r: "ഉ" },
        { m: /\be/g, r: "എ" },
        { m: /\bE/g, r: "ഏ" },
        { m: /\bai/g, r: "ഐ" },
        { m: /\bo/g, r: "ഒ" },
        { m: /\bO/g, r: "ഓ" },
        { m: /\bau/g, r: "ഔ" },

        // Matras (vowel signs following consonants)
        { m: /([ക-ഹ])aa/g, r: "$1ാ" },
        { m: /([ക-ഹ])A/g, r: "$1ാ" },
        { m: /([ക-ഹ])ee/g, r: "$1ീ" },
        { m: /([ക-ഹ])i/g, r: "$1ി" },
        { m: /([ക-ഹ])oo/g, r: "$1ൂ" },
        { m: /([ക-ഹ])u/g, r: "$1ു" },
        { m: /([ക-ഹ])E/g, r: "$1േ" },
        { m: /([ക-ഹ])e/g, r: "$1െ" },
        { m: /([ക-ഹ])ai/g, r: "$1ൈ" },
        { m: /([ക-ഹ])O/g, r: "$1ോ" },
        { m: /([ക-ഹ])o/g, r: "$1ൊ" },
        { m: /([ക-ഹ])au/g, r: "$1ൌ" },
        { m: /([ക-ഹ])a/g, r: "$1" }, // Short 'a' is inherent
        { m: /([ക-ഹ])\b/g, r: "$1്" } // Word-final consonant gets chandrakkala
    ];

    var KuttiConverter = {
        /**
         * Check if text contains Malayalam Unicode characters
         */
        isMalayalamUnicode: function (text) {
            return /[\u0D00-\u0D7F]/.test(text);
        },

        /**
         * Quick Offline Phonetic Transliteration
         */
        offlineTransliterate: function (text) {
            if (!text) return "";
            if (this.isMalayalamUnicode(text)) return text;

            var res = text;
            for (var i = 0; i < MANGLISH_RULES.length; i++) {
                res = res.replace(MANGLISH_RULES[i].m, MANGLISH_RULES[i].r);
            }
            return res;
        },

        /**
         * Convert Malayalam Unicode text to FML / ML-TT ASCII text
         */
        unicodeToFML: function (text) {
            if (!text) return "";

            var src = text
                .replace(/\u200D/g, '') // Remove ZWJ
                .replace(/\u200C/g, ''); // Remove ZWNJ

            var index = 0;
            var tokens = [];

            while (index < src.length) {
                var matched = false;

                for (var i = 0; i < sortedKeys.length; i++) {
                    var key = sortedKeys[i];
                    if (src.substr(index, key.length) === key) {
                        tokens.push({
                            char: key,
                            fml: FML_MAP[key],
                            isMalayalam: true
                        });
                        index += key.length;
                        matched = true;
                        break;
                    }
                }

                if (!matched) {
                    tokens.push({
                        char: src[index],
                        fml: src[index],
                        isMalayalam: false
                    });
                    index++;
                }
            }

            var output = "";
            for (var t = 0; t < tokens.length; t++) {
                var current = tokens[t];
                var next = (t + 1 < tokens.length) ? tokens[t + 1] : null;

                if (next && (next.char === 'െ' || next.char === 'േ' || next.char === 'ൈ' || next.char === 'ൊ' || next.char === 'ോ' || next.char === 'ൌ')) {
                    if (next.char === 'െ') {
                        output += "s" + current.fml;
                        t++;
                    } else if (next.char === 'േ') {
                        output += "t" + current.fml;
                        t++;
                    } else if (next.char === 'ൈ') {
                        output += "ss" + current.fml;
                        t++;
                    } else if (next.char === 'ൊ') {
                        output += "s" + current.fml + "m";
                        t++;
                    } else if (next.char === 'ോ') {
                        output += "t" + current.fml + "m";
                        t++;
                    } else if (next.char === 'ൌ') {
                        output += "s" + current.fml + "u";
                        t++;
                    }
                } else {
                    output += current.fml;
                }
            }

            return output;
        },

        /**
         * Convert FML / ML-TT text back to Malayalam Unicode
         */
        fmlToUnicode: function (fmlText) {
            if (!fmlText) return "";

            var res = fmlText;
            res = res.replace(/ss(.)/g, function (m, c) { return (REVERSE_MAP[c] || c) + "ൈ"; });
            res = res.replace(/s(.)m/g, function (m, c) { return (REVERSE_MAP[c] || c) + "ൊ"; });
            res = res.replace(/t(.)m/g, function (m, c) { return (REVERSE_MAP[c] || c) + "ോ"; });
            res = res.replace(/s(.)u/g, function (m, c) { return (REVERSE_MAP[c] || c) + "ൌ"; });
            res = res.replace(/s(.)/g, function (m, c) { return (REVERSE_MAP[c] || c) + "െ"; });
            res = res.replace(/t(.)/g, function (m, c) { return (REVERSE_MAP[c] || c) + "േ"; });

            var out = "";
            for (var i = 0; i < res.length; i++) {
                var ch = res[i];
                out += REVERSE_MAP[ch] !== undefined ? REVERSE_MAP[ch] : ch;
            }

            return out;
        },

        /**
         * Transliterate Manglish with Google Input Tools API + Offline Fallback
         */
        transliterateManglish: function (word, callback) {
            if (!word || word.trim() === '') {
                if (callback) callback(word, []);
                return;
            }

            // If already Malayalam Unicode, return immediately
            if (this.isMalayalamUnicode(word)) {
                if (callback) callback(word, [word]);
                return;
            }

            var self = this;
            var fallback = self.offlineTransliterate(word);

            var url = "https://inputtools.google.com/request?text=" + encodeURIComponent(word) + "&itc=ml-t-i0-und&num=4";

            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.timeout = 2500;

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var data = JSON.parse(xhr.responseText);
                            if (data && data[0] === "SUCCESS" && data[1] && data[1][0] && data[1][0][1] && data[1][0][1].length > 0) {
                                var suggestions = data[1][0][1];
                                if (callback) callback(suggestions[0], suggestions);
                                return;
                            }
                        } catch (e) {}
                    }
                    if (callback) callback(fallback, [fallback]);
                }
            };

            xhr.ontimeout = function () {
                if (callback) callback(fallback, [fallback]);
            };

            xhr.onerror = function () {
                if (callback) callback(fallback, [fallback]);
            };

            xhr.send();
        }
    };

    window.KuttiConverter = KuttiConverter;

})(window);
