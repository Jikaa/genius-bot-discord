const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const prefix = process.env.prefix;
const ownersID = ['223839985751556096', '886647428932055061'];
const active = new Map();
let sleepMode = false;

client.on('message', msg => {

    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    client.user.setActivity(`${client.guilds.cache.size} serveurs \| _help`, {type: 'WATCHING'});

    let Dat = new Date();
    if (Dat.getDate() < 10) {day = `0${Dat.getDate()}`;}
    else {day = Dat.getDate();}
    if (Dat.getMonth()+1 < 10) {month = `0${Dat.getMonth()+1}`;}
    else {month = Dat.getMonth()+1;}
    if (Dat.getHours() < 10) {hours = `0${Dat.getHours()}`;}
    else {hours = Dat.getHours();}
    if (Dat.getMinutes() < 10) {minutes = `0${Dat.getMinutes()}`;}
    else {minutes = Dat.getMinutes();}
    if (Dat.getSeconds() < 10) {secondes = `0${Dat.getSeconds()}`;}
    else {secondes = Dat.getSeconds();}

    let args = msg.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    let ops = {
        ownersID: ownersID,
        active: active
    }
    
    let Datee = `${day}/${month}/${Dat.getFullYear()} ${hours}:${minutes}:${secondes}`
    let logg = `${Datee} : Réponse ${msg.content} à ${msg.author.tag}`;

    let owner = 0;
    if (cmd === 'sleep' && sleepMode === false) {
        for (var i=0; i<ownersID.length; i++) {
            if (msg.author.id !== ownersID[i]) owner++;
        }
        if (owner === ownersID.length) return msg.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande');
        else { sleepMode = true; logg = `${Datee} : Réponse ${msg.content} à ${msg.author.tag}`; msg.channel.send('Bot inactif'); client.user.setStatus('idle');}}
    else if (cmd === 'sleep' && sleepMode === true) { 
        for (var i=0; i<ownersID.length; i++) {
            if (msg.author.id !== ownersID[i]) owner++;
        } 
        if (owner === ownersID.length) return msg.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande');
        else { sleepMode = false; msg.channel.send('Bot actif'); client.user.setStatus('online');}}
    else if (sleepMode === true) { logg = `[SLEEPMODE] ${Datee} : Réponse ${msg.content} à ${msg.author.tag}`; }
    else if (sleepMode === false && cmd !== 'sleep') try {

        delete require.cache[require.resolve(`./commandes/${cmd}.js`)];

        let commandFile = require(`./commandes/${cmd}.js`);
        commandFile.run(client, msg, args, ops)

    } catch(err) {

        if (cmd) {
            let emb = new Discord.MessageEmbed()
            .setAuthor(`Commande ${cmd} inexistante ou indisponible`)
            .setImage('https://cdn.discordapp.com/avatars/588011924503920653/5adbfb07589a160d4e515d947a0b8f5e.png?size=1024')
            .setFooter('_help pour la liste des commandes', msg.author.avatarURL)
            .setColor([Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)]);
            msg.channel.send({embed : emb});
        } else {
            msg.channel.send(`Précisez une commande`);
        }
        console.log(err.stack);
        //console.log(`[ERREUR] ${Date} : Réponse ${msg.content} à ${msg.author.tag}`);
        logg = `[ERREUR] ${Datee} : Réponse ${msg.content} à ${msg.author.tag}`;

    }

        console.log(`${logg}`);
        fs.stat('log.txt', (err) => {
            if (err) fs.writeFile('log.txt', logg, (err) => {
                if (err) throw err;
            });
            else {
                fs.appendFile('log.txt', `\n${logg}`, (err) => {
                    if (err) throw err;
                });
            }
        });

})

client.on('ready', () => {

    let Dat = new Date();
    if (Dat.getDate() < 10) {day = `0${Dat.getDate()}`;}
    else {day = Dat.getDate();}
    if (Dat.getMonth()+1 < 10) {month = `0${Dat.getMonth()+1}`;}
    else {month = Dat.getMonth()+1;}
    if (Dat.getHours() < 10) {hours = `0${Dat.getHours()}`;}
    else {hours = Dat.getHours();}
    if (Dat.getMinutes() < 10) {minutes = `0${Dat.getMinutes()}`;}
    else {minutes = Dat.getMinutes();}
    if (Dat.getSeconds() < 10) {secondes = `0${Dat.getSeconds()}`;}
    else {secondes = Dat.getSeconds();}
    let logg = `${day}/${month}/${Dat.getFullYear()} ${hours}:${minutes}:${secondes} : Bot prêt`;

    console.log(`${logg}`);
    fs.stat('log.txt', (err) => {
        if (err) fs.writeFile('log.txt', logg, (err) => {
            if (err) throw err;
        });
        else {
            fs.appendFile('log.txt', `\n${logg}`, (err) => {
                if (err) throw err;
            });
        }
    });

    client.user.setActivity(`${client.guilds.cache.size} serveurs \| _help`, {type: 'WATCHING'});

});

client.on('guildCreate', (guild) => {

    let Dat = new Date();
    if (Dat.getDate() < 10) {day = `0${Dat.getDate()}`;}
    else {day = Dat.getDate();}
    if (Dat.getMonth()+1 < 10) {month = `0${Dat.getMonth()+1}`;}
    else {month = Dat.getMonth()+1;}
    if (Dat.getHours() < 10) {hours = `0${Dat.getHours()}`;}
    else {hours = Dat.getHours();}
    if (Dat.getMinutes() < 10) {minutes = `0${Dat.getMinutes()}`;}
    else {minutes = Dat.getMinutes();}
    if (Dat.getSeconds() < 10) {secondes = `0${Dat.getSeconds()}`;}
    else {secondes = Dat.getSeconds();}
    let logg = `${day}/${month}/${Dat.getFullYear()} ${hours}:${minutes}:${secondes} : ${client.user.username} a rejoint le serveur ${guild.name}`;

    console.log(`${logg}`);
    fs.stat('log.txt', (err) => {
        if (err) fs.writeFile('log.txt', logg, (err) => {
            if (err) throw err;
        });
        else {
            fs.appendFile('log.txt', `\n${logg}`, (err) => {
                if (err) throw err;
            });
        }
    });

    client.user.setActivity(`${client.guilds.cache.size} serveurs \| _help`, {type: 'WATCHING'});
})

client.on('guildDelete', (guild) => {

    let Dat = new Date();
    if (Dat.getDate() < 10) {day = `0${Dat.getDate()}`;}
    else {day = Dat.getDate();}
    if (Dat.getMonth()+1 < 10) {month = `0${Dat.getMonth()+1}`;}
    else {month = Dat.getMonth()+1;}
    if (Dat.getHours() < 10) {hours = `0${Dat.getHours()}`;}
    else {hours = Dat.getHours();}
    if (Dat.getMinutes() < 10) {minutes = `0${Dat.getMinutes()}`;}
    else {minutes = Dat.getMinutes();}
    if (Dat.getSeconds() < 10) {secondes = `0${Dat.getSeconds()}`;}
    else {secondes = Dat.getSeconds();}
    let logg = `${day}/${month}/${Dat.getFullYear()} ${hours}:${minutes}:${secondes} : ${client.user.username} a quitté le serveur ${guild.name}`;

    console.log(`${logg}`);
    fs.stat('log.txt', (err) => {
        if (err) fs.writeFile('log.txt', logg, (err) => {
            if (err) throw err;
        });
        else {
            fs.appendFile('log.txt', `\n${logg}`, (err) => {
                if (err) throw err;
            });
        }
    });

    client.user.setActivity(`${client.guilds.cache.size} serveurs \| _help`, {type: 'WATCHING'});
})

client.on("shardDisconnect", (event, shardID) => {

    let Dat = new Date();
    if (Dat.getDate() < 10) {day = `0${Dat.getDate()}`;}
    else {day = Dat.getDate();}
    if (Dat.getMonth()+1 < 10) {month = `0${Dat.getMonth()+1}`;}
    else {month = Dat.getMonth()+1;}
    if (Dat.getHours() < 10) {hours = `0${Dat.getHours()}`;}
    else {hours = Dat.getHours();}
    if (Dat.getMinutes() < 10) {minutes = `0${Dat.getMinutes()}`;}
    else {minutes = Dat.getMinutes();}
    if (Dat.getSeconds() < 10) {secondes = `0${Dat.getSeconds()}`;}
    else {secondes = Dat.getSeconds();}

    let logg = `${day}/${month}/${Dat.getFullYear()} ${hours}:${minutes}:${secondes} : Bot déconnecté`;

    console.log(`${logg}`);
    fs.stat('log.txt', (err) => {
        if (err) fs.writeFile('log.txt', logg, (err) => {
            if (err) throw err;
        });
        else {
            fs.appendFile('log.txt', `\n${logg}`, (err) => {
                if (err) throw err;
            });
        }
    });

});

client.login(process.env.TOKEN);