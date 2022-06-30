chrome.storage.sync.get("sites",({sites})=>{
    document.getElementById("number").innerHTML=sites.length;
})

const btn=document.getElementById("status");
btn.addEventListener("click",()=>{
    chrome.tabs.executeScript({
        code:'location.reload()'
    })
    chrome.storage.sync.get("sites",({sites})=>{
        document.getElementById("number").innerHTML=sites.length;
    }) 
    
});