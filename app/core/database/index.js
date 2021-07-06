const mongoose = require('mongoose');
const db = process.env.MONGODB;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connection.on("connecting", () => console.log("Connection à la base données..."));
mongoose.connection.on("connected", () => {
    console.log("Connecté à la base données");
});
mongoose.connection.on("disconnecting", () => console.log("Déconnection de la base données..."));
mongoose.connection.on("disconnected", () => console.log("Déconnecté de la base données"));

mongoose.connect(db, options).catch(e => {console.log(e)});