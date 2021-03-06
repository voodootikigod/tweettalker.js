var TwitterNode = require('./lib/twitter-node/lib').TwitterNode;
var talker      = require('./lib/say');
var config      = require("./config").load();

var twit = new TwitterNode({  user: config.twitter.account
                              , password: config.twitter.password
                              , track: config.twitter.terms
                          });

function html_decode(txt) {
  return txt.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&");
}

twit.addListener('tweet', function(tweet) {
   talker.say([tweet.user.screen_name, " said ", html_decode(tweet.text)].join(""));
  }).stream();
