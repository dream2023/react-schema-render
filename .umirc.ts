import { defineConfig } from 'dumi';
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'schema-render',
  base: '/react-schema-render',
  publicPath: '/react-schema-render/',
  outputPath: 'docs-dist',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  analytics: {
    baidu: isProduction ? '611a70c7e9f16a673003f0cf4cef19c7' : null,
  },
  scripts: isProduction
    ? [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-G6J05MB6SS',
          defer: true,
        },
        {
          content: `window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-G6J05MB6SS');`,
          charset: 'utf-8',
        },
      ]
    : [],
});
