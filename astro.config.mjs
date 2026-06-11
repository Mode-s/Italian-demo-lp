// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  integrations: [icon()],
});