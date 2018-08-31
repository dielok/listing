"use strict";

function loadDataPage(start, offset, callback) {
    
    busy = true;
    $listing.addClass('loading');
    
    /* TODO: DO LOADING STUFF AND CALLBACK WHEN DONE
    $.get("products.json", function(data) {});
    */
    
    setTimeout(function(){ callback(data.slice(0, offset)); }, 3000);
    
}

function renderPage(data) {
    
    for (let i = 0; i < data.length; i++) {
        
        $clone = $original.clone().appendTo($listing);
        
    }
    
    loadPosition = $listing.offset().top + $listing.outerHeight() - 1.2 * $(window).height();
    
    busy = false;
    $listing.removeClass('loading');
    
}

function testMaxItems() {
    
    var maxPerPage = 0;
    
    do {
        
        $clone = $original.clone().appendTo($listing);
        
        maxPerPage++;
        
    }
    while ($clone.visible(true) && maxPerPage < 60);
    
    $('.product', $listing).remove();
    $listing.removeClass('testing');
    
    if (maxPerPage < 10) maxPerPage = 10;
    
    return maxPerPage;
    
}


var $listing, $clone, $original;

$listing = $('.listing');
$original = $('.product');

var data = products.data, maxPerPage = testMaxItems(), busy = true, loadPosition;

loadDataPage(0, maxPerPage * 2, function(page) {
        
    $(document).on('scroll', function() {
        
        var scrollPosition = $(this).scrollTop() + $(window).height();
        
        if (scrollPosition >= loadPosition) { // reached end of list
            
            if ( ! busy) {
                
                loadDataPage($('.product', $listing).length, maxPerPage, renderPage);
                
            }
            
        }
        
    });
    
    renderPage(page);
    
});

$(window).on("resize", function(e) {
    
    loadPosition = $listing.offset().top + $listing.outerHeight() - 1.2 * $(this).height();
    
});



/////



$('.sidebar__filter').on('click', function() {
    
    $(this).toggleClass("sidebar__filter--open");
    
});
