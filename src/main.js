/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import store from './store';

// Plugins
import { registerPlugins } from '@/plugins'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css'

const app = createApp(App)

registerPlugins(app)
app.use(VueSweetalert2).use(store).use(VueGoodTablePlugin);

app.mount('#app')


