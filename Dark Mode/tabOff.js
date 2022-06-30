(function() {       
    document.querySelector("html").style.backgroundColor="white";
    document.body.style.backgroundColor="white";
    document.querySelector("html").style.filter="invert(0) hue-rotate(0deg)"

    let media= document.querySelectorAll("img, picture, vedio, iframe, ytd-player");

    media.forEach((m)=>{
        m.style.filter="invert(0) hue-rotate(0deg)";
    })
})();       /* self invoking function*/