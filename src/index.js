$(document).ready(function() {
    createContent();
    $('.object').click(function(){
        clickEvent(this);
    });
    scrollToTheMiddleAndAlign();
});

var HOW_MANY = 150;

function createContent() {
    $('.container .subcontainer').each(function(){
        var size = 1;
        if($(this).hasClass('middle')) {
            size = 2;
        } 
        if($(this).hasClass('right')) {
            size = 3;
        } 
        appendObjects($(this), HOW_MANY, '- ', size);
    });
}

function clickEvent(el, folceAllToScroll) {    
    setActive(el);
    updateScrollPositions(el, folceAllToScroll);
}

function scrollToTheMiddleAndAlign() {
    $('.container .middle').each(function(){
        var middleElementInTheMiddleColumn = $(this).children()[parseInt(HOW_MANY/2,10)];
        clickEvent(middleElementInTheMiddleColumn, true);
    });
}

function generateRandomHeight(size) {
    return (((Math.floor( Math.random() * 10) * 20)+ 20) * size) + 'px'; 
}
function appendObjects(where, howMany, prefix, size) {
    for(var i=0; i<howMany;i++) {
        where.append(getObject(i, prefix, size));
    }
}
function getObject(index, prefix, size) {
    var obj =  $('<div data-id="'+prefix+index+'" class="object">'+prefix+index+'</div>');
    obj.css('min-height', generateRandomHeight(size));
    return obj;
}
function setActive(el) {
    $('.object').removeClass('active');
    var did = $(el).attr('data-id');
    $('*[data-id="'+did+'"]').addClass('active');
} 
function updateScrollPositions(mainActiveEl, forceAll) {


    if(forceAll === true) {
        updateScrollPosition($(mainActiveEl).closest('.subcontainer'), 0);
    }

    var top = $(mainActiveEl).offset().top;
    $('.container .subcontainer').each(function(){
        if($(this).find(mainActiveEl).length < 1) {
            updateScrollPosition(this, top);
        }
    });
}

function updateScrollPosition(sub, top) {
    var sub = $(sub);   
    var height = 0;
    sub.find('.active').prevAll().each(function(){
        height += $(this).outerHeight();
    });
    sub.scrollTop((height - top));
 
}







    


