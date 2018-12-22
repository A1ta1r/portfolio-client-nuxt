module.exports = {
  /*
   ** Headers of the page
   */
  router: {
    base: '/credits/' || ''
  },
  head: {
    title: "Кредитный портфель",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: 'Веб-приложение "Кредитный Портфель"'
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/Loan-Icon.png"
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "#3B8070"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },

  vendor: ["element-ui", "vue-chartjs.js", "axios"],

  modules: ["@nuxtjs/axios", ["@nuxtjs/moment", ["ru"]]],

  /*
   ** Axios
   */
  axios: {
    baseURL: process.env.CREDIT_API_URL || "https://loan-portfolio-api.herokuapp.com/"
  },

  /*
   ** Configure plugins
   */
  plugins: ["plugins/element-ui.js", "plugins/vue-chartjs.js"],
  css: ["element-ui/lib/theme-chalk/index.css"]
};
