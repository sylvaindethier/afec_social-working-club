import express from "express";
import mongoose from "mongoose";
// const stuffRoutes = require("./routes/stuff");
// const userRoutes = require("./routes/user");

const app = express();

// connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_SRV, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// // JSON middleware
// app.use(express.json());

// // Headers middleware
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );

//   next();
// });


// // Use stuff Routes
// app.use("/api/stuff", stuffRoutes);
// // Use user Routes
// app.use("/api/auth", userRoutes);

export default app;
