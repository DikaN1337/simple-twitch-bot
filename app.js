require('dotenv').config();

const tmi = require('tmi.js');
const request = require('request');


const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },

    identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        password: `oauth:${process.env.TWITCH_OAUTH}`
    },
    channels: [`${process.env.TWITCH_CHANNEL}`]
});

client.connect().catch(console.error);

const { URL } = require('url');

const stringIsAValidUrl = (s, protocols) => {
    try {
        url = new URL(s);
        return protocols
            ? url.protocol
                ? protocols.map(x => `${x.toLowerCase()}:`).includes(url.protocol)
                : false
            : true;
    } catch (err) {
        return false;
    }
};

client.on('message', (channel, tags, message, self) => {
	if(!self && stringIsAValidUrl(message) && !tags.mod) {
		client.deletemessage(channel, tags.id);
		client.say(channel, `@${tags.username}, não podes enviar URLs neste chat!`);
		return;
	}
	
    if(self || !message.startsWith('!')) {
		return;
	}
	
	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();
	
	if(command === 'website') {
		client.say(channel, `Website: https://elevenn.pt`);
    } else if(command === 'site') {
		client.say(channel, `Website: https://elevenn.pt`);
    } else if(command === 'discord') {
		client.say(channel, `Discord: https://discord.gg/wiggass`);
    } else if(command === 'dc') {
		client.say(channel, `Discord: https://discord.gg/wiggass`);
    } else if(command === 'so') {
		if (tags.mod) {
			client.say(channel, `Shout out ao @${args.join(' ')} pelo raid!`);
		}
    } else if(command === 'shoutout') {
		if (tags.mod) {
			client.say(channel, `Shout out ao @${args.join(' ')} pelo raid!`);
		}
    }
});

client.on('subscription', (channel, username, method, message, userstate) => {
  onSubscriptionHandler(channel, username, method, message, userstate)
})

function onSubscriptionHandler(channel, username, method, message, userstate) {
  client.say(channel,`Obrigado @${username} pela subscrição!`)
}
