/* @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react"
import {DateTime} from "luxon"
import humanizeDuration from "humanize-duration"
import {useState, useEffect } from "react"
import {useSpring, animated} from 'react-spring'
import {sample, keep} from "lodash"
import createPersistedState from 'use-persisted-state'

const useCollectedEmojiState = createPersistedState("collected-emoji")


const target = DateTime.local(2020, 12, 23, 12, 32).setZone('Europe/Amsterdam', {keepLocalTime: true})

const emojis = ["😻", "😺", "🤩", "🍑", "✨", "🚅", "yo!", "💜", "(⊃｡•́‿•̀｡)⊃", "💝"]
const randomEmoji = sample(emojis)

export const App=()=> {
	const [collectedEmojis, setCollectedEmojis] = useCollectedEmojiState([])
	useEffect(()=> {
		setCollectedEmojis(emojis.filter(x => [...collectedEmojis, randomEmoji].includes(x)))
	}, [])
	const [overrideEmoji, setOverrideEmoji] = useState(null)

	const [ticker, updateTicker] = useState(0)
	const [slowerTicker, updateSlowerTicker] = useState(0)
	useEffect(() => {
		const intervalId = setInterval(() => {
			updateTicker(t => t+1)
			if (ticker % 2 === 0) {
				updateSlowerTicker(t => t+1)
			}
		}, 1000)
		return () => clearInterval(intervalId)
	}, [ticker])

	const [targetHasPast, setTargetHasPast] = useState(target <= DateTime.local())
	const [diff, setDiff] = useState(humanizeDuration(target.diffNow().as("milliseconds"), {largest: 2, maxDecimalPoints: 0}))

	const updateStuff = () => {
		setTargetHasPast(target <= DateTime.local())
		setDiff(humanizeDuration(target.diffNow().as("milliseconds"), {largest: 2, maxDecimalPoints: 0, units: ["d", "h", "m", "s"]}))
	}

	useEffect(() => updateStuff(), [ticker])

	const color = targetHasPast ? "#77dd77" : "#ff6961"

	const {x} = useSpring({x: ticker % 2 === 0 ? 5 : 0.5, config: {duration: 1000}})
	const {slowX} = useSpring({slowX: slowerTicker % 2 === 0 ? 1 : 0, config: {duration: 400}})


	return (
		<div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: color, display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
			{targetHasPast ? (
					<animated.p style={{fontSize: 80, fontFamily: 'Iosevka Web', fontWeight: 900,
						transform: x.interpolate(x => `scale(${x})`),
					}}>YES!!</animated.p>
			) : (
				<>
					<p style={{fontSize: 60, fontFamily: 'Iosevka Web', fontWeight: 500, transform: "rotate(8deg)"}}>Not yet,</p>
					<p css={{fontSize: 40, fontFamily: 'Iosevka Web'}}>
						<span>but only </span>
						<animated.span style={{
							fontWeight: 400,
							fontSize: slowX
								.interpolate({
									range:  [ 0, 0.25, 0.50, 0.75,  1],
									output: [50,   52,   50,   52, 50],
        						})
						}}>{diff}</animated.span>
						<span> left {overrideEmoji ?? randomEmoji}</span>
					</p>
				</>
			)}
			<p />
			<p style={{fontFamily: "Iosevka Web"}}>Collected endings: {collectedEmojis.length}/{emojis.length}</p>
			<div style={{display: "flex", flexDirection: "row"}}>
				{collectedEmojis.map(x => (
					<>
					<p
						style={{fontFamily: "Iosevka Web", margin: 6, cursor: "default"}}
						onClick={()=>{setOverrideEmoji(x)}}
					>{x}</p>
					</>
				))}
			</div>
		</div>
	)
}
