const axios = require('axios');
const cheerio = require('cheerio');
    const url = 'https://vcomic.net/doc-toan-chuc-phap-su-chuong-741.html';
    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const chapElement = $('.chapter-content > img');
        const totalChap = $('select > option');
        const chapArr = [];
        // console.log($('img'));
        chapElement.each(function () {
            const src = $(this).attr('src');
            const alt = $(this).attr('alt');
            // const playerName = $(this).find('.playerName > strong').text();
            // const nationality = $(this).find('.playerCountry').text();
            // const goals = $(this).find('.mainStat').text();
            chapArr.push({
              src,
              alt: alt,
            });
          });
        console.log('Số chương : ', totalChap.length/2 )
        console.log(chapArr);
      })
      .catch(console.error);