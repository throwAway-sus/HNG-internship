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

  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters";
    toast.error("Password must be at least 6 characters");
    return;
  }

  submitting.value = true;
  setTimeout(() => {
    const res = auth.signup(email.value.trim(), password.value);
    if (res.ok) {
      toast.success("Account created");
      router.push("/dashboard");
    } else {
      error.value = res.message || "Could not create account";
      toast.error(res.message || "Could not create account");
    }
    submitting.value = false;
  }, 300);
};
</script>

<template>
  <div class="page-wrap">
    <Navbar />
    <div class="container" style="padding: 48px;">
      <div class="centered-wrapper">
        <section class="styled-card card">
          <h1 class="styled-title title">Create a new account</h1>
          <p class="styled-subtle subtle">Create your account to get started.</p>

          <form @submit="handleSubmit">
            <div class="form-row">
              <label class="label">Email address</label>
              <input
                class="input"
                aria-label="Email address"
                v-model="email"
                type="email"
                required
              />
            </div>

            <div class="form-row">
              <label class="label">Password</label>
              <input
                class="input"
                aria-label="Password"
                v-model="password"
                type="password"
                required
              />
            </div>

            <div v-if="error" class="error-message">{{ error }}</div>

            <div class="submit-row form-row">
              <button
                type="submit"
                class="primary-button"
                :disabled="submitting"
                :aria-disabled="submitting"
              >
                {{ submitting ? "Please wait..." : "Sign up" }}
              </button>
            </div>
          </form>

          <p class="bottom-text">
            Already have an account? <RouterLink to="/auth/login" class="bottom-link">Sign in</RouterLink>
          </p>
        </section>
      </div>
    </div>

    <footer class="footer-wrap">© {{ new Date().getFullYear() }} Ticketi•fy — © UnSiMplYkells</footer>
  </div>
</template>

<style scoped>
.centered-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 42px;
}

.styled-card {
  width: 520px;
}

.styled-title {
  margin-bottom: 6px;
}

.styled-subtle {
  margin-bottom: 12px;
}

.error-message {
  margin-top: 12px;
  color: var(--color-danger);
  font-size: 13px;
}

.submit-row {
  margin-top: 18px;
}

.bottom-text {
  margin: 12px 0 0 0;
  font-size: 13px;
  color: #6b7280;
}

.bottom-link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}

.bottom-link:hover {
  text-decoration: underline;
}
</style>