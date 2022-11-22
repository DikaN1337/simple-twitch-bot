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
	
	//console.log(JSON.stringify(tags));
	
	if(command === 'website') {
		client.say(channel, `Website: https://elevenn.pt`);
    } else if(command === 'site') {
		client.say(channel, `Website: https://elevenn.pt`);
    } else if(command === 'instagram') {
		client.say(channel, `Instagram: https://instagram.com/anasampaionovais`);
	} else if(command === 'insta') {
		client.say(channel, `Instagram: https://instagram.com/anasampaionovais`);
    } else if(command === 'ig') {
		client.say(channel, `Instagram: https://instagram.com/anasampaionovais`);
    } else if(command === 'tiktok') {
		client.say(channel, `TikTok: https://tiktok.com/@anasampaionovais`);
    } else if(command === 'twitter') {
		client.say(channel, `Twitter: https://twitter.com/wtfeleven`);
    } else if(command === 'twt') {
		client.say(channel, `Twitter: https://twitter.com/wtfeleven`);
    //} else if(command === 'yt') {
		//client.say(channel, `YouTube: https://youtube.com/channel/UC8QoYWYGXrW5JkWxXnovZDQ`);
    //} else if(command === 'youtube') {
		//client.say(channel, `YouTube: https://youtube.com/channel/UC8QoYWYGXrW5JkWxXnovZDQ`);
    //} else if(command === 'spotify') {
		//client.say(channel, `Spotify: https://open.spotify.com/artist/7nFvxymPB8QA8MrOnOqFdd`);
    } else if(command === 'steam') {
		client.say(channel, `Steam: https://steamcommunity.com/id/9k4`);
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
    } //else if(command === 'ad') {
		//if (tags.mod) {
			//client.commercial(channel, 30);
			//client.say(channel, `Anuncio por @${tags.username}`);
		//}
    //}
});

client.on('subscription', (channel, username, method, message, userstate) => {
  onSubscriptionHandler(channel, username, method, message, userstate)
})

function onSubscriptionHandler(channel, username, method, message, userstate) {
  client.say(channel,`Obrigado @${username} pela subscrição!`)
}