const PROXY_CONFIG = [
    {
        context: [
           "/repos",
        ],
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        loglevel: "debug"
    }
  ];

  module.exports = PROXY_CONFIG;
