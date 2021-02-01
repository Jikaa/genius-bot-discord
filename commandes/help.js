const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    if (!args[0]) {

        let emb = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor('Préfixe des commandes : _')
        .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)])
        .addFields('Commandes de stream :', '\u200b \u200b \u200b \u200b \u200b play <URL YouTube> | <recherche mots clés YouTube>\n \u200b \u200b \u200b \u200b \u200b volume <0-200> | defaut (par défaut 25)\n \u200b \u200b \u200b \u200b \u200b pause\n \u200b \u200b \u200b \u200b \u200b loop\n \u200b \u200b \u200b \u200b \u200b loopplaylist\n \u200b \u200b \u200b \u200b \u200b playlist\n \u200b \u200b \u200b \u200b \u200b skip <position> | all\n \u200b \u200b \u200b \u200b \u200b shuffle\n \u200b \u200b \u200b \u200b \u200b join\n \u200b \u200b \u200b \u200b \u200b leave')
        .addFields('Commandes de lyrics :', '\u200b \u200b \u200b \u200b \u200b lyrics <recherche mots clés Genius.com>')
        .addFields('Commandes d\'images :', '\u200b \u200b \u200b \u200b \u200b gif <recherche mots clés Giphy.com>\n \u200b \u200b \u200b \u200b \u200b meme')
        .addFields('Commandes techniques :', '\u200b \u200b \u200b \u200b \u200b help\n \u200b \u200b \u200b \u200b \u200b ping\n \u200b \u200b \u200b \u200b \u200b sleep (limitée)\n \u200b \u200b \u200b \u200b \u200b logout (limitée)\n \u200b \u200b \u200b \u200b \u200b statut (limitée)')
        .addFields(':underage: Commandes NSFW :underage:', '\u200b \u200b \u200b \u200b \u200b nsfw <gif|video> (defaut gif) <recherche mots clés Pornhub.com>')
        .setFooter(`Aide ${client.user.username}`, msg.author.displayAvatarURL());
        msg.reply(`regardez vos MP, la page d'aide vous y a été envoyée.`);
        msg.author.send({embed : emb});

    }

}