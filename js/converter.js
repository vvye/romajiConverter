var romajiInput = document.getElementById('romaji');
var hiraganaInput = document.getElementById('hiragana');
var katakanaInput = document.getElementById('katakana');


romajiInput.onkeyup = hiraganaInput.onkeyup = katakanaInput.onkeyup = function () {

    var from = this.id;
    var conversionResult = convert(this.value, from);

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
        str = str.substr(token[from].length || 1);
    }

    return {
        romajiStr: romajiStr,
        hiraganaStr: hiraganaStr,
        katakanaStr: katakanaStr
    };

}


function getToken(str, from) {

    for (var i = 0; i < window.conversionTable.length; i++) {
        if (str.startsWith(window.conversionTable[i][from])) {
            return window.conversionTable[i];
        }
    }

    var replacement = (str[0] !== ' ' && str[0] !== '\'') ? str[0] : '';
    return {
        romaji: replacement,
        hiragana: replacement,
        katakana: replacement
    };

}