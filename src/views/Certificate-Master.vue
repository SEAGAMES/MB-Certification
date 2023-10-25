<template>
  <v-container>
    <v-card
      ><v-table>
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
            <td v-for="column in columns" :key="column.key">
              {{ item[column.dataIndex] }}
            </td>
            <td>
              <div style="display: flex; gap: 10px">
                <v-icon
                  @click="editCertificate()"
                  style="color: rgb(243, 156, 18)"
                  >mdi-pencil</v-icon
                >
                <v-icon style="color: rgb(255, 0, 0)">mdi-delete</v-icon>
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
import apiCertificate from "@/service/apiCertificate";
export default {
  data() {
    return {
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
    this.getDataCertificate();
  },

  methods: {
    async getDataCertificate() {
      const data = await apiCertificate.getDataCertificate();
      this.dataLoad = data.data;
      //console.log(this.dataLoad);
    },

    editCertificate() {
      // ส่งข้อมูลไปยังคอมโพนเนนต์ปลายทางผ่าน Props
      const dataX = {
        name: "game",
        year: 18,
      };
      console.log(dataX);
      this.$router.push({
        name: "Certificate-Edit", // ชื่อเส้นทาง
        param: { dataItem: dataX }, // ส่งข้อมูลผ่านพารามิเตอร์
      });
    },
  },
};
</script>