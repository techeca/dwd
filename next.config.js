/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
     ? 'http://localhost:3000/api' // dev // ip publica
     : 'http://localhost:3000/api' // production https://dwd.vercel.app/api
  }
}