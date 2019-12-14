document.addEventListener('DOMContentLoaded', function () {

    function updatestats()
    {
        var BgPage = chrome.extension.getBackgroundPage();
        var save = BgPage.save;

        document.getElementById("health").innerHTML = save["health"];
        document.getElementById("hungriness").innerHTML = save["hungriness"];
        document.getElementById("age").innerHTML = save["age"];
        document.getElementById("boredom").innerHTML = save["boredom"];
        document.getElementById("happiness").innerHTML = save["happiness"];
        
        //check if alive
        if (save["health"] > 0 && save["hungriness"] <= 100 && save["happiness"] > 0) 
        {
            //check if happy
            if (save["happiness"] > 85)
            {
                document.getElementById("happy-tamagotchi").style.visibility = "visible";
                document.getElementById("tamagotchi").style.visibility = "hidden";
                document.getElementById("dead-tamagotchi").style.visibility = "hidden";
            }
            else
            {
                document.getElementById("happy-tamagotchi").style.visibility = "hidden";
                document.getElementById("tamagotchi").style.visibility = "visible";
                document.getElementById("dead-tamagotchi").style.visibility = "hidden";
            }
        }
        else
        {
            document.getElementById("happy-tamagotchi").style.visibility = "hidden";
            document.getElementById("tamagotchi").style.visibility = "hidden";
            document.getElementById("dead-tamagotchi").style.visibility = "visible";
        }
        
        window.setTimeout(updatestats, 2000);
    }
    updatestats();

    //user input
    function temp_dis(button_id)
    {
        document.getElementById(button_id).disabled = true;
        window.setTimeout(function()
        {
            document.getElementById(button_id).disabled = false;
        }, 2000);

    }
    document.getElementById('feed-bread').onclick = function()
    {
        chrome.runtime.sendMessage({buttonID: "feed-bread"});
        temp_dis('feed-bread');
    };
    document.getElementById('feed-candy').onclick = function()
    {
        chrome.runtime.sendMessage({buttonID: "feed-candy"});
        temp_dis('feed-candy');
    };
    document.getElementById('feed-medicine').onclick = function()
    {
        chrome.runtime.sendMessage({buttonID: "feed-medicine"});
        temp_dis('feed-medicine');
    };
    document.getElementById('play-game').onclick = function()
    {
        chrome.runtime.sendMessage({buttonID: "play-game"});
        temp_dis('play-game');
    };

});