import fs from 'fs';
import path from 'path';

function register(app) {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js' || path.extname(file) !== '.js') return;
    const name = path.basename(file);
    require(`./${name}`).default(app);
  });
}
export default register;
