const Lyricist = require('lyricist');
const lyricist = new Lyricist('IgIysDTdZbDfSQ6VqIQ9APHxW1hcJnSwlBfgz0EFWejJ6Xdwd2grDiL6EzLUZl0q');
const Discord = require('discord.js');

exports.run = async (client, msg, args, ops) => {

    if (!args[0]) return msg.channel.send("Utilisation de la commande lyrics ```lyrics <recherche mots clés>```");
    
    let q = `${args}`;
    q = q.replace(',', ' ');

    let songT = await lyricist.search(q);
    let song = await lyricist.song(songT[0].id, { fetchLyrics: true});
        if (song.lyrics.length > 1023) {
            if (song.lyrics.length > 5999) {
                
                let leng = song.lyrics.length / 2000;
                msg.channel.send(`**${song.title}**`);
                for (var i=0; i <= leng; i++) {
                    msg.channel.send(`${song.lyrics.slice(i*2000, (i+1)*2000)}`);
                }
                msg.channel.send('*Lyrics fournies par Genius.com*');

            } else {
                let emb = new Discord.MessageEmbed();
                leng = song.lyrics.length / 1024;
                for (var i=0; i <= leng; i++) {
                  if (i === 0) emb.addField(`${song.title}`, `${song.lyrics.slice(i*1024, (i+1)*1024)}`);
                  else emb.addField("\u200b ", `${song.lyrics.slice(i*1024, (i+1)*1024)}`);
                 //msg.channel.send(song.lyrics.slice(i*2000, (i+1)*2000));
                }
                emb.setFooter('Lyrics fournies par Genius.com', `${msg.author.displayAvatarURL()}`);
                emb.setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]);
                msg.channel.send({embed : emb});
            }
        } else {  
            let emb = new Discord.MessageEmbed();
            emb.addField(`${song.title}`, `${song.lyrics}`);
            //msg.channel.send(song.lyrics);
            emb.setFooter('Lyrics fournies par Genius.com', `${msg.author.displayAvatarURL()}`);
            emb.setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]);
            msg.channel.send({embed : emb});
        }

}