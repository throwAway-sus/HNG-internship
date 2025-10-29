<template>
  <slot></slot>
</template>

<style>
  @import './_styledBits.vue.css';

  * {
    box-sizing: border-box;
  }
  html,body,#app { 
    height: 100vh;
  }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: var(--color-background);
    color: var(--color-text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a { 
    color: inherit; 
    text-decoration: none; 
  }
  button { 
    font-family: inherit; 
  }
  :focus {
    outline: 3px solid rgba(37,99,235,0.18);
    outline-offset: 2px;
  }
</style>