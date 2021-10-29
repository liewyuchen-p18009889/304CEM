const express = require("express");
const app = express();
const axios = require("axios");
const Anime = require("./Anime");

const apiKey = "pub_12469f6fa060d3601b8105236090038c1fb2";

app.get("/getAnime", (req, res) => {
  const title = req.query.title;
  const query1 = `https://api.jikan.moe/v3/search/anime?q=${title}`;
  const query2 = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${title}`;

  axios
    .get(query1)
    .then((response1) => {
      axios
        .get(query2)
        .then((response2) => {
          const anime = new Anime({
            animeTitle: response1.data.results[0].title,
            animeType: response1.data.results[0].type,
            animeScore: response1.data.results[0].score,
            animeEpisodes: response1.data.results[0].episodes,
            animeSynopsis: response1.data.results[0].synopsis,
            animeImage: response1.data.results[0].image_url,

            newsTitle: response2.data.results[0].title,
            newsLink: response2.data.results[0].link,
            newsPubDate: response2.data.results[0].pubDate,
          });
          if (!anime.animeTitle) {
            res.status(200).json("Not found");
            return;
          }
          anime
            .save()
            .then((response) => {
              res.status(200).json(response);
            })
            .catch((error) => {
              res.status(400).json(error);
            });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.get("/getAllAnimes", (req, res) => {
  Anime.find({})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.get("/deleteAnime", (req, res) => {
  Anime.deleteOne({ title: req.query.title })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
