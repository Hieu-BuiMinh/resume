import type { SVGIconComponent } from '@/components/common/icons/svg-icons'
import { SVGIcons } from '@/components/common/icons/svg-icons'

export const isProduction = process.env.NODE_ENV === 'production'

export const SITE_CONFIG = {
	name: 'Hieu.BuiMinh',
	shortName: 'Hieu.BM - Resume',
	url: isProduction ? 'https://hieu-buiminh.vercel.app/' : 'http://localhost:3000',
	description: 'Detail-oriented Front-end Engineer dedicated to building high-quality products with React ecosystem',
	siteKeywords: ['hieu.buiminh', 'next.js', 'react', 'typeScript', 'node.js', 'tailwind', 'shadcn'],
	og: '/assets/images/og.png',
	author: {
		avatar: '/assets/images/avt/me_01.png',
		name: 'Hieu.BuiMinh',
		nickname: 'Walter',
		github: 'https://github.com/Hieu-BuiMinh',
	},
	links: {
		twitter: 'https://x.com/Walter_BM_777',
		youtube: 'https://www.youtube.com/@hieu-bm-0212',
		instagram: 'https://www.instagram.com/walter.02.12/',
		facebook: 'https://www.facebook.com/hieu.buiminh.37',
		github: 'https://github.com/Hieu-BuiMinh',
		linkedin: 'https://www.linkedin.com/in/minh-hieu-bui-78a315208',
		personalSite: '/',
	},
	logos: {
		light: '/assets/images/logo/logo-circle-light.svg',
		dark: '/assets/images/logo/logo-circle-dark.svg',
	},
}

export type SITE_CONFIG = typeof SITE_CONFIG

export const SOCIAL_LINKS: {
	label: string
	icon: SVGIconComponent
	href: string
}[] = [
	{
		label: 'GitHub',
		icon: SVGIcons.gitHub,
		href: SITE_CONFIG.links.github,
	},
	{
		label: 'Twitter',
		icon: SVGIcons.X,
		href: SITE_CONFIG.links.twitter,
	},
	{
		label: 'Facebook',
		icon: SVGIcons.facebook,
		href: SITE_CONFIG.links.facebook,
	},
	{
		label: 'Youtube',
		icon: SVGIcons.youtube,
		href: SITE_CONFIG.links.youtube,
	},
	{
		label: 'Instagram',
		icon: SVGIcons.instagram,
		href: SITE_CONFIG.links.instagram,
	},
]
