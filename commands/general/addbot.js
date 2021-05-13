const { MessageEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");
const { default_prefix } = require('../../botconfig.json')

module.exports = {
    config: {
        name: "addbot",
        usage: "!addbot",
        category: "general",
        accessableby: "Members"
    },
    //message dm return.
    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;
        if(message.author.bot) return;
        if(message.deletable) {
            message.delete({timeout:7000})
        }
        //channel where u add bot in
        let chann = bot.channels.cache.get('800673155470327829');

        const em = new MessageEmbed()
        .setDescription(`This command can be used only in ${chann}!`);

        if(message.channel !== chann) return message.channel.send(em)
        .then(async msg => {
            await msg.delete({ timeout: 7000 });
        });
        //format wrong
        if(!args[0]) {
            const embed = new MessageEmbed()
                .setTitle('❌ Error ❌')
                .setDescription(`**This message format is not valid, please use:**\n\n\`${default_prefix}addbot \`**\`[BOT'S PREFIX]\`**\` [BOT'S ID]\``)
                .setColor(red_light);

            return message.channel.send(embed).then(async msg => {
                await msg.react('❌');
                msg.delete({ timeout: 7000 });
                });
        } else if(!args[1]) {
          //format wrong
            const embed = new MessageEmbed()
                .setTitle('❌ Error ❌')
                .setDescription(`**This message format is not valid, please use:**\n\n\`${default_prefix}addbot [BOT'S PREFIX] \`**\`[BOT'S ID]\`**`)
                .setColor(red_light);

            message.channel.send(embed).then(async msg => {
                await msg.react('❌');
                msg.delete({ timeout: 7000 });
              })
            return;
        } else {
            try {

                //dm message from bot
                const sent = new MessageEmbed()
                .setTitle(`Good job!`)
                .setDescription(`Your bot with ID ${args[1]} has been successfully added to the queue!`)
                .setThumbnail(message.author.displayAvatarURL())
                .addField('Prefix:', args[0])
                .addField('BOT ID:', args[1])
                .addField('Status:', "In queue 🆙")
            message.author.send(sent);
            message.channel.send(sent).then(m =>{
                m.delete({ timeout: 7000 });
            });
            // message in channel logs
            let user = message.guild.members.cache.get(args[4])
            const sentd = new MessageEmbed()
                .setTitle(`🆙 New bot has been added!`)
                .setThumbnail(message.author.displayAvatarURL())
                .addField('Added by:', message.author.tag)
                .addField('Prefix:', args[0])
                .addField('BOT ID:', args[1])
                .addField('user ID:', message.author.id)
                .addField('Invite link:', `https://discord.com/oauth2/authorize?client_id=${args[1]}&scope=bot&permission=bot`)

                //botlist logs channel and bot approval ping role
                bot.channels.cache.get('800663414493020160').send("<@&800672533908553778>");
                    //botlist logs channel
                const c = bot.channels.cache.get('800663414493020160');
                c.send(sentd).then(async msg => {
                    const decline = bot.emojis.cache.get('❌');
                    const accept = bot.emojis.cache.get('✅');
                    const working = bot.emojis.cache.get(':eyes:');

                    await msg.react(accept);
                    await msg.react(working);
                    await msg.react(decline);
                });
                return;
                } catch(err) {
                    console.log(err);
                    return;
                }
            }
        }
    }
