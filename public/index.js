/*eslint-disable*/

var voteBtns = Array.prototype.slice.call(document.getElementsByClassName('movie__voteBtn'));
voteBtns.forEach(function(btn) {
	btn.addEventListener('click', function(event) {
		event.preventDefault();
		var userId = btn.id.split('&')[0].split('_')[1];
		var movieId = btn.id.split('&')[1].split('_')[1];
		var url = '/addVote?'+movieId;
		fetch(url, {credentials: 'same-origin'})
			.then(
				function(response) {
					console.log(response);
					if (response.status === 201) {
						btn.innerHTML = (parseInt(btn.textContent)+1) + '  <i class="fas green fa-thumbs-up"></i>';
					} else if (response.status === 200){
						btn.innerHTML = (parseInt(btn.textContent)-1) + '  <i class="far fa-thumbs-up"></i>';
					}
				}
			).catch(function(err) {
				console.log(err);
			});
	});
});