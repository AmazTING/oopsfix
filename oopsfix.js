// detect dom changes and fix oops

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver

    return function( obj, callback ){
        if ( !obj || obj.nodeType !== 1 ) return; // validation

        if ( MutationObserver ) {
            mutationObserver = new MutationObserver(callback)

            mutationObserver.observe(obj, {childList: true, subtree: true})
            return mutationObserver
        }
        else if ( window.addEventListener ) {
            obj.addEventListener('DOMNodeInserted', callback, false)
            obj.addEventListener('DOMNodeRemoved', callback, false)
        }
    }
})()

// delete elements w/ class "overlay-container is-active" and  on dom change
observeDOM(document.body, function(m){
    if (document.body.contains(document.querySelector('.blockMessage'))) {
        const overlayContent = document.querySelector('.blockMessage');
        if (overlayContent.innerHTML.toUpperCase().includes('BROWSER CONSOLE')) {
            window.location.reload()
        }
    }
})
