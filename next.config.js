const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    loader: "default",
  },
};

module.exports = nextConfig;
