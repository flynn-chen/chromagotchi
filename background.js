chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.buttonID == "feed-bread")
    {
        feed_bread();
    }
    if (request.buttonID == "feed-candy")
    {
        feed_candy();
    }
    if (request.buttonID == "feed-medicine")
    {
        feed_medicine();
    }
    if (request.buttonID == "play-game")
    {
        playgame();
    }
});

//declaring tamagotchi stats
var health;
var hungriness;
var happiness;
var age;
var time;
var last_game_time;
var boredom;

var save = {};

function savestate()
{
    save["health"] = health;
    save["hungriness"] = hungriness;
    save["happiness"] = happiness;
    save["age"] = age;
    save["time"] = time;
    save["late_game_time"] = last_game_time;
    save["boredom"] = boredom;
    chrome.storage.sync.set(save, function() {
        console.log('Settings saved');
    });
}

function loadstate()
{
    chrome.storage.sync.get(save, function(result) {
        if (typeof result["health"] == 'undefined' || "")
        {
            console.log("no previous states, load starting stats");
        }
        else
        {
            health = result["health"];
            hungriness = result["hungriness"];
            happiness = result["happiness"];
            age = result["age"];
            time = result["time"];
            last_game_time = result["late_game_time"];
            boredom = result["boredom"];
            console.log("Setting Loaded")
        }
    });
}

function alive()
{
    if (health > 0 && hungriness <= 100 && happiness > 0)
    {
        return true;
    }
    else
    {
        chrome.storage.local.clear(function()
        {
            var error = chrome.runtime.lastError;
            if (error)
            {
                console.error(error);
            }
        });
        return alert('Oh no!  Your Tamagotchi died!');
    }
}

function hungrier()
{
    alive();

    hungriness += 0.1;
}

function random_sick()
{
    if (Math.random() < 0.05)
    {
        health -= 10;

        if (health < 0)
        {
            health = 0;
        }

        alive();
    }
}

function aging()
{
    alive();

    age += 1;
}

window.setTimeout(aging, 86400000);

function update_happiness()
{
    if (time - last_game_time > 30 || last_game_time == 0)
    {
        happiness -= 1;

        if (happiness < 0)
        {
            happiness = 0;
        }
        
        boredom = true;
    }
    else
    {
        boredom = false;
    }
}

window.setTimeout(loop, 1000);

function loop()
{
    if (typeof save["health"] == "undefined")
    {
        //tamagotchi starting stats
        health = 100;
        hungriness = 0;
        happiness = 100;
        age = 0;
        time = 0;
        last_game_time = 0;
        boredom = false;
        console.log("starting stats loaded");
    }
    else
    {
        loadstate();
    }

    hungrier();
    random_sick();
    time += 1;
    update_happiness();

    savestate();

    if (alive())
    {
        window.setTimeout(loop, 1000);
    }
}

function feed(reduction)
{
    alive();

    hungriness -= reduction;

    if (hungriness < 0)
    {
        hungriness = 0;
    }
}

function feed_bread()
{
    alive();

    feed(5);
    
    savestate();
}

function feed_candy()
{
    alive();

    feed(2);

    health -= 1;

    happiness += 1;

    if (happiness > 100)
    {
        happiness = 100;
    }
    
    savestate();
}

function feed_medicine()
{
    alive();

    health += 10;

    if (health > 100)
    {
        health = 100;
    }
    
    savestate();
}

function playgame()
{
    alive();

    happiness += 5;

    if (happiness > 100)
    {
        happiness = 100;
    }

    last_game_time = time;
    
    savestate();
}

