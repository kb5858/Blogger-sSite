const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDataBase Sucessfully"))
  .catch((error) => console.log("DataBase Conection Enterupted"));