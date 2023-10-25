 <template>
  <h1>{{ dataItem }}</h1>
  <v-container>
    <!-- <v-card ref="form" height="265">
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
      </v-card> -->
  </v-container>
</template>
 
 <script>
export default {
  props: ["dataX"],
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
      save_to_db: false,
      showDialog: false,
      loadingBtn: false,
    };
  },
  mounted() {
    console.log(this.dataX);
  },
};
</script>
 
 <style>
</style>