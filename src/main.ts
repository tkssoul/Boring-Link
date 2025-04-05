import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createSSRApp } from 'vue'

export function createApp() {
    const app = createSSRApp(App);
    registerPlugins(app);
    return app;
}


