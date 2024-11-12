import { db } from "./db"
import { Message } from "./Message"

export function App() {
  const { isLoading, error, data } = db.useQuery({ locations: {} })

  if (error)
    return <Message message="Error fetching data" className="text-error" />

  if (isLoading)
    return <Message message="Loading..." className="text-zinc-400" />

  return (
    <div className="bg-background text-on-background absolute flex h-full w-full flex-col items-center justify-center font-mono">
      <ol>
        {data.locations.map(({ place }, index) => (
          <li key={index} className="first:text-white">
            {place}
          </li>
        ))}
      </ol>
    </div>
  )
}

//// add turborepo
////move to vercel
