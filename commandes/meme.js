const Discord = require("discord.js");
const fs = require("fs");
const dossier = "./memes";

exports.run = (client, msg, args, ops) => {

    fs.readdir(dir, (err, files) => {
        let rnd = Math.floor(Math.random() * Math.floor(files.length-1));
        msg.channel.send(`${files[rnd]}`);
    })

}