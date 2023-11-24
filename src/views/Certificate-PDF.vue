<template >
  <v-row justify="center" class="fontSarabun">
    <v-col cols="10" sm="10" md="8" lg="6">
      <v-form ref="form" lazy-validation>
        <v-card ref="form" :height="270">
          <v-card-text>
            <v-row
              ><v-col cols="12" sm="12" md="6" lg="6"
                ><v-text-field
                  label="ชื่อโครงการ"
                  v-model="form.pj_name"
                  @change="saveCreatePDF"
                  :rules="textRule"
                  required
                ></v-text-field></v-col
              ><v-col
                ><v-row
                  ><v-col cols="4">
                    <v-switch
                      v-model="form.language"
                      @change="saveCreatePDF"
                      hide-details
                      true-value="Eng"
                      false-value="TH"
                      color="indigo"
                      :label="`ฟอร์ม : ${form.language}`"
                    ></v-switch> </v-col
                  ><v-col
                    ><v-checkbox
                      label="ใส่ลายเซ็น ผอ."
                      v-model="form.sign"
                      @change="saveCreatePDF"
                      color="indigo"
                      hide-details
                    ></v-checkbox></v-col
                  ><v-col
                    ><v-checkbox
                      label="2 ลายเซ็น"
                      v-model="form.two_sign"
                      @change="saveCreatePDF"
                      color="indigo-darken-3"
                      hide-details
                    ></v-checkbox></v-col></v-row></v-col
            ></v-row>
            <v-row class="mt-n8">
              <v-col
                ><v-text-field
                  label="รหัสโครงการ"
                  id="pj_name"
                  v-model="form.pj_code"
                  @change="saveCreatePDF"
                  :rules="textRule"
                  @input="handleInput"
                  required
                ></v-text-field
              ></v-col>
              <v-col
                ><v-text-field
                  label="ชื่อ"
                  v-model="form.add_name"
                  @change="saveCreatePDF"
                  :rules="twoSignRule"
                  :disabled="!form.two_sign"
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row class="mt-n8"
              ><v-col
                ><v-text-field
                  label="วันที่"
                  v-model="form.date_desc"
                  @change="saveCreatePDF"
                  :rules="textRule"
                  required
                ></v-text-field></v-col
              ><v-col
                ><v-text-field
                  label="ตำแหน่ง"
                  v-model="form.add_position"
                  @change="saveCreatePDF"
                  :rules="twoSignRule"
                  :disabled="!form.two_sign"
                ></v-text-field></v-col
            ></v-row>
            <v-row>
              <input
                class="mt-n5 ml-3"
                type="file"
                @change.left="add_file()"
                @change="saveCreatePDF"
                @click="this.$refs.myFiles.value = null"
                ref="myFiles"
                accept=".xls, .xlsx, .csv"
              />
              <v-spacer></v-spacer>
              <v-btn
                v-if="save_to_db"
                @change="saveCreatePDF"
                @click="createCertificate"
                class="mt-n7 mx-2"
                size="small"
                color="orange"
                icon="mdi-refresh"
              ></v-btn>
              <!-- @click="showDialog = true" -->
              <v-btn
                v-if="save_to_db"
                @change="saveCreatePDF"
                @click="validateCheck"
                class="mt-n7 mx-2"
                size="small"
                color="indigo"
                icon="mdi-cloud-upload"
              ></v-btn>
            </v-row>
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
        </v-card>
      </v-form>
    </v-col>

    <!-- 
    dialog confirm save data to db -->
    <v-dialog v-model="showDialog" max-width="300">
      <v-card>
        <v-card-title> save certificate to database </v-card-title>
        <v-card-text>
          Are you sure you want to perform this action?
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn color="red darken-1" text @click="showDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="green darken-1"
            :loading="loadingBtn"
            type="submit"
            @click="savePdfToDB"
            @change="saveCreatePDF"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <v-row justify="center">
    <div>
      <!-- ใช้ <iframe> เพื่อแสดงไฟล์ PDF -->
      <iframe :src="base_64" ref="pdfIframe" v-if="preview"></iframe>
    </div>
  </v-row>
</template>

<script>
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import createPDF from "../service/apiCreatePDF";
import apiCertificate from "../service/apiCertificate";

export default {
  data() {
    return {
      textRule: [(v) => !!v || "กรุณาใส่ข้อความ"],
      twoSignRule: [
        (v) => (this.form.two_sign ? !!v || "กรุณาใส่ข้อความ" : true),
      ],

      form: {
        pj_name: "",
        pj_code: "",
        date_desc: "",
        currentYear: "",
        add_name: "",
        add_position: "",
        language: "TH",
        sign: false,
        two_sign: false,
      },

      file: {
        name: "",
        size: "",
        type: "",
        lastModified: "",
        lastModifiedDate: "",
        webkitRelativePath: "",
      },

      base_64: null,
      excel_array: null,
      preview: false,
      save_to_db: false,
      showDialog: false,
      loadingBtn: false,
    };
  },
  async mounted() {
    const dataFormLocal = JSON.parse(localStorage.getItem("create_pdf")) || {};
    this.form = { ...this.form, ...dataFormLocal }; //กำหนดค่าทุก property ของ dataFormLocal ลงใน this.form.

    // const excel_file = localStorage.getItem("excel_file_list_name");
    // this.dataFormLocal2 = JSON.parse(excel_file);
    // this.file.name = this.dataFormLocal2.name;
    // this.file.size = this.dataFormLocal2.size;
    // this.file.type = this.dataFormLocal2.type;
    // this.file.lastModified = this.dataFormLocal2.lastModified;
    // this.file.lastModifiedDate = this.dataFormLocal2.lastModifiedDate;
    // this.file.webkitRelativePath = this.dataFormLocal2.webkitRelativePath;
  },
  methods: {
    showAlert(icon, title) {
      Swal.fire({
        position: "center",
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 2000,
      });
    },

    saveCreatePDF() {
      localStorage.setItem("create_pdf", JSON.stringify(this.form));
    },

    clearCreatePDF() {
      this.form = {
        pj_code: "",
        pj_name: "",
        date_desc: "",
        currentYear: "",
        add_name: "",
        add_position: "",
        language: "TH",
        sign: false,
        two_sign: false,
      };
      this.saveCreatePDF();
    },

    //handleInput(event) {
    handleInput() {
      // แปลงเป็นตัวพิมพ์ใหญ่
      //this.form.pj_code = event.target.value.toUpperCase();

      // กรองเฉพาะภาษาอังกฤษและเครื่องหมาย "-"
      this.form.pj_code = this.form.pj_code.replace(/[^A-Za-z0-9-]/g, "");

      // จำกัดจำนวนตัวอักษรไม่เกิน 12 ตัว
      this.form.pj_code = this.form.pj_code.slice(0, 12);
    },

    async add_file() {
      //let file = "";
      // if (this.file.name === "") {
      //   file = this.$refs.myFiles.files[0];

      //   this.file.name = file.name;
      //   this.file.size = file.size;
      //   this.file.type = file.type;
      //   this.file.lastModified = file.lastModified;
      //   this.file.lastModifiedDate = file.lastModifiedDate;
      //   this.file.webkitRelativePath = file.webkitRelativePath;

      //   localStorage.setItem("excel_file_list_name", JSON.stringify(this.file));
      // } else {
      //   file = this.file;
      //   console.log("else : ", file);
      // }
      const file = this.$refs.myFiles.files[0];
      const data = await file.arrayBuffer();
      console.log("data : ", data);
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
      this.save_to_db = true;
    },

    // เช็กเมื่อกดปุ่ม save to db
    validateCheck() {
      this.$refs.form.validate();
      if (this.form.pj_code && this.form.pj_name && this.form.date_desc) {
        if (
          !this.form.two_sign ||
          (this.form.add_name && this.form.add_position)
        ) {
          this.showDialog = true;
        }
      }
    },

    async savePdfToDB() {
      this.loadingBtn = true;
      setTimeout(async () => {
        // check ว่า code ใบเซอร์ซ้ำมั้ย
        const result = await apiCertificate.duplicateCheck(this.form.pj_code);
        // console.log(this.form);
        // กรณีไม่ซ้ำ
        if (result.data.msg === "ok") {
          const resultInsert = await apiCertificate.createCertificate(
            this.form,
            this.excel_array
          );
          // กรณี insert master เเละ detail สำเร็จ
          if (resultInsert.data.msg === "ok") {
            await apiCertificate.getDataCertificate_master();
            // const data = await apiCertificate.getDataCertificate();
            // this.$store.state.certificate_data = data.data
            this.showAlert("success", "บันทักข้อมูลสำเร็จ");
            this.clearCreatePDF();
          } else {
            this.showAlert("error", "บันทึกไม่สำเร็จ");
          }
          // กรณีซ้ำ
        } else {
          this.showAlert("error", "รหัสโครงการนี้ซ้ำ");
        }

        this.loadingBtn = false;
        this.showDialog = false;
      }, 1500);
    },
  },

  watch: {
    excel_array() {
      this.createCertificate();
    },
    "form.two_sign": {
      handler(newValue) {
        if (!newValue) {
          this.form.add_name = null;
          this.form.add_position = null;
        }
      },
      immediate: true, // เพื่อให้ทำการเช็คค่าเมื่อ component ถูก mount
    },
  },
};
</script>

<style scoped>
.text-center {
  display: flex;
  justify-content: right;
}
</style>



