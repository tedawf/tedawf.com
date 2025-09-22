/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tacos.tedawf.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
