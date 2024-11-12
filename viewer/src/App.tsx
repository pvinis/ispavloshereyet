import { db } from "./db"
import { Message } from "./Message"
import { sortBy } from "lodash"
import { cn } from "./utils"

export function App() {
  const { isLoading, error, data } = db.useQuery({ locations: {} })

  if (error) {
    console.error(error)
    return <Message message="Error fetching data" className="text-error" />
  }

  if (isLoading) {
    return <Message message="Loading..." className="text-zinc-400" />
  }

  const { locations } = data

  const sortedLocations = sortBy(locations, "arrivedAt").reverse()
  // the locatio that the arrivedAt is closest to now, but before now.
  const currentLocationIndex = sortedLocations.findIndex(({ arrivedAt }) => {
    const arrivedAtDate = new Date(arrivedAt)
    const now = new Date()
    return arrivedAtDate < now
  })

  console.log(currentLocationIndex)

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center bg-background font-mono text-on-background">
      <ol>
        {sortedLocations.map(({ place }, index) => (
          <li
            key={index}
            className={cn(index === currentLocationIndex && "text-white")}
          >
            {place}
          </li>
        ))}
      </ol>
    </div>
  )
}

//// add turborepo
////move to vercel
