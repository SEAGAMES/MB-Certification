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
            ><v-col
              ><v-text-field
                label="ชื่อโครงการ"
                v-model="$store.state.certificate_data.pj_name"
              ></v-text-field></v-col
            ><v-col
              ><v-row
                ><v-col>
                  <v-switch
                    v-model="$store.state.certificate_data.language"
                    hide-details
                    true-value="Eng"
                    false-value="TH"
                    color="indigo"
                    value="indigo"
                    :label="`ฟอร์ม : ${$store.state.certificate_data.language}`"
                  ></v-switch> </v-col
                ><v-col
                  ><v-checkbox
                    label="ใส่ลายเซ็น ผอ."
                    v-model="$store.state.certificate_data.sign"
                    color="indigo"
                    value="indigo"
                    hide-details
                  ></v-checkbox></v-col
                ><v-col
                  ><v-checkbox
                    label="2 ลายเซ็น"
                    v-model="$store.state.certificate_data.two_sign"
                    color="indigo-darken-3"
                    value="indigo-darken-3"
                    hide-details
                  ></v-checkbox></v-col></v-row></v-col
          ></v-row>
          <v-row class="mt-n8">
            <v-col
              ><v-text-field
                label="รหัสโครงการ"
                v-model="$store.state.certificate_data.pj_code"
                @input="
                  $store.state.certificate_data.pj_code =
                    $event.target.value.toUpperCase()
                "
              ></v-text-field
            ></v-col>
            <v-col
              ><v-text-field
                label="ชื่อ"
                v-model="$store.state.certificate_data.add_name"
                :disabled="!$store.state.certificate_data.two_sign"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row class="mt-n8"
            ><v-col
              ><v-text-field
                label="วันที่"
                v-model="$store.state.certificate_data.date_desc"
              ></v-text-field></v-col
            ><v-col
              ><v-text-field
                label="ตำแหน่ง"
                v-model="$store.state.certificate_data.add_position"
                :disabled="!$store.state.certificate_data.two_sign"
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
            <v-btn
              v-if="save_to_db"
              @click="showDialog = true"
              class="mt-n7 mx-2"
              size="small"
              color="indigo"
              icon="mdi-cloud-upload"
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataDetail.data" :key="item.name">
              <td>{{ index + 1 }}</td>
              <td>{{ item.prefix }}</td>
              <td>{{ item.name }}</td>
              <!-- <td><v-text-field variant="outlined" disabled dense></v-text-field></td>
              <td><input type="text" /></td> -->
            </tr>
          </tbody> </v-table
      ></v-card>
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
    <div>
      <!-- ใช้ <iframe> เพื่อแสดงไฟล์ PDF -->
      <iframe :src="base_64" ref="pdfIframe" v-if="preview"></iframe>
    </div>
  </v-row>
</template>

 <script>
import apiCertificate from "../service/apiCertificate";
export default {
  props: ["dataX"],
  data() {
    return {
      dataDetail: [],
      base_64: null,
      excel_array: null,
      preview: false,
      save_to_db: false,
      showDialog: false,
      loadingBtn: false,
    };
  },
  mounted() {
    console.log(this.$store.state.certificate_data);
    this.getDataCertificateDetail();
  },
  methods: {
    async getDataCertificateDetail() {
      const data = await apiCertificate.getDataCertificate_detail(
        this.$store.state.certificate_data
      );
      this.dataDetail = data.data;
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