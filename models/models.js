var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	created_by: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	text: String,
	hearts: [],
	replies: [
		{
			user: String,
			comment: String,
			created_at: {type: Date, default: Date.now}
		}
	]
});

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	img_profile: { type:String, default: 'face.png' },
	img_cover: { type:String, default: 'new.jpg' },
	created_at: {type: Date, default: Date.now}
})


mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);

//utility functions
var User = mongoose.model('User');
exports.findByUsername = function(userName, callback){

	User.findOne({ username: userName}, function(err, user){

		if(err){
			return callback(err);
		}

		//success
		return callback(null, user);
	});

}

exports.findById = function(id, callback){

	User.findById(id, function(err, user){

		if(err){
			return callback(err);
		}

		return callback(null, user);
	});
}