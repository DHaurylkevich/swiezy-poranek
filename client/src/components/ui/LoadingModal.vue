<!-- src/components/LoadingModal.vue -->
<template>
    <div v-if="isVisible" class="loading-modal">
        <div class="modal-content">
            <p>Proszę czekać...</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style scoped>
.loading-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>  