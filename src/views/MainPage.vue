<template>
  <v-card>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
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
    </v-window>
  </v-card>
</template>
<script>
import CertificatePDF from "../views/Certificate-PDF.vue";
import CertificateMaster from "../views/Certificate-Master";
export default {
  components: {
    CertificatePDF,
    CertificateMaster, // ลงทะเบียน Certificate-PDF เพื่อใช้งาน
  },
  data: () => ({
    tab: "one",
    one: 'one',
    two: 'two',
    keycomponent:1
  }),
};
</script>