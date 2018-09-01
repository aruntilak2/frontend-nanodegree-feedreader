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
                    /*Try*/ expect(feed.name).toBeDefined();
                // expect(allFeeds.length > 0).not.toBe(0)
               /*Try*/ expect(allFeeds.length).toBeGreaterThan(0);
 
            }
//In this test, you should ensure that URLs and names are truthy. 
// In other words, URLs and names should be defined and should not be an empty string.
// What your implementation does is ensuring that url is defined. Try setting any of urls to "", 
// test will pass just fine while it should not
// allFeeds.length should not be tested here you only want to test actual url
// 💡 Hint:
// To fix this make sure that url and name is
//  defined and the length is greater than 0 
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
        
//  Great job so far.
//  But you need to click on the menu again and 
// make sure that menu hides
// let's click on the menu
// menu.click();
// Body should not have menu-hidden class

// let't click menu again
// menu.click();
// Body should have menu-hidden class
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
                /*Try*/loadFeed(1, function(){
                    done();
                    });
            });
        });
            // loadFeed(1, done);
// Unfortunately, this isn't correct asynchronous implementation. loadFeed(1) will not wait for loadFeed(0) to receive a response from server.
// To solve this you simply nest loadFeed(1) inside of loadFeed(0) and therefore ensure that loadFeed(0) receives data from server

// 💡 Hint:

// let feedAfterFirstLoad;
// let feedAfterSecondLoad;

// beforeEach(function(done){
//   loadFeed(0, function () {
        // great place to get content of feed container
        // you can use jQuery .html or .innerHTML method to do that for You
    //  loadFeed(1, function () {
            // get content of feed container again
        //  done();
        });
        it('Content Changes',function(){
            Array.from(feed.children).forEach(function(entry,index){
            console.log(entry.innerText, firstFeed[index], entry.innerText===firstFeed[index]);
            expect(entry.innerText === firstFeed[index]).toBe(false);
        });
    });
});
}());