"use strict";
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    fromBuffer: function() {
        return fromBuffer;
    },
    toBuffer: function() {
        return toBuffer;
    },
    formatTo: function() {
        return formatTo;
    }
});
const DEFAULT_ENCODING = "base64url";
const fromBuffer = (buffer, encoding = DEFAULT_ENCODING)=>Buffer.from(buffer).toString(encoding);
const toBuffer = (text, encoding = DEFAULT_ENCODING)=>Buffer.from(text, encoding);
const formatTo = (text, encodingFrom, encodingTo)=>Buffer.from(text, encodingFrom).toString(encodingTo);

//# sourceMappingURL=buffer.js.map