<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <label for="username">Username:</label>
      <input
          type="text"
          id="username"
          v-model="username"
          required
      />
      <label for="password">Password:</label>
      <input
          type="password"
          id="password"
          v-model="password"
          required
      />
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // 这里只是简单模拟登录验证，实际应用中应该与后端进行交互验证
      if (this.username === "admin" && this.password === "123456") {
        alert("Login successful!");
      } else {
        alert("Invalid username or password.");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  width: 300px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

input[type="submit"] {
  background-color: #007BFF;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #0056b3;
}
</style>