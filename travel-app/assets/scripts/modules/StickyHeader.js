import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav a");

        this.createHeaderWaypoint();
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
    }

    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoint() {
        var construct = this;
        new Waypoint({
            element: this.headerTriggerElement[0], //The first element of a jQUery object is the DOM element
            handler: function(direction) {
                if (direction == "down"){
                    construct.siteHeader.addClass("site-header--dark");
                } else {
                    construct.siteHeader.removeClass("site-header--dark");
                }
            },
        });
    }

    createPageSectionWaypoints() {
        var construct = this;
        this.pageSections.each(function(){
            var currentPageSection = this;
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if(direction == "down") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        construct.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                    
                },
                offset: "20%"
            });

            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if(direction == "up") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        construct.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                    
                },
                offset: "-40%"
            });

        });
    }


}

export default StickyHeader;