<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  initial: {
    type: Object,
    default: null,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
});

const title = ref(props.initial ? props.initial.title : "");
const description = ref(props.initial ? props.initial.description : "");
const status = ref(props.initial ? props.initial.status : "open");
const priority = ref(props.initial ? props.initial.priority : "medium");
const errors = ref({});
const firstFieldRef = ref(null);

const resetForm = () => {
    title.value = props.initial ? props.initial.title : "";
    description.value = props.initial ? props.initial.description : "";
    status.value = props.initial ? props.initial.status : "open";
    priority.value = props.initial ? props.initial.priority : "medium";
    errors.value = {};
}

watch(() => props.initial, () => {
    resetForm();
    onMounted(() => {
      setTimeout(() => {
        firstFieldRef.value && firstFieldRef.value.focus();
      }, 10);
    });
}, { deep: true });

onMounted(() => {
    setTimeout(() => {
      firstFieldRef.value && firstFieldRef.value.focus();
    }, 10);
});

const validate = () => {
  const e = {};
  if (!title.value.trim()) e.title = "Title is required";
  if (!description.value.trim()) e.description = "Description is required";
  if (!["open", "in_progress", "closed"].includes(status.value)) e.status = "Invalid status";
  if (description.value && description.value.length > 1000) e.description = "Description is too long";
  errors.value = e;
  return Object.keys(e).length === 0;
};

const handleSubmit = (ev) => {
  ev.preventDefault();
  if (!validate()) return;
  props.onSubmit({
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
    priority: priority.value,
  });
  if (!props.initial) {
    title.value = "";
    description.value = "";
    status.value = "open";
    priority.value = "medium";
  }
};
</script>

<template>
  <form @submit="handleSubmit">
    <div class="form-row">
      <label class="label">Title *</label>
      <input
        ref="firstFieldRef"
        class="input"
        aria-required="true"
        :aria-invalid="!!errors.title"
        v-model="title"
      />
      <div v-if="errors.title" class="error-message">{{ errors.title }}</div>
    </div>

    <div class="form-row">
      <label class="label">Description *</label>
      <textarea
        rows="4"
        class="textarea"
        v-model="description"
        aria-required="true"
        :aria-invalid="!!errors.description"
      ></textarea>
      <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
    </div>

    <div class="form-row">
      <label class="label">Status</label>
      <select class="select" v-model="status">
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <div v-if="errors.status" class="error-message">{{ errors.status }}</div>
    </div>

    <div class="form-row">
      <label class="label">Priority</label>
      <select class="select" v-model="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <div class="button-container">
      <button type="submit" class="primary-button">
        {{ initial ? "Update Ticket" : "Create Ticket" }}
      </button>
      <button type="button" class="nav-button" @click="onCancel">Cancel</button>
    </div>
  </form>
</template>

<style scoped>
.error-message {
  color: var(--color-danger);
  margin-top: 4px;
}

.button-container {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}
</style>