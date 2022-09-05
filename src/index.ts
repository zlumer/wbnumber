import BigNumber from 'bignumber.js'

type NumberLike = string | number | BigNumber

export type BigNumberLike = string | BigNumber

const _10 = new BigNumber(10)
const _DECIMALS_CACHE: BigNumber[] = []
export const _decimals = (decimals: number) =>
{
	if (!_DECIMALS_CACHE[decimals])
		_DECIMALS_CACHE[decimals] = _10.pow(decimals)
	
	return _DECIMALS_CACHE[decimals]
}

export const bn = (n: NumberLike) => BigNumber.isBigNumber(bn) ? n as BigNumber : new BigNumber(n)

export const ethToWei = (eth: NumberLike, decimals: number) =>
	bn(eth).multipliedBy(_decimals(decimals)).integerValue(BigNumber.ROUND_FLOOR)

export const weiToEth = (wei: NumberLike, decimals: number) =>
	bn(wei).dividedBy(_decimals(decimals))

export class WBN
{
	public wei: BigNumber

	public get eth()
	{
		return weiToEth(this.wei, this.decimals)
	}
	
	private constructor(_wei: BigNumberLike, public decimals: number)
	{
		this.wei = bn(_wei)
	}

	withWei(f: (x: BigNumber) => BigNumber)
	{
		return WBN.fromWei(f(this.wei), this.decimals)
	}

	toWei(): string
	{
		return this.wei.toFixed(0)
	}
	toEth(decimalPlaces: number = this.decimals, roundingMode?: BigNumber.RoundingMode | undefined): string
	{
		return this.eth.toFixed(Math.min(this.decimals, decimalPlaces), roundingMode)
	}

	toString()
	{
		return this.toEth()
	}

	static fromWei(wei: BigNumberLike, decimals: number | string)
	{
		if (typeof decimals === "string")
			decimals = parseInt(decimals)
		
		return new WBN(wei, decimals)
	}
	static fromEth(eth: BigNumberLike, decimals: number)
	{
		return new WBN(ethToWei(eth, decimals), decimals)
	}
	static isValidEthValue(eth: BigNumberLike)
	{
		if (BigNumber.isBigNumber(eth))
			return true

		if (!eth)
			return false

		return eth.match(/^[0-9]*\.?[0-9]*$/) !== null
	}
	static isValidEthValueWithDecimals(eth: BigNumberLike, maxDecimals: number)
	{
		if (!this.isValidEthValue(eth))
			return false
		
		const decimals = eth.toString().split(".")[1]?.length || 0
		if (decimals > maxDecimals)
			return false

		return true
	}
	static isValidWeiValue(wei: BigNumberLike)
	{
		if (BigNumber.isBigNumber(wei))
			return true

		return wei.match(/^[0-9]+$/) !== null
	}
}
