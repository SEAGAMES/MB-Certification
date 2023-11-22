<template>
  <h1>QR CODE</h1>
</template>

<script>
import dataQrCode from "../service/apiCertificate";
export default {
  async mounted() {
    // สร้าง URL object
    const url = new URL(window.location.href);

    // สร้าง URLSearchParams object
    const urlParams = new URLSearchParams(url.search);

    // ดึงค่าจาก URLSearchParams
    const param1Value = urlParams.get("param1");
    const param2Value = urlParams.get("param2");

    const { data } = await dataQrCode.getDataQrCode(param1Value, param2Value);
    console.log(data.data[0]);
  },
};
</script>

<style>
</style>