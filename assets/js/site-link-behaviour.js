const navLinkBG = "../assets/img/nice-circle.png";



window.onload = function(e) {

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

};