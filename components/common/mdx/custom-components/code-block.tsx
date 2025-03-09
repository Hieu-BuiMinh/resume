'use client'

import '../style/code-block.css'

import { CheckIcon, CopyIcon } from 'lucide-react'
import { JetBrains_Mono } from 'next/font/google'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { LangIcons } from '@/components/common/icons/lang-icons'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const JetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

type CodeBlockProps = {
	figureClassName?: string
	fileName?: string
	caption?: string
	children: React.ReactNode
} & React.ComponentPropsWithoutRef<'pre'>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>((props, ref) => {
	const { children, className, fileName, figureClassName, ...rest } = props

	const textInput = useRef<HTMLPreElement>(null)

	const onCopy = () => {
		void navigator.clipboard.writeText(textInput.current?.textContent ?? '')
	}

	return (
		<figure
			className={cn(
				'not-prose group relative my-1 overflow-hidden rounded-sm border text-sm',
				JetBrainsMono.className,
				figureClassName
			)}
		>
			{fileName ? (
				<div className="flex flex-row items-center gap-2 border-b bg-muted/50 px-3 py-1 text-xs">
					<div className="text-muted-foreground">
						<LangIcons fileName={fileName} />
					</div>
					<figcaption className="flex-1 truncate text-muted-foreground">{fileName}</figcaption>
					<CopyButton onCopy={onCopy} />
				</div>
			) : (
				<CopyButton className="absolute right-4 top-3 z-10" onCopy={onCopy} />
			)}

			<ScrollArea className="!rounded-none">
				<pre ref={textInput} className={cn(JetBrainsMono.className, className)} {...rest}>
					{children}
				</pre>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</figure>
	)
})

type CopyButtonProps = {
	onCopy: () => void
} & React.ComponentProps<'button'>

const CopyButton = (props: CopyButtonProps) => {
	const { onCopy, className, ...rest } = props
	const [isCopied, setIsCopied] = useState(false)

	useEffect(() => {
		const copyResetTimeoutId = setTimeout(() => {
			setIsCopied(false)
		}, 2000)

		return () => {
			clearTimeout(copyResetTimeoutId)
		}
	}, [isCopied])

	return (
		<Button
			className={cn('size-6 p-0 opacity-0 transition-opacity group-hover:opacity-100', className)}
			variant="outline"
			onClick={() => {
				onCopy()
				setIsCopied(true)
			}}
			type="button"
			aria-label="Copy code to clipboard"
			{...rest}
		>
			{isCopied ? <CheckIcon className="size-1" size={10} /> : <CopyIcon className="size-1" size={10} />}
		</Button>
	)
}

CodeBlock.displayName = 'CodeBlock'
