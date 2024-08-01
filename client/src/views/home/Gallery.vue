<template>
    <section class="gallery-section">
        <div class="title-section">
            <p class="title">
                Gallery
            </p>
            <p class="text">
                Pyszny widok
            </p>
        </div>
        <div class="gallery-container ">
            <div class="gallery">
                <img src="@/assets/img/gallery/img1.jpg"/>
                <img src="@/assets/img/gallery/img1.jpg"/>
            </div>
            <div class="gallery">
                <img src="@/assets/img/gallery/img2.jpg"/>
                <img src="@/assets/img/gallery/img2.jpg"/>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "GallerySection"
}
</script>

<style scoped>
.gallery-section{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 56px;
    padding-bottom: 100px;
}

.title-section{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title-section .title {
    font-size: var(--font-size-large);
    font-weight: bold;
}

.title-section .text {
    font-size: var(--font-size-medium);
}

.gallery-container  {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 36px;
}

.gallery{
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: scroll 30s linear infinite;
}

.gallery img {
    max-width: 100%;
    height: 100%;
    height: 184px;
    width: 322px;
    border-radius: 25px;
    object-fit: cover; 
}
/* @keyframes scroll {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(calc(-250px * 8));
            }
        } */

</style>