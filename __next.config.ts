import type { NextConfig } from 'next'
import type { Options } from 'velite'
import { build } from 'velite'
import type { Compiler } from 'webpack'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
			{
				protocol: 'https',
				hostname: 'i.imgur.com',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},
	webpack: (config) => {
		config.plugins.push(new VeliteWebpackPlugin())
		return config
	},
}

class VeliteWebpackPlugin {
	static started = false
	options: Options

	constructor(options = {}) {
		this.options = options
	}

	apply(compiler: Compiler): void {
		compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
			if (VeliteWebpackPlugin.started) return
			VeliteWebpackPlugin.started = true
			const dev = compiler.options.mode === 'development'
			this.options.watch = this.options.watch ?? dev
			this.options.clean = this.options.clean ?? !dev
			await build(this.options)
		})
	}
}

export default nextConfig
