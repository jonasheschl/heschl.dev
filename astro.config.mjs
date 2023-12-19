import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'heschl.dev',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Welcome',
					autogenerate: { directory: 'pwnmemo/welcome' },
				},
				{
					label: 'Web',
					autogenerate: { directory: 'pwnmemo/web' },
				},
			],
			components: {
				PageFrame: './src/components/PageFrameOverride.astro',
			},
			customCss: [
				'@fontsource/merriweather-sans/400.css',
				'@fontsource/merriweather-sans/600.css',
				'@fontsource/jetbrains-mono/400.css',
				'./src/styles/global.css',
			]
		}),
	],
});
