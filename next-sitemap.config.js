/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://10web.io/wordpress-plugins/',
  changefreq: 'daily',
  priority: 0.7,
  generateIndexSitemap: true,
  transform: async (config, path) => {
    return {
      loc: `https://10web.io/${path}`,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
