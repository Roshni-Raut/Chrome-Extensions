let value=[""]
let count=1
chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({value},function(){
        console.log(`Value currently is: ${value}`)
    });
    chrome.storage.sync.set({count},()=>{
        console.log(`count set to ${count}`)
    })
})

    