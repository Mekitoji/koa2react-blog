import './lib/babelPolyfill';
import app from './server';
import { PORT } from './config';
import './lib/mongoose';

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
