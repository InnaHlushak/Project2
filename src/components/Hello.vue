<template>
    <div class="container">
        <div class="greetings"> 
            <h1>Discover the cosmos!</h1>
            <h4>{{ message }}</h4>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Hello',
    data() {
        return  {
            message: "Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.",
        }
    }
}
</script>

<style scoped>
    .greetings {
        height: 60vh;
        background: url('../assets/space.jpg') no-repeat center;
        background-size: cover;
        display:flex;
        flex-direction: column; 
        justify-content:space-around;
        align-items:flex-start;
    }
</style>
