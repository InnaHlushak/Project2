<template>
    <div>
        <a href="https://api.nasa.gov/" target="_blank">
            <img  src="../assets/favicon-NASA.png" alt="logo NASA" width="30px" height="30px">
        </a>
        <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank" class="nasa-link">APOD</a> 
    </div>
</template>
<script>

export default {
    name: 'NasaApod',
}
</script>

<style scoped>
.nasa-link {
    color: white;
    font-size: 16px;
}
.nasa-link:hover {
    color: rgb(15, 191, 239); 
    cursor:pointer;
}
</style>