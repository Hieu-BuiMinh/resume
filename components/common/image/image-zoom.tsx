'use client'
import type Image from 'next/image'
import React, { forwardRef } from 'react'

import BlurImage from '@/components/common/image/blur-image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type IImageZoomProps = {
	description?: string | React.ReactNode
	imageClassName?: string
	lazy?: boolean
} & React.ComponentPropsWithoutRef<typeof Image>

const ImageZoom = forwardRef<HTMLImageElement, IImageZoomProps>((props, ref) => {
	const { ...rest } = props

	return (
		<Dialog>
			<DialogTitle className="hidden" />
			<DialogTrigger asChild role="button">
				<BlurImage
					ref={ref}
					className={cn('h-[495px]', rest.className)}
					width={1200}
					height={630}
					quality={100}
					{...rest}
				/>
			</DialogTrigger>
			<DialogContent className="h-[75vh] max-w-screen-sm overflow-hidden p-0 md:max-w-screen-md lg:max-w-screen-xl border-none">
				<BlurImage
					{...rest}
					className="aspect-video size-full"
					width={1080}
					height={1200}
					src={rest.src}
					imageClassName="object-contain"
					quality={100}
					description=""
				/>
			</DialogContent>
		</Dialog>
	)
})

ImageZoom.displayName = 'Image'

export default ImageZoom
