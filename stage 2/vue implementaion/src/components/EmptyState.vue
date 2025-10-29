<template>
  <section class="empty-card card">
    <p class="empty-text">
      <slot></slot>
    </p>
  </section>
</template>

<style scoped>
.empty-card {
  text-align: center;
  padding: 28px;
}

.empty-text {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}
</style>