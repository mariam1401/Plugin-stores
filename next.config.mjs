/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    productionBrowserSourceMaps: false,
    cacheMaxMemorySize: 500,
    experimental: {
        serverSourceMaps: false
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/wordpress-plugins',
            },
            {
                source: '/public/wordpress-plugins/:path*',
                destination: '/wordpress-plugins/:path*',
            },
            {
                source: '/app/wordpress-plugins/:path*',
                destination: '/app/wordpress-plugins/:path*',
            },
        ];
    },

    // async redirects() {
    //     return [
    //         // Basic redirect
    //         {
    //             source: '/',
    //             destination: '/wordpress-plugins',
    //             permanent: true,
    //         }
    //     ]
    // },
};

export default nextConfig;
