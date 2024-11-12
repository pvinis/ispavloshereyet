// import * as TaskManager from "expo-task-manager"
import { tx } from "@instantdb/react-native"
import { id } from "@instantdb/react-native"
import { DateTime } from "luxon"
import { useState } from "react"
import { Button, Text, TextInput, View } from "react-native"
import DateTimePicker from "react-native-ui-datepicker"
import { db } from "~/db"
// import {
//   Accuracy,
//   LocationObject,
//   getCurrentPositionAsync,
//   reverseGeocodeAsync,
//   startLocationUpdatesAsync,
//   useBackgroundPermissions,
//   useForegroundPermissions,
// } from "expo-location"

// const LOCATION_TASK_NAME = "background-location-task"

//   const [current, setCurrent] = useState("")
//   useEffect(() => {
//     const doIt = async () => {
//       const { data } = await octokit.gists.get({
//         gist_id: "7afe23dae3890155525554014b8cf77f",
//       })
//       setCurrent(data.files["pavlos-location-data.json"].content)
//     }
//     doIt()
//   })

//   const [fgStatus, fgRequestPermission] = useForegroundPermissions()
//   const [bgStatus, bgRequestPermission] = useBackgroundPermissions()

//   useEffect(() => {
//     const doIt = async () => {
//       if (!fgStatus?.granted) await fgRequestPermission()
//       if (!bgStatus?.granted) await bgRequestPermission()

//       // const loc = await getCurrentPositionAsync()
//       // console.log("WOWOW", loc.coords)
//       await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//         accuracy: Accuracy.Lowest,
//       })
//       ///when do we stopupdates?
//     }
//     doIt()
//   }, [fgStatus?.granted, bgStatus?.granted])


// TaskManager.defineTask<{ locations: LocationObject[] }>(
//   LOCATION_TASK_NAME,
//   ({ data: { locations }, error }) => {
//     if (error) {
//       console.log("error", error.message)
//       return
//     }

//     if (locations) {
//       console.log("locations", locations)
//       locations.forEach(async (loc, index) => {
//         const rev = await reverseGeocodeAsync(loc.coords)
//         console.log("loc", index, loc, rev[0].city, rev[0].country)
//         if (rev.length > 1) {
//           console.log("rev has more than one", rev)
//         }
//       })
//     }
//   },
// )

export default function Index() {
  const [text, setText] = useState("")

  const [arrivedAt, setArrivedAt] = useState(DateTime.now().toISO())

  return (
    <View className="flex-1 gap-4 bg-background py-safe">
      <Text className="text-3xl text-on-background">Add location</Text>
      <TextInput
        className="border-border rounded border py-2 text-xl"
        value={text}
        onChangeText={setText}
      />

      <DateTimePicker
        mode="single"
        date={arrivedAt}
        onChange={(params) => setArrivedAt(params.date)}
      />

      <Button
        title="Add"
        onPress={() => {
          db.transact([
            tx.locations[id()].update({
              place: text,
              arrivedAt,
            }),
          ])
        }}
      />
    </View>
  )
}
