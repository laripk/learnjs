'use strict';
var learnjs = {};

learnjs.problems = [
	{
		description: "What is truth?",
		code: "function problem() { return ___; }"
	},
	{
		description: "Simple Math",
		code: "function problem() { return 42 === 6 * ___; }"
	}
];

learnjs.applyObject = function(obj, elem) {
	for(var key in obj) {
		elem.find('[data-name="' + key + '"]').text(obj[key]);
	}
};


learnjs.problemView = function(problemNumber) {
	var view = $('.templates .problem-view').clone();
	var title = 'Problem #' + problemNumber;
	view.find('.title').text(title);
	learnjs.applyObject(learnjs.problems[problemNumber - 1], view);
	return view;
}


learnjs.showView = function(hash) {
	var routes = {
		'#problem': learnjs.problemView
	};
	var hashParts = hash.split('-');
	var viewFn = routes[hashParts[0]];
	if(viewFn) {
		$('.view-container').empty().append(viewFn(hashParts[1]));
	}
}

learnjs.appOnReady = function() {
	window.onhashchange = function() {
		learnjs.showView(window.location.hash);
	};
	learnjs.showView(window.location.hash);
}
