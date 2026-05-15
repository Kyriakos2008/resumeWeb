import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'

// import vercel from '@astrojs/vercel/serverless'
import node from '@astrojs/node'
import mod from 'astro/zod'

// https://astro.build/config
export default defineConfig({
	site: 'https://kyriakos2008.github.io',
	base: '/resumeWeb/',
	integrations: [
		expressiveCode(expressiveCodeOptions),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon({ iconDir: 'src/icons' })
		
	],
	markdown: {
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow, noopener, noreferrer']
				}
			]
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: ['']
			}
		}
	},
	prefetch: true,
	output: 'server',
	adapter: node({
		mode: 'standalone',
		webAnalytics: { enabled: true }
	})
})
