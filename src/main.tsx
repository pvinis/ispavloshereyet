import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
