var request = require("request");
var cheerio = require("cheerio");

exports.list = function(req, res){
  request({
          uri: "http://oneshop.co.kr/main/index",
        }, function(error, response, body) {
        
        var bodyContent = new Array();

        var $ = cheerio.load(body);

          $(".good_list > li > a").each(function(i) {
              var goods = {
                  link : $(this).attr("href")
                  ,imagePath : "http://www.oneshop.co.kr/" + $(this).find("img").attr("src")
                  ,title : $(this).find("dt").text()
                  ,price : $(this).find("em").text()
              };
              console.log($(this).attr("href"));
              bodyContent.push(goods);
          });

        console.log(bodyContent);
        res.header('Content-Type','application/json');
        res.json({goodList : bodyContent});
  });
};