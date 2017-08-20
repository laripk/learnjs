describe('LearnJS', function() {
	it('can show a problem view', function() {
		//when
		learnjs.showView('#problem-1');
		//then
		expect($('.view-container .problem-view').length).toEqual(1);
	});
});
