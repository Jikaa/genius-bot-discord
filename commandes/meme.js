const Discord = require("discord.js");
const fs = require("fs");
const dossier = "commandes/memes";

exports.run = (client, msg, args, ops) => {

    fs.readdir(dossier, (err, files) => {
        if (err) throw err;
        let rnd = Math.floor(Math.random() * Math.floor(files.length-1));
        let attachment = new Discord.Attachment(`./commandes/memes/${files[rnd]}`, files[rnd]);
        let emb = new Discord.RichEmbed()
            .attachFile(attachment)
            .setImage(`attachment://${files[rnd]}`)
            .setFooter(`Meme n°${rnd}`, msg.author.avatarURL)
            .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]);
            msg.channel.send({embed : emb});
    })

}