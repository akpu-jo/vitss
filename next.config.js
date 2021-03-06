// const withCss = require("@zeit/next-css");

module.exports = {
  images: {
    domains: ["localhost", "vitss.herokuapp.com" ],
  },
  publicRuntimeConfig: {
    APP_NAME: "Vitamin Sussie",
    API_DEVELOPMENT: "http://localhost:8000/api",
    PRODUCTION: true,
    DOMAIN_DEV: "http://localhost:3000",
    DOMAIN_PRO: "vitss.vercel.app",
    FB_APP_ID: "2855831141394925",
  },
};
