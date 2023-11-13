<template>
  <div class="center-text">
    <h1>Edit</h1>
    <!-- ส่วนอื่น ๆ ของเท็มเพลต -->
  </div>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" height="265">
        <v-card-text>
          <v-row
            ><v-col>
              <v-text-field
                label="ชื่อโครงการ"
                v-model="dataStorage.pj_name"
              ></v-text-field></v-col
            ><v-col
              ><v-row
                ><v-col>
                  <v-switch
                    v-model="dataStorage.language"
                    hide-details
                    true-value="Eng"
                    false-value="TH"
                    color="indigo"
                    :label="`ฟอร์ม : ${dataStorage.language}`"
                  ></v-switch> </v-col
                ><v-col
                  ><v-checkbox
                    label="ใส่ลายเซ็น ผอ."
                    v-model="dataStorage.sign"
                    color="indigo"
                    hide-details
                  ></v-checkbox></v-col
                ><v-col
                  ><v-checkbox
                    label="2 ลายเซ็น"
                    v-model="dataStorage.two_sign"
                    color="indigo-darken-3"
                    hide-details
                  ></v-checkbox></v-col></v-row></v-col
          ></v-row>
          <v-row class="mt-n8">
            <v-col
              ><v-text-field
                label="รหัสโครงการ"
                v-model="dataStorage.pj_code"
                @input="
                  $store.state.certificate_data.pj_code =
                    $event.target.value.toUpperCase()
                "
              ></v-text-field
            ></v-col>
            <v-col
              ><v-text-field
                label="ชื่อ"
                v-model="dataStorage.add_name"
                :disabled="!dataStorage.two_sign"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row class="mt-n8"
            ><v-col
              ><v-text-field
                label="วันที่"
                v-model="dataStorage.date_desc"
              ></v-text-field></v-col
            ><v-col
              ><v-text-field
                label="ตำแหน่ง"
                v-model="dataStorage.add_position"
                :disabled="!dataStorage.two_sign"
              ></v-text-field></v-col
          ></v-row>
          <v-row>
            <!-- เพิ่มรายชื่อ -->
            <v-spacer></v-spacer>
            <v-btn
              @click="createPDFShow"
              class="mt-n7 mx-2"
              size="small"
              color="orange"
              icon="mdi-refresh"
            ></v-btn>
            <v-btn
              @click="addName()"
              class="mt-n7 mx-2"
              size="small"
              color="green"
              icon="mdi-account-multiple-plus"
            ></v-btn>
          </v-row>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
      </v-card>
      <v-card
        ><v-table>
          <thead>
            <tr>
              <th class="text-left">ลำดับ</th>
              <th class="text-left">คำนำหน้า</th>
              <th class="text-left">ชื่อ-นามสกุล</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataDetail.data" :key="item.name">
              <td>{{ index + 1 }}</td>
              <td>{{ item.prefix }}</td>
              <td>{{ item.name }}</td>
              <td>
                <div style="display: flex; gap: 10px">
                  <v-icon
                    @click="this.editName(index)"
                    style="color: rgb(243, 156, 18)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    @click="deleteListName(index)"
                    style="color: rgb(255, 0, 0)"
                    >mdi-delete</v-icon
                  >
                </div>
              </td>
              <!-- <td><v-text-field variant="outlined" disabled dense></v-text-field></td>
              <td><input type="text" /></td> -->
            </tr>
          </tbody>
        </v-table></v-card
      >
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
            @click="savePdfToDB"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <v-row justify="center">
    <v-btn color="success" @click="confirmUpdate">Confirm</v-btn>
    <v-btn
      class="ml-5"
      color="red"
      @click="
        this.$router.go(-1);
        $store.state.tabPage = 'two';
      "
      >Cancel</v-btn
    >
  </v-row>

  <!-- Popup ใส่ชื่อ-นามสกุล -->
  <v-dialog v-model="mangeName.dialog" max-width="400">
    <v-card>
      <v-card-title>{{
        selectPopupShow === 1
          ? "เพิ่มรายชื่อ"
          : "กรุณาใส่ชื่อ-นามสกุล ที่ต้องการเปลี่ยน"
      }}</v-card-title>
      <v-card-text>
        <v-text-field
          label="คำนำหน้า"
          v-model="mangeName.prefix"
        ></v-text-field>
        <v-text-field
          label="ชื่อ-นามสกุล"
          v-model="mangeName.name"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" @click="mangeName.dialog = false">ยกเลิก</v-btn>
        <v-btn color="success" @click="saveName">บันทึก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row justify="center">
    <div>
      <!-- ใช้ <iframe> เพื่อแสดงไฟล์ PDF -->
      <iframe :src="base_64" ref="pdfIframe" v-if="preview"></iframe>
    </div>
  </v-row>
</template>

 <script>
import Swal from "sweetalert2";
import apiCertificate from "../service/apiCertificate";
import createPDF from "../service/apiCreatePDF";
export default {
  data() {
    return {
      dataDetail: [],
      base_64: null,
      excel_array: null,
      preview: false,
      save_to_db: false,
      showDialog: false,
      loadingBtn: false,

      selectPopupShow: null,
      dataStorage: [],
      indexEdit: null,
      mangeName: {
        dialog: false,
        prefix: null,
        name: null,
      },
    };
  },
  mounted() {
    // ดึงข้อมูลจาก Local Storage
    const certificate_data = localStorage.getItem("certificate_data");

    // แปลงข้อมูลที่ดึงมาให้กลายเป็น Object
    this.dataStorage = JSON.parse(certificate_data);
    this.mangeName.pj_code = this.dataStorage.pj_code;
    this.getDataCertificateDetail();
  },
  methods: {
    confirmUpdate() {
      Swal.fire({
        title: "บันทึกการเปลี่ยนแปลง ?",
        icon: "warning",
        showCancelButton: true, // แสดงปุ่ม "Cancel"
        confirmButtonColor: "#228B22",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึก",
        cancelButtonText: "ยกเลิก", // ปุ่ม "Cancel" ที่กำหนดค่าข้อความเป็น 'ยกเลิก'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await apiCertificate.updateCertificate(
            this.dataStorage,
            this.dataDetail.data
          );
          // console.log(result.data.msg);
          if (result.data.msg === "ok") {
            // set localStorage
            localStorage.setItem(
              "certificate_data",
              JSON.stringify(this.dataStorage)
            );
            this.$store.state.certificate_data = this.dataStorage;
            this.$router.push({
              name: "Certificate-Edit",
            });
            this.showAlert("success", "แก้ไขข้อมูลสำเร็จ");
          } else {
            this.showAlert("error", "ไม่สามารถแก้ไขได้กรุณาลองใหม่อีกครัง");
          }
        }
      });
    },

    async createPDFShow() {
      const pdfDocGenerator = await createPDF.certification_pdf(
        this.dataDetail.data,
        this.dataStorage
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

    async getDataCertificateDetail() {
      const data = await apiCertificate.getDataCertificate_detail(
        this.dataStorage
      );
      this.dataDetail = data.data;
    },

    showAlert(icon, title) {
      Swal.fire({
        position: "center",
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 2000,
      });
    },

    // เมื่อกดแก้ไขรายชื่อ
    editName(index) {
      this.indexEdit = index;
      this.mangeName.dialog = true;
      (this.mangeName.prefix = this.dataDetail.data[this.indexEdit].prefix),
        (this.mangeName.name = this.dataDetail.data[this.indexEdit].name),
        (this.selectPopupShow = 2);
    },

    // เมื่อกดปุ่มเพิ่มรายชื่อ
    addName() {
      this.mangeName = {
        dialog: true,
        prefix: null,
        name: null,
      };
      this.selectPopupShow = 1;
    },

    // เมื่อกดปุ่ม บันทึกใน dialog
    async saveName() {
      this.mangeName.dialog = false;
      // กรณีเพิ่มรายชื่อ
      if (this.selectPopupShow === 1) {
        this.dataDetail.data.push(this.mangeName);
      } else {
        // กรณีแก้ไขรายชื่อ
        this.dataDetail.data[this.indexEdit] = this.mangeName;
      }
      this.mangeName = {
        dialog: false,
        prefix: null,
        name: null,
      };
      this.selectPopupShow = null;
    },

    deleteListName(index) {
      this.dataDetail.data.splice(index, 1);
    },
  },
};
</script>
 
<style>
.center-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>