<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" height="300">
        <v-card-text>
          <v-text-field
            label="ชื่อโครงการ"
            v-model="form.pj_name"
          ></v-text-field>
          <v-text-field
            label="รหัสโครงการ"
            id="pj_name"
            v-model="form.pj_code"
            @input="form.pj_code = $event.target.value.toUpperCase()"
          ></v-text-field>
          <v-text-field label="วันที่" v-model="form.date"></v-text-field>
          <v-row>
            <v-checkbox
              label="ใส่ลายเซ็น ผอ."
              v-model="form.sign"
              color="indigo"
              value="indigo"
              hide-details
            ></v-checkbox>
            <v-checkbox
              label="2 ลายเซ็น"
              color="indigo-darken-3"
              value="indigo-darken-3"
              hide-details
            ></v-checkbox>

            <input
              class="mt-4"
              type="file"
              @change.left="add_file()"
              @click="this.$refs.myFiles.value = null"
              ref="myFiles"
              accept=".xls, .xlsx, .csv"
            />
          </v-row>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <div>
      <!-- ใช้ <iframe> เพื่อแสดงไฟล์ PDF -->
      <iframe :src="base_64" ref="pdfIframe" v-if="preview"></iframe>
    </div>
  </v-row>
</template>

<script>
// import create_pdf from "@/js/cer_th";
import * as XLSX from "xlsx";
import createPDF from "../service/apiCreatePDF";

export default {
  data() {
    return {
      form: {
        pj_name: "Molecular biology for life and medicine",
        pj_code: "2023-PAR-",
        date: "ระหว่างวันที่ 2-4 ตุลาคม 2566",
        sign: false,
      },
      show: false,
      base_64: null,
      excel_array: null,
      preview: false,
    };
  },
  async mounted() {},
  methods: {
    async add_file() {
      const file = this.$refs.myFiles.files[0];
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const ws = workbook.Sheets[workbook.SheetNames[0]];
      const result = XLSX.utils.sheet_to_json(ws, {});
      this.excel_array = result;
    },

    async createCertificate() {
      const pdfDocGenerator = await createPDF.certification_pdf(
        this.excel_array,
        this.form
      );

      pdfDocGenerator.getDataUrl((dataUrl) => {
        this.base_64 = dataUrl;
        const iframe = this.$refs.pdfIframe;
        iframe.src = dataUrl;

        // กำหนดความกว้างและความสูงของ iframe ตรงนี้
        iframe.style.width = "770px"; // เปลี่ยนเป็นค่าที่คุณต้องการ
        iframe.style.height = "600px"; // เปลี่ยนเป็นค่าที่คุณต้องการ
      });
      this.preview = true
      this.show = true;
    },
  },
  watch: {
    excel_array() {
      this.createCertificate();
    },
  },
};
</script>
<style scoped>
embed {
  height: 70vh;
}
</style>