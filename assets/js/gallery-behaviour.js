$(document).ready(function () {

    /*  Attach all circle assets to links in nav bar */

    console.log("did load gallery!")

    var navBar = document.getElementById('site-navigation');
    var galleryItems = navBar.getElementsByClassName('gallery-post');

    var targetLinkURL = window.location.href;
    console.log("targetURL: ", targetLinkURL);

    for(var i = 0; i < navElements.length; i++)
    {
        let navItem = navElements[i];
        let navItemLink = navItem.getElementsByTagName('a')[0];

        if(navItemLink == targetLinkURL){

            navItem.style.backgroundImage = 'url(\'' + navLinkBG + '\')';
            console.log("Found nav match for page URL!")
        }
        else {

            navItem.style.backgroundImage = 'none';

        }

        console.log(navItemLink.href);
    }

    /* Setup rotating social link behaviours  */

    linkContainer = document.getElementById('site-navigation');
    if(linkContainer)
    {
        linkContainerW = linkContainer.offsetWidth;
        linkContainerH = linkContainer.offsetHeight;

        linkItems = linkContainer.getElementsByClassName('link-item');
        
        let linkItemStack = linkItems.length;
        if(linkItemStack > 0) 
        {
            linkOffset = 360.0 / linkItemStack;
            myInterval = setInterval(update, updateInterval);
        }
    }
});