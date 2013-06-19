exports.action = function(data, callback, config, SARAH){
	var url = null;
	var txt = "L'action a échoué";

  switch(data.command){
	case 'random':
		url = 'http://www.viedemerde.fr/aleatoire';
		break;
	default:
		break;
  }
  
  if(url){
	var request = require('request');
	request({ 'uri' : url }, function (err, response, body){    
		if (err || response.statusCode != 200) {
		  callback({'tts': txt});
		  console.log('ERRR');
		  return;
		}
		var $ = require('cheerio').load(body, { xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false });
		txt  = getRandomVdm($);
		console.log(txt);
		callback({'tts': txt});
		return;
	});
  } else {
	callback({'tts': txt});
	}
}


  // ------------------------------------------
  //  SCRAPING
  // ------------------------------------------

var getRandomVdm = function($){
  var vdm = '';
  $('#content DIV.article').first().find('P A.fmllink').each(function(i, elem){
	vdm += $(this).text();
  });
  // On remplace le VDM pour la lecture
  return vdm.replace(/vdm/gi, ", vie de merde.");
}
