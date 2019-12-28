var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: '#nodejs',
  count: 10,
  result_type: 'popular',
  lang: 'en'
}

// Initiate your search using the above paramaters
T.get('search/tweets', params, function(err, data, response) {
  // If there is no error, proceed
  if(!err){
    // we will follow only those users having more than 1000 followers
    const popularUsers = data.statuses.filter(user => {
      return user.followers_count > 1000;
    });
    // Loop through the returned tweets
    for(let i = 0; i < popularUsers.length; i++){
      // Get the screen_name from the returned data
      let screen_name = popularUsers[i].user.screen_name;
      // THE FOLLOWING MAGIC GOES HERE
      T.post('friendships/create', {screen_name}, function(err, response){
        if(err){
          console.log(err);
        } else {
          console.log(screen_name, ': **FOLLOWED**');
        }
      });
    }
  } else {
    console.log(err);
  }
})
