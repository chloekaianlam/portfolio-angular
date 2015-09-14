'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /about when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/about");
  });


  describe('about', function() {

    beforeEach(function() {
      browser.get('index.html#/about');
    });


    it('should render about when user navigates to /about', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for about/);
    });

  });


  describe('work', function() {

    beforeEach(function() {
      browser.get('index.html#/work');
    });


    it('should render work when user navigates to /work', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for work/);
    });

  });
});
