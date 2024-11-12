import { init } from "@instantdb/react"
import { ISODateString } from "./types"

type Schema = {
	locations: {
		place: string
		arrivedAt: ISODateString
	}
}

export const db = init<Schema>({
	appId: "19a74fad-044b-4faf-a492-1c9acee9bd59",
})
