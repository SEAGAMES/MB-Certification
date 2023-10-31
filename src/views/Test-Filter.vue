<template>
  <div>
    <vue-good-table :columns="columns" :rows="rows"></vue-good-table>
  </div>
</template>
<script>
import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

export default {
  components: {
    VueGoodTable,
  },
  data() {
    return {
      columns: [
        { label: 'ชื่อ', field: 'name' },
        { label: 'อายุ', field: 'age' },
        { label: 'อีเมล', field: 'email' },
      ],
      rows: [
        { name: 'John Doe', age: 30, email: 'john@example.com' },
        { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
        { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
        // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
      ],
    };
  },
};
</script>
