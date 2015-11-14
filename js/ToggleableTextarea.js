function ToggleableTextarea(id, className, editable, autofocus) {

    this.id = id;

    this._textarea = document.createElement('textarea');
    this._textarea.className = className;
    if (autofocus) {
        this._textarea.setAttribute('autofocus', 'autofocus');
    }

    this._box = document.createElement('div');

    var container = document.getElementById(id);
    container.appendChild(this._textarea);
    container.appendChild(this._box);

    this._textarea.onkeyup = this._textarea.onblur = this._synchronize.bind(this);
    this._textarea.onfocus = this._box.onclick = this._edit.bind(this);
    this._textarea.onblur = this._unedit.bind(this);

    if (editable) {
        this._edit();
    } else {
        this._unedit();
    }

}


ToggleableTextarea.prototype.addKeyupListener = function (func) {

    this._textarea.addEventListener('keyup', func);

};


ToggleableTextarea.prototype.getValue = function () {

    return this._textarea.value;

};


ToggleableTextarea.prototype.setValue = function (value) {

    this._box.innerHTML = this._textarea.value = value;

};


ToggleableTextarea.prototype._synchronize = function () {

    this._box.innerHTML = this._textarea.value;
    this._box.style.height = this._textarea.clientHeight + 'px';

};


ToggleableTextarea.prototype._edit = function () {

    this._textarea.style.display = 'block';
    this._box.style.display = 'none';

    this._textarea.focus();

};


ToggleableTextarea.prototype._unedit = function () {

    this._box.style.display = 'block';
    this._textarea.style.display = 'none';

};