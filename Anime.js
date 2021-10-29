const mongoose = require("mongoose");
const db =
  "mongodb+srv://YuChen:iloveu8911@cluster0.obitp.mongodb.net/MovieDB?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Mongoose connetion error: ", error);
  });

const schema = mongoose.Schema({
  animeTitle: { type: String },
  animeType: { type: String },
  animeScore: { type: String },
  animeEpisodes: { type: String },
  animeSynopsis: { type: String },
  animeImage: { type: String },
  newsTitle: { type: String },
  newsLink: { type: String },
  newsPubDate: { type: String },
});

const Movie = mongoose.model("Movie", schema, "animeCollection");

module.exports = Movie;
