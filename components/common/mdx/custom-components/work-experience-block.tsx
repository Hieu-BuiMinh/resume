import Link from 'next/link'
import React from 'react'

import TechBadge from '@/components/common/mdx/custom-components/tech-badge'

interface IWorkExperienceBlock {
	title?: { text?: string; href?: string; subTitle?: string | React.ReactNode }
	time?: string | React.ReactNode
	description?: string | React.ReactNode
	techStacks?: { text?: string; href?: string }[]
}

function WorkExperienceBlock({ description, techStacks, time, title }: IWorkExperienceBlock) {
	return (
		<div className="flex flex-col gap-2 group">
			<div className="flex items-center justify-between">
				{title?.href ? (
					<Link
						target="_blank"
						className="text-green-600 transition-colors hover:text-foreground hover:underline dark:text-green-400"
						href={title?.href || ''}
					>
						{title?.text}
					</Link>
				) : (
					<div className="font-semibold text-green-600 no-underline transition-colors hover:text-foreground hover:underline dark:text-green-400">
						{title?.text}
					</div>
				)}

				<div className="text-sm text-muted-foreground">{time}</div>
			</div>
			<div className="text-sm text-muted-foreground font-semibold">{title?.subTitle}</div>

			{description}

			<div className="flex flex-wrap gap-2">
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
		</div>
	)
}

export default WorkExperienceBlock
