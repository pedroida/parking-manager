<template>
  <div class="h-100 pa-5">
    <v-row>
      <v-col md="8" sm="12" cols="12" class="pt-md-0">
        <h1>
          {{ pageTitle }}
        </h1>
        <p class="subtitle-1">
          {{ pageSubtitle }}
        </p>
      </v-col>
      <v-col md="4" sm="12" cols="12" class="pt-md-0 d-flex align-self-center justify-md-end">
        <slot name="headerAppend" />
      </v-col>
    </v-row>

    <v-divider class="mb-5" />

    <slot />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import App from '~/components/App'

export default App.extend({
  name: 'AuthenticatedContainer',

  props: {
    pageTitle: {
      type: String
    },
    pageSubtitle: {
      type: String
    }
  },

  computed: {
    ...mapGetters('current-user', ['currentUser'])
  }
})
</script>
