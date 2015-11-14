function Converter() {

    this.text = this.from = this.result = null;
    this.conversionTable = getConversionTable();

}


Converter.prototype.convert = function (text, from) {

    this.text = text.toLowerCase();
    this.from = from;

    this.result = {
        romajiText: '',
        hiraganaText: '',
        katakanaText: ''
    };

    this._preprocess();

    while (this.text !== '') {
        var token = this._getToken();
        this.result.romajiText += token.romaji;
        this.result.hiraganaText += token.hiragana;
        this.result.katakanaText += token.katakana;
        this.text = this.text.substr(token.strLength);
    }

    this._postprocess();

};


Converter.prototype.getResult = function() {

    return this.result;

};


Converter.prototype._preprocess = function () {

    this.text = this.text
        .replace('ā', 'aa')
        .replace('ū', 'uu')
        .replace('ē', 'ee')
        .replace('ō', 'ou');

};


Converter.prototype._getToken = function () {

    var newToken = {};

    if (this._shouldIgnoreChar(this.text[0])) {
        newToken.romaji = newToken.hiragana = newToken.katakana = '';
        newToken.strLength = 1;
    }

    for (var i = 0; i < this.conversionTable.length; i++) {
        var token = this.conversionTable[i];
        if (this.text.startsWith(token[this.from])) {
            newToken = token;
            newToken.strLength = token[this.from].length;
            return newToken;
        }
    }

    newToken.romaji = newToken.hiragana = newToken.katakana = this.text[0];
    newToken.strLength = 1;
    return newToken;

};


Converter.prototype._shouldIgnoreChar = function (char) {

    return char === ' ' || char === '\'';

};


Converter.prototype._postprocess = function () {

    this.result.romajiText = this.result.romajiText
        .replace(/([aiueo])ー/gi, '$1$1')

        .replace('aa', 'ā')
        .replace('uu', 'ū')
        .replace('ee', 'ē')
        .replace('ou', 'ō')
        .replace('oo', 'ō');

};
