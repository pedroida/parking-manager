import colors from 'vuetify/es5/util/colors'
import routes from './routes'

export default {
  head: {
    titleTemplate: '%s - Xenon',
    title: 'Xenon',
    htmlAttrs: {
      lang: 'pt'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    './assets/custom.scss'
  ],

  plugins: [
    '~/plugins/v-mask.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    ['@nuxtjs/dotenv', { filename: '.env' }]
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'cookie-universal-nuxt'
  ],

  i18n: {
    defaultLocale: 'pt',
    fallbackLocale: 'pt',
    strategy: 'no_prefix',
    langDir: 'lang/',
    lazy: false,
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: false,
      cookieKey: 'app_current_lang',
      onlyOnRoot: true
    },
    locales: [
      { code: 'pt', iso: 'pt-BR', file: 'pt-BR.ts' },
      { code: 'en', iso: 'en-US', file: 'en-US.ts' }
    ]
  },

  axios: {
    baseUrl: process.env.NUXT_ENV_API_URL || 'https://localhost:8080/api',
    proxyHeaders: false,
    credentials: false
  },

  vuetify: {
    customVariables: ['/assets/variables.scss'],
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: '#fbb800',
          accent: '#b2b2b2',
          secondary: '#706f6f',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  router: {
    extendRoutes (nuxtRoutes, resolve) {
      nuxtRoutes.splice(
        0,
        nuxtRoutes.length,
        ...routes.map((route) => {
          return {
            ...route,
            component: resolve(__dirname, route.component)
          }
        })
      )
    }
  },

  build: {
    publicPath: '/static/',
    babel: { babelrc: true },

    extend (config, ctx) {
      config.devtool = 'inline-source-map'
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}