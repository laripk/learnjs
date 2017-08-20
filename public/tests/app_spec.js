describe('LearnJS', function() {
	it('can show a problem view', function() {
		//when
		learnjs.showView('#problem-1');
		//then
		expect($('.view-container .problem-view').length).toEqual(1);
	});
	
	it('shows the landing page view when there is no hash', function() {
		//when
		learnjs.showView('');
		//then
		expect($('.view-container .landing-view').length).toEqual(1);
	});
});
