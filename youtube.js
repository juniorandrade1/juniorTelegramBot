const stream = require('youtube-audio-stream');
const url = 'http://youtube.com/watch?v=34aQNMvGEZQ';

var getAudio = function (req, res) {
  var requestUrl = url;
  try {
    youtubeStream(requestUrl).pipe(res)
  } catch (exception) {
    res.status(500).send(exception)
  }
}
