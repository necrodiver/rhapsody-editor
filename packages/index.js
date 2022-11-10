import REditor from './index.vue';
import './assets/init.sass';

export { REditor };

export default {
    install(App) {
        App.component(REditor.name, REditor);
    }
};
