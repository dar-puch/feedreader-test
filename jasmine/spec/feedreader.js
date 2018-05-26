/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('Feeds are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    it('Feed has URL', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.hasOwnProperty('url')).toBe(true);
        expect(feed.url).not.toBe('');

      });
    });
    /* a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

    it('Feed has name', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.hasOwnProperty('name')).toBe(true);
        expect(feed.name).not.toBe('');
      });
    });

  }); //end suite


  /* test suite named "The menu" */
  describe('The menu', function() {


    /* a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    it('Menu element is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
      expect($('.slide-menu').css('transform')).not.toBe('matrix(1, 0, 0, 1, 0, 0)');

    });
    /*  a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    it('Menu displays when clicked', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

  }); //end suite


  /* Test suite named "Initial Entries" */

  describe('Initial Entries', function() {
    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });

    });

    it('loadFeed function is called and works', function() {
      expect($('.feed').find('.entry').length).not.toBe(0);
    });



  }); //end suite


  describe('New Feed Selection', function() {
    allFeeds.forEach(function(object, index) {
      let i = index;
      beforeEach(function(done) {
        loadFeed(i, function() {
          done();

        });
      });

    });

    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */


    var feedBefore;
    var feedAfter;

    beforeEach(function(done) {
      loadFeed(0, function() {
        feedBefore = $('.feed').html();
        loadFeed(1, function() {
          feedAfter = $('.feed').html();
          done();
        });
      });
    });

    it('Content changes', function() {
      expect(feedBefore).not.toBe(feedAfter);
    });

  }); //end suite


}()); //end $() function
