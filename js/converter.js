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


function convert(string, from) {

    var romaji = '';
    var hiragana = '';
    var katakana = '';

    for (var i = 0; i < string.length; i++) {
        var char = string[i];
        var conversion = getConversion(char, from);
        romaji += conversion['romaji'] || char;
        hiragana += conversion['hiragana'] || char;
        katakana += conversion['katakana'] || char;
    }

    return {
        romaji: romaji,
        hiragana: hiragana,
        katakana: katakana
    };

}


function getConversion(char, from) {

    for (var i = 0; i < window.conversionTable.length; i++) {
        if (window.conversionTable[i][from] === char) {
            return window.conversionTable[i];
        }
    }
    return {};
}