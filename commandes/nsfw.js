const nsfw = require('@justalk/pornhub-api');
const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    if (msg.channel.nsfw !== true) return msg.channel.send(':underage: Commande utilisable uniquement dans un salon NSFW')
    
    if (args[0] === 'video') {
        args.splice(0, 1);
        if (!args[0]) return msg.channel.send("Utilisation de la commande nsfw ```nsfw <gif|video> (defaut gif) <recherche mots clés Pornhub.com>```");
        const search = await nsfw.search(args, ["link"], {page: 2});
        let rnd = Math.floor(Math.random() * Math.floor(search.length-1));
        msg.channel.send(`:underage: NSFW :underage: \n ${search[rnd].link}`);
    } else {
        if (args[0] === 'gif') { args.splice(0, 1); }
        if (!args[0]) return msg.channel.send("Utilisation de la commande nsfw ```nsfw <gif|video> (defaut gif) <recherche mots clés Pornhub.com>```");
        const search = await nsfw.search(args, ["link_webm"], {page: 2, search: 'gifs'});
        let rnd = Math.floor(Math.random() * Math.floor(search.length-1));
        msg.channel.send(`:underage: NSFW :underage: \n ${search[rnd].link_webm}`);
    }

}