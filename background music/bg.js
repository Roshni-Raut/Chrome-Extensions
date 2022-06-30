
chrome.runtime.onMessage.addListener((msg, sender, response) =>{
    
    if(msg.name=="PlayTrack"){


        var trackName = msg.track;
        var audioEle = document.querySelector('.audio-element');
        audioEle.src = 'Track-'+trackName+'.mp3';
        audioEle.play();
    }


    if(msg.name=="PauseTrack"){
        var audioEle = document.querySelector('.audio-element');   
        audioEle.pause();
    }
});
