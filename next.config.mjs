/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.tedawf.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
