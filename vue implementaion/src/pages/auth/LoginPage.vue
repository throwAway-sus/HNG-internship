<script setup>
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../../composables/useAuthStore";
import { isAuthenticated } from "../../utils/session";
import Navbar from "../../components/Navbar.vue";

const toast = useToast();
const router = useRouter();
const auth = useAuthStore();
const email = ref("");
const password = ref("");
const error = ref("");
const submitting = ref(false);

onMounted(() => {
  if (isAuthenticated()) router.replace("/dashboard");
});

const validateEmail = (em) => /\S+@\S+\.\S+/.test(em);

const handleSubmit = (e) => {
  e.preventDefault();
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "Please fill in all fields";
    return;
  }
  if (!validateEmail(email.value)) {
    error.value = "Please enter a valid email address";
    return;
  }

  submitting.value = true;
  setTimeout(() => {
    const res = auth.login(email.value.trim(), password.value);
    if (res.ok) {
      toast.success("Login successful");
      router.push("/dashboard");
    } else {
      error.value = res.message || "Invalid credentials";
      toast.error(res.message || "Invalid credentials");
    }
    submitting.value = false;
  }, 300);
};
</script>

<template>
  <div class="page-wrap">
    <Navbar />
    <div class="center-container">
      <div class="styled-card">
        <h1 class="styled-title">Sign in to your account</h1>
        <p class="styled-subtle">Welcome back — sign in.</p>

        <form @submit="handleSubmit">
          <div class="styled-form-row">
            <label for="email" class="styled-label">Email address</label>
            <input
              id="email"
              class="styled-input"
              aria-label="Email address"
              v-model="email"
              type="email"
              required
            />
          </div>

          <div class="styled-form-row">
            <label for="password" class="styled-label">Password</label>
            <input
              id="password"
              class="styled-input"
              aria-label="Password"
              v-model="password"
              type="password"
              required
            />
          </div>

          <div v-if="error" class="error-message">{{ error }}</div>

          <div class="styled-form-row">
            <button
              type="submit"
              class="styled-button"
              :disabled="submitting"
              :aria-disabled="submitting"
            >
              {{ submitting ? "Please wait..." : "Sign in" }}
            </button>
          </div>
        </form>

        <p class="sign-up-text">
          Don't have an account? <RouterLink to="/auth/signup" class="sign-up-link">Sign up</RouterLink>
        </p>
      </div>
    </div>

    <footer class="footer">
      © {{ new Date().getFullYear() }} Ticketi•fy — © UnSiMplYkells
    </footer>
  </div>
</template>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  margin-top: 42px;
}
.styled-card {
  width: 520px;
  padding: 32px;
  background: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.styled-title {
  margin-bottom: 6px;
  font-size: 24px;
  font-weight: 700;
}
.styled-subtle {
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--color-mutted);
}
.styled-form-row {
  margin-bottom: 16px;
}
.styled-label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}
.styled-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db; 
  border-radius: 6px;
  outline: none;
}
.styled-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}
.error-message {
  margin-top: 12px;
  color: var(--color-danger);
  font-size: 13px;
}
.styled-button {
  width: 100%;
  padding: 12px 0;
  background-color: var(--color-primary);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.styled-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.sign-up-text {
  margin: 0;
  margin-top: 12px;
  font-size: 13px;
  color: var(--color-mutted);
}
.sign-up-link {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}
.sign-up-link:hover {
  text-decoration: underline;
}
.footer {
  text-align: center;
  margin-top: 32px;
  font-size: 13px;
  color: var(--color-mutted);
}

</style>