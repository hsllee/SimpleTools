declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | 'prod' | false;

// 以下变量声明对应config.[env].ts文件内define的变量
declare const APP_CONFIG: {
    APP_NAME: string,
    APP_TITLE: string,
}
