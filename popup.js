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

        window.setTimeout(updatestats, 2000);
    }
    updatestats();
});