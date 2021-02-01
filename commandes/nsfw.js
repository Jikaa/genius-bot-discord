const nsfw = require('pornsearch');
const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    if (msg.channel.nsfw !== true) return msg.channel.send(':underage: Commande utilisable uniquement dans un salon NSFW')
    
    if (args[0] === 'video') {
        args.splice(0, 1);
        if (!args[0]) return msg.channel.send("Utilisation de la commande nsfw ```nsfw <gif|video> (defaut gif) <recherche mots clés Pornhub.com>```");
        const search = new nsfw.search(args);
        search.gifs()
        .then(gifs => {
            let rnd = Math.floor(Math.random() * Math.floor(gifs.length-1));
            msg.channel.send(`:underage: NSFW :underage: \n ${gifs[rnd].webm}`);
        });
    } else {
        if (args[0] === 'gif') { args.splice(0, 1); }
        if (!args[0]) return msg.channel.send("Utilisation de la commande nsfw ```nsfw <gif|video> (defaut gif) <recherche mots clés Pornhub.com>```");
        const search = new nsfw.search(args);
        search.gifs()
        .then(gifs => {
            let rnd = Math.floor(Math.random() * Math.floor(gifs.length-1));
            let emb = new Discord.MessageEmbed()
            .addField(':underage: NSFW :underage:', `Recherche : '${args}'`)
            .setImage(gifs[rnd].url)
            .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)])
            .setFooter('Gif fourni par Pornhub.com', `${msg.author.displayAvatarURL()}`);
            msg.channel.send({embed : emb});
        });
    }

}