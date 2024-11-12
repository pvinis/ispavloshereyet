import { ExpoConfig } from "expo/config"

const config: ExpoConfig = {
	name: "ispavloshereyet",
	slug: "ispavloshereyet",
	scheme: "ispavloshereyet",
	icon: "./assets/icon.png",
	version: "0.4.0",
	newArchEnabled: true,
	orientation: "portrait",
	userInterfaceStyle: "automatic",
	ios: {
		config: { usesNonExemptEncryption: false },
	},
	plugins: ["expo-router"],
}
export default config
