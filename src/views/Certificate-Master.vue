<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          @click="filteredData"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-table :search="search">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th v-for="column in columns" :key="column.key">
              {{ column.title }}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataLoad.data" :key="item.pj_code">
            <td>{{ index + 1 }}</td>
            <!-- ย่อ code -->
            <td v-for="column in columns" :key="column.key">
              {{ item[column.dataIndex] }}
            </td>
            <td>
              <div style="display: flex; gap: 10px">
                <v-icon
                  @click="editCertificate(item)"
                  style="color: rgb(243, 156, 18)"
                  >mdi-pencil</v-icon
                >
                <v-icon
                  @click="deleteCertificate(item.pj_code)"
                  style="color: rgb(255, 0, 0)"
                  >mdi-delete</v-icon
                >
              </div>
            </td>
          </tr>
        </tbody>
      </v-table></v-card
    >
  </v-container>
</template>

  <script>
import { ref } from "vue";
import Swal from "sweetalert2";
import apiCertificate from "@/service/apiCertificate";
export default {
  data() {
    return {
      search: "",
      data_certificate: [],
      dataItem: {
        name: "game",
        age: 18,
      },
    };
  },

  setup() {
    const dataLoad = ref([]);

    const columns = ref([
      { key: "pj_code", title: "รหัสโครงการ", dataIndex: "pj_code" },
      { key: "pj_name", title: "ชื่อโครงการ", dataIndex: "pj_name" },
      { key: "language", title: "ภาษา", dataIndex: "language" },
      { key: "currentYear", title: "ปี", dataIndex: "currentYear" },
      { key: "date_desc", title: "อบรมวันที่", dataIndex: "date_desc" },
      //   { key: "add_position", title: "add_position", dataIndex: "add_position" },
      //   { key: "add_position", title: "add_position", dataIndex: "add_position" },
      //   { key: "sign", title: "sign", dataIndex: "sign" },
      //   { key: "two_sign", title: "two_sign", dataIndex: "two_sign" },
    ]);

    return {
      dataLoad,
      columns,
    };
  },

  async mounted() {
    await this.getDataCertificateMaster();
  },

  methods: {
    async search_filter() {
      if (this.search.length > 0) {
        const result = await apiCertificate.getDataFilter(this.search);
        this.dataLoad = result.data;
      } else {
        this.getDataCertificateMaster()
      }
    },
    deleteAlert(pj_code) {
      Swal.fire({
        title: "คุณแน่ใจหรือไม่ที่จะลบ?",
        text: "การกระทำนี้ไม่สามารถยกเลิกได้!",
        icon: "warning",
        showCancelButton: true, // แสดงปุ่ม "Cancel"
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก", // ปุ่ม "Cancel" ที่กำหนดค่าข้อความเป็น 'ยกเลิก'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await apiCertificate.deleteCertificate(pj_code);
          console.log(result.data.msg);
          if (result.data.msg === "ok") {
            this.getDataCertificateMaster();
            Swal.fire(
              `ลบ ${pj_code} แล้ว!"`,
              "ไฟล์ของคุณถูกลบแล้ว.",
              "success"
            );
          } else {
            Swal.fire(`การลบ ${pj_code} ผิดพลาด!"`, "", "error");
          }
        }
      });
    },

    async getDataCertificateMaster() {
      const data = await apiCertificate.getDataCertificate_master();
      this.dataLoad = data.data;
      //console.log(this.dataLoad);
    },

    editCertificate(data) {
    this.$store.state.certificate_data = data      
    this.$router.push({
        name: "Certificate-Edit", // ชื่อเส้นทาง
      });
   
    },

    async deleteCertificate(pj_code) {
      this.deleteAlert(pj_code);
    },
  },
  computed: {
    filteredData() {
      let dataFilter = this.search_filter();
      console.log(dataFilter);
      return dataFilter;
    },
  },

  // computed: {
  //   filteredData() {
  //       let dataFilter = this.dataLoad.data.filter((item) => {
  //         return item.pj_code === this.search
  //       })
  //       return dataFilter
  //   },
  // },
};
</script>