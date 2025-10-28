<script setup>
const props = defineProps({
  isOpen: Boolean,
  ariaLabel: String,
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <div
    v-if="isOpen"
    class="modal-backdrop"
    @click="handleClose"
    role="presentation"
  >
    <div
      class="modal-card"
      role="dialog"
      aria-modal="true"
      :aria-label="ariaLabel"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-card {
  width: 100%;
  max-width: 720px;
  background: white;
  border-radius: 12px;
  padding: 18px;
}
</style>