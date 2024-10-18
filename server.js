require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database.js');

const PORT = process.env.PORT || 3000;

const app = express();
try{
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba básica
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

// Conectar a MongoDB antes de configurar las rutas
connectDB()
    .then(() => {
        // Configurar rutas solo después de conectar a la BD
        const itemRoutes = require('./src/routes/itemRoutes.js');
        app.use('/api/items', itemRoutes);

        // Iniciar el servidor solo después de conectar a la BD
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al iniciar la aplicación:', err);
        process.exit(1);
    });

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Error en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
    console.error('Error no manejado:', err);
    process.exit(1);
});
} catch (error) {
    console.error('Error al iniciar la aplicación:', error);
}