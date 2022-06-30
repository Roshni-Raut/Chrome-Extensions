var count=1;

(function(){
    chrome.storage.sync.get(["count","value"],({count,value})=>{
        if(count>0){
            for(i=1;i<=count;i++){
                    createTextArea(i,value)
            }
        }
    })
})();

function createTextArea(i,value){
    count=i;
    var ndiv = document.createElement("div");
    ndiv.id="text-box"+i;
    ndiv.className="text-box";
    ndiv.innerHTML='<textarea type="text" class="text" id="'+i+'">'+value[i-1]+'</textarea>'+
    '<div class="actBtn"><button class="copy" value="'+i+'"><img src="clipboard.svg" ></button>'+
    '<button class="delete" value="'+i+'"><img src="trash-fill.svg"></button>'+
    '<button class="download" value="'+i+'"><img src="download.svg"></button></div>';

    document.getElementById("list").appendChild(ndiv);
    
}

document.addEventListener("click", (event)=>{
    if(event.target.id=="add"){
        count++;      
        chrome.storage.sync.set({count});
        chrome.storage.sync.get("value",({value})=>{
            value.push("")
            chrome.storage.sync.set({value})
            createTextArea(count,value)
        })
    }
    else if(event.target.className=="copy"){
        (async function(){
            let copyText = document.getElementById(event.target.value);
            copyText.select();
            copyText.setSelectionRange(0, 99999); 
            await navigator.clipboard.writeText(copyText.value);
        })();
    }
    else if(event.target.className=="delete"){
        let text = document.getElementById(event.target.value).value;
        ndiv=document.getElementById("text-box"+event.target.value);
        document.getElementById("list").removeChild(ndiv)
        count--;
        chrome.storage.sync.set({count});
        chrome.storage.sync.get("value",({value})=>{
            let index=value.indexOf(text)
            value.splice(index,1)
            chrome.storage.sync.set({value})
        })
    }
    else if(event.target.className=="download"){
        let text = document.getElementById(event.target.value).value;
        let filename = "board"+event.target.value+".txt";
        /* Downloading Function */
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'downloading';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
});

document.addEventListener("change",(event)=>{
    if(event.target.className=="text"){
        i=parseInt(event.target.id);
        chrome.storage.sync.get("value",({value})=>{
            value[i-1]=event.target.value;
            chrome.storage.sync.set({value});
        })
    }
})