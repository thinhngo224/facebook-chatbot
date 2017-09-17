const login = require('facebook-chat-api');
const request = require('login');
const visionKey = '38dc2230afef453c9d28cfc18140608c';
var answerThread = {};
//
function describeImage(image,callback){
	var my ={};
	request({
		'url': 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/describe?maxCandidates=1',
		'method': 'POST',
		'json': true,
		'headers': {
			'Content-type': 'application/json',
			'Ocp-Apim-Subscription-Key': visionKey
		},
		'body': {
			'url': image
		}
	},function (err, res, body){
		if(err) console.log(err)
		else console.log(body.description.captions[0].text);
		
		my.text = body.description.captions[0].text;
		my.accuracy = body.description.captions[0].confidence;
		return callback(my);
	})
}
login ({email: "bichphuc224@gmail.com", password: "vinh2204"}, function callback(err, api) {
	if(err) return console.error(err);
	
	api.listen(function (err, message) {
		console.log(message.threadID);
		var threadID = message.threadID;
		for (var i=0; i < message.attachments.length; i++)
			if (message.attachments[i].type == 'photo'){
				var image = message.attachments[i].url;
				describeImage(image, function(caption){
					if (caption.accuracy >= 0.9) api.sendMessage(caption.text,threadID)
					else if (caption.accuracy >=0.6) api.sendMessage('Có thể là '+caption.text, theadID)
					else api.sendMessage("đ' bt");
				});
			}
		}	
	}
		
/*		if(!answerThread.hasOwnProperty(message.threadID)){
			answerThread[message.threadID] = true;
			api.sendMessage("BOT Dit me ban!", message.threadID);
			}
*/
		
//
