<template>
  <v-data-table
    :headers="headers"
    :items="dataLoad.data"
    :items-per-page="10"
    :search="search"
  >
    <template v-slot:item="{ item }">
      <tr align="center">
        <td>{{ item.pj_code }}</td>
        <td>{{ item.pj_name }}</td>
        <td>{{ item.language }}</td>
        <td>{{ item.currentYear }}</td>
        <td>{{ item.date_desc }}</td>
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
    </template></v-data-table
  >
</template>

<script>
//import { ref } from "vue";
import Swal from "sweetalert2";
import apiCertificate from "@/service/apiCertificate";
export default {
  data() {
    return {
      search: "",
      dataLoad: [],
      data_certificate: [],

      headers: [
        {
          align: "center",
          key: "pj_code",
          sortable: false,
          title: "รหัสโครงการ",
        },
        { align: "center", key: "pj_name", title: "ชื่อโครงการ" },
        { key: "language", title: "ภาษา" },
        { align: "center", key: "currentYear", title: "ปี" },
        { align: "center", key: "date_desc", title: "อบรมวันที่" },
        { align: "center", title: "Action" },
      ],
    };
  },

  async mounted() {
    await this.getDataCertificateMaster();
  },

  methods: {
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
      // console.log(this.dataLoad.data);
    },

    editCertificate(data) {
      // แปลง 0 กับ 1 เป็น true กับ false
      data.sign = data.sign === 1;
      data.two_sign = data.two_sign === 1;

      localStorage.setItem("certificate_data", JSON.stringify(data));
      this.$store.state.certificate_data = data;
      this.$router.push({
        name: "Certificate-Edit",
      });
    },

    async deleteCertificate(pj_code) {
      this.deleteAlert(pj_code);
    },
  },
  computed: {
    customItems() {
      return this.dataLoad.data.map((item) => ({
        ...item,
      }));
    },
  },
};
</script>