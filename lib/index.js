"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WBN = exports.weiToEth = exports.ethToWei = exports.bn = exports._decimals = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const _10 = new bignumber_js_1.default(10);
const _DECIMALS_CACHE = [];
const _decimals = (decimals) => {
    if (!_DECIMALS_CACHE[decimals])
        _DECIMALS_CACHE[decimals] = _10.pow(decimals);
    return _DECIMALS_CACHE[decimals];
};
exports._decimals = _decimals;
const bn = (n) => bignumber_js_1.default.isBigNumber(exports.bn) ? n : new bignumber_js_1.default(n);
exports.bn = bn;
const ethToWei = (eth, decimals) => (0, exports.bn)(eth).multipliedBy((0, exports._decimals)(decimals)).integerValue(bignumber_js_1.default.ROUND_FLOOR);
exports.ethToWei = ethToWei;
const weiToEth = (wei, decimals) => (0, exports.bn)(wei).dividedBy((0, exports._decimals)(decimals));
exports.weiToEth = weiToEth;
class WBN {
    constructor(_wei, decimals) {
        this.decimals = decimals;
        this.wei = (0, exports.bn)(_wei);
    }
    get eth() {
        return (0, exports.weiToEth)(this.wei, this.decimals);
    }
    withWei(f) {
        return WBN.fromWei(f(this.wei), this.decimals);
    }
    toWei() {
        return this.wei.toFixed(0);
    }
    toEth(decimalPlaces = this.decimals, roundingMode) {
        return this.eth.toFixed(Math.min(this.decimals, decimalPlaces), roundingMode);
    }
    toString() {
        return this.toEth();
    }
    static fromWei(wei, decimals) {
        if (typeof decimals === "string")
            decimals = parseInt(decimals);
        return new WBN(wei, decimals);
    }
    static fromEth(eth, decimals) {
        return new WBN((0, exports.ethToWei)(eth, decimals), decimals);
    }
    static isValidEthValue(eth) {
        if (bignumber_js_1.default.isBigNumber(eth))
            return true;
        if (!eth)
            return false;
        return eth.match(/^[0-9]*\.?[0-9]*$/) !== null;
    }
    static isValidEthValueWithDecimals(eth, maxDecimals) {
        var _a;
        if (!this.isValidEthValue(eth))
            return false;
        const decimals = ((_a = eth.toString().split(".")[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        if (decimals > maxDecimals)
            return false;
        return true;
    }
    static isValidWeiValue(wei) {
        if (bignumber_js_1.default.isBigNumber(wei))
            return true;
        return wei.match(/^[0-9]+$/) !== null;
    }
}
exports.WBN = WBN;
