const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const fs = require("fs");

const PORT = process.env.PORT || 8000;
const app = express();
const url = "https://www.theguardian.com/uk";

axios(url)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".fc-item__title").each((l, el) => {
      const title = $(el).text();
      const url = $(el).find("a").attr("href");

      const article = {
        title,
        url,
      };
      articles.push(article);
    });
    console.log(articles);

    fs.writeFile("../public/data.json", JSON.stringify(articles), (err) => {
      if (err) {
        console.log(err);
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
