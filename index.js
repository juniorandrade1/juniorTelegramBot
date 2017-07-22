// function downloadAudioFromYoutubeWithId(id, file) {
//   const yas = require('youtube-audio-server')
//   console.log(`Downloading ${id} into ${file}...`)
// yas.downloader
//   .onSuccess(({id, file}) => {
//     console.log(`Yay! Audio (${id}) downloaded successfully into "${file}"!`)
//     return file;
//   })
//   .onError(({id, file, error}) => {
//     console.error(`Sorry, an error ocurred when trying to download ${id}`, error)
//     return 'error';
//   })
//   .download({id, file})
// };

// function getAudioFromVideoYoutube(id, file) {
//     var response = downloadAudioFromYoutubeWithId(id, file);
//     if(response == 'error') {
//         console.log('returned error on downloading');
//         return 'error';
//     }
//     return file;
// }

const TeleBot = require('telebot');
const bot = new TeleBot('346896437:AAHuKBu4ZcVwwN62xY-VO7lxDVRFVzUeDSk');
const yas = require('youtube-audio-server')

bot.on('text', (msg) => {
    msg.reply.text('Estamos baixando seu audio');
    var p = msg.text.split(' ');
    var id = p[0];
    var file = p[1];
    if(file.includes('.mp3') == false) file = file+'.mp3';
    console.log(`Downloading ${id} into ${file}...`)
    yas.downloader.onSuccess(({id, file}) => {
        console.log(`Yay! Audio (${id}) downloaded successfully into "${file}"!`)
        msg.reply.audio(file)
    })
    .onError(({id, file, error}) => {
        msg.reply.text('Mandou o ID errado ai jovem, assim não dá pra trabalhar');
        console.error(`Sorry, an error ocurred when trying to download ${id}`, error)
    })
    .download({id, file})
});

bot.start();