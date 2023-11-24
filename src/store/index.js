// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    tabPage: 'one',
    certification_edit: [],

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
  },
  mutations: {
    // มิวเทชันของคุณ
  },
  actions: {
    // การกระทำของคุณ
  },
  getters: {
    // ตัวกำหนดของคุณ
  },
});

export default store;
