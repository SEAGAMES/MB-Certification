<template>
  <v-row justify="center">
    <div>
      <!-- ใช้ <iframe> เพื่อแสดงไฟล์ PDF -->
      <iframe :src="base_64" ref="pdfIframe"></iframe>
    </div>
  </v-row>
</template>

<script>
import dataQrCode from "../service/apiCertificate";
import createPDF from "@/service/apiCreatePDF";
export default {
  data() {
    return {
      base_64: "",
    };
  },
  async mounted() {
    // สร้าง URL object
    const url = new URL(window.location.href);

    // สร้าง URLSearchParams object
    const urlParams = new URLSearchParams(url.search);

    // ดึงค่าจาก URLSearchParams
    const param1Value = urlParams.get("param1");
    const param2Value = urlParams.get("param2");

    const { data } = await dataQrCode.getDataQrCode(param1Value, param2Value);
    console.log(param1Value, param2Value)
    console.log(data.data[0])
    const name = [];
    name.push({ prefix: data.data[0].prefix, name: data.data[0].name })

    await this.createPDF(data.data[0], name);
  },
  methods: {
    async createPDF(data, name) {
      const pdfDocGenerator = await createPDF.certification_pdf(name, data);
      this.base_64 = pdfDocGenerator;

      pdfDocGenerator.getDataUrl((dataUrl) => {
        this.base_64 = dataUrl;
        const iframe = this.$refs.pdfIframe;
        iframe.src = dataUrl;
        iframe.style.width = `${window.innerWidth}px`;
        iframe.style.height = `${window.innerHeight}px`;
      });
    },
  },
};
</script>

<style>
</style>