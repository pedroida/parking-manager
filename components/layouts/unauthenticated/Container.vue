<template>
  <div class="d-flex flex-column fill-height mx-auto align-center unauthenticated-container">
    <div class="topbar primary">
      <img src="~/assets/images/xenon.png" alt="logo">
    </div>

    <main class="main-body grow">
      <v-container fill-height>
        <slot />
      </v-container>
    </main>
  </div>
</template>

<script>
import App from '/components/App'

export default App.extend({
  name: 'UnauthenticatedContainer',
})
</script>
<style lang="scss" scoped>
.topbar {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 5px 12px 2px #808080a6;

  > img {
    height: 30px;
    margin: 12px;
  }
}

.unauthenticated-container {
  min-width: 100% !important;
}

main,
footer {
  width: 100%;
  max-width: 900px;
}
footer {
  text-align: center;
}

::v-deep  {
  h1 {
    font-size: 28px;
    line-height: 32px;
    padding: 30px 0 40px;
    font-weight: 500;
    text-align: center;
  }
}
</style>
