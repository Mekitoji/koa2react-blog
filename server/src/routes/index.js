import { resolve } from 'path';
import registerDir from '../lib/registerDir';

/**
 * register all routes
 * @method register
 * @param  {Object} app server application context
 */
const register = app => registerDir(app, resolve(__dirname));


export default register;
