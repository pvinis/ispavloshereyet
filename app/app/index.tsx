import { useState } from "react"
import { Button, Text, TextInput, View } from "react-native"

export default function Page() {
	const [text, setText] = useState("")

	//// check location change

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
					onPress={() => {
						//// gh gist add
					}}
				/>
			</View>
		</View>
	)
}
