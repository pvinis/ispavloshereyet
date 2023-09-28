import { useEffect, useState } from "react"
import * as TaskManager from "expo-task-manager"
import { Octokit } from "@octokit/rest"
import { Button, Text, TextInput, View } from "react-native"
import {
	Accuracy,
	LocationObject,
	getCurrentPositionAsync,
	reverseGeocodeAsync,
	startLocationUpdatesAsync,
	useBackgroundPermissions,
	useForegroundPermissions,
} from "expo-location"

const octokit = new Octokit({ auth: process.env.EXPO_PUBLIC_GH_TOKEN })

const LOCATION_TASK_NAME = "background-location-task"

export default function Page() {
	const [text, setText] = useState("")

	const [current, setCurrent] = useState("")
	useEffect(() => {
		const doIt = async () => {
			const { data } = await octokit.gists.get({
				gist_id: "7afe23dae3890155525554014b8cf77f",
			})
			setCurrent(data.files["pavlos-location-data.json"].content)
		}
		doIt()
	})

	const [fgStatus, fgRequestPermission] = useForegroundPermissions()
	const [bgStatus, bgRequestPermission] = useBackgroundPermissions()

	useEffect(() => {
		const doIt = async () => {
			if (!fgStatus?.granted) await fgRequestPermission()
			if (!bgStatus?.granted) await bgRequestPermission()

			// const loc = await getCurrentPositionAsync()
			// console.log("WOWOW", loc.coords)
			await startLocationUpdatesAsync(LOCATION_TASK_NAME, { accuracy: Accuracy.Lowest })
			///when do we stopupdates?
		}
		doIt()
	}, [fgStatus?.granted, bgStatus?.granted])

	return (
		<View>
			<View>
				<Text className="text-[#38434D] text-3xl">Add location</Text>
				<TextInput
					className="border-2 border-[#38434D] rounded-md"
					value={text}
					onChangeText={setText}
				/>

				<Button
					title="Add"
					onPress={async () => {
						const newContent = JSON.parse(current)
						newContent["version-1"].locations = [text, ...newContent["version-1"].locations]

						await octokit.gists.update({
							gist_id: "7afe23dae3890155525554014b8cf77f",
							files: {
								"pavlos-location-data.json": { content: JSON.stringify(newContent, null, 2) },
							},
						})
					}}
				/>
				<Text>{current}</Text>
			</View>
		</View>
	)
}

TaskManager.defineTask<{ locations: LocationObject[] }>(
	LOCATION_TASK_NAME,
	({ data: { locations }, error }) => {
		if (error) {
			console.log("error", error.message)
			return
		}

		if (locations) {
			console.log("locations", locations)
			locations.forEach(async (loc, index) => {
				const rev = await reverseGeocodeAsync(loc.coords)
				console.log("loc", index, loc, rev[0].city, rev[0].country)
				if (rev.length > 1) {
					console.log("rev has more than one", rev)
				}
			})
		}
	}
)

/// sentry/segment?
/// make release testflight
