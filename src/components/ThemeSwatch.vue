<template>
<div class="card theme" :class="theme">
  <h3 class="card-title">{{ theme }}</h3>
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
      let href = '/dist/css/app.' + this.theme + '.5b1a6aa3.css'
      let link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = href
      link.onload = function (e) {
        e.target.sheet.disabled = true
      }
      document.head.appendChild(link)
console.log(link)
    },
    persist: function () {
      alert('persist: ' + this.theme)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~material-colors/dist/colors.scss';

.theme {
  padding: 0.6rem;
  button {
    margin-right: 1rem;
    background-color: $md-grey-300;
    border: 1px 1px 1px 1px;
    border-color: $md-grey-700;
    border-width: 1px;
  }
  h3 {
    padding: 1rem;
  }
}
.dark {
  background-color: $md-blue-grey-800;
  color: $md-light-text-primary;
}
.teal {
  background-color: $md-teal-500;
  color: $md-dark-text-primary;
}
</style>
