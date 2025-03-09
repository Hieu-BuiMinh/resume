'use client'

import * as LucideIcons from 'lucide-react'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import * as runtime from 'react/jsx-runtime'

import { SVGIcons } from '@/components/common/icons/svg-icons'
import CloudinaryImage from '@/components/common/image/cloudinary-image'
import ImageZoom from '@/components/common/image/image-zoom'
import Heading from '@/components/common/mdx/custom-components/heading'
import VideoZoom from '@/components/common/video/video-zoom'
import { cn } from '@/lib/utils'

const useMDXComponent = (code: string) => {
	if (!code) {
		return
	}
	const fn = new Function(code)
	return fn({ ...runtime })?.default
}

const components = {
	h2: (props: React.ComponentPropsWithoutRef<'h2'>) => <Heading as="h2" {...props} />,
	h3: (props: React.ComponentPropsWithoutRef<'h3'>) => <Heading as="h3" {...props} />,
	h4: (props: React.ComponentPropsWithoutRef<'h4'>) => <Heading as="h4" {...props} />,
	h5: (props: React.ComponentPropsWithoutRef<'h5'>) => <Heading as="h5" {...props} />,
	h6: (props: React.ComponentPropsWithoutRef<'h6'>) => <Heading as="h6" {...props} />,
	a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
		const { children, href, ...rest } = props

		if (!href) {
			return (
				<span className="text-muted-foreground line-through transition-colors hover:text-foreground" {...rest}>
					{children}
				</span>
			)
		}

		return (
			<Link
				className="font-bold text-green-600 no-underline transition-colors hover:text-foreground hover:underline dark:text-green-400"
				href={href}
				{...rest}
			>
				{children}
			</Link>
		)
	},
	Image: (props: React.ComponentPropsWithoutRef<typeof ImageZoom>) => {
		const { alt, className, ...rest } = props

		return (
			<>
				<ImageZoom
					className={cn('h-[530px] rounded-lg border-muted border', className)}
					alt={alt || ''}
					width={1200}
					height={630}
					{...rest}
				/>
				{alt && <figcaption className="mt-2 text-center">{alt}</figcaption>}
			</>
		)
	},
	LucideIcons,
	CloudinaryImage,
	SVGIcons,
	VideoZoom,
}

interface MdxProps {
	code: string
}

export function MDXContent({ code }: MdxProps) {
	const Component = useMDXComponent(code)
	if (!code) {
		return <p className="py-5">The content is on updating 🧪...</p>
	}
	return <Component components={components} key={nanoid()} />
}
