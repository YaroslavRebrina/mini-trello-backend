import config from './src/config/environment';
import mongoose from 'mongoose';

import './src/models/Todo';
import app from './app';

mongoose
 .connect(config.MONGODB_URI)
 .then(() => console.log('MongoDB Connected'))
 .catch((err) => console.error('MongoDB connection error:', err));

const PORT = config.PORT || 5000;
const server = app.listen(PORT, () => {
 console.info(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
 console.error(`Unhandled Rejection: ${err.message}`);
 server.close(() => process.exit(1));
});

export default server;
