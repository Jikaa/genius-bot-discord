const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

	let fetched = ops.active.get(msg.guild.id);
	if (!fetched) return msg.channel.send('Aucune diffusion n\'est en cours');

	let queue = fetched.queue;
	let emb = '';
	let dureeTotale = parseInt(queue[0].duree);
	
	if (queue.length > 1) { 
		for (var i=1; i < queue.length; i++) {
			emb += `\u200b \u200b \u200b \u200b ${i} : ${queue[i].title} *${queue[i].auteur.username}*\n`;
			dureeTotale += parseInt(queue[i].duree);
		}
	} else {
		emb += '\u200b \u200b \u200b \u200b Playlist vide';
	}

	dureeMinutes = Math.floor(dureeTotale / 60);
	dureeSecondes = Math.round((dureeTotale / 60 - dureeMinutes) * 60);
	if (dureeMinutes < 10) dureeMinutes = `0${dureeMinutes}`;
	if (dureeSecondes < 10) dureeSecondes = `0${dureeSecondes}`;

	let embed = new Discord.RichEmbed()
	.addField(`*Diffuse actuellement :*`, `\u200b \u200b \u200b \u200b - ${queue[0].title}`)
	.addField(`*Playlist :*`, `${emb}`)
	.setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)])
	.setFooter(`${dureeMinutes}:${dureeSecondes} • ${msg.guild.me.voiceChannel.name}`, queue[0].auteur.avatarURL);
	msg.channel.send({embed: embed});

}