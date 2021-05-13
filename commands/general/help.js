const { MessageEmbed } = require("discord.js")
const { default_prefix } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "help",
        usage: "!help",
        category: "general",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        const generale = bot.emojis.cache.get('742308744439791617');
    const em = new MessageEmbed()
    .setTitle('Command list')
    .setDescription(`Bot's prefix is currently \`${default_prefix}\``)
    .addField(`${generale} General`, '`acceptbot`, `addbot`, `declinebot`')

    return message.channel.send(em);
    }

}