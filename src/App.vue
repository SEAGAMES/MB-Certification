<template>
  
  <router-view />
  
</template>

<script setup>
//
</script>

<style>
@font-face {
  font-family: "Sarabun";
  src: url("./assets/Font/Sarabun/Sarabun-Regular.ttf") format("truetype");
  font-style: normal;
}
/* src: url("./assets/Font/Sarabun/Sarabun-Regular.ttf") format("truetype"); */

.fontSarabun {
  font-family: "Sarabun", sans-serif;
}


.background-image {
  background-image: url("../assets/background/mb-building2.jpg");
  background-size: cover; /* ทำให้รูปภาพขยายหรือย่อเพื่อครอบคลุมพื้นที่ */
  background-position: center; /* จัดตำแหน่งรูปภาพที่อยู่ตรงกลาง */
  width: 100vw; /* ทำให้ความกว้างเท่ากับความกว้างของหน้าจอ */
  height: 100vh; /* ทำให้ความสูงเท่ากับความสูงของหน้าจอ */
}
</style>