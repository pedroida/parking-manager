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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' }
    ],
    script: [
      { hid: 'stompjs', src: 'https://cdn.jsdelivr.net/npm/@stomp/stompjs@5.0.0/bundles/stomp.umd.min.js', defer: true },
      { hid: 'sockjs', src: 'https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js', defer: true }
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
    '@nuxtjs/dayjs',
    'cookie-universal-nuxt'
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
          accent: '#d8d8d8',
          secondary: '#706f6f',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          dark: '#000000'
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
