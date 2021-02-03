const nsfw = require('pornsearch');
const ph = require('@justalk/pornhub-api');
const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    if (msg.channel.nsfw !== true) return msg.channel.send(':underage: Commande utilisable uniquement dans un salon NSFW')

    if (args[0] === 'video') {
        args.splice(0, 1);
        if (!args[0]) return msg.channel.send("Utilisation de la commande nsfw ```nsfw <gif|video> (defaut gif) <recherche mots clés Pornhub.com>```");
        const searcher = new nsfw(args)
        searcher.videos()
        .then(videos => {
            let rnd = Math.floor(Math.random() * Math.floor(videos.length-1));
            const t = ph.page(videos[rnd].url, ['title','thumbnail_url']).then(vid => {
            let embed = new Discord.MessageEmbed()
            .addField(`${vid['title']}`, `${videos[rnd].url}`)
            .setImage(`${vid['thumbnail_url']}`)
            .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)])
            .setFooter('Vidéo fournie par Pornhub.com', msg.author.displayAvatarURL());
            msg.channel.send({embed: embed});
            });
        });
        
    } else {
        if (args[0] === 'gif') { args.splice(0, 1); }
        if (!args[0]) return msg.channel.send("Utilisation de la commande nsfw ```nsfw <gif|video> (defaut gif) <recherche mots clés Pornhub.com>```");
        const ph = new nsfw.search(args);
        ph.gifs()
        .then(gifs => {
            let rnd = Math.floor(Math.random() * Math.floor(gifs.length-1));
            msg.channel.send(`:underage: NSFW :underage: \n ${gifs[rnd].webm}`);
        });
    }

}