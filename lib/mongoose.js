import mongoose from 'mongoose';
import { DB } from '../config';

const URI = `mongodb://localhost/${DB}`;
mongoose.Promise = global.Promise;
mongoose.connect(URI);

mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connected to db!'));

export default mongoose;
