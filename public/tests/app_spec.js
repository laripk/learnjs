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
	
	it('passes the hash view parameter to the view function', function() {
		//given
		spyOn(learnjs, 'problemView');
		//when
		learnjs.showView('#problem-42');
		//then
		expect(learnjs.problemView).toHaveBeenCalledWith('42');
	});
	
	it('invokes the router when loaded', function() {
		//given
		spyOn(learnjs, 'showView');
		//when
		learnjs.appOnReady();
		//then
		expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
	});
	
	it('subscribes to the hash change event', function() {
		//given
		learnjs.appOnReady();
		spyOn(learnjs, 'showView');
		//when
		$(window).trigger('hashchange');
		//then
		expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
	});
	
	describe('problem view', function(){
		it('has a title that includes the problem number', function() {
			//when
			var view = learnjs.problemView('3');
			//then
			expect(view.text()).toEqual('Problem #3 Coming soon!');
		});
	});
});
