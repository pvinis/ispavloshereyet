/* @jsx jsx */
import { jsx } from "@emotion/react";
import React, { memo, useRef } from "react"
import {DateTime} from "luxon"
import humanizeDuration from "humanize-duration"
import {useState, useEffect } from "react"
import {useSpring, animated} from 'react-spring'
import {sample, keep, over, drop} from "lodash"
import createPersistedState from 'use-persisted-state'
import Confetti from 'react-confetti'
import { useWindowSize, useMedia } from "react-use"
import Reward from 'react-rewards';
import { sendMessage } from "./Tracking";
import twemoji from 'twemoji'

const useCollectedEmojiState = createPersistedState("collected-emoji")


const target = DateTime.local(2020, 12, 20, 15, 2).setZone('Europe/Amsterdam', {keepLocalTime: true})

const emojis = ["😻", "😺", "🤩", "🍑", "✨", "🚅", "yo!", "💜", "(⊃｡•́‿•̀｡)⊃", "💝", "UwU", "🥺👉👈", "🥰", "יאללה", "פרה פרה", "ואז אני מחבק אותך", "👫", "¯\\ヽ(´ー｀)ノ/¯", "🤞","but im on my way AaaAaaAAAaaaaaaAA!!!11!1"]
const safeEmojis = ["😻", "😺", "🤩", "🍑", "✨", "🚅", "💜", "💝", "🥰", "👫", "🤞"]
const safeMultiEmojis = ["🥺👉👈"]
let randomEmoji

export const App=()=> {

	const isPhone = useMedia('(max-width: 600px)')
	const rewardRef = useRef()
	const { width, height} = useWindowSize()
	const [collectedEmojis, setCollectedEmojis] = useCollectedEmojiState([])
	useEffect(()=> {
		let emojisToPickFrom = emojis.filter(x => !collectedEmojis.includes(x))
		if (emojisToPickFrom.length === 0) emojisToPickFrom = emojis

		randomEmoji = sample(emojisToPickFrom)
		setCollectedEmojis(emojis.filter(x => [...collectedEmojis, randomEmoji].includes(x)))
	}, [])
	const [overrideEmoji, setOverrideEmoji] = useState(null)

	useEffect(() => {
		sendMessage()
	}, [])
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

	const shownEmoji = overrideEmoji ?? randomEmoji
	let Comp = null
	if (safeEmojis.includes(shownEmoji)) {
		const im = twemoji.parse(shownEmoji)
		const imsrc = im.split(' ').filter(x => x.startsWith("src"))[0].split('"')[1]
		Comp = () => <img style={{ height: '1em', verticalAlign: '-0.125em'}} src={imsrc} />
	} else if (safeMultiEmojis.includes(shownEmoji)) {
		const ims = shownEmoji.split().map(x => twemoji.parse(x))[0]
		const imsrcs = drop(ims.split('<img'),1).map(y => y.split(' ').filter(x => x.startsWith("src"))[0].split('"')[1])
	Comp = () => <>{imsrcs.map(x => <img key={x} style={{ height: '1em',  verticalAlign: '-0.125em'}} src={x} />)}</>
	} else {
		Comp = () => <span>{shownEmoji}</span>
	}

	const fontSizes= isPhone ? {
big: 70,
medium: 60,
small: 26,
	} : {
		big: 80,
		medium: 60,
		small: 40,
	}

	return (
		<div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: color, display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
			{targetHasPast ? (
				<div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
				<Confetti
					width={width}
					height={height}
				/>
				<Confetti
					width={width}
					height={height}
					gravity={-0.1}
					confettiSource={{x: 0, y: height, w: width, h: 0}}
				/>
				{/* <Confetti
					width={width}
					height={height}
					confettiSource={{x: width/2, y: height/2+300}}
				/> */}
				<Reward type="emoji" ref={rewardRef} config={{
				elementSize: 100,
				spread: 300,
				angle: Math.floor(Math.random()*360)
				}}>
					<animated.p style={{fontSize: fontSizes.big, fontFamily: 'Iosevka Web', fontWeight: 900,
						transform: x.interpolate(x => `scale(${x})`),
						cursor: "default",
						userSelect: "none",
					}}
						onClick={()=>{
							rewardRef.current.rewardMe()
							}}
					>YES!!</animated.p>
				</Reward>
			<p style={{fontFamily: "Iosevka Web"}}>💝 Go give him hugs and kisses! He'll love it! 💝</p>
				</div>
			) : (
				<>
					<p style={{fontSize: fontSizes.medium, fontFamily: 'Iosevka Web', fontWeight: 500, transform: "rotate(8deg)"}}>Not yet,</p>
					<p css={{fontSize: fontSizes.small, fontFamily: 'Iosevka Web'}}>
						<span>but only </span>
						{isPhone && <br />}
						<animated.span style={{
							fontWeight: 400,
							fontSize: slowX
								.interpolate({
									range:  [ 0, 0.25, 0.50, 0.75,  1],
									output: [10,   12,   10,   12, 10].map(n => fontSizes.small+n),
        						})
						}}>{diff}</animated.span>
						{isPhone && <br />}
						<span> left </span>
							 <Comp />
					</p>
			<p />
			<p style={{fontFamily: "Iosevka Web"}}>Collected endings: {collectedEmojis.length}/{emojis.length}</p>
			<div style={{display: "flex", flexDirection: "row", flexWrap:'wrap' }}>
				{emojis
				.map(f => {
					if ([...collectedEmojis, randomEmoji].includes(f)) {
						const shownEmoji = f
	let Comp = null
	if (safeEmojis.includes(shownEmoji)) {
		const im = twemoji.parse(shownEmoji)
		const imsrc = im.split(' ').filter(x => x.startsWith("src"))[0].split('"')[1]
		Comp = () => <img style={{ height: '1em', verticalAlign: '-0.125em'}} src={imsrc} />
	} else if (safeMultiEmojis.includes(shownEmoji)) {
		const ims = shownEmoji.split().map(x => twemoji.parse(x))[0]
		const imsrcs = drop(ims.split('<img'),1).map(y => y.split(' ').filter(x => x.startsWith("src"))[0].split('"')[1])
	Comp = () => <>{imsrcs.map(x => <img key={x} style={{ height: '1em',  verticalAlign: '-0.125em'}} src={x} />)}</>
	} else {
		Comp = () => <span>{shownEmoji}</span>
	}
						return {Comp, x: f}
					}
					return {Comp: null, x: null}
				})
				.map(({Comp, x}) => (
					<div
						style={{border:`1px solid ${x === shownEmoji ? "white" : "black"}`, margin: 6}}
					>
					<p
						style={{fontFamily: "Iosevka Web", margin: 2, cursor: "default"}}
						onClick={()=>{
							if (x !== null) setOverrideEmoji(x)
							}}
					>{x !== null ? <Comp /> : "?"}</p>
					</div>
				))}
			</div>
				</>
			)}
		</div>
	)
}


