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
	
	describe('apply object', function() {
		it('when more object than element, then it ignores the extra properties', function() {
			//given
			var obj = { 
				one: "The first elephant.",  
				two: "The second zebra.",
				three: "My merry espadrilles."
			}
			var elem = $("<div><p id='aa' data-name='one'></p><p id='bb' data-name='two'></p></div>");
			//when
			learnjs.applyObject(obj, elem);
			//then
			expect(elem.find('#aa').text()).toEqual("The first elephant.");
			expect(elem.find('#bb').text()).toEqual("The second zebra.");
			expect(elem.find('[data-name=three]').text()).toEqual("");
		});

		it('when more element than object, then it ignores the extra elements', function() {
			//given
			var obj = { 
				one: "The first elephant.",  
				two: "The second zebra."
			}
			var elem = $("<div><p id='aa' data-name='one'></p><p id='bb' data-name='two'></p><p id='cc' data-name='three'></p></div>");
			//when
			learnjs.applyObject(obj, elem);
			//then
			expect(elem.find('#aa').text()).toEqual("The first elephant.");
			expect(elem.find('#bb').text()).toEqual("The second zebra.");
			expect(elem.find('#cc').text()).toEqual("");
		});

		it('puts the object values in the element', function() {
			//given
			var obj = { 
				one: "The first elephant.",  
				two: "The second zebra."
			}
			var elem = $("<div><p id='aa' data-name='one'></p><p id='bb' data-name='two'></p></div>");
			//when
			learnjs.applyObject(obj, elem);
			//then
			expect(elem.find('#aa').text()).toEqual("The first elephant.");
			expect(elem.find('#bb').text()).toEqual("The second zebra.");
		});
	});
	
	describe('problem view', function(){
		it('has a title that includes the problem number', function() {
			//when
			var vw = learnjs.problemView('3');
			//then
			expect(vw.find('.title').text()).toEqual('Problem #3');
		});
		
		it('applies the problem object', function() {
			//given
			spyOn(learnjs, 'applyObject');
			//when
			var vw = learnjs.problemView('2');
			//then
			expect(learnjs.applyObject.calls.any()).toEqual(true);
			var args = learnjs.applyObject.calls.mostRecent().args;
			expect(args.length).toEqual(2);
			expect(args[0]).toEqual(learnjs.problems[1]);
		});
		
		var view = null;
		
		beforeEach(function() {
			view = learnjs.problemView('1');
		});
		
		describe('answer section', function() {
			it('can check a correct answer by hitting a button', function() {
				//given
				view.find('.answer').val('true');
				//when
				view.find('.check-btn').click();
				//then
				expect(view.find('.result').text()).toEqual('Correct!');
			});
			
			it('rejects an incorrect answer', function() {
				//given
				view.find('.answer').val('false');
				//when
				view.find('.check-btn').click();
				//then
				expect(view.find('.result').text()).toEqual('Incorrect :-(');
			});
		});
	});
});
