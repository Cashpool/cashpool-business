const db = require("./src/assets/db.json")

exports.createPages = async function ({ actions: { createPage } }) {
  const langs = Object.keys(db.translations)
  langs.forEach(lang => {
    createPage({
      path: `/${lang}`,
      component: require.resolve(`./src/templates/home/index.js`),
      context: { lang },
    })
  })
}
