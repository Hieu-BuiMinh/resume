//import rehypeShiki from '@shikijs/rehype'
import rehypeAutoLinkHeading from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const computedFields: any = <T extends { slug: string }>(data: T) => {
	return { ...data, slugAsParams: data.slug.split('/').slice(1).join('/') }
	// blog/hello-world => ['blog', 'hello-world'] => ['hello-world] => '/hello-world'
}

const pages = defineCollection({
	name: 'PagePost',
	pattern: 'pages/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.string().optional(),
			video: s.file().optional(),
			metadata: s.metadata().optional(),
			description: s.string().max(999).optional(),
			published: s.boolean().default(true),
			tags: s.array(s.string()).optional(),
			body: s.mdx(),
			author: s.object({
				avatar: s.string(),
				name: s.string(),
				github: s.string(),
			}),
			//slugAsParams <=> needed transform
		})
		.transform(computedFields),
})

const projects = defineCollection({
	name: 'ProjectPost',
	pattern: 'projects/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.string().optional(),
			video: s.file().optional(),
			metadata: s.metadata().optional(),
			description: s.string().max(999).optional(),
			published: s.boolean().default(true),
			shown: s.boolean().default(false),
			tags: s.array(s.string()).optional(),
			body: s.mdx(),
			links: s.object({ repoUrl: s.string(), demoUrl: s.string() }).optional(),
			author: s.object({
				avatar: s.string(),
				name: s.string(),
				github: s.string(),
			}),
			toc: s.toc({ tight: true, ordered: true, maxDepth: 6 }),
			//slugAsParams <=> needed transform
		})
		.transform(computedFields),
})

export default defineConfig({
	root: 'content',
	output: {
		data: '.velite',
		assets: 'public/static',
		base: '/static/',
		name: '[name]-[hash:6].[ext]',
		clean: true,
	},
	collections: { pages, projects },
	mdx: {
		rehypePlugins: [
			rehypeSlug,
			[rehypePrettyCode, { theme: { light: 'github-light', dark: 'night-owl', keepBackground: true } }],
			[rehypeHighlight],
			[
				rehypeAutoLinkHeading,
				{
					behavior: 'wrap',
					properties: {
						className: ['subheading-anchor'],
						ariaLabel: 'Link to section',
					},
				},
			],
		],
		remarkPlugins: [],
	},
})
