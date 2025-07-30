<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Admin Signup</h2>

    <form @submit.prevent="handleSignup">
      <div class="mb-4">
        <label class="block mb-1 font-medium">Full Name</label>
        <input
          v-model="form.full_name"
          type="text"
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">Email</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">Password</label>
        <input
          v-model="form.password"
          type="password"
          required
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">Role</label>
        <select
          v-model="form.role"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
      >
        Signup
      </button>

      <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-4">Signup successful! 🎉</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminSignup",
  data() {
    return {
      form: {
        full_name: "",
        email: "",
        password: "",
        role: "ADMIN",
      },
      error: "",
      success: false,
    };
  },
  methods: {
    async handleSignup() {
      this.error = "";
      this.success = false;

      try {
        const response = await axios.post("http://127.0.0.1:5000/admin/create", this.form);
        const { token, admin } = response.data;

        // Store token (for example in localStorage)
        localStorage.setItem("admin_token", token);

        this.success = true;
        console.log("Admin signed up:", admin);
        // Optional: redirect to dashboard
        this.$router.push("/admin-dashboard");
      } catch (err) {
        this.error =
          err.response?.data?.error || "Signup failed. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
</style>
