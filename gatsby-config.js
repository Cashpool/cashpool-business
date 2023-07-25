require("dotenv").config()

const manifestOptions = {
  start_url: `/`,
  display: `minimal-ui`,
  icon: `./src/assets/images/logo.png`,
}
const imagesSource = {
  name: `images`,
  path: `${__dirname}/src/assets/images`,
}

module.exports = {
  siteMetadata: {
    author: `@CASHPOOL`,
    title: `Cashpool Business`,
    siteUrl: `https://business.cashpool.app/`,
    description: `Cashpool business calculator`,
    keywords: ["Cashpool"],
  },
  plugins: [
    "gatsby-plugin-postcss",
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: imagesSource,
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: manifestOptions,
    },
  ],
  trailingSlash: "never",
}
