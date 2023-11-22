<template class="fontSarabun">
  <v-parallax src="../assets/background/mb-building3.jpg"><v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="one" @click.prevent="++keycomponent">Create PDF</v-tab>
      <v-tab :value="two" @click.prevent="++keycomponent">Certification</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="one"
        ><CertificatePDF :key="keycomponent"></CertificatePDF
      ></v-window-item>
      <v-window-item value="two"
        ><CertificateMaster :key="keycomponent"></CertificateMaster
      ></v-window-item>
    </v-window></v-parallax>
</template>
<script>
import CertificatePDF from "../views/Certificate-PDF.vue";
import CertificateMaster from "../views/Certificate-Master";
export default {
  components: {
    CertificatePDF,
    CertificateMaster, // ลงทะเบียน Certificate-PDF เพื่อใช้งาน
  },
  data: function () {
    return {
      tab: this.$store.state.tabPage,
      one: "one",
      two: "two",
      keycomponent: 1,
    };
  },
};
</script>

<style scoped>
.parallax-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/background/mb-building2.jpg');
  background-size: cover;
  filter: blur(5px); /* ปรับค่า blur ตามความต้องการ */
  z-index: -1; /* ตั้งค่า z-index เพื่อให้พื้นหลังเบลออยู่หลังของเนื้อหา */
}
</style>
