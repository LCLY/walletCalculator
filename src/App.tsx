import "./App.scss";
import { useState, useEffect } from "react";
import { Input } from "antd";

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
	const [priceDifference, setPriceDifference] = useState(0);
	const [differencePerct, setDifferencePerct] = useState(0);
	const [unrealizedPNL, setUnrealizedPNL] = useState(0);

	useEffect(() => {
		let movePerct = data.entryPrice / 100;

		let difference = Math.abs(data.entryPrice - data.stopLoss);
		setPriceDifference(difference);
		let differencePerct = difference / movePerct;
		setDifferencePerct(differencePerct);
		let unrealizedPNL = differencePerct * data.leverage; // in percentage e.g. 750%
		setUnrealizedPNL(unrealizedPNL);
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
						placeholder='Your total wallet size e.g. 100(USD)'
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
						{data.leverage !== "" &&
							data.walletSize !== "" &&
							data.maxLoss !== "" &&
							data.entryPrice !== "" &&
							data.stopLoss !== "" && (
								<div className='calculator__desc'>
									<div>
										1% Move =&nbsp;
										<span className='calculator__highlight'>
											${(data.entryPrice / 100).toFixed(2)}
										</span>
									</div>
									<div>
										So if entry price reaches stop loss =
										<span className='calculator__highlight'>
											${priceDifference.toFixed(2)} (
											{differencePerct.toFixed(2)}
											%)&nbsp;
										</span>
										of price movement
									</div>
									<div>
										UPNL will be{" "}
										<span className='calculator__highlight'>
											{differencePerct.toFixed(2)}[%]
										</span>{" "}
										x&nbsp;
										<span className='calculator__highlight'>
											{data.leverage}
											[x]
										</span>{" "}
										=
										<span className='calculator__highlight'>
											{unrealizedPNL.toFixed(2)}% (
											{(unrealizedPNL / 100).toFixed(2)}x)
										</span>
									</div>
									<div>
										Initial Margin Max Quota = max loss / UPNL ={" "}
										<span className='calculator__highlight'>
											{data.maxLoss}
											[%]
										</span>{" "}
										/{" "}
										<span className='calculator__highlight'>
											{((differencePerct * data.leverage) / 100).toFixed(2)}
											[x]
										</span>{" "}
										={" "}
										<span className='calculator__highlight'>
											{maxQuota.toFixed(2)}%
										</span>
									</div>
									<div>
										Max margin ={" "}
										<span className='calculator__highlight'>
											${data.walletSize}
										</span>{" "}
										x{" "}
										<span className='calculator__highlight'>
											{maxQuota.toFixed(2)}%
										</span>{" "}
										/ 100 ={" "}
										<span className='calculator__highlight'>
											${maxMargin.toFixed(2)}
										</span>
									</div>
								</div>
							)}
						<div className='calculator__result-text'>
							Initial Margin Max Quota:&nbsp;
							<span className='calculator__result-highlight'>
								{maxQuota.toFixed(2)}%
							</span>
						</div>
						<div className='calculator__result-text'>
							Maximum Margin:{" "}
							<span className='calculator__result-highlight'>
								${maxMargin.toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
