var romajiInput = document.getElementById('romaji');
var hiraganaInput = document.getElementById('hiragana');
var katakanaInput = document.getElementById('katakana');


romajiInput.onkeyup = hiraganaInput.onkeyup = katakanaInput.onkeyup = handleConversion;


function handleConversion() {

    var from = this.id;
    var conversionResult = convert(this.value, from);

    if (this !== romajiInput) {
        romajiInput.value = conversionResult.romaji;
    }
    if (this !== hiraganaInput) {
        hiraganaInput.value = conversionResult.hiragana;
    }
    if (this !== katakanaInput) {
        katakanaInput.value = conversionResult.katakana;
    }

}


function convert(str, from) {

    var romaji = '';
    var hiragana = '';
    var katakana = '';

    while (str !== '') {
        var token = getToken(str, from);
        if (token[from]) {
            romaji += token.romaji;
            hiragana += token.hiragana;
            katakana += token.katakana;
            str = str.substr(token[from].length);
        } else {
            var replacement = (str[0] !== ' ' && str[0] !== '\'') ? str[0] : '';
            romaji += replacement;
            hiragana += replacement;
            katakana += replacement;
            str = str.substr(1);
        }
    }

    return {
        romaji: romaji,
        hiragana: hiragana,
        katakana: katakana
    };

}


function getToken(str, from) {

    for (var i = 0; i < window.conversionTable.length; i++) {
        if (str.startsWith(window.conversionTable[i][from])) {
            return window.conversionTable[i];
        }
    }
    return {};

}