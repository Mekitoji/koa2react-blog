import mongoose from 'mongoose';
import { DB } from '../config';

const URI = `mongodb://localhost/${DB}`;
mongoose.Promise = global.Promise;
mongoose.connect(URI);

// TODO: Add custom logger;
// Log db connection state

/* eslint-disable no-console */
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connected to db!'));
/* eslint-enable no-console */

export default mongoose;
