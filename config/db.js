const mongoose = require('mongoose');


mongoose.connect(process.env.ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


mongoose.connection.on('connected', () => {
    console.log('Conexión establecida a MongoDB');
});


mongoose.connection.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err.message);
});


mongoose.connection.on('disconnected', () => {
    console.log('Desconectado de MongoDB');
});


module.exports = mongoose.connection;