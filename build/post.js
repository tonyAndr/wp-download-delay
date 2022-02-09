/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 683:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FontColorContrast_hexColorOrRedOrArray, _FontColorContrast_greenOrThreshold, _FontColorContrast_blue, _FontColorContrast_threshold;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FontColorContrast = exports.NumberType = void 0;
const cssNamedColors_1 = __webpack_require__(6);
var NumberType;
(function (NumberType) {
    NumberType[NumberType["COLOR"] = 255] = "COLOR";
    NumberType[NumberType["RGB"] = 16777215] = "RGB";
    NumberType[NumberType["THRESHOLD"] = 1] = "THRESHOLD";
})(NumberType = exports.NumberType || (exports.NumberType = {}));
class FontColorContrast {
    /**
     * Sets the #params in the instance
     * @param hexColorOrRedOrArray One of the options: hex color number, hex color string, named CSS color, array with red, green and blue or string or the red portion of the color
     * @param greenOrThreshold The green portion of the color or the contrast threshold to control the resulting font color
     * @param blue The blue portion of the color
     * @param threshold Contrast threshold to control the resulting font color
     */
    constructor(hexColorOrRedOrArray, greenOrThreshold, blue, threshold) {
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        _FontColorContrast_hexColorOrRedOrArray.set(this, void 0);
        _FontColorContrast_greenOrThreshold.set(this, void 0);
        _FontColorContrast_blue.set(this, void 0);
        _FontColorContrast_threshold.set(this, void 0);
        /**
         * Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5
         */
        this.threshold = 0.5;
        __classPrivateFieldSet(this, _FontColorContrast_hexColorOrRedOrArray, hexColorOrRedOrArray, "f");
        __classPrivateFieldSet(this, _FontColorContrast_greenOrThreshold, greenOrThreshold, "f");
        __classPrivateFieldSet(this, _FontColorContrast_blue, blue, "f");
        __classPrivateFieldSet(this, _FontColorContrast_threshold, threshold, "f");
    }
    /**
     * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
     * @returns The best contrast between black and white
     */
    getColor() {
        if (this.isRgb()) {
            this.setColorsFromRgbNumbers();
        }
        else if (this.isHexString()) {
            this.setColorsFromHexString();
        }
        else if (this.isNumber()) {
            this.setColorsFromNumber();
        }
        else if (this.isArray()) {
            this.setColorsFromArray();
        }
        else {
            return '#ffffff';
        }
        return this.contrastFromHSP();
    }
    /**
     * Checks if the color is set as RGB on each param
     * @returns True if color is set as RGB on each param
     */
    isRgb() {
        return (FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f"), NumberType.COLOR) &&
            FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_greenOrThreshold, "f"), NumberType.COLOR) &&
            FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_blue, "f"), NumberType.COLOR) &&
            FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_threshold, "f"), NumberType.THRESHOLD));
    }
    /**
     * Checks if color is set on the first param as a hex string and removes the hash of it
     * @returns True if color is a hex string
     */
    isHexString() {
        const [cleanString, hexNum] = this.getCleanStringAndHexNum();
        if (FontColorContrast.isValidNumber(hexNum, NumberType.RGB) &&
            FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_greenOrThreshold, "f"), NumberType.THRESHOLD) &&
            FontColorContrast.isNotSet(__classPrivateFieldGet(this, _FontColorContrast_blue, "f")) &&
            FontColorContrast.isNotSet(__classPrivateFieldGet(this, _FontColorContrast_threshold, "f"))) {
            __classPrivateFieldSet(this, _FontColorContrast_hexColorOrRedOrArray, cleanString, "f");
            return true;
        }
        return false;
    }
    /**
     * Checks if color is set on the first param as a number
     * @returns True if color is a valid RGB nunbernumber
     */
    isNumber() {
        return (FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f"), NumberType.RGB) &&
            FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_greenOrThreshold, "f"), NumberType.THRESHOLD) &&
            FontColorContrast.isNotSet(__classPrivateFieldGet(this, _FontColorContrast_blue, "f")) &&
            FontColorContrast.isNotSet(__classPrivateFieldGet(this, _FontColorContrast_threshold, "f")));
    }
    /**
     * Checks if color is set as an RGB array
     * @returns True if color is set as an RGB array
     */
    isArray() {
        return (Array.isArray(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")) &&
            __classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f").length === 3 &&
            FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")[0], NumberType.COLOR) &&
            FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")[1], NumberType.COLOR) &&
            FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")[2], NumberType.COLOR) &&
            FontColorContrast.isValidNumber(__classPrivateFieldGet(this, _FontColorContrast_greenOrThreshold, "f"), NumberType.THRESHOLD) &&
            FontColorContrast.isNotSet(__classPrivateFieldGet(this, _FontColorContrast_blue, "f")) &&
            FontColorContrast.isNotSet(__classPrivateFieldGet(this, _FontColorContrast_threshold, "f")));
    }
    /**
     * Converts a color array or separated in RGB to the respective RGB values
     * @example All these examples produces the same value
     * arrayOrRgbToRGB(0, 0xcc, 153)
     * arrayOrRgbToRGB(0x0, 0xcc, 153)
     * arrayOrRgbToRGB(0, 204, 0x99)
     */
    setColorsFromRgbNumbers() {
        this.red = __classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f");
        this.green = __classPrivateFieldGet(this, _FontColorContrast_greenOrThreshold, "f");
        this.blue = __classPrivateFieldGet(this, _FontColorContrast_blue, "f");
        this.setThreshold(__classPrivateFieldGet(this, _FontColorContrast_threshold, "f"));
    }
    /**
     * Converts a color array or separated in RGB to the respective RGB values
     * @param this.#hexColorOrRedOrArray The RGB array
     * @param threshold The threshold
     * @example All these examples produces the same value
     * arrayOrRgbToRGB([0, 0xcc, 153])
     * arrayOrRgbToRGB([0x0, 0xcc, 153])
     * arrayOrRgbToRGB([0, 204, 0x99])
     */
    setColorsFromArray() {
        this.red = __classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")[0];
        this.green = __classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")[1];
        this.blue = __classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")[2];
        this.setThreshold(__classPrivateFieldGet(this, _FontColorContrast_greenOrThreshold, "f"));
    }
    /**
     * Converts a ColorIntensity string or number, with all possibilities (e.g. '#009', '009', '#000099', '000099', 153, 0x00099) to the respective RGB values
     * @param hexColor The color string or number
     * @param threshold The threshold
     * @example All these examples produces the same value
     * hexColorToRGB('#0C9')
     * hexColorToRGB('0C9')
     * hexColorToRGB('#00CC99')
     * hexColorToRGB('00cc99')
     * hexColorToRGB(52377)
     * hexColorToRGB(0x00Cc99)
     */
    setColorsFromHexString() {
        switch (__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f").length) {
            // Color has one char for each color, so they must be repeated
            case 3:
                this.red = parseInt(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")[0].repeat(2), 16);
                this.green = parseInt(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")[1].repeat(2), 16);
                this.blue = parseInt(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")[2].repeat(2), 16);
                break;
            // All chars are filled, so no transformation is needed
            default:
                this.red = parseInt(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f").substring(0, 2), 16);
                this.green = parseInt(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f").substring(2, 4), 16);
                this.blue = parseInt(__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f").substring(4, 6), 16);
                break;
        }
        this.setThreshold(__classPrivateFieldGet(this, _FontColorContrast_greenOrThreshold, "f"));
    }
    /**
     * Converts the RGB number and sets the respective RGB values.
     */
    setColorsFromNumber() {
        /*
         * The RGB color has 24 bits (8 bits per color).
         * This function uses binary operations for better performance, but can be tricky to understand. A 24 bits color could be represented as RRRRRRRR GGGGGGGG BBBBBBBB (the first 8 bits are red, the middle 8 bits are green and the last 8 bits are blue).
         * To get each color we perform some RIGHT SHIFT and AND operations.
         * Gets the first 8 bits of the color by shifting it 16 bits
         * RIGHT SHIFT operation (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift)
         * AND operation (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)
         */
        // To get red, we shift the 24 bits number 16 bits to the right, leaving the number only with the leftmost 8 bits (RRRRRRRR)
        this.red = __classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f") >> 16;
        // To get green, the middle 8 bits, we shift it by 8 bits (removing all blue bits - RRRRRRRR GGGGGGGG) and use an AND operation with "0b0000000011111111 = 0xff" to get only the rightmost bits (GGGGGGGG)
        this.green = (__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f") >> 8) & 0xff;
        // To get blue we use an AND operation with "0b000000000000000011111111 = 0xff" to get only the rightmost bits (BBBBBBBB)
        this.blue = __classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f") & 0xff;
        this.setThreshold(__classPrivateFieldGet(this, _FontColorContrast_greenOrThreshold, "f"));
    }
    /**
     * Sets the threshold to the passed value (if valid - less than or equal 1) or the dafault (0.5)
     * @param threshold The passed threshold or undefined if not passed
     */
    setThreshold(threshold) {
        this.threshold = threshold || this.threshold;
    }
    /**
     * Verifies if a number is a valid color number (numberType = NumberType.COLOR = 0xff) or a valid RGB (numberType = NumberType.RGB = 0xffffff) or a valid threshold (numberType = NumberType.THRESHOLD = 1)
     * @param num The number to be checked
     * @param numberType The type of number to be chacked that defines maximum value of the number (default = NumberType.COLOR = 0xff)
     * @returns True if the number is valid
     */
    static isValidNumber(num, numberType) {
        if (numberType === NumberType.THRESHOLD && (num === undefined || num === null))
            return true;
        return (typeof num === 'number' &&
            ((numberType !== NumberType.THRESHOLD && Number.isInteger(num)) || numberType === NumberType.THRESHOLD) &&
            num !== undefined &&
            num !== null &&
            num >= 0 &&
            num <= numberType);
    }
    /**
     * Verifies if a string is a valig string to be used as a color and if true, returns the correspondent hex number
     * @returns Array with an empty string and false if the string is invalid or an array with the clean string and the converted string number]
     */
    getCleanStringAndHexNum() {
        if (typeof __classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f") !== 'string')
            return ['', false];
        const cleanRegEx = /(#|\s)/ig;
        const namedColor = cssNamedColors_1.cssNamedColors.find(color => color.name === __classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f"));
        if (namedColor) {
            __classPrivateFieldSet(this, _FontColorContrast_hexColorOrRedOrArray, namedColor.hex.replace(cleanRegEx, ''), "f");
        }
        const cleanString = (__classPrivateFieldGet(this, _FontColorContrast_hexColorOrRedOrArray, "f")).replace(cleanRegEx, '');
        if (cleanString.length !== 3 && cleanString.length !== 6)
            return ['', false];
        const hexNum = Number('0x' + cleanString);
        return [cleanString, hexNum];
    }
    /**
     * Verifies if a value is not set
     * @param value The value that should be undefined or null
     * @returns True if the value is not set
     */
    static isNotSet(value) {
        return (value === undefined || value === null);
    }
    /**
     * Calculates the best color (black or white) to contrast with the passed RGB color using the algorithm from https://alienryderflex.com/hsp.html
     * @returns Black or White depending on the best possible contrast
     */
    contrastFromHSP() {
        const pRed = 0.299;
        const pGreen = 0.587;
        const pBlue = 0.114;
        const contrast = Math.sqrt(pRed * Math.pow((this.red / 255), 2) +
            pGreen * Math.pow((this.green / 255), 2) +
            pBlue * Math.pow((this.blue / 255), 2));
        return contrast > this.threshold
            ? '#000000'
            : '#ffffff';
    }
}
exports.FontColorContrast = FontColorContrast;
_FontColorContrast_hexColorOrRedOrArray = new WeakMap(), _FontColorContrast_greenOrThreshold = new WeakMap(), _FontColorContrast_blue = new WeakMap(), _FontColorContrast_threshold = new WeakMap();
//# sourceMappingURL=FontColorContrast.js.map

/***/ }),

/***/ 6:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cssNamedColors = void 0;
exports.cssNamedColors = [
    {
        name: 'aliceblue',
        hex: '#f0f8ff',
    },
    {
        name: 'antiquewhite',
        hex: '#faebd7',
    },
    {
        name: 'aqua',
        hex: '#00ffff',
    },
    {
        name: 'aquamarine',
        hex: '#7fffd4',
    },
    {
        name: 'azure',
        hex: '#f0ffff',
    },
    {
        name: 'beige',
        hex: '#f5f5dc',
    },
    {
        name: 'bisque',
        hex: '#ffe4c4',
    },
    {
        name: 'black',
        hex: '#000000',
    },
    {
        name: 'blanchedalmond',
        hex: '#ffebcd',
    },
    {
        name: 'blue',
        hex: '#0000ff',
    },
    {
        name: 'blueviolet',
        hex: '#8a2be2',
    },
    {
        name: 'brown',
        hex: '#a52a2a',
    },
    {
        name: 'burlywood',
        hex: '#deb887',
    },
    {
        name: 'cadetblue',
        hex: '#5f9ea0',
    },
    {
        name: 'chartreuse',
        hex: '#7fff00',
    },
    {
        name: 'chocolate',
        hex: '#d2691e',
    },
    {
        name: 'coral',
        hex: '#ff7f50',
    },
    {
        name: 'cornflowerblue',
        hex: '#6495ed',
    },
    {
        name: 'cornsilk',
        hex: '#fff8dc',
    },
    {
        name: 'crimson',
        hex: '#dc143c',
    },
    {
        name: 'cyan',
        hex: '#00ffff',
    },
    {
        name: 'darkblue',
        hex: '#00008b',
    },
    {
        name: 'darkcyan',
        hex: '#008b8b',
    },
    {
        name: 'darkgoldenrod',
        hex: '#b8860b',
    },
    {
        name: 'darkgray',
        hex: '#a9a9a9',
    },
    {
        name: 'darkgreen',
        hex: '#006400',
    },
    {
        name: 'darkgrey',
        hex: '#a9a9a9',
    },
    {
        name: 'darkkhaki',
        hex: '#bdb76b',
    },
    {
        name: 'darkmagenta',
        hex: '#8b008b',
    },
    {
        name: 'darkolivegreen',
        hex: '#556b2f',
    },
    {
        name: 'darkorange',
        hex: '#ff8c00',
    },
    {
        name: 'darkorchid',
        hex: '#9932cc',
    },
    {
        name: 'darkred',
        hex: '#8b0000',
    },
    {
        name: 'darksalmon',
        hex: '#e9967a',
    },
    {
        name: 'darkseagreen',
        hex: '#8fbc8f',
    },
    {
        name: 'darkslateblue',
        hex: '#483d8b',
    },
    {
        name: 'darkslategray',
        hex: '#2f4f4f',
    },
    {
        name: 'darkslategrey',
        hex: '#2f4f4f',
    },
    {
        name: 'darkturquoise',
        hex: '#00ced1',
    },
    {
        name: 'darkviolet',
        hex: '#9400d3',
    },
    {
        name: 'deeppink',
        hex: '#ff1493',
    },
    {
        name: 'deepskyblue',
        hex: '#00bfff',
    },
    {
        name: 'dimgray',
        hex: '#696969',
    },
    {
        name: 'dimgrey',
        hex: '#696969',
    },
    {
        name: 'dodgerblue',
        hex: '#1e90ff',
    },
    {
        name: 'firebrick',
        hex: '#b22222',
    },
    {
        name: 'floralwhite',
        hex: '#fffaf0',
    },
    {
        name: 'forestgreen',
        hex: '#228b22',
    },
    {
        name: 'fuchsia',
        hex: '#ff00ff',
    },
    {
        name: 'gainsboro',
        hex: '#dcdcdc',
    },
    {
        name: 'ghostwhite',
        hex: '#f8f8ff',
    },
    {
        name: 'gold',
        hex: '#ffd700',
    },
    {
        name: 'goldenrod',
        hex: '#daa520',
    },
    {
        name: 'gray',
        hex: '#808080',
    },
    {
        name: 'green',
        hex: '#008000',
    },
    {
        name: 'greenyellow',
        hex: '#adff2f',
    },
    {
        name: 'grey',
        hex: '#808080',
    },
    {
        name: 'honeydew',
        hex: '#f0fff0',
    },
    {
        name: 'hotpink',
        hex: '#ff69b4',
    },
    {
        name: 'indianred',
        hex: '#cd5c5c',
    },
    {
        name: 'indigo',
        hex: '#4b0082',
    },
    {
        name: 'ivory',
        hex: '#fffff0',
    },
    {
        name: 'khaki',
        hex: '#f0e68c',
    },
    {
        name: 'lavender',
        hex: '#e6e6fa',
    },
    {
        name: 'lavenderblush',
        hex: '#fff0f5',
    },
    {
        name: 'lawngreen',
        hex: '#7cfc00',
    },
    {
        name: 'lemonchiffon',
        hex: '#fffacd',
    },
    {
        name: 'lightblue',
        hex: '#add8e6',
    },
    {
        name: 'lightcoral',
        hex: '#f08080',
    },
    {
        name: 'lightcyan',
        hex: '#e0ffff',
    },
    {
        name: 'lightgoldenrodyellow',
        hex: '#fafad2',
    },
    {
        name: 'lightgray',
        hex: '#d3d3d3',
    },
    {
        name: 'lightgreen',
        hex: '#90ee90',
    },
    {
        name: 'lightgrey',
        hex: '#d3d3d3',
    },
    {
        name: 'lightpink',
        hex: '#ffb6c1',
    },
    {
        name: 'lightsalmon',
        hex: '#ffa07a',
    },
    {
        name: 'lightseagreen',
        hex: '#20b2aa',
    },
    {
        name: 'lightskyblue',
        hex: '#87cefa',
    },
    {
        name: 'lightslategray',
        hex: '#778899',
    },
    {
        name: 'lightslategrey',
        hex: '#778899',
    },
    {
        name: 'lightsteelblue',
        hex: '#b0c4de',
    },
    {
        name: 'lightyellow',
        hex: '#ffffe0',
    },
    {
        name: 'lime',
        hex: '#00ff00',
    },
    {
        name: 'limegreen',
        hex: '#32cd32',
    },
    {
        name: 'linen',
        hex: '#faf0e6',
    },
    {
        name: 'magenta',
        hex: '#ff00ff',
    },
    {
        name: 'maroon',
        hex: '#800000',
    },
    {
        name: 'mediumaquamarine',
        hex: '#66cdaa',
    },
    {
        name: 'mediumblue',
        hex: '#0000cd',
    },
    {
        name: 'mediumorchid',
        hex: '#ba55d3',
    },
    {
        name: 'mediumpurple',
        hex: '#9370db',
    },
    {
        name: 'mediumseagreen',
        hex: '#3cb371',
    },
    {
        name: 'mediumslateblue',
        hex: '#7b68ee',
    },
    {
        name: 'mediumspringgreen',
        hex: '#00fa9a',
    },
    {
        name: 'mediumturquoise',
        hex: '#48d1cc',
    },
    {
        name: 'mediumvioletred',
        hex: '#c71585',
    },
    {
        name: 'midnightblue',
        hex: '#191970',
    },
    {
        name: 'mintcream',
        hex: '#f5fffa',
    },
    {
        name: 'mistyrose',
        hex: '#ffe4e1',
    },
    {
        name: 'moccasin',
        hex: '#ffe4b5',
    },
    {
        name: 'navajowhite',
        hex: '#ffdead',
    },
    {
        name: 'navy',
        hex: '#000080',
    },
    {
        name: 'oldlace',
        hex: '#fdf5e6',
    },
    {
        name: 'olive',
        hex: '#808000',
    },
    {
        name: 'olivedrab',
        hex: '#6b8e23',
    },
    {
        name: 'orange',
        hex: '#ffa500',
    },
    {
        name: 'orangered',
        hex: '#ff4500',
    },
    {
        name: 'orchid',
        hex: '#da70d6',
    },
    {
        name: 'palegoldenrod',
        hex: '#eee8aa',
    },
    {
        name: 'palegreen',
        hex: '#98fb98',
    },
    {
        name: 'paleturquoise',
        hex: '#afeeee',
    },
    {
        name: 'palevioletred',
        hex: '#db7093',
    },
    {
        name: 'papayawhip',
        hex: '#ffefd5',
    },
    {
        name: 'peachpuff',
        hex: '#ffdab9',
    },
    {
        name: 'peru',
        hex: '#cd853f',
    },
    {
        name: 'pink',
        hex: '#ffc0cb',
    },
    {
        name: 'plum',
        hex: '#dda0dd',
    },
    {
        name: 'powderblue',
        hex: '#b0e0e6',
    },
    {
        name: 'purple',
        hex: '#800080',
    },
    {
        name: 'red',
        hex: '#ff0000',
    },
    {
        name: 'rosybrown',
        hex: '#bc8f8f',
    },
    {
        name: 'royalblue',
        hex: '#4169e1',
    },
    {
        name: 'saddlebrown',
        hex: '#8b4513',
    },
    {
        name: 'salmon',
        hex: '#fa8072',
    },
    {
        name: 'sandybrown',
        hex: '#f4a460',
    },
    {
        name: 'seagreen',
        hex: '#2e8b57',
    },
    {
        name: 'seashell',
        hex: '#fff5ee',
    },
    {
        name: 'sienna',
        hex: '#a0522d',
    },
    {
        name: 'silver',
        hex: '#c0c0c0',
    },
    {
        name: 'skyblue',
        hex: '#87ceeb',
    },
    {
        name: 'slateblue',
        hex: '#6a5acd',
    },
    {
        name: 'slategray',
        hex: '#708090',
    },
    {
        name: 'slategrey',
        hex: '#708090',
    },
    {
        name: 'snow',
        hex: '#fffafa',
    },
    {
        name: 'springgreen',
        hex: '#00ff7f',
    },
    {
        name: 'steelblue',
        hex: '#4682b4',
    },
    {
        name: 'tan',
        hex: '#d2b48c',
    },
    {
        name: 'teal',
        hex: '#008080',
    },
    {
        name: 'thistle',
        hex: '#d8bfd8',
    },
    {
        name: 'tomato',
        hex: '#ff6347',
    },
    {
        name: 'turquoise',
        hex: '#40e0d0',
    },
    {
        name: 'violet',
        hex: '#ee82ee',
    },
    {
        name: 'wheat',
        hex: '#f5deb3',
    },
    {
        name: 'white',
        hex: '#ffffff',
    },
    {
        name: 'whitesmoke',
        hex: '#f5f5f5',
    },
    {
        name: 'yellow',
        hex: '#ffff00',
    },
    {
        name: 'yellowgreen',
        hex: '#9acd32',
    },
    {
        name: 'rebeccapurple',
        hex: '#663399',
    },
];
//# sourceMappingURL=cssNamedColors.js.map

/***/ }),

/***/ 269:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const FontColorContrast_1 = __webpack_require__(683);
function fontColorContrast(hexColorOrRedOrArray, greenOrThreshold, blue, threshold) {
    const fcc = new FontColorContrast_1.FontColorContrast(hexColorOrRedOrArray, greenOrThreshold, blue, threshold);
    return fcc.getColor();
}
exports.Z = fontColorContrast;
//# sourceMappingURL=index.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ./node_modules/font-color-contrast/lib/index.js
var lib = __webpack_require__(269);
;// CONCATENATED MODULE: ./node_modules/rgb-hex/index.js
function rgbHex(red, green, blue, alpha) {
	const isPercent = (red + (alpha || '')).toString().includes('%');

	if (typeof red === 'string') {
		[red, green, blue, alpha] = red.match(/(0?\.?\d{1,3})%?\b/g).map(component => Number(component));
	} else if (alpha !== undefined) {
		alpha = Number.parseFloat(alpha);
	}

	if (typeof red !== 'number' ||
		typeof green !== 'number' ||
		typeof blue !== 'number' ||
		red > 255 ||
		green > 255 ||
		blue > 255
	) {
		throw new TypeError('Expected three numbers below 256');
	}

	if (typeof alpha === 'number') {
		if (!isPercent && alpha >= 0 && alpha <= 1) {
			alpha = Math.round(255 * alpha);
		} else if (isPercent && alpha >= 0 && alpha <= 100) {
			alpha = Math.round(255 * alpha / 100);
		} else {
			throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
		}

		alpha = (alpha | 1 << 8).toString(16).slice(1); // eslint-disable-line no-mixed-operators
	} else {
		alpha = '';
	}

	// TODO: Remove this ignore comment.
	// eslint-disable-next-line no-mixed-operators
	return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
}

;// CONCATENATED MODULE: ./src/js/post.js



jQuery(document).ready(function ($) {
  // keep track of delayed downloads
  var dload_list = [];

  function get_url_extension(url) {
    if (!url || !url.trim().length) {
      return false;
    }

    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  function findAndWrapLinks() {
    $("a").each(function () {
      var wrapped = false; // check by file extension and pre-wrap using shortcode

      var ext = get_url_extension($(this).attr('href'));

      if (ext) {
        if (dloaddelay_options['extensions'].includes(ext.toLowerCase())) {
          // console.log(ext);
          // check if wrapped already 
          if (!Boolean(this.closest(".dloaddelay-link-wrapper"))) {
            $(this).wrap('<span class="dloaddelay-link-wrapper" data-time="' + dloaddelay_options['delay_time'] + '"></span>');
          }

          wrapped = true;
        }
      } // check by className element and parents


      if (!wrapped && dloaddelay_options['download_class']) {
        if (this.classList.contains(dloaddelay_options['download_class']) || Boolean(this.closest('.' + dloaddelay_options['download_class']))) {
          $(this).wrap('<span class="dloaddelay-link-wrapper" data-time="' + dloaddelay_options['delay_time'] + '"></span>');
        }
      }
    });
  }

  if (dloaddelay_options['autowrap'] === 'true') {
    findAndWrapLinks();
  }

  $('.dloaddelay-link-wrapper').click(function (e) {
    e.preventDefault();
    var time = 0;
    var url = '';
    var is_redirect = undefined;
    url = $(this).find('a').attr('href');
    time = $(this).attr('data-time');
    is_redirect = $(this).attr('data-redirect');

    if (is_redirect === undefined) {
      // get from global options
      is_redirect = dloaddelay_options['page_redirect'] === 'true';
    } else {
      // get from element
      is_redirect = is_redirect === 'true';
    }

    if (is_redirect) {
      make_redirect(url, time);
      return;
    }

    if (!dload_list[url] || $('#' + dload_list[url]).css('display') === 'none') {
      // let parent = getParentParagraph(this);
      // let container_id = appendTimerContainer(parent, url);
      var container_id = appendTimerContainer(this, url);
      show_inpage_timer(url, time, container_id, $(this).find('a'));
    }
  });

  function getParentParagraph(element) {
    var parent;

    if ($(element).parent().prop('tagName') === "P") {
      parent = $(element).parent();
    } else {
      if ($(element).parent().hasClass('entry-content')) {
        parent = element;
      } else {
        parent = getParentParagraph($(element).parent());
      }
    }

    return parent;
  }

  function appendTimerContainer(element, url) {
    var id = ""; // generate smth unique

    var wrap_element;

    if ($('.dload-timer-wrap')) {
      $('.dload-timer-wrap').each(function () {
        if ($(this).attr('data-url') === url) {
          var _id = $(this).attr('id');

          wrap_element = this;

          if (_id === dload_list[url]) {
            id = _id;
          }
        }
      });
    }

    if (!id) {
      $(wrap_element).remove();
      id = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
      $(element).after('<div id="' + id + '" class="dload-timer-wrap" data-url="' + url + '" style="display:none"></div>');
      $('#' + id).html(dloaddelay_options['download_template']); // $('#'+id).html($('<textarea />').html(dloaddelay_options['wait_text']).text());
    }

    dload_list[url] = id; // save it to check if this link already is waiting for redirect

    return id;
  }

  function show_inpage_timer(url, time, timer_container_id, link) {
    var bg_color = rgbHex($('#' + timer_container_id).find('div.timer-container').css('background-color'));
    var contrast_color = (0,lib/* default */.Z)(bg_color);
    var font_black = contrast_color === '#000000'; // console.log("========== COLOR ==========", bg_color, font_color);

    if (font_black) {
      $('#' + timer_container_id).find('div.timer-container').addClass('font-black');
      $('#' + timer_container_id).find('.dload-timer-cd').addClass('font-black');
    } else {
      $('#' + timer_container_id).find('div.timer-container').removeClass('font-black');
      $('#' + timer_container_id).find('.dload-timer-cd').removeClass('font-black');
    }

    $('#' + timer_container_id).find('.dload-timer-cd').html(time);
    $('#' + timer_container_id).fadeIn();
    document.querySelector('#' + timer_container_id).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
    var timers = setInterval(function () {
      time--;
      $('#' + timer_container_id).find('.dload-timer-cd').html(time);

      if (time == 0) {
        // $('#'+timer_container_id).fadeOut();
        // $('#'+timer_container_id).remove();
        dload_list[url] = null;
        clearInterval(timers);
        $.get(url) // check file exists
        .done(function () {
          // exists code 
          if (dloaddelay_options['dload_newtab']) {
            window.open(url, '_blank');
          } else {
            // location.href=url;
            downloadFile(url);
          } // replace {download_link} tag


          var template = dloaddelay_options['success_template'].replaceAll("{download_link}", "<a href='".concat(url, "' download>").concat(url, "</a>"));
          $('#' + timer_container_id).html(template);
          $('#' + timer_container_id).find('.dload-timer-cd').remove();
        }).fail(function () {
          // not exists code
          $('#' + timer_container_id).html(dloaddelay_options['failed_template']);
          $('#' + timer_container_id).find('.dload-timer-cd').remove();
        });
      }
    }, 1000);
  }

  function make_redirect(url, time) {
    // generate url id
    var url_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5); // save download url and current page url to localstorage

    var item = {
      url: url,
      "return": location.href,
      time: time
    };
    localStorage.setItem('fdd_' + url_id, JSON.stringify(item)); // create custom unique link to download page using random id

    var link = document.createElement('a');
    link.href = '/download/' + url_id; // open download page in new tab

    link.target = '_blank';
    link.click();
  }

  function downloadFile(filePath) {
    var link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.substring(filePath.lastIndexOf('/') + 1);
    link.click();
  }
});
})();

/******/ })()
;