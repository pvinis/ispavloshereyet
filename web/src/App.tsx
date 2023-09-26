import { useFetch } from "usehooks-ts"
import locationJson from "./location.json"

const locationDataUrl =
	"https://gist.githubusercontent.com/pvinis/7afe23dae3890155525554014b8cf77f/raw/ba73c5386170c763bc00cb4cf02e8481bab002bb/pavlos-location-data.json"

export function App() {
	const { data, error } = useFetch(locationDataUrl)

	if (error) {
		return (
			<div className="absolute w-full h-full bg-slate-600 flex items-center justify-center flex-col font-mono">
				<div className="text-red-500">Error fetching data</div>
			</div>
		)
	}

	if (!data) {
		return (
			<div className="absolute w-full h-full bg-slate-600 flex items-center justify-center flex-col font-mono">
				<div className="text-gray-400">Loading...</div>
			</div>
		)
	}

	return (
		<div className="absolute w-full h-full bg-slate-600 flex items-center justify-center flex-col font-mono">
			<ol className="text-gray-400">
				{locationJson["version-1"].locations.map((location, index) => (
					<li key={index} className="first:text-white">
						{location}
					</li>
				))}
			</ol>
		</div>
	)
}
