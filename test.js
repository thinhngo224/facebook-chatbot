const request = require('request');
const visionKey = '38dc2230afef453c9d28cfc18140608c';
function describeImage(image, callback){
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
		
		my.text = body.description.captions[0].text;
		my.accuracy = body.description.captions[0].confidence;
		return callback(my);
	})
}
describeImage('http://uves.edu.vn/uploads/news/uves/Luyen-nghe-tieng-anh-hieu-qua.jpg', function(caption){
	console.log(caption);
});

