/* @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react"
import { useEffect } from "react"
import {  useMedia } from "react-use"
import { sendMessage } from "./Tracking";



export const App=()=> {

	const isPhone = useMedia('(max-width: 600px)')

	useEffect(() => {
		sendMessage()
	}, [])


	const color = "magenta"


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
			<p style={{fontFamily: "Iosevka Web"}}>💝 Not right now, but soon again 💝</p>
		</div>
	)
}
