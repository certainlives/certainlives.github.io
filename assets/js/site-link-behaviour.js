const navLinkBG = "../assets/img/nice-circle.png";

var linkContainer;
var linkItems;

var linkPos = 0.0;
var linkOffset = 0.0;
var linkContainerW, linkContainerH;

const linkRotationSpeed = 15.0;
const linkRotationOffset = 0.0;
const linkPercentageFill = .89;
const updateInterval = 0;

var lastUpdateT = Date.now();


/* rotating link behaviour */

function update() {

    let now = Date.now();
    let dt = now - lastUpdateT;
    lastUpdateT = now;

    for(var i = 0; i < linkItems.length; i++){

        let item = linkItems[i];
        let pos = linkRotationOffset + linkPos + (i * linkOffset);
        let pos_rads = pos * (Math.PI / 180);

        let x = Math.cos(pos_rads) * (linkContainerW);
        let y = Math.sin(pos_rads) * (linkContainerH);

        item.style.marginLeft = x + 'px';
        item.style.marginTop = y + 'px';
        // + 'px'
    }

    linkPos += ( (dt / 1000.0) * linkRotationSpeed);
    if(linkPos > 360.0){
        linkPos -= 360.0; // Return within range (360)
        //  <HERE> potential fun loop behaviour who knows
    }
}

$(document).ready(function () {

    /*  Attach all circle assets to links in nav bar */

    console.log("did load!")

    var navBar = document.getElementById('site-navigation');
    var navElements = navBar.getElementsByClassName('nav-item');

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
        linkContainerW = linkContainer.offsetWidth * linkPercentageFill;
        linkContainerH = linkContainer.offsetHeight * linkPercentageFill;

        linkItems = linkContainer.getElementsByClassName('link-item');
        
        let linkItemStack = linkItems.length;
        if(linkItemStack > 0) 
        {
            linkOffset = 360.0 / linkItemStack;
            myInterval = setInterval(update, updateInterval);
        }
    }
});