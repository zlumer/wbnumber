# wbnumber

This is a `bignumber.js`-based library.

It is intended for use in web3 (crypto/blockchain) environments where it is important to always keep track of both "value" and "decimals".

## Usage

```ts
import WBN from 'wbnumber'

const amount = WBN.fromEth('1.23456789', 18)

console.log(amount.toWei()) // 1234567890000000000
```

## API

### `WBN.fromEth(valueEth: string, decimals: number): WBN`

Creates an instance of WBN from a string representing a value in ETH (fractional value after applying decimals).

Use this to parse user input.

**Example:**

```ts
export const SendTokenForm: React.FC = () =>
{
	const [selectedToken, setSelectedToken] = useState({
		name: "Ether",
		symbol: "ETH",
		decimals: 18,
	})
	const [inputValue, setInputValue] = useState("")

	const amount = WBN.fromEth(inputValue, selectedToken.decimals)

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
			<span>amount in wei: {amount.toWei()}</span>
		</div>
	)
}
```

### `WBN.fromWei(valueWei: string, decimals: number): WBN`

Creates an instance of WBN from a string representing a value in WEI (integer value before applying decimals).

Use this to parse blockchain event values etc.

```ts
type TokenTransferEvent = {
	from: string
	to: string
	value: string
}
type TokenInfo = {
	name: string
	symbol: string
	decimals: number
}
export const EventInfo: React.FC<{ event: TokenTransferEvent, token: TokenInfo }> = ({ event, token }) =>
{
	const amount = WBN.fromWei(event.value, token.decimals)

	return (
		<div>
			Sent {amount.toEth()} {token.symbol} from {event.from} to {event.to}
		</div>
	)
}
```