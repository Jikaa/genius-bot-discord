const Discord = require('discord.js');
const fs = require ('fs');
const request = require('request');

exports.run = (client, msg, args, ops) => {

    let owner = 0;
    for (var i=0; i<ops.ownersID.length; i++) {
        if (msg.member.id !== ops.ownersID[i]) owner++;
    }
    if (owner === ops.ownersID.length) return msg.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande');

    let Dat = new Date();
    if (Dat.getDate() < 10) {day = `0${Dat.getDate()}`;}
    else {day = Dat.getDate();}
    if (Dat.getMonth()+1 < 10) {month = `0${Dat.getMonth()+1}`;}
    else {month = Dat.getMonth()+1;}
    if (Dat.getHours() < 10) {hours = `0${Dat.getHours()}`;}
    else {hours = Dat.getHours();}
    if (Dat.getMinutes() < 10) {minutes = `0${Dat.getMinutes()}`;}
    else {minutes = Dat.getMinutes();}
    if (Dat.getSeconds() < 10) {secondes = `0${Dat.getSeconds()}`;}
    else {secondes = Dat.getSeconds();}

    let nb = 0;
    msg.attachments.forEach(a => {
        request.get(a.url)
            .on('error', console.error)
            .pipe(fs.createWriteStream(`./commandes/memes/${a.id}${a.filename}`))
        
        console.log(`${day}/${month}/${Dat.getFullYear()} ${hours}:${minutes}:${secondes} : Meme ${a.url} ajouté`)
        nb++;
    });

    msg.channel.send(`${nb} meme(s) ajouté(s)`);
    
}