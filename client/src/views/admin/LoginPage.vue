<template>
    <div class="login-page">
        <div class="login-container">
            <div class="login-header">
                <router-link to="/"><img src="@/assets/logo.svg" alt="Logo" /></router-link>
                <h1 class="title">Login</h1>
            </div>
            <form @submit.prevent="handleLogin">
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" v-model="email" id="email" required>
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" v-model="password" id="password" required>
                </div>
                <button type="submit" class="login-button">Sign In</button>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </form>
        </div>
    </div>
</template>

<script>
import { loginAdmin } from "@/services/adminServices";

export default {
    name: "LoginPage",
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async handleLogin() {
            this.errorMessage = '';
            try {
                await loginAdmin(this.email, this.password);
                this.$router.push('/admin');
            } catch (e) {
                this.errorMessage = e.message;
            };
        }
    }
};
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--background-color);
}

.login-container {
    width: 100%;
    max-width: 400px;
    padding: 32px;
    background-color: white;
    border-radius: var(--radius-card);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-header {
    text-align: center;
    margin-bottom: 8px;
}

img {
    display: flex;
    align-items: center;
    max-width: 100%;
    height: 100%;
    object-fit: contain;
    margin-bottom: 24px;
}

.title {
    font-size: var(--font-size-large);
    font-weight: bold;
    color: var(--primary-color);
}

.input-group {
    margin-bottom: 16px;
}

.input-group label {
    display: block;
    font-size: var(--font-size-medium);
    margin-bottom: 8px;
    font-weight: 400;
    color: #000;
}

.input-group input {
    width: 100%;
    padding: 10px;
    font-size: var(--font-size-medium);
    border: 1px solid #000;
    border-radius: var(--radius-input);
    transition: border-color 0.3s ease;
}

.input-group input:focus {
    border-color: var(--primary-color);
    outline: none;
}

.login-button {
    width: 100%;
    padding: 12px;
    font-size: var(--font-size-medium);
    color: white;
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.login-button:hover {
    background-color: var(--background-color);
    border: 1px solid var(--primary-color);
    font-weight: bold;
    color: var(--primary-color);
}

.error-message {
    color: red;
    margin-top: 16px;
    text-align: center;
}

.footer {
    text-align: center;
    margin-top: 16px;
}

.footer p {
    font-size: var(--font-size-small);
    color: var(--text-color);
}

.footer a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: bold;
}

.footer a:hover {
    text-decoration: underline;
}

@media (max-width: 576px) {
    .login-container {
        padding: 24px;
    }

    .title {
        font-size: var(--font-size-medium);
    }

    .login-button {
        padding: 10px;
    }
}
</style>