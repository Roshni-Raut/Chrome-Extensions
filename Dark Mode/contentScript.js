//Content script file which runs every time the page loads
(function(){

    chrome.storage.sync.get("color",({color})=>{
        
        if(color=="black"||color=="#000000"){
            
            //code for dark mode, same as written in tabOn
            document.querySelector("html").style.filter="invert(1) hue-rotate(180deg)"
            let media= document.querySelectorAll("img, picture, vedio, iframe, ytd-player");


            
            media.forEach((m)=>{
              m.style.filter="invert(1) hue-rotate(180deg)"
            })

        }
        else if(color=="white"||color=="#ffffff"){
            
            //code for light mode, same as written in tabOff
            document.querySelector("html").style.filter="invert(0) hue-rotate(0deg)"    
            let media= document.querySelectorAll("img, picture, vedio, iframe, ytd-player");
            
            media.forEach((m)=>{
                m.style.filter="invert(0) hue-rotate(0deg)";
            })
            
        }
        else{

            document.querySelector("html").style.backgroundColor=color;
            document.body.style.backgroundColor=color;
        }
    })
})();