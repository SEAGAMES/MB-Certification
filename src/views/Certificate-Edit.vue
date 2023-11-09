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
            <input
              class="mt-n5 ml-3"
              type="file"
              @change.left="add_file()"
              @click="this.$refs.myFiles.value = null"
              ref="myFiles"
              accept=".xls, .xlsx, .csv"
            />
            <!-- <v-spacer></v-spacer>
            <v-btn
              v-if="save_to_db"
              @click="showDialog = true"
              class="mt-n7 mx-2"
              size="small"
              color="indigo"
              icon="mdi-cloud-upload"
            ></v-btn> -->
            <v-spacer></v-spacer>
            <v-btn
              @click="
                mangeName.dialog = true;
                selectPopupShow = 1;
              "
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
                    @click="
                      mangeName.dialog = true;
                      selectPopupShow = 2;
                    "
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
    <v-btn color="success" @click="edit_certificate">Confirm</v-btn>
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

  <v-row justify="center">
    <div>
      <!-- ใช้ <iframe> เพื่อแสดงไฟล์ PDF -->
      <iframe :src="base_64" ref="pdfIframe" v-if="preview"></iframe>
    </div>
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
</template>

 <script>
import Swal from "sweetalert2";
import apiCertificate from "../service/apiCertificate";
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
      mangeName: {
        dialog: false,
        pj_code: null,
        no: 1,
        prefix: "นาย",
        name: "ซีเกมส์ eiei",
      },
    };
  },
  mounted() {
    // ดึงข้อมูลจาก Local Storage
    const certificate_data = localStorage.getItem("certificate_data");

    // แปลงข้อมูลที่ดึงมาให้กลายเป็น Object
    this.dataStorage = JSON.parse(certificate_data);
    this.mangeName.pj_code = this.dataStorage.pj_code
    console.log("local Storage : ", this.dataStorage);
    //console.log("store : ", this.$store.state.certificate_data.pj_code);
    // this.mangeName.pj_code = data
    this.getDataCertificateDetail();
  },
  methods: {
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

    async edit_certificate() {
      const result = await apiCertificate.updateCertificate(
        this.dataStorage,
        this.dataDetail.data
        // this.$store.state.certificate_data,
        // this.dataDetail.data
      );
      console.log(result);
    },

    async saveName() {
      this.mangeName.dialog = false;
      if (this.selectPopupShow === 1) {
        this.dataDetail.data.push(this.mangeName);
        console.log('data : ', this.dataDetail.data);
      } else {
        const result = await apiCertificate.editName(this.mangeName);
        if (result.data.msg === "ok") {
          this.showAlert("success", "แก้ไขข้อมูลสำเร็จ");
        } else {
          this.showAlert("error", "ไม่สามารถแก้ไขได้กรุณาลองใหม่อีกครัง");
        }
      }
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