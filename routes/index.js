var express = require('express');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var router = express.Router();
// import fetch from 'node-fetch';

const axios = require('axios');

// import {JSDOM} from 'jsdom';

const getWebsiteContent = async (url) => {
  // Simple HTTP call
  const content = await fetch(url);
  // Parsing to result as text
  return content.text();
};


const scrape = async (url, cssSelector) => {
  // Get the HTML of the URL
  const websiteHtml = await getWebsiteContent(url);
  // Create JSDOM to have a virtual DOM we can query
  const dom = new JSDOM(websiteHtml);
  const doc = dom.window.document;
  // Search for the input element we want the value for and return it's value
  return (doc.querySelector(cssSelector));
};

/**
 * Simple main method to set up the parameters for our scraping
 * and posting its result
 */
const main = async () => {
  // Prepare our variables
  const url = 'https://www.google.com';
  const cssSelector = 'form input[type=submit]';
  // Run the Crawler
  const scrapeResult = await scrape(url, cssSelector);
  // Print the parameters + result
  console.log('---------------------');
  console.log(`Crawling URL: '${url}'`);
  console.log(`CSS Selector : '${cssSelector}'`);
  console.log('---------------------');
  console.log(`Result: '${scrapeResult}'\n`);
};



router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET home page. */
router.post('/getlink', function (req, res, next) {
  console.log(req.body.linkget);
  const axios = require('axios');
  const cheerio = require('cheerio');
  const url = 'https://vcomic.net/' + req.body.linkget;
  const chap = url.slice(url.lastIndexOf('-') + 1, url.lastIndexOf('.'));
  axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const listStory = $('.chapter-content > img');
      const totalChap = $('select > option');
      const chapArr = [];
      // console.log($('img'));
      listStory.each(function () {
        const src = $(this).attr('src');
        const alt = $(this).attr('alt');
        // const playerName = $(this).find('.playerName > strong').text();
        // const nationality = $(this).find('.playerCountry').text();
        chapArr.push({
          src,
          alt: alt,
        });
      });
      // console.log('Số chương : ', totalChap.length / 2)
      // console.log(chapArr);
      // res.render('index', { title: 'Express', total: totalChap.length / 2, chapArr:chapArr });
      let data = [];
      if (chapArr.length > 0) {
        data = chapArr.slice(1, chapArr.length - 1);
      }
      res.status(200).json({
        status: true,
        data: data,
        totalChap: totalChap.length / 2,
        chap: chap / 1
      })

    })
    .catch(console.error);
});

const instance = axios.create({
  baseURL: 'https://vuighe.net/api/v2',
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Referer: "https://vuighe.net/idoly-pride"
  }
});
router.post('/getlink/page', async function (req, res, next) {
  const cheerio = require('cheerio');
  // const url = 'https://vuighe.net/' + req.body.pageget;
  const url = 'https://vuighe.net/api/v2/films/6723/episodes?sort=name';

  // main();

  const { data } = await instance.get(url);
  console.log(data);
  // console.log(typeof(data.data));
  // const { window } = new JSDOM(data.data,{ runScripts: "dangerously", resources: "usable" });
  // const { document } = window;
  // console.log(document.querySelector(".film-info-genre"));

  // const { id, name } = document.querySelector(".container.play").dataset;
  // console.log(id);
  // const slideItems = document.querySelectorAll(".slider-item");

  // console.log(url);
  // const dom = new JSDOM(``, {
  //   url: url,
  //   referrer: url,
  //   contentType: "text/html",
  //   includeNodeLocations: true,
  //   storageQuota: 10000000
  // });
  // console.log(dom);
  // console.log(data);
  // const item = document.getElementsByClassName("film-info");
  // console.log(item);
  // const url = 'http://animevietsub.tv/phim/pham-nhan-tu-tien-yen-gia-bao-chi-chien-ova-a4339/tap-01-79489.html'
  // console.log(opp);
  // axios(url)
  //   .then(response => {
  //     const html = response.data;
  //     const $ = cheerio.load(html);
  //     // console.log(html);
  //     const listStory = $('.episode-group > .episode-item');
  //     // const totalChap = $('select > option');
  //     console.log(listStory);
  //     const listChap = [];
  //     // console.log($('img'));
  //     listStory.each(function () {
  //       // const src = $(this).attr('src');
  //       // const alt = $(this).attr('alt');
  //       const href = $(this).find('a').attr('href');
  //       const title = $(this).find('a').attr('title');
  //       // const bgimg = $(this).find('a > .episode-item-thumbnail > img').attr('src');
  //       // const title = $(this).find('a > .episode-item-meta > .episode-item-title').text();
  //       // const view = $(this).find('a > .episode-item-meta > .episode-item-views').text();
  //       // const time = $(this).find('a > .chapter-time').text();
  //       // const nationality = $(this).find('.playerCountry').text();


  //       listChap.push({
  //         href,
  //         title,
  //       });
  //     });
  //     // console.log(listChap);

  //     res.status(200).json({
  //       status: true,
  //       data: listChap,
  //     })

  //   })
  //   .catch(console.error);
});

router.get('/gethome', function (req, res, next) {
  const axios = require('axios');
  const cheerio = require('cheerio');
  const url = 'https://vuighe.net/';
  const opp = {
    url: url,
    timeout: 5000
  }
  axios(opp)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const listNewMovie = $('.episode > .tray-content.index > .tray-item');
      // const totalChap = $('select > option');
      console.log(listNewMovie);
      const arrStory = [];
      // console.log($('img'));
      listNewMovie.each(function () {
        // const src = $(this).attr('src');
        // const alt = $(this).attr('alt');
        const href = $(this).find('a').attr('href');
        const bgimg = $(this).find('a > .tray-item-thumbnail').attr('data-src');
        const title = $(this).find('a > .tray-item-description > .tray-item-title').text();
        const name = $(this).find('a > .tray-item-description > .tray-item-meta-info > .tray-episode-name').text();
        const view = $(this).find('a > .tray-item-description > .tray-item-meta-info > .tray-episode-views').text();
        // const nationality = $(this).find('.playerCountry').text();
        arrStory.push({
          href,
          bgimg,
          title,
          name,
          view
        });
      });
      res.status(200).json({
        status: true,
        data: arrStory,
      })

    })
    .catch(console.error);
});
module.exports = router;
