import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva('', {
	variants: {
		size: {
			default: 'px-2 py-0.5 text-sm',
			small: 'px-1 py-0.5 text-xs',
		},
	},
	defaultVariants: {
		size: 'default',
	},
})

type ITechBadge = {
	content?: string | React.ReactNode
	href?: string
	className?: string
} & VariantProps<typeof badgeVariants>

function TechBadge(props: ITechBadge) {
	if (props.href) {
		return (
			<Link
				target="_blank"
				href={props.href}
				className={cn(
					badgeVariants({ size: props.size }),
					'flex items-center justify-center border border-muted text-background bg-foreground rounded',
					props.className
				)}
			>
				{props.content}
			</Link>
		)
	}

	return (
		<div
			className={cn(
				badgeVariants({ size: props.size }),
				'flex items-center justify-center border border-muted text-background bg-foreground rounded',
				props.className
			)}
		>
			{props.content}
		</div>
	)
}

export default TechBadge
