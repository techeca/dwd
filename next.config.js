/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
     ? 'https://dwd-techeca.vercel.app/api' //  http://localhost:3000/api
     : 'https://dwd-techeca.vercel.app/api' //  https://dwd.vercel.app/api
  }
}
