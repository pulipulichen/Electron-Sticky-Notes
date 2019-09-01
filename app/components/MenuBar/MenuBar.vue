<template>
  <div class="hello">Hello {{ name }}</div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      name: 'Tony'
    }
  }
}
</script>

<style>
.hello {
  font-size: 3em;
  text-align: center;
  color: green;
}
</style>

<template src="./MenuBar.html"></template>
<script src="./MenuBar.js"></script>
<style src="./MenuBar.less" scoped></style>
<i18n src="./MenuBar.json"></i18n>