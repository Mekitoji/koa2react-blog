import mongoose from 'mongoose';

const db = 'koaNextTest';
const URI = `mongodb://localhost/${db}`;
mongoose.Promise = global.Promise;
mongoose.connect(URI);

mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connected to db!'));

export default mongoose;
