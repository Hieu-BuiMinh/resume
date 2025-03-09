'use client'

import { forwardRef, useEffect, useRef } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'

type TVideoProps = {
	src: string
	width: number
	height: number
} & React.ComponentPropsWithoutRef<'video'>

const Video = forwardRef<HTMLVideoElement, TVideoProps>((props, ref) => {
	const { src, width, height, controls = true, className, ...rest } = props

	const videoRef = useRef<HTMLVideoElement>(null)

	const combinedRef = ref || videoRef

	useEffect(() => {
		if (combinedRef && 'current' in combinedRef && combinedRef.current) {
			combinedRef.current.volume = 0.5
			combinedRef.current.autoplay = true
		}
	}, [combinedRef, videoRef, ref])

	return (
		<AspectRatio ratio={16 / 9}>
			<video
				className={cn('rounded-lg shadow-lg border border-muted', className)}
				loop
				ref={combinedRef}
				src={src}
				controls={controls}
				width={width}
				height={height}
				{...rest}
			/>
		</AspectRatio>
	)
})

Video.displayName = 'Video'

export default Video
