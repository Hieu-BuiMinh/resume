import type { ReactNode } from 'react'
import React, { createContext, memo, useContext } from 'react'

import { cn } from '@/lib/utils'

interface TimelineContextType {
	activeItemIndexs: number[] | null
	setActiveItemIndexs: (index: number[] | null) => void
	bulletSize?: number
	lineWidth?: number
	color?: string
}

const TimelineContext = createContext<TimelineContextType | undefined>(undefined)

interface CompoundTimelineProps {
	children: ReactNode
	active?: number[] | null
	bulletSize?: number
	lineWidth?: number
	className?: string
	color?: string
}

function CompoundTimeline({
	children,
	active = null,
	bulletSize = 20,
	lineWidth = 2,
	className,
	color,
}: CompoundTimelineProps) {
	const [activeItemIndexs, setActiveItemIndexs] = React.useState<number[] | null>(active)

	return (
		<TimelineContext.Provider value={{ activeItemIndexs, setActiveItemIndexs, bulletSize, lineWidth, color }}>
			<div className={cn({ className })}>{children}</div>
		</TimelineContext.Provider>
	)
}

interface TimelineItemProps {
	children?: ReactNode
	className?: string
	index: number
	bullet?: ReactNode
	title?: string
	lineVariant?: 'dashed' | 'dotted' | 'solid'
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TimelineItem({ children, className, index, bullet, title, lineVariant = 'solid' }: TimelineItemProps) {
	const timelineContext = useContext(TimelineContext)

	if (!timelineContext) {
		throw new Error('TimelineItem must be used within a TimelineProvider')
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { activeItemIndexs, setActiveItemIndexs, bulletSize, lineWidth, color } = timelineContext

	return (
		<div className={cn({ className, '': activeItemIndexs?.includes(index) }, 'relative pl-5 mb-4 last:mb-0')}>
			<span
				style={{
					width: bulletSize,
					height: bulletSize,
					borderWidth: lineWidth,
					borderColor: activeItemIndexs?.includes(index) ? color : '',
				}}
				className={cn(
					`absolute top-0 left-0 size-[${bulletSize}px] -translate-x-[calc(50%-0.65px)] border border-muted rounded-full bg-background flex items-center justify-center z-10 overflow-hidden`
				)}
			>
				{bullet}
			</span>
			<span
				style={{
					borderLeftWidth: lineWidth,
					borderStyle: lineVariant,
					borderColor: activeItemIndexs?.includes(index) ? color : '',
				}}
				className={`absolute left-0 top-0 bottom-0 h-[calc(100%+1rem)] border-l border-muted`}
			/>
			{children}
		</div>
	)
}

//============================================

interface MemoizedCompoundTimelineType extends React.MemoExoticComponent<typeof CompoundTimeline> {
	Item: typeof TimelineItem
}

const Timeline = memo(CompoundTimeline) as unknown as MemoizedCompoundTimelineType

CompoundTimeline.Item = TimelineItem

export { Timeline, TimelineItem }
