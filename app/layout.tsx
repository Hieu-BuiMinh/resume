import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import AppProvider from '@/components/common/providers/app-provider'
import { SITE_CONFIG } from '@/config/site'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	metadataBase: new URL(SITE_CONFIG.url),
	title: {
		default: SITE_CONFIG.shortName,
		template: `%s | ${SITE_CONFIG.shortName}`,
	},
	description: SITE_CONFIG.description,
	manifest: '/favicon/site.webmanifest',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_CONFIG.shortName,
		description: SITE_CONFIG.description,
		site: '@Walter_BM_777',
		siteId: '@Walter_BM_777',
		creator: '@Walter_BM_777',
		creatorId: '@Walter_BM_777',
		images: [
			{
				url: '/assets/images/og.png',
				width: 1200,
				height: 630,
				alt: SITE_CONFIG.description,
			},
		],
	},
	keywords: SITE_CONFIG.siteKeywords,
	creator: 'Hieu.BuiMinh',
	openGraph: {
		url: SITE_CONFIG.url,
		type: 'website',
		title: SITE_CONFIG.shortName,
		siteName: SITE_CONFIG.name,
		description: SITE_CONFIG.description,
		locale: 'en-US',
		images: [
			{
				url: '/assets/images/og.png',
				width: 1200,
				height: 630,
				alt: SITE_CONFIG.description,
				type: 'image/png',
			},
		],
	},
	icons: {
		icon: [
			{
				media: '(prefers-color-scheme: light)',
				url: '/assets/images/logo/logo-light.svg',
				href: '/assets/images/logo/logo-light.svg',
			},
			{
				media: '(prefers-color-scheme: dark)',
				url: '/assets/images/logo/logo-dark.svg',
				href: '/assets/images/logo/logo-dark.svg',
			},
		],
		shortcut: [
			{
				media: '(prefers-color-scheme: light)',
				url: '/assets/images/logo/logo-light.svg',
				href: '/assets/images/logo/logo-light.svg',
			},
			{
				media: '(prefers-color-scheme: dark)',
				url: '/assets/images/logo/logo-dark.svg',
				href: '/assets/images/logo/logo-dark.svg',
			},
		],
		apple: [
			{
				url: '/favicon/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
			},
		],
		other: [
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				url: '/favicon/favicon-16x16.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				url: '/favicon/favicon-32x32.png',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AppProvider>
					<main className="m-auto max-w-screen-xl p-3 md:px-10 md:py-6" role="main">
						{children}
					</main>
				</AppProvider>
			</body>
		</html>
	)
}
