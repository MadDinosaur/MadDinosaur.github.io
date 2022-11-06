var started = false;
var gameIsOver = false;
// NAVIGATION WITH KEYS

var currentPos = 1; //pos 0-start, 1-controls etc..
var dialogPos = 0;
var mainPage = true; // says if view is on the main page
var aboutPage = false;
var mainOptions = ["CV", "ABOUT_ME", "PROJECTS", "GITHUB", "LINKEDIN", "E-MAIL"];
var mainHrefOptions = ["/docs/CV.pdf", null, "./projects.html", "https://github.com/MadDinosaur", "https://www.linkedin.com/in/b%C3%A1rbara-pinto-80b380192/", "mailto:bdianapinto@outlook.com"];
var aboutDialog = ["HELLO THERE!", "I'M A PROGRAMMING STUDENT, CASUAL GAME DEVELOPER...", "..AND OCCASIONAL D&D DUNGEON MASTER.",
    "I'M PASSIONATE ABOUT...", "MATHS",  "RETRO CONSOLES", "TECH","TRAVELLING", "AND COOKING!",
    "PLEASE CHECK OUT MY WORK AND MY SOCIAL NETWORKS!"];
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
                            currentPos = 0; //reset position
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
                } else if (aboutPage) {
                    switch (currentPos) {
                        case 0:
                            dialogPos += 1;
                            if (dialogPos < aboutDialog.length) {
                                document.getElementsByClassName("typed-out")[0].remove();

                                var div = document.createElement("div");
                                div.classList.add("typed-out");
                                div.textContent = aboutDialog[dialogPos];

                                document.getElementsByClassName("bubble")[0].appendChild(div)
                            }
                            break;
                        case 1:
                            changeSection(mainOptions[currentPos], 'main');
                            mainPage = true;
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
    } else if (aboutPage) {
        aboutPageAnchorLinks[currentPos].classList.remove('flash');

        currentPos -= 1;
        if (currentPos < 0) currentPos = aboutPageAnchorLinks.length - 1;

        aboutPageAnchorLinks[currentPos].classList.add('flash');
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
    } else if (aboutPage) {
        aboutPageAnchorLinks[currentPos].classList.remove('flash');

        currentPos += 1;
        if (currentPos == aboutPageAnchorLinks.length) currentPos = 0;

        aboutPageAnchorLinks[currentPos].classList.add('flash');
    }
}

function changeSection(from, to) {
    document.getElementById(from).style.display = "none";
    document.getElementById(to).style.display = "initial";
}

