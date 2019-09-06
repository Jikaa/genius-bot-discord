const shuffle = require('shuffle-array');

exports.run = (client, msg, args, ops) => {

    let fetched = ops.active.get(msg.guild.id);
    if (!fetched) return msg.channel.send('Aucune diffusion n\'est en cours');

    playlist = fetched.queue.slice();
    playlist.shift();
    shuffle(playlist);
    playlist.unshift(fetched.queue[0]);
    fetched.queue = playlist.slice();
    msg.channel.send(':twisted_rightwards_arrows:');

}