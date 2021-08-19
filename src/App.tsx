import "./App.scss";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";

function App() {
	interface IData {
		leverage: any;
		walletSize: any;
		maxLoss: any;
		entryPrice: any;
		stopLoss: any;
	}
	const [data, setData] = useState<IData>({
		leverage: "",
		walletSize: "",
		maxLoss: "",
		entryPrice: "",
		stopLoss: "",
	});

	const [maxMargin, setMaxMargin] = useState(0);
	const [maxQuota, setMaxQuota] = useState(0);

	useEffect(() => {
		let movePerct = data.entryPrice / 100;

		let difference = Math.abs(data.entryPrice - data.stopLoss);
		let differencePerct = difference / movePerct;
		let unrealizedPNL = differencePerct * data.leverage; // in percentage e.g. 750%
		let maxMargin = data.maxLoss / (unrealizedPNL / 100);
		if (
			data.leverage !== "" &&
			data.walletSize !== "" &&
			data.maxLoss !== "" &&
			data.entryPrice !== "" &&
			data.stopLoss !== ""
		) {
			setMaxMargin((maxMargin * data.walletSize) / 100);
			setMaxQuota(maxMargin);
		}
	}, [data]);

	return (
		<div className='App'>
			<div className='calculator__outerdiv'>
				<h1 className='calculator__title'>Wallet Risk Management Calculator</h1>
				<div>
					<Input
						className='calculator__input'
						addonBefore='Leverage'
						value={data.leverage}
						type='number'
						placeholder='Your Leverage e.g. 10x'
						onChange={(e) =>
							setData({ ...data, leverage: parseFloat(e.target.value) })
						}
					/>
					<Input
						type='number'
						className='calculator__input'
						addonBefore='Wallet Size'
						placeholder='Your total wallet size'
						value={data.walletSize}
						onChange={(e) =>
							setData({ ...data, walletSize: parseFloat(e.target.value) })
						}
					/>
					<Input
						type='number'
						className='calculator__input'
						addonBefore='Max Loss'
						placeholder='Maximum loss of the whole wallet you are willing to accept'
						value={data.maxLoss}
						onChange={(e) =>
							setData({ ...data, maxLoss: parseFloat(e.target.value) })
						}
					/>
					<Input
						type='number'
						className='calculator__input'
						addonBefore='Entry Price'
						placeholder='Entry price of the asset'
						value={data.entryPrice}
						onChange={(e) =>
							setData({ ...data, entryPrice: parseFloat(e.target.value) })
						}
					/>
					<Input
						type='number'
						className='calculator__input'
						addonBefore='Stop Loss'
						placeholder='Stop loss target of the asset'
						value={data.stopLoss}
						onChange={(e) =>
							setData({ ...data, stopLoss: parseFloat(e.target.value) })
						}
					/>
					<div className='calculator__result'>
						<h2>Result:</h2>
						<div >Initial Margin Max Quota: {maxQuota.toFixed(2)}%</div>
						<div>Maximum Margin: ${maxMargin.toFixed(2)}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
