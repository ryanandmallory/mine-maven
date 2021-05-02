// Global variables
let round = 1;
let scoreData = 0;
let flag = 0;
let total = 0;
let num2 = 0;
let mines = [];
let messageFlag = 0

const message = document.querySelector('.message');

const createScore = function() {
        const gameHeader = document.querySelector('.game-head');
        const h2 = document.createElement('h2');
        const h2Score = document.createElement('h2');
        h2Score.setAttribute("class", "score");
        const roundTxt = document.createTextNode("Game " + round + " of 7 — beware of the mines!");
        const scoreText = document.createTextNode("Get to 300 — Your Score: 0");
        h2.appendChild(roundTxt);
        h2Score.appendChild(scoreText);
        gameHeader.appendChild(h2);
        gameHeader.appendChild(h2Score);  
}

const createAudio = function () {
        const gameAudio = document.querySelector('.audio-music');
        const audioPlay = document.createElement('audio');
        const source = document.createElement('source');
        audioPlay.setAttribute("autoplay", "true");
        audioPlay.setAttribute("loop", "true");
        audioPlay.setAttribute("class", "game-audio");
        source.src = '../audio/thrilling.mp3';
        source.setAttribute('type', 'audio/mpeg');
        audioPlay.appendChild(source);
        gameAudio.appendChild(audioPlay);
}

const createIntroParas = function(para1, para2, para3) {
        const introWrapper = document.querySelector('.intro-wrapper');
        const introBtn = document.querySelector('.intro-wrapper button');
        const createParaOne = document.createElement('p');
        createParaOne.setAttribute("class", "text-animate");
        const createParaTwo = document.createElement('p');
        createParaTwo.setAttribute("class", "text-animate");
        const createParaThree = document.createElement('p');
        createParaThree.setAttribute("class", "text-animate");
        
        createParaOne.appendChild(para1);
        createParaTwo.appendChild(para2);
        createParaThree.appendChild(para3);
        introWrapper.insertBefore(createParaOne, introBtn);
        introWrapper.insertBefore(createParaTwo, introBtn);
        introWrapper.insertBefore(createParaThree, introBtn);
}

const deleteAudio = function() {
        const source = document.querySelector('.game-audio');
        source.remove();
}

const removeIntro = function (){
        const intro = document.querySelector('.intro');
        intro.remove();
}

const createGameBoard = function(len, hits){
        mines = Array.from({length: len}, () => Math.floor(Math.random() * 90 + 1));
        switch(hits){
                case 4:
                mines.push('x', 'x', 'x', 'x');
                break;
                case 5:
                mines.push('x', 'x', 'x', 'x', 'x');
                break;
                case 6:
                mines.push('x', 'x', 'x', 'x', 'x', 'x');
                break;
                case 7:
                mines.push('x', 'x', 'x', 'x', 'x', 'x', 'x');
                break;
                case 8:
                mines.push('x', 'x', 'x', 'x', 'x', 'x', 'x', 'x');
                break;
                case 9:
                mines.push('x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x');
                break;
                case 10:
                mines.push('x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x');
                break;
        }
}

const playGame = function(){
        createScore();
        createAudio();
        if (round === 1){ createGameBoard(17, 4); }
        if (round === 2){ createGameBoard(16, 5); }
        if (round === 3){ createGameBoard(15, 6); }
        if (round === 4){ createGameBoard(14, 7); }
        if (round === 5){ createGameBoard(13, 8); }
        if (round === 6){ createGameBoard(12, 9); }
        if (round === 7){ createGameBoard(11, 10); }
        const shuffleArray = function (array) {
                let currentIndex = array.length;
                let temporaryValue;
                let randomIndex;
                while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
                }
                return array;
        }
        shuffleArray(mines);

        // Construct the mine numbers
        const gameWrapper = document.querySelector('.game-wrapper');
        mines.forEach(function(mine){
                let number = document.createTextNode(mine);
                const div = document.createElement('div');
                div.setAttribute('class', 'circle-div');
                const para = document.createElement('p');
                para.setAttribute('class', 'number-display');
                const disk = document.createElement('img');
                disk.src = '../MineMaven/img/disk.png';
                disk.setAttribute('class', 'circle animate');
                para.appendChild(number);
                div.appendChild(para);
                div.appendChild(disk);
                gameWrapper.appendChild(div);
        });
        document.addEventListener('click', function (event) {
                event.stopImmediatePropagation();
                const checkGameOver = function (num){
                        if (round === 7){
                                if (num >= 300) {
                                        deleteAudio();
                                        const congrats = document.querySelector('.congratulations');
                                        const gameHead = document.querySelector('.game-head');
                                        const video = document.createElement('video');
                                        const source = document.createElement('source');
                                        const h3 = document.createElement('h3');
                                        congrats.style.display = 'flex';
                                        video.setAttribute('width', '100%') 
                                        video.setAttribute('autoplay', 'autoplay');
                                        video.setAttribute('class', 'congratulations-video');
                                        source.src = '../video/won.mp4';
                                        source.setAttribute('type', 'video/mp4');
                                        video.appendChild(source);
                                        congrats.appendChild(video);
                                        gameHead.style.display = 'none';
                                        setTimeout(function(){
                                                const h3Txt = document.createTextNode('You Won! Get in Your Ship and Get Out of Here.');
                                                h3.setAttribute('class', 'congrats-won-head text-animate-fade-in-out');
                                                h3.appendChild(h3Txt);
                                                congrats.appendChild(h3); 
                                        }, 500);
                                        setTimeout(function(){
                                                h3.remove();
                                        }, 5500);
                                        setTimeout(function(){
                                                location.reload();
                                        }, 18000);
                                }
                        } else {
                                if (num >= 300) {
                                        deleteAudio();
                                        const congrats = document.querySelector('.congratulations');
                                        const gameHead = document.querySelector('.game-head');
                                        const h3 = document.createElement('h3');
                                        const h3Txt = document.createTextNode('Begin Level');
                                        const video = document.createElement('video');
                                        const source = document.createElement('source');
                                        congrats.style.display = 'flex';
                                        h3.setAttribute('class', 'congrats-info-head text-animate');
                                        h3.appendChild(h3Txt);
                                        video.setAttribute('width', '100%') 
                                        video.setAttribute('autoplay', 'autoplay');
                                        video.setAttribute('class', 'congratulations-video');
                                        source.src = '../video/level.mp4';
                                        source.setAttribute('type', 'video/mp4');
                                        video.appendChild(source);
                                        congrats.appendChild(video);
                                        gameHead.style.display = 'none';
                                        setTimeout(function(){
                                                congrats.appendChild(h3);
                                        }, 7500);
                                        setTimeout(function(){
                                                const button = document.createElement('button');
                                                const imgIcon = document.createElement('img');
                                                imgIcon.src = '../img/hazard-icon.png';
                                                imgIcon.setAttribute("class", "hazard-icon animate");
                                                button.setAttribute("class", "next-level animate");
                                                let roundNum = round + 1;
                                                let btnDisplyText;
                                                if (roundNum === 7){
                                                        btnDisplyText = 'Proceed to Final Level ';
                                                } else {
                                                        btnDisplyText = 'Proceed to Level ' + roundNum;
                                                }
                                                h3.remove();
                                                const btnTextNode = document.createTextNode(btnDisplyText);
                                                button.appendChild(btnTextNode);
                                                congrats.appendChild(imgIcon);
                                                congrats.appendChild(button);
                                        }, 10500);
                                }
                        }
                }
                if (event.target.matches('.circle')) {
                        const hitMines = function(){
                                if (event.target.previousSibling.textContent === 'x'){
                                        deleteAudio();
                                        const hit = document.querySelector('.hit');
                                        const audio = document.createElement('audio');
                                        const gameHead = document.querySelector('.game-head');
                                        audio.src = '../MineMaven/audio/explosion.mp3';
                                        audio.setAttribute("type", "audio/mpeg");
                                        audio.autoplay = true;
                                        gameHead.style.display = 'none';
                                        hit.style.display = 'flex';
                                        hit.appendChild(audio);
                                }
                        }
                        const textReveal = event.target;
                        const score = document.querySelector('.score');
                        textReveal.previousSibling.style.zIndex = '400';
                        textReveal.previousSibling.className += ' circle-select-div';
                        scoreData = event.target.previousSibling.textContent;
                        Number(scoreData);
                        if (flag === 0){
                                score.innerHTML = 'Get to 300 &mdash; Your Score: ' + scoreData;
                                num2 = scoreData;
                                hitMines();
                                flag++;
                        } else {
                                if (flag === 1) {
                                        total = Number(scoreData) + Number(num2);
                                        num2 = total;
                                        score.innerHTML = 'Get to 300 &mdash; Your Score: ' + total;
                                        hitMines();
                                        checkGameOver(total);
                                } else { return }
                        }
                }
        }, false);
        const revalRedCircles = function() {
                setTimeout(function(){
                        const createRedCirlce = function () {
                                const redDivs = document.querySelectorAll('.circle-red-div');
                                        for (let i = 0; i < redDivs.length; i++) {
                                                redDivs[i].style.display = 'block';
                                        };
                        }
                        const redCircles = document.querySelectorAll('.circle-div');
                        redCircles.forEach(function (redCircle) {
                                if (redCircle.firstChild.textContent === 'x') {
                                        const div = document.createElement('div');
                                        div.setAttribute('class', 'circle-red-div');
                                        redCircle.appendChild(div);
                                        createRedCirlce();
                                } else { return }
                        });
                }, 4000);
        }
        const removeRedCircles = function() {
                setTimeout(function(){
                        const deleteRedCirlce = function () {
                                const redDivs = document.querySelectorAll('.circle-red-div');
                                        for (let i = 0; i < redDivs.length; i++) {
                                                redDivs[i].remove();
                                        };
                        }
                        const redCircles = document.querySelectorAll('.circle-div');
                        redCircles.forEach(function (redCircle) {
                                if (redCircle.firstChild.textContent === 'x') {
                                        deleteRedCirlce();                            
                                } else { return }
                        });
                }, 4800);
        }
        revalRedCircles();
        removeRedCircles();
}

const displayMobileMessage = function (){
        message.style.display = 'flex';
        if (messageFlag === 0) {
                const div = document.createElement('div');
                const h3 = document.createElement('h3');
                const p = document.createElement('p');
                const h3Txt = document.createTextNode("Thank you for playing");
                const paraTxt = document.createTextNode("We appreciate your interest in Mine Maven. Unfortunately, this game not designed for mobile devices. If you have a desktop or tablet device, please check out this game. Thank you.");
                div.setAttribute('class', 'message-wrapper');
                h3.appendChild(h3Txt);
                p.appendChild(paraTxt);
                div.appendChild(h3);
                div.appendChild(p);
                message.appendChild(div);
                messageFlag++;
        }
}

const deleteMobileMessage = function (){
        const deleteMessageDisplay = document.querySelector('.message')
        const messageWrapper = document.querySelector('.message-wrapper');
        if (messageWrapper){
                messageWrapper.remove();
                messageFlag--;
        }
        deleteMessageDisplay.style.display = 'none';
}

document.addEventListener('click', function (event) {
	if (event.target.matches('.intro-btn')) {
                const gameHead = document.querySelector('.game-head');
                const gameWrapper = document.querySelector('.game-wrapper');
                removeIntro();
                gameHead.style.display = 'flex';
                gameWrapper.style.display = 'flex';
                playGame();
        }
        if (event.target.matches('.replay')) {
                location.reload();
        }
        if (event.target.matches('.intro-next-text')) {
                const createParaTextOne = document.createTextNode("To live, you must select mines that are not active, each time you choose a mine, a number is revealed. The numbers you select must equal 300 or more to advance to the next level. But be aware, if you choose an active mine — then you're dead!");
                const createParaTextTwo = document.createTextNode("When each level begins, your strategy should watch for the active red mines and pay attention to the numbers. Remember, the higher the number, the faster you reach 300.");
                const createParaTextThree = document.createTextNode("If you make it past all seven rounds, my master will let you go.");
                const removeParas = document.querySelectorAll('.intro-wrapper p');
                const introBtn = document.querySelector('.intro-wrapper button');
                removeParas.forEach(function (removePara){
                        removePara.remove();
                });
                createIntroParas(createParaTextOne, createParaTextTwo, createParaTextThree);
                introBtn.setAttribute("class", "intro-btn");
                introBtn.innerHTML = 'Good luck!';
        }
        if (event.target.matches('.next-level')) {
                scoreData = 0;
                flag = 0;
                total = 0;
                num2 = 0;
                const removeCongratsDisplay = document.querySelector('.congratulations');
                const removeCircleDivs = document.querySelectorAll('.circle-div');
                const score = document.querySelector('.score');
                score.innerHTML = 'Get to 300 &mdash; Your Score: ' + scoreData;
                removeCongratsDisplay.style.display = 'none';
                removeCircleDivs.forEach(function (removeCircleDiv){
                        removeCircleDiv.remove();
                });
                const removeRoundHead = document.querySelector(".game-head h2:first-child"); 
                const removeScoredHead = document.querySelector(".game-head h2:last-child"); 
                removeRoundHead.remove();
                removeScoredHead.remove();

                const removeImgIcon = document.querySelector('.hazard-icon');
                const removeBtnLevel = document.querySelector('.next-level');
                removeImgIcon.remove();
                removeBtnLevel.remove();

                const gameHead = document.querySelector('.game-head');
                gameHead.style.display = 'flex';
                round++;
                playGame();
        }
}, false);

window.addEventListener("load", function() {
        let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if (viewportWidth < 740) {
                displayMobileMessage();
        } else {
                const createParaTextOne = document.createTextNode("Greetings unlucky explorer!");
                const createParaTextTwo = document.createTextNode("My name is GEN, and I'm a cyborg. I've been sent by my master to deliver you this message.");
                const createParaTextThree = document.createTextNode("Listen up. You don't have much time. My master, the evil Lord Siddus, has captured your ship, and he is keeping you trapped in this cell. Once you begin, the cell gates will open, and you will be a pawn in his sick and twisted game. Your goal is simple: to survive seven rounds without been blasted into a thousand parts.");
                const introAudio = document.querySelector('.intro-audio');
                const introVideo = document.querySelector('.intro-video');
                const createIntroAudio = document.createElement('source');
                const createIntroVideo = document.createElement('source');

                createIntroAudio.src = '../MineMaven/audio/intro.mp3';
                createIntroAudio.setAttribute('type', '../MineMaven/audio/mpeg');
                createIntroVideo.src = '../MineMaven/video/intro.mp4';
                createIntroVideo.setAttribute('type', 'video/mp4');

                createIntroParas(createParaTextOne, createParaTextTwo, createParaTextThree);

                introAudio.appendChild(createIntroAudio);
                introVideo.appendChild(createIntroVideo);
        }
});


window.addEventListener('resize', function() {
        let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        let viewporHeight = window.innerHeight || document.documentElement.clientHeight;
        console.log(viewporHeight);
        if (viewportWidth < 740) { displayMobileMessage(); }
        else { deleteMobileMessage(); }
        if (viewporHeight < 675){
                const body = document.querySelector('body');
                body.style.minHeight = '685px';
                body.style.height = '685px';
        }
});