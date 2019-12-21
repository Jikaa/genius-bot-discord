exports.run = async (client, msg, args, ops) => {

    msg.channel.send(`${Number(args[0])+5}`);

}