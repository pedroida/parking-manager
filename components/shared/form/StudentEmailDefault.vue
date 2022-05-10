<script>
import InputDefault from './InputDefault.vue'

export default InputDefault.extend({
  name: 'StudentEmailDefault',

  computed: {
    isValid () {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@alunos\.utfpr\.edu\.br$/

      return regex.test(String(this.value))
    }
  },

  watch: {
    content () {
      this.$emit('is-valid', this.isValid)
    }
  }
})
</script>
