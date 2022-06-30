(function(){

    document.querySelector("html").style.backgroundColor="white";
    document.body.style.backgroundColor="white";
    
    document.querySelector("html").style.filter="invert(1) hue-rotate(180deg)"

    let media= document.querySelectorAll("img, picture, vedio, iframe, ytd-player");

    media.forEach((m)=>{
        m.style.filter="invert(1) hue-rotate(180deg)"
    })
})();   /* self invoking function*/