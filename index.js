const TeleBot = require('telebot');
const bot = new TeleBot('346896437:AAHuKBu4ZcVwwN62xY-VO7lxDVRFVzUeDSk');
const yas = require('youtube-audio-server');
var search = require('youtube-search');

var optSearch = {
  maxResults: 1,
  key: 'AIzaSyBt2PD3Imv4xVNyDLUxzvb53iYuxUHWNpI'
};

bot.on('text', (msg) => {
    search(msg.text, optSearch, function(err, results) {
      if(err) return console.log(err);
      console.dir(results[0].id);
      msg.reply.text('Estamos baixando seu audio');
      var id = results[0].id;
      var file = results[0].title;
      if(file.includes('.mp3') == false) file = file + '.mp3';
      console.log(`Downloading ${id} into ${file}...`)
      yas.downloader.onSuccess(({id, file}) => {
        console.log(`Yay! Audio (${id}) downloaded successfully into "${file}"!`);
        msg.reply.text('Encontramos o seu video, já estamos enviando.. só um segundo!');
        msg.reply.audio(file)
      })
      .onError(({id, file, error}) => {
        console.error(`Sorry, an error ocurred when trying to download ${id}`, error)
      })
      .download({id, file})
    });
});

bot.start();