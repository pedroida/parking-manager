<template>
  <v-dialog
    :value="open"
    max-width="500px"
    transition="dialog-bottom-transition"
    @click:outside="$emit('close')"
  >
    <template #activator="{ on, attrs }">
      <slot
        name="activator"
        v-bind="attrs"
        v-on="on"
      />
    </template>

    <v-card>
      <div class="rounded-0" :class="[headerColor]">
        <div
          class="modal-default modal-default-header d-flex  align-center"
          :class="hideClose ? 'justify-end' : 'justify-space-between'"
        >
          <slot name="header">
            <h3 class="text--white">
              {{ headerTitle }}
            </h3>
            <v-btn
              v-if="!hideClose"
              icon
              @click="$emit('close')"
            >
              <v-icon color="white">
                {{ closeIcon }}
              </v-icon>
            </v-btn>

            <v-btn
              v-if="!hideSubmit"
              text
              :disabled="disableSubmit"
              @click="$emit('submit')"
            >
              <span class="white--text text-uppercase">
                {{ $t(labelSubmit) }}
              </span>
            </v-btn>
          </slot>
        </div>
      </div>

      <div
        class="modal-default modal-default-body"
        :class="bodyClass"
      >
        <slot name="body" />

        <v-card-actions
          v-if="usignActionSlot"
          class="modal-default-actions"
        >
          <slot name="actions" />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import App from '~/components/App'

export default App.extend({
  name: 'ModalDefault',

  props: {
    open: {
      type: Boolean,
      required: true
    },

    headerTitle: {
      type: String
    },

    closeIcon: {
      type: String,
      required: false,
      default: () => 'mdi-close'
    },

    headerColor: {
      type: String,
      required: false,
      default: () => 'primary'
    },

    hideClose: {
      type: Boolean,
      required: false,
      default: () => false
    },

    hideSubmit: {
      type: Boolean,
      required: false,
      default: () => false
    },

    labelSubmit: {
      type: String,
      required: false,
      default: () => 'label.save'
    },

    disableSubmit: {
      type: Boolean,
      required: false,
      default: false
    },

    bodyClass: {
      type: String,
      required: false,
      default: () => ''
    }
  },

  computed: {
    usignActionSlot (): boolean {
      return !!this.$slots.actions
    }
  }
})
</script>

<style lang="scss" scoped>
.modal-default,
.modal-default-actions {
  max-width: 420px;
  margin: 0 auto;
}

.modal-default {
  padding: 16px;
  max-height: calc(100vh - 168px);
  overflow-y: auto;
  overscroll-behavior-y: contain;

  ::v-deep h1 {
    font-size: 24px;
    line-height: 30px;
    padding: 48px 0;
    font-weight: 500;
    text-align: center;
  }

  ::v-deep .subtitle {
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: bold;
    line-height: 25px;
    text-align: left;
    border-bottom: 1px solid #EDEDED;
    padding: 10px 0;
    margin: 38px 0;
  }
}

h3 {
  color: white;
}
</style>
