<template>
  <div v-if="loading" class="loading-page">
  <div class="loading"></div>
  </div>
</template>
<script>
export default {
  name: 'Loader',

  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
<style scoped>
.loading-page {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #60606038;
}

.loading {
  display: inline-block;
  width: 6.5rem;
  height: 6.5rem;
  border: 17px solid #fff70594;
  border-radius: 50%;
  border-top-color: #f9db09;
  -webkit-animation: spin-data-v-296ed152 1s ease-in-out infinite;
  animation: spin-data-v-296ed152 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
