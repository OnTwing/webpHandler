import babel from 'rollup-plugin-babel';
export default {
    entry: 'webp-node',
    format: 'cjs',
    plugins: [ babel()],
    dest: 'dist/webp-node' // 输出文件
  };