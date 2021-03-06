const ytpl = require('ytpl');
const ytdl = require('ytdl-core');
const search = require('yt-search');
const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    //let fetched = ops.active.get(msg.guild.id);
    //if (!fetched.queue) {
    //    delete require.cache[require.resolve('./waitStop.js')];
    //    let commandFile = require('./waitStop.js');
    //    commandFile.run(client, msg, args, ops)
    //}

    let Dat = new Date();
    let data = ops.active.get(msg.guild.id) || {};

    if (!msg.member.voice.channel) return msg.channel.send('Connectez-vous à un salon vocal');
    if (msg.guild.me.voice.channel && (msg.member.voice.channel !== msg.guild.me.voice.channel)) return msg.channel.send(`Le bot est déjà en cours d'utilisation dans le salon vocal ${msg.guild.me.voice.channel.name}`);
    if (!args[0]) return msg.channel.send("Utilisation de la commande play ```play <URL YouTube> | <recherche mots clés>```");

    if (args[0].startsWith('http://') || args[0].startsWith('https://')) {

        let validateVideo = await ytdl.validateURL(args[0]);
        if (!validateVideo) {
            let pl = ytpl(args[0]);
            if (!pl.items) return msg.channel.send('URL invalide');
            else { 
                await inserer(client, ops, data, msg, args[0], pl.items);
                embb = new Discord.MessageEmbed()
                .addField(`Ajout d'une playlist par ${msg.author.username}`, `\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b ${pl.items.length} éléments`)
                .setFooter(`${msg.guild.me.voice.channel.name}`, msg.author.displayAvatarURL())
                .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]);
                msg.channel.send(embb);
            }

        } else await inserer(client, ops, data, msg, args[0]);

    } else {

        search(args.join(' '), async function(err, res) {
            
            if (err) throw err;

            let videos = res.videos.slice(0, 1);
            if (!videos[0]) return msg.channel.send(':x: Aucun résultat trouvé sur YouTube');
            let adresse = videos[0].videoId;
            await inserer(client, ops, data, msg, adresse);

        });

    }

}

async function inserer(client, ops, data, msg, adresse, playlist) {

    data.connection = await msg.member.voice.channel.join();
    ops.active.set(msg.guild.id, data);

    if (playlist) {
        
        if (!data.queue) data.queue = [];
        for (var i=0; i < playlist.length; i++) {
            let info = await ytdl.getInfo(playlist[i].url);
            let dureeMinutes = Math.floor(info.videoDetails.lengthSeconds / 60);
            let dureeSecondes = Math.round((info.videoDetails.lengthSeconds / 60 - dureeMinutes) * 60);
            if (dureeMinutes < 10) dureeMinutes = `0${dureeMinutes}`;
            if (dureeSecondes < 10) dureeSecondes = `0${dureeSecondes}`;
        
            data.queue.push({
                title: info.videoDetails.title,
                duree: info.videoDetails.lengthSeconds,
                dureeMinutes: dureeMinutes,
                dureeSecondes: dureeSecondes,
                url: playlist[i].url,
                auteur: msg.author
            });

            if (data.queue.length === 1) {
                boucle = false;
                await play(client, ops, data, msg, boucle);
            }
        }

    } else {
        
        if (!data.queue) data.queue = [];
        let info = await ytdl.getInfo(adresse);
        let dureeMinutes = Math.floor(info.videoDetails.lengthSeconds / 60);
        let dureeSecondes = Math.round((info.videoDetails.lengthSeconds / 60 - dureeMinutes) * 60);
        if (dureeMinutes < 10) dureeMinutes = `0${dureeMinutes}`;
        if (dureeSecondes < 10) dureeSecondes = `0${dureeSecondes}`;
    
        data.queue.push({
            title: info.videoDetails.title,
            duree: info.videoDetails.lengthSeconds,
            dureeMinutes: dureeMinutes,
            dureeSecondes: dureeSecondes,
            url: adresse,
            auteur: msg.author,
        });

        if (data.queue.length > 1) {
            let embedPlaylist = new Discord.MessageEmbed()
            .addField(`*Ajouté à la playlist par ${msg.author.username} :*`, `\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b Position ${data.queue.length-1} : ${info.videoDetails.title}`)
            .setFooter(`${dureeMinutes}:${dureeSecondes} • ${msg.guild.me.voice.channel.name}`, msg.author.displayAvatarURL())
            .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]);
            return msg.channel.send({embed : embedPlaylist});
        } else {
            boucle = false;
            await play(client, ops, data, msg, boucle);
        }

    }

}

endedd = false;
async function play(client, ops, data, msg, boucle, i) {

    if (!i) i = 0;
    data.i = i;

    data.dispatcher = await data.connection.play(ytdl(data.queue[i].url, {filter: 'audioonly', quality: 'highestaudio'}));
    let fet = ops.active.get(msg.guild.id);
    if (!fet.vlm) fet.vlm = 66;
    data.dispatcher.setVolume((fet.vlm/100));

    if (boucle === false) {
        let embedDiffuse = new Discord.MessageEmbed()
        .addField('*Diffuse :*', `\u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b \u200b ${data.queue[i].title}`)
        .setFooter(`${data.queue[i].dureeMinutes}:${data.queue[i].dureeSecondes} • ${msg.guild.me.voice.channel.name}`, data.queue[i].auteur.displayAvatarURL())
        .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]);
        msg.channel.send({embed : embedDiffuse});
    }
    
    data.dispatcher.on('loop', function() {
        if (boucle === false || boucle === 'playlist')  {
            boucle = true;
            msg.channel.send(':repeat_one:');
        }
        else {
            boucle = false;
            msg.channel.send(':arrow_forward:');
        }
    });

    data.dispatcher.on('loopplaylist', function() {
        if (boucle === false || boucle === true)  {
            boucle = 'playlist';
            msg.channel.send(':repeat:');
        }
        else {
            boucle = false;
            msg.channel.send(':arrow_forward:');
            data.queue.splice(0, i);
        }
    });

    data.dispatcher.on('ended', function() {
        ended(client, ops, data, msg);
    });

    data.dispatcher.once('finish', async function() {
        if (!endedd) {
            await end(client, ops, data, msg, boucle, i);
        }
        endedd = false;
    });

}


function ended(client, ops, data, msg) {
    endedd = true;
    ops.active.delete(msg.guild.id, data);
    msg.guild.me.voice.channel.leave();
}

async function end(client, ops, data, msg, boucle, i) {

    if (boucle === 'playlist') {
        if (i < data.queue.length-1) i++;
        else i = 0;
    } else if (boucle === false) data.queue.shift();
    data.i = i;

    if (data.queue.length > 0) {
        await ops.active.delete(msg.guild.id, data);
        if (msg.guild.me.voice.channel.members.size === 1) {
            msg.guild.me.voice.channel.leave();
        } else {
            ops.active.set(msg.guild.id, data);
            await play(client, ops, data, msg, boucle, i);
        }
    } else {
        ops.active.delete(msg.guild.id, data);
        let boucle = 0;
        startTimer(ops, msg);
    }

}

async function loop(ops, msg) {
    let fetched = ops.active.get(msg.guild.id);
    if (!fetched) {
        await loop(ops, msg);
    } else {
        stopTimer();
    }
}

var socketTimer;
somme = 0;
function startTimer(ops, msg) {
    let fetched = ops.active.get(msg.guild.id);
    if (somme < 300 && !fetched && endedd === false && msg.guild.me.voice.channel) {
        socketTimer = setTimeout(function () {startTimer(ops, msg);}, 1000);
        somme = somme + 1;
    } else if (somme === 300 && !fetched && endedd === false && msg.guild.me.voice.channel) {
        msg.guild.me.voice.channel.leave();
        somme = 0;
    }
}

function stopTimer() {
    clearTimeout(socketTimer);
}