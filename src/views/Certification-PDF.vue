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
  <div class="row" v-if="preview">
    <embed :src="base_64" />
  </div>
</template>

<script>
// import create_pdf from "@/js/cer_th";
import * as XLSX from "xlsx";
import createPDF from '../service/apiCreatePDF'

export default {
  data() {
    return {
      form: {
        pj_name: "Test",
        pj_code: "2023-PAR-",
        date: "16",
        sign: false,
      },
      show: false,
      base_64: null,
      excel_array: null,
      preview: true,
    };
  },
  async mounted() {
    const res1 = await createPDF.create_pdf()
    console.log(res1)
  },
  methods: {
  async add_file() {
    const file = this.$refs.myFiles.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    const result = XLSX.utils.sheet_to_json(ws, {});
    this.excel_array = result;
    this.createPDF()
  },
  async createPDF() {
    await createPDF.testPDF()
  }
},

  // watch: {
  //    async 'excel_array'() {
  //     await createPDF.create_pdf(this.excel_array, this.form)
  //   }
  // },
  // watch: {
  //   'excel_array'() {
  //     const aa = preview_cer_th(this.excel_array, this.form)
  //     console.log(aa)
  //     aa.getDataUrl((dataUrl) => {
  //       this.base_64 = dataUrl
  //     });
  //     this.show = true
  //   }
  // },
  
};
</script>
<style scoped>
embed {
  height: 70vh;
}
</style>