exports.run = (client, msg, args, ops) => {

    if (!msg.guild.me.voice.channel) return msg.channel.send('Le bot n\'est connecté à aucun salon vocal');
    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('Le bot est utilisé dans un autre salon vocal');

    delete require.cache[require.resolve('./skip.js')];
    let commandFile = require('./skip.js');
    let leav = ['gyhvvtdjuxamjwr'];
    commandFile.run(client, msg, leav, ops)

    msg.channel.send(`Le bot a quitté le salon ${msg.member.voice.channel.name}`);

}