import { readdirSync, statSync } from 'fs';
import { resolve, extname, basename } from 'path';

/**
 * register all routes in the folder recursivly
 * @method register
 * @param  {Object} app server application context
 * @param  {String} directory name
 */
const registerDir = (app, dir) => {
  readdirSync(dir).forEach(file => {
    const stat = statSync(resolve(dir, file));
    if (stat && stat.isDirectory() === true) return registerDir(app, resolve(dir, file));
    if (file === 'index.js' || extname(file) !== '.js') return 0;
    const name = basename(file);

    // require each submodules in the folder when server start
    // eslint-disable-next-line global-require
    require(resolve(dir, name)).default(app);
    return 0;
  });
};

export default registerDir;
