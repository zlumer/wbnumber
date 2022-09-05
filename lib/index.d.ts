import BigNumber from 'bignumber.js';
declare type NumberLike = string | number | BigNumber;
export declare type BigNumberLike = string | BigNumber;
export declare const _decimals: (decimals: number) => BigNumber;
export declare const bn: (n: NumberLike) => BigNumber;
export declare const ethToWei: (eth: NumberLike, decimals: number) => BigNumber;
export declare const weiToEth: (wei: NumberLike, decimals: number) => BigNumber;
export declare class WBN {
    decimals: number;
    wei: BigNumber;
    get eth(): BigNumber;
    private constructor();
    withWei(f: (x: BigNumber) => BigNumber): WBN;
    toWei(): string;
    toEth(decimalPlaces?: number, roundingMode?: BigNumber.RoundingMode | undefined): string;
    toString(): string;
    static fromWei(wei: BigNumberLike, decimals: number | string): WBN;
    static fromEth(eth: BigNumberLike, decimals: number): WBN;
    static isValidEthValue(eth: BigNumberLike): boolean;
    static isValidEthValueWithDecimals(eth: BigNumberLike, maxDecimals: number): boolean;
    static isValidWeiValue(wei: BigNumberLike): boolean;
}
export {};
