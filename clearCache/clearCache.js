const clearBtn=document.getElementById("clearBtn");
const allTime=document.getElementsByName("time");// for time
const allData=document.getElementsByName("data_to_remove");//to get all value of all data remove
const checkAllBtn=document.getElementById("checkAllBtn");//button to check all
var val=1;

//auto invoking function to initialize
(function(){
    clearBtn.value=parseTimeperiod("last_hour")
    //console.log("last_hour",clearBtn.value)
})()
//if data to remove is checked change style (adding css class)
allData.forEach((a)=>{
    a.addEventListener("click",()=>{
        if(a.checked==true)
            a.parentElement.classList.add("check")
        else    
            a.parentElement.classList.remove("check")
    })
})
//easy check all option 
checkAllBtn.addEventListener("click",()=>{
    if(checkAllBtn.value=="false"){
        allData.forEach(v=>{
            v.checked=true;
            v.parentElement.classList.add("check")
        })
        checkAllBtn.value="true"
    }
    else{
        allData.forEach(v=>{
            v.checked=false;
            v.parentElement.classList.remove("check")
        })
        checkAllBtn.value="false"
    }
})   
allTime.forEach(item=>{
    item.addEventListener("click",e=>{
        allTime.forEach(c=>{
            if(c!==e.target){
                c.setTime=false
                c.parentElement.classList.remove("check")
            }
            else    
                c.parentElement.classList.add("check")
        })
        clearBtn.value=parseTimeperiod(e.target.id)
        //console.log(e.target.id,clearBtn.value)
    })
})

clearBtn.addEventListener("click",()=>{
        function callback(){
            document.getElementById("msg").style.display="inline";
            document.getElementById("msg").innerHTML=createMsg();
            const timeout = document.getElementById('msg')
            setTimeout(hide, 3000) 
            function hide() {
                timeout.style.display = 'none'
            }
        }
        var timePeriod = parseInt(clearBtn.value);
        callback();
        
        chrome.browsingData.remove({
          "since":timePeriod
        }, {
            "appcache": document.getElementById("appcache").checked,
            "cache": document.getElementById("cache").checked,
            "cacheStorage": document.getElementById("cacheStorage").checkede,
            "cookies": document.getElementById("cookies").checked,
            "downloads": document.getElementById("downloads").checked,
            "fileSystems": document.getElementById("fileSystems").checked,
            "formData": document.getElementById("formData").checked,
            "history": document.getElementById("history").checked,
            "indexedDB": document.getElementById("indexedDB").checked,
            "localStorage": document.getElementById("localStorage").checked,
            "passwords": document.getElementById("passwords").checked,
            "serviceWorkers": document.getElementById("serviceWorkers").checked,
            "webSQL": document.getElementById("webSQL").checked
        },callback);
})
function parseTimeperiod(timeperiod) {
    switch (timeperiod) {
    case "last_hour":
        return (new Date()).getTime() - 1000 * 60 * 60;
    case "last_day":
        return (new Date()).getTime() - 1000 * 60 * 60 * 24;
    case "last_week":
        return (new Date()).getTime() - 1000 * 60 * 60 * 24 * 7;
    case "last_month":
        return (new Date()).getTime() - 1000 * 60 * 60 * 24 * 7 * 4;
    case "everything":
    default:
        return 0;
    }
}
function createMsg(){
    list=[]
    msg="Data successfully removed for "
    allData.forEach(data=>{
        if(data.checked==true){
            list.push(data.id)
            msg+=data.id.charAt(0).toUpperCase()+data.id.slice(1)+", "
        }
    })
    msg=msg.slice(0,-2)
    msg+="."
    if(list.length==13)
        msg="Data successfully removed"
    else if(list.length==0)
        msg="Data not selected!!!"
    //console.log(msg)
    return msg
}