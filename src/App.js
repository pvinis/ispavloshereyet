import {DateTime} from "luxon"
import humanizeDuration from "humanize-duration"
import {useState, useEffect } from "react"
import {useSpring, animated} from 'react-spring'


const target = DateTime.local(2020, 12, 23, 12, 32).setZone('Europe/Amsterdam', {keepLocalTime: true})


export const App=()=> {
	const [ticker, updateTicker] = useState(0)
	useEffect(() => {
		const intervalId = setInterval(() => {
			updateTicker(t => t+1)
		}, 1000)
		return () => clearInterval(intervalId)
	}, [])

	const [targetHasPast, setTargetHasPast] = useState(target <= DateTime.local())
	const [diff, setDiff] = useState(humanizeDuration(target.diffNow().as("milliseconds"), {largest: 2, maxDecimalPoints: 0}))

	const updateStuff = () => {
		setTargetHasPast(target <= DateTime.local())
		setDiff(humanizeDuration(target.diffNow().as("milliseconds"), {largest: 2, maxDecimalPoints: 0, units: ["d", "h", "m", "s"]}))
	}

	useEffect(() => updateStuff(), [ticker])

	const color = targetHasPast ? "#77dd77" : "#ff6961"

	const props = useSpring({fontSize: ticker % 2 === 0 ? 60 : 50 })

	return (
		<div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: color, display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
			{targetHasPast ? (
					<p style={{fontSize: 80, fontFamily: 'Iosevka Web', fontWeight: 900}}>YES!!</p>
			) : (
				<>
					<p style={{fontSize: 60, fontFamily: 'Iosevka Web', fontWeight: 500, transform: "rotate(8deg)"}}>Not yet,</p>
					<p style={{fontSize: 40, fontFamily: 'Iosevka Web'}}>
						<span>but only </span>
						<animated.span style={{fontWeight: 400, fontSize: props.fontSize}}>{diff}</animated.span>
						<span> left</span>
					</p>
				</>
			)}
		</div>
	)
}
