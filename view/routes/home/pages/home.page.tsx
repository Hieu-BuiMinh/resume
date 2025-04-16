import { notFound } from 'next/navigation'
import React from 'react'

import { pages } from '@/.velite'
import { MDXContent } from '@/components/common/mdx'
import { ModeToggle } from '@/components/common/mode-toggle'
import PostLastUpdated from '@/view/components/post-last-updated'

function HomePageView() {
	const post = pages.find((post) => post.slugAsParams === 'about')

	if (!post || !post.published) {
		notFound()
	}
	return (
		<div className="relative">
			<div className="sticky inset-0 top-2 z-20">
				<ModeToggle />
			</div>

			<div className="container m-auto flex max-w-screen-lg flex-col gap-3">
				<article className="container prose mx-auto max-w-full pb-6 dark:prose-invert">
					<MDXContent code={post.body} />
					{post.lastUpdated && <PostLastUpdated date={post.lastUpdated} />}
				</article>
			</div>
		</div>
	)
}

export default HomePageView
