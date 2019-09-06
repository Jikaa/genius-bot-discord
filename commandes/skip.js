const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    let fetched = ops.active.get(msg.guild.id);

    if (!fetched) return msg.channel.send('Aucune diffusion n\'est en cours');
    if (msg.member.voiceChannel !== msg.guild.me.voiceChannel) return msg.channel.send('Vous n\'êtes pas connecté au même salon vocal');
    if (args[0] < 0 || args[0] > fetched.queue.length-1) return msg.channel.send(`Position "${args[0]}" introuvable dans la playlist`)

    if (!args[0]) args[0] = fetched.i;
    if (args[0] === 'all' || args[0] === 'leave') {

        let dureeTotale = parseInt(fetched.queue[0].duree);
        for (var i=1; i < fetched.queue.length; i++) {
			dureeTotale += parseInt(fetched.queue[i].duree);
		}

        dureeMinutes = Math.floor(dureeTotale / 60);
	    dureeSecondes = Math.round((dureeTotale / 60 - dureeMinutes) * 60);
	    if (dureeMinutes < 10) dureeMinutes = `0${dureeMinutes}`;
	    if (dureeSecondes < 10) dureeSecondes = `0${dureeSecondes}`;

        let embed = new Discord.RichEmbed()
        .addField('*Abandon :*', `\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b Toute la playlist`)
        .setFooter(`${dureeMinutes}:${dureeSecondes} ${msg.guild.me.voiceChannel.name}`, msg.author.avatarURL)
        .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]);
        msg.channel.send({embed : embed});

        
        if (args[0] === 'leave') {
            msg.guild.me.voiceChannel.leave();
            ops.active.delete(msg.guild.id, fetched);
            fetched.queue = fetched.queue.splice();
        } else {
            fetched.queue = fetched.queue.splice();
            fetched.dispatcher.emit('end');
        }

    } else {

        let embed = new Discord.RichEmbed()
        .addField('*Abandon :*', `\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b Position ${args[0]} : ${fetched.queue[args[0]].title}`)
        .setFooter(`${fetched.queue[args[0]].dureeMinutes}:${fetched.queue[args[0]].dureeSecondes} ${msg.guild.me.voiceChannel.name}`, fetched.queue[args[0]].auteur.avatarURL)
        .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]);
        msg.channel.send({embed : embed});
    
        if (args[0] === 0) fetched.dispatcher.emit('end');
        else fetched.queue.splice(args[0], 1);
    
    }

}