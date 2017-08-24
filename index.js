const login = require('facebook-chat-api');
var answerThread = {};
//
login ({email: "bichphuc224@gmail.com", password: "vinh2204"}, function callback(err, api) {
	if(err) return console.error(err);
	
	api.listen(function callback(err, message) {
		console.log(message.threadID);
		
/*		if(!answerThread.hasOwnProperty(message.threadID)){
			answerThread[message.threadID] = true;
			api.sendMessage("BOT Dit me ban!", message.threadID);
			}
*/
		var d = new Date();
		var h = d.getHours();
		if(h>=0 && h<=6){
			if(!answerThread.hasOwnProperty(message.threadID)){
				answerThread[message.threadID] = true;
				api.sendMessage("BOT: Bạn Ánh đang ngủ. Nhắn tin sau nhé", message.threadID);
				}
			}
		})	
	})
//
