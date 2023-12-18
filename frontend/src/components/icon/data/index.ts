// 此处引入的图标，会在打包时自动引入，所以不能全部引入，否则会导致打包体积过大，并且会使构v8引擎内存溢出
// arco-design-vue 本身是有图标库的，其在此项目中是以组件的方式使用(本文件的列举出的图标是基于unocss实现的图标库，使用方式是指定class)
import antDesignIcons from './ant-design-icons';
import ionIcons from './ion-icons';

export {
    antDesignIcons,
    ionIcons,
};

export default [
    ...antDesignIcons,  // 不能全部引入，否则会导致打包体积过大，并且会使构v8引擎内存溢出
    'ion:grid-outline',
];