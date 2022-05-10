<template>
  <div>
    <h2 class="text-center">
      Um e-mail foi enviado para você contendo as instruções
      <br>
      para solicitar uma nova senha.
    </h2>

    <v-icon size="5em" color="black" class="mt-5">
      mdi-check-circle
    </v-icon>

    <br>

    <button-default :x-large="false" :block="false" label="Voltar ao login" class="mt-5" @click="goTo('login')" />
  </div>
</template>

<script>
import App from '~/components/App'
import ButtonDefault from '~/components/shared/form/ButtonDefault'

export default App.extend({
  name: 'RequestSent',

  components: { ButtonDefault }

})
</script>
