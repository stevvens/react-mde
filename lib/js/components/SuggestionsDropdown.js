"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionsDropdown = void 0;
var React = require("react");
var ClassNames_1 = require("../util/ClassNames");
exports.SuggestionsDropdown = function (_a) {
    var classes = _a.classes, suggestions = _a.suggestions, caret = _a.caret, onSuggestionSelected = _a.onSuggestionSelected, suggestionsAutoplace = _a.suggestionsAutoplace, focusIndex = _a.focusIndex, textAreaRef = _a.textAreaRef, placeholder = _a.placeholder;
    if (!suggestions.length && !placeholder) {
        return null;
    }
    var handleSuggestionClick = function (event) {
        event.preventDefault();
        var index = parseInt(event.currentTarget.attributes["data-index"].value);
        onSuggestionSelected(index);
    };
    var handleMouseDown = function (event) { return event.preventDefault(); };
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    var left = caret.left - textAreaRef.current.scrollLeft;
    var top = caret.top - textAreaRef.current.scrollTop;
    var style = {};
    if (suggestionsAutoplace &&
        top +
            textAreaRef.current.getBoundingClientRect().top +
            textAreaRef.current.ownerDocument.defaultView.pageYOffset +
            caret.lineHeight * 1.5 * suggestions.length >
            vh)
        style.bottom = textAreaRef.current.offsetHeight - caret.top;
    else
        style.top = top;
    if (suggestionsAutoplace &&
        left +
            textAreaRef.current.getBoundingClientRect().left +
            textAreaRef.current.ownerDocument.defaultView.pageXOffset +
            caret.lineHeight *
                0.6666 *
                Math.max.apply(Math, suggestions.map(function (x) { return x.preview.toString().length; })) >
            vw)
        style.right = textAreaRef.current.offsetWidth - caret.left;
    else
        style.left = left;
    if (!suggestions.length) {
        return (React.createElement("ul", { className: ClassNames_1.classNames("mde-suggestions", classes), style: style },
            React.createElement("li", { className: "mde-loading-placeholder" }, placeholder)));
    }
    return (React.createElement("ul", { className: ClassNames_1.classNames("mde-suggestions", classes), style: style }, suggestions.map(function (s, i) { return (React.createElement("li", { onClick: handleSuggestionClick, onMouseDown: handleMouseDown, key: i, "aria-selected": focusIndex === i ? "true" : "false", "data-index": "" + i }, s.preview)); })));
};
