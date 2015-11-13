var romajiInput = document.getElementById('romaji');
var hiraganaInput = document.getElementById('hiragana');
var katakanaInput = document.getElementById('katakana');


romajiInput.onkeyup = hiraganaInput.onkeyup = katakanaInput.onkeyup = function () {

    var from = this.id;
    var conversionResult = convert(this.value.toLowerCase(), from);

    if (this !== romajiInput) {
        romajiInput.value = conversionResult.romajiStr;
    }
    if (this !== hiraganaInput) {
        hiraganaInput.value = conversionResult.hiraganaStr;
    }
    if (this !== katakanaInput) {
        katakanaInput.value = conversionResult.katakanaStr;
    }

};


function convert(str, from) {

    var romajiStr = '';
    var hiraganaStr = '';
    var katakanaStr = '';

    while (str !== '') {
        var token = getToken(str, from);
        romajiStr += token.romaji;
        hiraganaStr += token.hiragana;
        katakanaStr += token.katakana;
        str = str.substr(token.strLength);
    }

    return {
        romajiStr: romajiStr,
        hiraganaStr: hiraganaStr,
        katakanaStr: katakanaStr
    };

}


function getToken(str, from) {

    if (shouldIgnoreChar(str[0])) {
        return {
            romaji: '',
            hiragana: '',
            katakana: '',
            strLength: 1
        };
    }

    for (var i = 0; i < window.conversionTable.length; i++) {
        var token = window.conversionTable[i];
        if (str.startsWith(token[from])) {
            token.strLength = token[from].length;
            return token;
        }
    }

    return {
        romaji: str[0],
        hiragana: str[0],
        katakana: str[0],
        strLength: 1
    };

}


function shouldIgnoreChar(char) {

    return char === ' ' || char === '\'';

}
