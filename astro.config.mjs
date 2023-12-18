import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'PwnMemo',
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
			}
		}),
	],
});
