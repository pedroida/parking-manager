<script>
import InputDefault from './InputDefault.vue'

export default InputDefault.extend({
  name: 'EmailDefault',

  computed: {
    isValid () {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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
