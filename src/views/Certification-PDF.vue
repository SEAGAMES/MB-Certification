<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" height="265">
        <v-card-text>
          <v-row
            ><v-col
              ><v-text-field
                label="ชื่อโครงการ"
                v-model="form.pj_name"
              ></v-text-field></v-col
            ><v-col
              ><v-row
                ><v-col>
                  <v-switch
                    v-model="form.language"
                    hide-details
                    true-value="Eng"
                    false-value="TH"
                    color="indigo"
                    value="indigo"
                    :label="`ฟอร์ม : ${form.language}`"
                  ></v-switch> </v-col
                ><v-col
                  ><v-checkbox
                    label="ใส่ลายเซ็น ผอ."
                    v-model="form.sign"
                    color="indigo"
                    value="indigo"
                    hide-details
                  ></v-checkbox></v-col
                ><v-col
                  ><v-checkbox
                    label="2 ลายเซ็น"
                    v-model="form.two_sign"
                    color="indigo-darken-3"
                    value="indigo-darken-3"
                    hide-details
                  ></v-checkbox></v-col></v-row></v-col
          ></v-row>
          <v-row class="mt-n8">
            <v-col
              ><v-text-field
                label="รหัสโครงการ"
                id="pj_name"
                v-model="form.pj_code"
                @input="form.pj_code = $event.target.value.toUpperCase()"
              ></v-text-field
            ></v-col>
            <v-col
              ><v-text-field
                label="ชื่อ"
                v-model="form.add_name"
                :disabled="!form.two_sign"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row class="mt-n8"
            ><v-col
              ><v-text-field
                label="วันที่"
                v-model="form.date_desc"
              ></v-text-field></v-col
            ><v-col
              ><v-text-field
                label="ตำแหน่ง"
                v-model="form.add_position"
                :disabled="!form.two_sign"
              ></v-text-field></v-col
          ></v-row>
          <v-row>
            <input
              class="mt-n5 ml-3"
              type="file"
              @change.left="add_file()"
              @click="this.$refs.myFiles.value = null"
              ref="myFiles"
              accept=".xls, .xlsx, .csv"
            />
            <v-spacer></v-spacer>
            <v-btn class="mt-n7 mx-2" size="small" color="indigo" icon="mdi-cloud-upload"></v-btn>
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
//import createCertificate from "../service/apiCertificate";

export default {
  data() {
    return {
      form: {
        pj_name: "Molecular biology for life and medicine",
        pj_code: "PAR-ASST-AA",
        date_desc: "ระหว่างวันที่ 2-4 ตุลาคม 2566",
        currentYear: "",
        add_name: "อาจารย์ ธนกฤต นิ่มนวล",
        add_position: "ผู้อำนวยการสถาบันชีววิทยาศาสตร์โมเลกุล",
        language: "TH",
        sign: false,
        two_sign: false,
      },
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
      const currentDate = new Date();
      this.form.currentYear = currentDate.getFullYear();

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
      this.preview = true;

      // const result = await createCertificate.createCertificate(this.form);
      // console.log(result)
    },
  },
  watch: {
    excel_array() {
      this.createCertificate();
    },
  },
};
</script>
