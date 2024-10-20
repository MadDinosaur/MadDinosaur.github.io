var started = false;
var gameIsOver = false;
// NAVIGATION WITH KEYS

var currentPos = 1; //pos 0-start, 1-controls etc..
var mainPage = true; // says if view is on the main page
var aboutPage = false;
var aboutDialogTriggered = false;
var mainOptions = ["CV", "ABOUT_ME", "PROJECTS", "GITHUB", "LINKEDIN", "E-MAIL"];
var mainHrefOptions = ["/docs/CV.pdf", null, "./projects.html", "https://github.com/MadDinosaur", "https://www.linkedin.com/in/b%C3%A1rbara-pinto-80b380192/", "mailto:bdianapinto@outlook.com"];
var mainAnchorLinks = [];
var aboutPageAnchorLinks = [];
$(window).on('load', function () {
    var ul = document.getElementById('main').getElementsByTagName('ul')[0];
    for (let i = 0; i < 3; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.text = mainOptions[i];
        if (mainHrefOptions[i] == null) a.onclick = function () { changeSection('main', 'ABOUT_ME'); };
        else a.href = mainHrefOptions[i];
        mainAnchorLinks[i] = a;
        li.appendChild(a);
        ul.appendChild(li);
    }
    mainAnchorLinks[currentPos].classList.add('flash');

    aboutPageAnchorLinks = document.getElementById("ABOUT_ME").getElementsByTagName('a');
});

var oldScrollY = window.scrollY;
window.onscroll = function (e) {
    if (oldScrollY < window.scrollY) {
        scrollDown();
    } else {
        scrollUp();
    }
    oldScrollY = window.scrollY;
}

$(window).keydown(function (e) {
    if (!started) {
        switch (e.which) {
            case 40:
                scrollDown();
                break;
            case 38:
                scrollUp();
                break;
            case 13:
            case 32:
                if (mainPage) {
                    switch (currentPos) {
                        case 0:
                            window.open("/docs/CV.pdf");
                            break;
                        case 1:
                            changeSection('main', 'ABOUT_ME');
                            mainPage = false;
                            aboutPage = true;
                            if (!aboutDialogTriggered) {
                                aboutDialogTriggered = true;
                                timer = setInterval(updateTitle, 50);
                            }
                            aboutPageAnchorLinks[0].classList.add('flash');
                            break;
                        case 2:
                            window.location.href = "./projects.html";
                            break;
                        case 3:
                            window.open("https://github.com/MadDinosaur");
                            break;
                        case 4:
                            window.open("https://www.linkedin.com/in/b%C3%A1rbara-pinto-80b380192/");
                            break;
                        case 5:
                            window.location.href = "mailto:bdianapinto@outlook.com";
                            break;
                    }
                } else {
                    changeSection(mainOptions[currentPos], 'main');
                    mainPage = true;
                }
        }
    }
});

function scrollUp() {
    if (mainPage) {
        currentPos -= 1;
        var prev = currentPos - 1;
        var next = currentPos + 1;

        //edge cases
        switch (currentPos) {
            case 0:
                prev = mainOptions.length - 1;
                break;
            case - 1:
                currentPos = mainOptions.length - 1;
                prev = currentPos - 1;
                next = 0;
                break;
        }

        mainAnchorLinks[0].text = mainOptions[prev];
        mainAnchorLinks[0].href = mainHrefOptions[prev];
        mainAnchorLinks[1].text = mainOptions[currentPos];
        mainAnchorLinks[1].href = mainHrefOptions[currentPos];
        mainAnchorLinks[2].text = mainOptions[next];
        mainAnchorLinks[2].href = mainHrefOptions[next];
    }
}

function scrollDown() {
    if (mainPage) {
        currentPos += 1;
        var prev = currentPos - 1;
        var next = currentPos + 1;

        //edge cases
        switch (currentPos) {
            case mainOptions.length:
                currentPos = 0;
                prev = mainOptions.length - 1;
                next = 1;
                break;
            case mainOptions.length - 1:
                next = 0;
                break;
        }

        mainAnchorLinks[0].text = mainOptions[prev];
        mainAnchorLinks[0].href = mainHrefOptions[prev];
        mainAnchorLinks[1].text = mainOptions[currentPos];
        mainAnchorLinks[1].href = mainHrefOptions[currentPos];
        mainAnchorLinks[2].text = mainOptions[next];
        mainAnchorLinks[2].href = mainHrefOptions[next];
    }
}

function changeSection(from, to) {
    document.getElementById(from).style.display = "none";
    document.getElementById(to).style.display = "initial";
}

var title = "Hello there!\n\n\n\n<br><br><br>My name is Diana.\n\n<br><br>I’m a software engineer by day and casual game developer by night.\n\n<br><br>I love learning about all things technology, participating in workshops and creating my own projects.\n\n<br><br>Please check out my work and social networks!";
var titleLenght = title.length - 1;
var text = "";
var counter = 0;
var timer;

function updateTitle() {
    if (title[counter] == '<') {
        do {
            text = text + title[counter];
            counter++;
        } while (title[counter] != '>')
    }
    text = text + title[counter];
    document.getElementById("code").innerHTML = text + '<span class="blinking">_</span>';
    if (counter >= titleLenght && counter >= 0) {
        counter = -1;
        clearInterval(timer);
    } else {
        counter++;
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

