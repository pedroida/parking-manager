import colors from 'vuetify/es5/util/colors'
import routes from './routes'

export default {
  head: {
    titleTemplate: '%s - Xenon',
    title: 'Xenon',
    htmlAttrs: {
      lang: 'pt-BR'
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
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', { filename: `.env` }],
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n'
  ],

  i18n: {
    defaultLocale: 'pt-BR',
    fallbackLocale: 'pt-BR',
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
      { code: 'pt-BR', iso: 'pt-BR', file: 'pt-BR.ts' },
      { code: 'en', iso: 'en-US', file: 'en-US.ts' },
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

  auth: {
    strategies: {
      local: { scheme: 'local' }
    }
  },

  build: {
  }
}
