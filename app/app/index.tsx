import { useEffect, useState } from "react"
import { Octokit } from "@octokit/rest"
import { Button, Text, TextInput, View } from "react-native"

const octokit = new Octokit({ auth: process.env.EXPO_PUBLIC_GH_TOKEN })

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
	///// check location change

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
