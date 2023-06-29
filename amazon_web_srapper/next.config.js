/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
