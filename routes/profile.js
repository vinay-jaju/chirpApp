var mongoose = require('mongoose');

module.exports= (app,model)=> {
	app.get('/u/:uid',(req,res,next)=> {
		model.findByUsername(req.params.uid, (err,user)=> {
			if(err || !user) {
				res.render('no_profile');
			} else {

			/*	var query= {
					$or: [
						{
							'created_by': user.username
						},
						{
							'hearts': {
								$in: [ user.username ]
							}
						},
						{
							'replies.user': {
								$in: [ user.username ]
							}
						}
					]
				};*/

				var query= { 'created_by': user.username };

				mongoose.model('Post').find(query, (err,post) => {
					if(!post) {
						next(err);
					}
					
					var len= 0;

					for(var k in post) {
						len+= post[k].hearts.length;
					}

					var data= {
						uname: user.username,
						profile: user.img_profile,
						cover: user.img_cover,
						n_post: post.length,
						n_hearts: len
					}

					res.render('profile',data);
				});
			}
		});
	});
};