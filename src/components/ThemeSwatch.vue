<template>
<div class="card swatch" :class="theme">
  <h3 class="card-title"><i class="fas fa-palette"></i> {{ theme }}</h3>
  <div class="card-body">
    <button @click="sample" class="btn">Try</button>
    <button @click="persist" class="btn">Save</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'ThemeSwatch',
  props: {
    theme: String
  },
  methods: {
    sample: function () {
      let href = '/sampler/theme/' + this.theme + '.css'
      let link = document.createElement('link')
      link.rel = 'stylesheet'
      link.title = 'theme'
      link.href = href
      link.onload = function (e) {
        let len = document.styleSheets.length
        for (let i = 0; i < len; ++i) {
          let t = document.styleSheets[i].title
          if (t && t === 'theme') {
            document.styleSheets[i].disabled = true
          }
        }
        e.target.sheet.disabled = false
      }
      document.head.appendChild(link)
    },
    persist: function () {
      alert('persist: ' + this.theme)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~material-colors/dist/colors.scss';

.swatch {
  padding: 0.6rem;
  button {
    background-color: $md-grey-300;
    border-color: $md-grey-700;
    border-width: 1px;
    margin-right: var(--spacing);
    &:last-child {
      margin-right: 0;
    }
  }
  .card-title {
    padding: calc(var(--spacing) * 0.6);
  }
  .card-body {
    padding: calc(var(--spacing) * 0.6);
  }
}
</style>
