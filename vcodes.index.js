const EventEmitter = require("events");
const WebSocket = require("ws");
const fetch = require("node-fetch");
const { baseUrl } = require("./vcodes.config");

module.exports = class vCodes extends EventEmitter {
	constructor(token) {
		super();
		this.ws = new WebSocket("wss://api.vcodes.xyz/v1/gateway?token=" + token);
		this.ws.on("message", async msg => {
			const message = JSON.parse(msg.toString());
			if (message.type == "ERROR") throw new Error("(vcodes.js): " + message.message);
			if (message.type == "CONNECT") {
				this.token = token
				return this.emit("ready", message.data);
			}

			const _event = message.type
				.toLowerCase()
				.split("_")
				.map((part, index) => {
					if (index == 0) return part;
					return part.charAt(0).toUpperCase() + part.slice(1);
				});

			this.emit(_event.join(""), message.data);
		});
	};

	async checkVote(id) {
		if (isNaN(id)) {
		  throw new Error("(vcodes.js): You entered invalid id because ids only number. (checkVote Error)", true)
		  return new Promise((resolve, reject) => {
			resolve(false);
		  });
		}
		
		let request = await fetch(baseUrl+'/checkVote/'+String(id), { 
		  headers: { 'Authorization': this.token },
		  method: "POST"
		}).then(res => res.json());
		if(request.error) {
		  throw new Error('(vcodes.js): '+request.error, true)
		  return new Promise((resolve, reject) => {
			resolve(false);
		  });
		} else {
		  if(request.voted) {
			return new Promise((resolve, reject) => {
			  resolve(true);
			});
		  } else {
			return new Promise((resolve, reject) => {
			  resolve(false);
			});
		  }
		}
	  }

	  async stats(guildCount, shardCount, listener) {
		let request = await fetch(baseUrl+'/stats', { 
		  body: JSON.stringify({ guilds: Number(guildCount), shards: Number(shardCount) }),
		  headers: { 'Authorization': this.token, 'Content-Type': 'application/json' },
		  method: "POST"
		}).then(res => res.json());
		if(request.error) {
		  throw new Error('(vcodes.js): '+request.error, true);
		} else {
		  if(request.success) {
			if(!listener) {
			  return shardCount();
			} else {
			  return listener();
			}
		  } else {
			throw new Error('(vcodes.js): '+request.error, true);
		  }
		}
	  }
};
