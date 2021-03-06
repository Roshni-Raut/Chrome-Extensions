
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if(msg.command == 'run-complete'){
        document.querySelector('textarea').value = JSON.stringify(msg.data);
        document.querySelector('textarea').style.display='block';
        alert('commands have been run');
    }
});

function createCommandObject(){
    var commandsArr = [];
    var commands = document.querySelectorAll('.command_list .command_item');
    
    for(var i =0; i < commands.length; i++){
        var itemObj = {};
        itemObj.type = commands[i].querySelector('select').value;
        itemObj.one = commands[i].querySelector('.value-1').value;
        itemObj.two = commands[i].querySelector('.value-2').value;
        commandsArr.push(itemObj);
    }
    
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            var obj = commandsArr;
            chrome.tabs.sendMessage(tabs[0].id, {command: "runCommands", data: obj });
    });
}

document.querySelector('.run-command').addEventListener('click', function(){
    createCommandObject();
});

document.querySelector('.new-command').addEventListener('click', function(){
    var newItem =`<div class="command_item">
        <select>
            <option value="wait">Wait</option>
            <option value="click">Click</option>
            <option value="enter">Enter Value</option>
            <option value="save">Save Value</option>
        </select>
        <input class="value-1" placeholder="200ms"/>
        <input class="value-2" placeholder="Optional"/>
    </div>`;
    document.querySelector('.command_list').innerHTML+=newItem;
});