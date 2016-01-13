module.exports= ()=> {
	let $nav= document.querySelector('.js-navi');
	let $nav_btn= document.querySelector('.js-nav-tog');

	return {
		el: {},
		toggle_nav() {
			if($nav.classList.contains('showing')) {
				$nav.classList.remove('showing');
				// $nav_btn.classList.remove('showing');
			} else {
				$nav.classList.add('showing');
				// $nav_btn.classList.add('showing');
			}
		},
		start_loading() {
			console.log("load start");
		},
		stop_loading() {
			console.log("load stop");
		}
	};
};