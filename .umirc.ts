import { defineConfig } from '@umijs/max';
import routes from "./config/routes";

const {REACT_APP_ENV} = process.env;

export default defineConfig({
  publicPath: '/simpletools/',
  history: {type: 'hash'},
  hash: true,
  // layout: {},
  routes: routes,
  npmClient: 'yarn',
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    APP_CONFIG: {
      APP_NAME: 'simpletools',
      APP_TITLE: '简易小工具',
    }
  }
});

