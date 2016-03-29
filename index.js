import app from './server';
import { PORT } from './config';
import './lib/mongoose';

app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
