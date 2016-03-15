import app from './server';
import './lib/mongoose';

const PORT = 3000;
app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
