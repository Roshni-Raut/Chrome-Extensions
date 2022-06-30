const dark=document.getElementById("dark");         
const light=document.getElementById("light");
const colorE=document.getElementById("color");

function changes(color){
    if(color=="black"||color=="#000000"){

        dark.classList.add("focus");
        light.classList.remove("focus");
        colorE.classList.remove("focus");
    
        document.getElementById("mode").style.color="#15206e";
    
        chrome.storage.sync.set({color});

        chrome.tabs.executeScript({
            file:"tabOn.js"
        })
    }
    else if(color=="white"||color=="#ffffff"){
    
        light.classList.add("focus");
        dark.classList.remove("focus");
        colorE.classList.remove("focus");

        document.getElementById("mode").style.color="#f55f09";

        chrome.storage.sync.set({color});

        chrome.tabs.executeScript({
            file:"tabOff.js"
        })
    }
    else{
        colorE.value=color;

        colorE.classList.add("focus");
        light.classList.remove("focus");
        dark.classList.remove("focus");
    
        document.getElementById("mode").style.color=color;
        
        chrome.storage.sync.set({color});
        
        chrome.tabs.executeScript({
            file:"tabColor.js"
        })
    }
}

chrome.storage.sync.get("color",({color})=>changes(color))

dark.addEventListener("click",()=>{
    changes(dark.value);
});

light.addEventListener("click",()=>{
    changes(light.value);
});

colorE.addEventListener("change",()=>{
    let color=colorE.value;
    changes(color);
})