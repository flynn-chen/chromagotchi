document.addEventListener('DOMContentLoaded', function () {
    
    function getRandomInt(min, max) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    
    function compare(choice1,choice2) 
    {
        console.log(choice1);
        if (choice1 == choice2) 
        {
            return "The result is a tie!";
        }
        if (choice1=="rock") 
        {
            if (choice2=="scissor") 
            {
                return "You won";
            }
            else if (choice2=="paper") 
            {
                return "Tamagotchi won";
            }
        }
        if (choice1=="paper") 
        {
            if (choice2=="rock")
            {
                return "You won";
            }
            else if (choice2=="scissor") 
            {
                return "Tamagotchi won";
            }
        }
        if (choice1=="scissor") 
        {
            if (choice2=="rock") 
            {
                return "Tamagotchi won";
            }
            else if (choice2=="paper") 
            {
                return "You won";
            }
        }
    }
    
    function display()
    {
        document.getElementById("p" + CompChoice).style.visibility = "visible";
        document.getElementById("question-mark").style.visibility = "hidden";
    }
    
    random = getRandomInt(1,4);
    if (random == 1)
    {
        CompChoice = "rock";
    }
    else if (random == 2)
    {
        CompChoice = "paper";
    }
    else if (random == 3)
    {
        CompChoice = "scissor";
    }
    
    document.getElementById('rock').onclick = function()
    {
        display();
        document.getElementById("results").innerHTML = compare("rock",CompChoice) + ", refresh the page to play again!";
    };
    document.getElementById('paper').onclick = function()
    {
        display();
        document.getElementById("results").innerHTML = compare("paper",CompChoice) + ", refresh the page to play again!";
    };
    document.getElementById('scissor').onclick = function()
    {
        display();
        document.getElementById("results").innerHTML = compare("scissor",CompChoice) + ", refresh the page to play again!";
    };
});
