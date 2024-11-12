import { ClassName } from "./types"

interface MessageProps extends ClassName {
	message: string
}

export function Message({ message, className }: MessageProps) {
	return (
		<div className="absolute flex h-full w-full flex-col items-center justify-center bg-background font-mono">
			<h1 className={className}>{message}</h1>
		</div>
	)
}
