import locationJson from "./location.json"

export function App() {
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
