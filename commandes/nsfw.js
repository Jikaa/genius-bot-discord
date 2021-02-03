const nsfw = require('@justalk/pornhub-api');
const { scraping_search } = require('@justalk/pornhub-api/src/search');
const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    if (msg.channel.nsfw !== true) return msg.channel.send(':underage: Commande utilisable uniquement dans un salon NSFW')
    
    if (args[0] === 'video') {
        args.splice(0, 1);
        if (!args[0]) return msg.channel.send("Utilisation de la commande nsfw ```nsfw <gif|video> (defaut gif) <recherche mots clés Pornhub.com>```");
        const search = await nsfw.search(args, ["link"], {page: 2})
        .then(videos => {
            let rnd = Math.floor(Math.random() * Math.floor(videos.length-1));
            msg.channel.send(`:underage: NSFW :underage: \n ${videos[rnd].link}`);
        });
    } else {
        if (args[0] === 'gif') { args.splice(0, 1); }
        if (!args[0]) return msg.channel.send("Utilisation de la commande nsfw ```nsfw <gif|video> (defaut gif) <recherche mots clés Pornhub.com>```");
        const search = await nsfw.search(args, ["link_webm"], {page: 2, search: 'gifs'})
        .then(gifs => {
            let rnd = Math.floor(Math.random() * Math.floor(gifs.length-1));
            msg.channel.send(`:underage: NSFW :underage: \n ${gifs[rnd].link_webm}`);
        });
    }

}