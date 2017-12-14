module.exports = (array, movieId) => {
	var included = false;
	array.forEach(function(item) {
		console.log('item', item, movieId);
		if (item == movieId) {
			included = true;
		}
	});
	return included;
};
