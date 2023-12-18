import * as Icons from '@ant-design/icons-vue';
import { App } from 'vue';

function camelAndPascalToKebab(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
const setupAntVue = (app: App) => {
    // console.log(Icons.AccountBookFilled);
    Object.keys(Icons).forEach((key) => {
        // console.log(`ant-design:${camelAndPascalToKebab(key)}`);
        app.component(`ant-design:${camelAndPascalToKebab(key)}`, Icons[key as keyof typeof Icons]);
    });
};

export default setupAntVue;