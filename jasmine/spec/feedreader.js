/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*
    **In "RSS Feeds" test suite, we test if allFeeds variable well defined,
    **we also test if each element has a valid url and name properties
    */
    describe('RSS Feeds', function() {
        /*
        **here we test if allFeeds variable is defined and contains at least one element
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
        **here we test if each feed in allFeeds array has a valid "url" property
        */
         it("All feeds have a valid url", function() {
            let valid = true;
            for(const feed of allFeeds) {
                if(feed.url === undefined || feed.url === ""){
                    valid = false;
                    break;
                }
            }
            expect(valid).toBe(true);
         });

        /*
        **here we test if each feed in allFeeds array has a valid "name" property
        */
        it("All feeds have a valid name", function() {
            let valid = true;
            for(const feed of allFeeds) {
                if(feed.name === undefined || feed.name === ""){
                    valid = false;
                    break;
                }
            }
            expect(valid).toBe(true);
         });
    });


    /*
    ** "The menu" test suite is used to make sure that
    ** the menu(sidemenu) functions as expected
    */
    describe("The menu", function() {

        const body = $('body');

        /*
        ** This test is checking if menu is hidden by default
        */
        it("Menu is hidden by default", function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });


        /*
        ** Here we check toggling menu visibility features
        ** by simulating a user click on the menu Icon
        */
        it("Menu changes visibility when menu icon is clicked", function() {
            const menuIcon = $(".menu-icon-link");
            menuIcon.click();
            expect(body.hasClass("menu-hidden")).toBe(false);
            menuIcon.click();
            expect(body.hasClass("menu-hidden")).toBe(true);

        });

    });

    /*
    ** "Initial Entries" test suite ensures that we have valid initial entries for feeds0
    */
    describe("Initial Entries", function() {

        /*
        ** in beforeEach, we execute async function "loadFeed" and we invoke "done" in its callback.
        */
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });

        /*
        ** This test checks if at least we retrieve one feed after getting data with "loadFeed" function.
        ** There should be at least one .entry element in .feed container.
        ** test below runs after invoking callback function in the async function "loadFeed".
        */
        it("There's at least one entry for the feed", function(done) {
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        });

    });


    /*
    ** "New Feed Selection" test suite checks if async functions work
    ** as expected and helps getting desired data
    */
    describe("New Feed Selection", function() {

        let feed1,feed2;

        /*
        ** async code is executed in beforeEach, at the end "done" should be invoked.
        */
        beforeEach(function(done) {
        /*
        ** in this test we need to run two async functions, we called the second function in callback function
        ** of the fist one. Then we called done method in the callback function of the second one to run the test
        ** after completing these two async functions.
        */
            loadFeed(0,function(){
                feed1 = $(".feed").html();
                loadFeed(1,function(){
                    feed2 = $(".feed").html();
                    done();
                });
            });
        });
        /*
        ** test below runs when done method is called(beforeEach)
        ** test passes if content actually changes
        */
        it("Content changes when loading a new feed",function(done) {
            expect(feed2).not.toBe(feed1);
            done();
        });

    });

}());
