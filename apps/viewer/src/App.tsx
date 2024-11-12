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
      <ol className="space-y-3">
        {sortedLocations.map(({ place }, index) => (
          <li
            key={index}
            className={cn(
              "group relative cursor-default transition-colors duration-200",
              // Current location
              index === currentLocationIndex &&
                "hover:motion-preset-blur-right text-xl font-bold text-white",
              // Upcoming locations
              index < currentLocationIndex &&
                "text-emerald-400 hover:text-blue-400",
              // Past locations
              index > currentLocationIndex &&
                "text-sm text-zinc-800 hover:text-zinc-400",
            )}
          >
            {index === currentLocationIndex ? (
              <span className="-ml-4">→ {place}</span>
            ) : (
              place
            )}
            {index < currentLocationIndex && (
              <span className="absolute left-full ml-2 text-sm text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100">
                soon!
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

