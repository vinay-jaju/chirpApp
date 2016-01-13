module.exports= (app,model)=> {
	app.get('/u/:uid',(req,res,next)=> {
		model.findByUsername(req.params.uid, (err,user)=> {
			if(err || !user) {
				res.render('no_profile');
			} else {
				var data= {
					uname: user.username,
					profile: user.img_profile,
					cover: user.img_cover
				}

				res.render('profile',data);
			}
		});
	});
};