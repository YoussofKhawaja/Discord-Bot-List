const { MessageEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");
const { default_prefix } = require('../../botconfig.json')

module.exports = {
    config: {
        name: "decline",
        usage: "!decline",
        category: "general",
        aliases: ["deny", "declinebot", "denybot"],
        accessableby: "Administrators"
    },
    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;
        if(message.author.bot) return;

        // approval of bots role
        let modRole = message.guild.roles.cache.find(c => c.name === "BOT appprovel");

        if(!modRole) {
            return message.channel.send("I can't find a role with name `BOT appprovel`")
        }
        if(!message.member.roles.cache.has(modRole.id)) return message.channel.send("You don't have enough permission to do this command.. You need ``BOT appprovel`` role");

        let reason = args.slice(2).join(" ");

        if(!args[0]) {

                   //format wrong
            const embed = new MessageEmbed()
                .setTitle('❌ Error ❌')
                .setDescription(`**This message format is not valid, please use:**\n\n\`${default_prefix}declinebot \`**\`[BOT'S ID]\`**\` [BOT OWNER'S ID] [REASON]\``)
                .setColor(red_light);

            return message.channel.send(embed).then(async msg => {
                await msg.react('❌');
                msg.delete({ timeout: 10000 });
                });
        } else if(!args[1]) {

                   //format wrong
            const embed = new MessageEmbed()
                .setTitle('❌ Error ❌')
                .setDescription(`**This message format is not valid, please use:**\n\n\`${default_prefix}declinebot [BOT'S ID] \`**\`[BOT OWNER'S ID] [REASON]\`**`)
                .setColor(red_light);

            message.channel.send(embed).then(async msg => {
                await msg.react('❌');
                msg.delete({ timeout: 10000 });
              })
            return;
        }else if(!args[2]) {

                   //format wrong
            const embed = new MessageEmbed()
                .setTitle('❌ Error ❌')
                .setDescription(`**This message format is not valid, please use:**\n\n\`${default_prefix}declinebot [BOT'S ID] [BOT OWNER'S ID] \`**\`[REASON]\`**`)
                .setColor(red_light);

            message.channel.send(embed).then(async msg => {
                await msg.react('❌');
                msg.delete({ timeout: 10000 });
              })
            return;
        } else {
            try {
                let user = message.guild.members.cache.get(args[1])
                if(!user) return message.channel.send(`Sorry, but user with this ID (${args[1]}) is not on this server..`);

                //decline user messafe from bot in dm
                const sent = new MessageEmbed()
                .setTitle(`Status updated`)
                .setThumbnail(message.author.displayAvatarURL())
                .setColor('#eb4034')
                .addField('Status:', "Declined")
                .addField('Reason:', reason);
            message.author.send(sent);

            //decline message in channel logs
            const sentd = new MessageEmbed()
                .setAuthor(`${user.user.tag}'s BOT was declined ❌`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription("Sorry, but your bot was declined..")
                .addField('By moderator:', message.author.tag)
                .setColor('#eb4034')
                .addField("Reason:", reason)
                //channel of bot logs
            const c = bot.channels.cache.get('800663414493020160');
            c.send(`<@${user.user.id}>`);
            c.send(sentd);
            message.channel.send(new MessageEmbed().setDescription(`Bot was denied!`))
            return;
            } catch(err) {
                console.log(err);
                return;
            }
        }
    }
}