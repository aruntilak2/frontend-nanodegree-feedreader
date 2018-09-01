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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function(){
            for( let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.name).toBeDefined();
                expect(allFeeds.length).toBeGreaterThan(0);
            }
        });
        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name defined', function(){
            for( let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(allFeeds.length >0 ).not.toBe(0);
            }
        });
    });
    /*  "The menu" */
    describe('The Menu', function(){
            /* Test that ensures the menu element is
            * hidden by default. You'll have to analyze the HTML and
            * the CSS to determine how we're performing the
            * hiding/showing of the menu element.
            */
        it('Hidden', function(){
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
            /* Test that ensures the menu changes
            * visibility when the menu icon is clicked. This test
            * should have two expectations: does the menu display when
            * clicked and does it hide when clicked again.
            */
        it('Menu clicked', function(){
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });
    /*  named "Initial Entries" */
    describe('Initial Entries', function(){
        /* completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it('Completes', function(){
            const feed= document.querySelectorAll('.entry-link');
            expect(feed.length > 0).toBe(true);
        });
        // This test ensures that there is at least one child within .feed container. 😊
// According to the rubric for this project,
//  the test should ensure that there is at least one .entry within .feed container.
// 💡 Hint:
// document.querySelectorAll('.parent .child').length
    });
    /* "New Feed Selection" */
    describe('New Feed Selection',function(){
        /* A new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
        const feed = document.querySelector('.feed');
        const firstFeed = [];
        beforeEach(function(done){
            loadFeed(0, function(){
                Array.from(feed.children).forEach(function(entry){
                firstFeed.push(entry.innerText);
                    loadFeed(1, function(){
                        done();
                    });
            });
        });
    });
        it('Content Changes',function(){
            Array.from(feed.children).forEach(function(entry,index){
            console.log(entry.innerText, firstFeed[index], entry.innerText===firstFeed[index]);
            expect(entry.innerText === firstFeed[index]).toBe(false);
        });
    });
});
}());