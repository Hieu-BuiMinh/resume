import Link from 'next/link'
import React from 'react'

import TechBadge from '@/components/common/mdx/custom-components/tech-badge'

interface IProjectBlock {
	title?: { text?: string; href?: string; subTitle?: string | React.ReactNode }
	description?: string | React.ReactNode
	techStacks?: { text?: string; href?: string }[]
	time?: string
}

function ProjectBlock({ description, title, techStacks, time }: IProjectBlock) {
	return (
		<div className="rounded-lg bg-card text-card-foreground flex h-full flex-col justify-between gap-2 overflow-hidden border p-3">
			<Link target="_blank" href={title?.href || ''} className="flex gap-2 items-center">
				<div className="">{title?.text}</div>
				<span className="size-1 rounded-full bg-green-500" aria-label="Active project indicator"></span>
			</Link>

			<div className="text-sm font-semibold">{title?.subTitle}</div>

			<div className="text-sm text-muted-foreground">{description}</div>

			<div className="flex flex-wrap gap-2 mt-2">
				{techStacks?.map((tech) => {
					return (
						<TechBadge
							className="not-prose border border-foreground/40 bg-transparent text-foreground/70 hover:text-foreground transition-colors"
							size="small"
							content={tech?.text}
							href={tech?.href}
							key={tech?.text}
						/>
					)
				})}
			</div>

			<div className="flex items-center justify-end text-foreground/60 text-sm">{time}</div>
		</div>
	)
}

export default ProjectBlock
