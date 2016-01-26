var moment = require('moment');

module.exports = function (app) {
    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });
    
    app.get('/:time', function(request, response){
    	
    	//initialize unix and natural to null
    	var unix = null;
    	var natural = null;
    	
    	//pull the time from the url
    	var time = request.params.time;

		//check if it is a number - if so, treat as a unix timestamp
    	if (!isNaN(time)){
    		var momentTime = moment(time, 'x');
    		
    		//format the timestamp into unix and natural and save the values
    		unix = momentTime.format('x');
    		natural = momentTime.format("MMMM D, YYYY");
    	}
    	
    	//otherwise, treat as a natural date and format and save the values
    	else {
    		//moment(time) parses quite a lot of strings into valid dates - was not sure how precise to be so left general
    		var momentTime = moment(time);
    		if (momentTime.isValid()){
    			unix = unix = momentTime.format('x');
    			natural = momentTime.format("MMMM D, YYYY");
    		};
    	}
    	//construct an object out of the values to send as response
    	var responseObj = {
    		unix: unix,
    		natural: natural
    	}
    	
    	response.send(responseObj);
    	
    });
    
};
