(() => {
    let player1livesCount = 5;
    let player2livesCount = 5;
    let player1ScoreCount = 0;
    let player2ScoreCount = 0;
    let flag = true; // to pridict chances
    let health1 = 100;
    let health2 = 100;

    let player1ShootButton = document.querySelector('.player1shoot');
    let player2ShootButton = document.querySelector('.player2shoot');
    let showWinner = document.querySelector('.winner h3');
    let resetMatch = document.querySelector('.gameDecision .resetMatch');
    let realTimeHealth1 = document.querySelector('.player1>h4');
    let realTimeHealth2 = document.querySelector('.player2>h4');
    let player1Score = document.querySelector('.player1score>h3');
    let player2Score = document.querySelector('.player2score>h3');
    let realTimeLives1 = document.querySelector('.player1 h5');
    let realTimeLives2 = document.querySelector('.player2 h5');
    let resetGame = document.querySelector('.gameDecision .resetGame');
    let startGame = document.querySelector('.startGame');
    let overAllWinner = document.querySelector(".winner h2");


    startGame.addEventListener("click", () => {
        // resetGame.click();
        startGamefn();
    })

    function checkMainScore(){
        if(player1ScoreCount >= 3){
            disableAtStart();
            overAllWinner.innerText = "GAME OVER FINAL WINNER PLAYER 1"
            setTimeout(()=>{
                overAllWinner.innerText = ""
                showWinner.innerText = ""
                resetGame.click();
            },3000)
        } else if (player2ScoreCount >= 3){
            disableAtStart();
            showWinner.innerText = ""
            overAllWinner.innerText = "GAME OVER FINAL WINNER PLAYER 2"
            setTimeout(()=>{
                overAllWinner.innerText = ""
                resetGame.click();
            },3000)
        }
    }

    resetGame.addEventListener("click", () => {
        resetMatch.click();
        player1livesCount = 5;
        player2livesCount = 5;
        player1ScoreCount = 0;
        player2ScoreCount = 0;
        flag = true;
        health1 = 100;
        health2 = 100;
        upadteScore();
        updateLives();
        updateHealth();
        startGamefn();
    })

    
    function startGamefn() {
        realTimeHealth1.style.borderBottom = "0.7px dashed white"
        realTimeHealth2.style.borderBottom = ""
        player1ShootButton.addEventListener("click", player1Turn);
    }

    function disableAtStart(){
        player1ShootButton.setAttribute('disable', 'true');
        player2ShootButton.setAttribute('disable', 'true');
    }

    function whoseTurn() {
        if (flag) {
            realTimeHealth1.style.borderBottom = "0.7px dashed white"
            realTimeHealth2.style.borderBottom = ""
        } else {
            realTimeHealth2.style.borderBottom = "0.7px dashed white"
            realTimeHealth1.style.borderBottom = ""
        }
    }

    function updateHealth() {
        realTimeHealth1.innerHTML = `Player 1 -> health : ${health1 <= 0 ? 0 : health1}`;
        realTimeHealth2.innerHTML = `Player 2 -> health : ${health2 <= 0 ? 0 : health2}`;
        if(health1 < 1){
            realTimeHealth1.innerHTML =`Player 1 -> health : ${0}`;
            checkMainScore();
            upadteScore();
            return;
        } else if(health2 < 1){
            realTimeHealth1.innerHTML =`Player 2 -> health : ${0}`;
            checkMainScore();
            upadteScore();
            return;
        }
    }

    function updateLives() {
        realTimeLives1.innerText = `Lives -> ${player1livesCount}`;
        realTimeLives2.innerText = `Lives -> ${player2livesCount}`;
    }

    function upadteScore() {
        checkMainScore();
        player1Score.innerText = ` Player 1: ${player1ScoreCount}`;
        player2Score.innerText = ` Player 2: ${player2ScoreCount}`;
    }

    resetMatch.addEventListener("click", () => {
        showWinner.innerText = 'Current Game Winner :'

        flag = true;
        health1 = 100;
        health2 = 100;


        upadteScore();
        updateHealth();
        updateLives();
    })

    function player1Turn(){
    if (!flag) {
            player2ShootButton.removeAttribute('disable');
            player1ShootButton.setAttribute('disable', 'true');

        } else {
            health2 -= getRandomNumber();
            updateHealth();
            console.log(health2);
            if (health2 < 1 && player2ScoreCount >= 0) {
                showWinnerName();
                player1ShootButton.setAttribute("disabled", "true");
                player2ShootButton.setAttribute("disabled", "true");

                setTimeout(() => {
                    player1ShootButton.removeAttribute("disabled", "false");
                    player2ShootButton.removeAttribute("disabled", "false");
                    player2livesCount--;
                    if (player2livesCount < 1) {
                        player1ScoreCount += 1;
                        console.log("Score" + player1ScoreCount);
                        player2livesCount = 5;
                        upadteScore();
                        checkMainScore();
                        updateLives();
                        resetMatch.click();
                        return;
                    }
                    updateLives();
                    resetMatch.click();
                }, 1500);
            }
            flag = false;
            whoseTurn();
        }
    }

    player2ShootButton.addEventListener("click", () => {
        if (flag) {
            player1ShootButton.removeAttribute('disable');
            player2ShootButton.setAttribute('disable', 'true');
        } else {
            health1 -= getRandomNumber();
            updateHealth();
            console.log(health1);
            if (health1 < 1 && player1ScoreCount >= 0) {
                showWinnerName();
                player2ShootButton.setAttribute("disabled", "true");
                player1ShootButton.setAttribute("disabled", "true");

                setTimeout(() => {
                    player2ShootButton.removeAttribute("disabled", "false");
                    player1ShootButton.removeAttribute("disabled", "false");
                    player1livesCount--;
                    if (player1livesCount < 1) {
                        player2ScoreCount += 1;
                        console.log("Score" + player2ScoreCount);
                        player1livesCount = 5;
                        upadteScore();
                        checkMainScore();
                        updateLives();
                        resetMatch.click();
                        return;
                    }
                    updateLives();
                    resetMatch.click();
                }, 1500);
            }
            flag = true;
            whoseTurn();
        }
    })

    function showWinnerName() {
        if (player1livesCount < 1 || player2livesCount < 1) {
            showWinner.innerText = "Current Game Winner : " + `${player1livesCount > player2livesCount ? "Player 1" : "Player 2"}`;
        }
        showWinner.innerText = "Current Game Winner : " + `${health1 > health2 ? "Player 1" : "Player 2"}`;
    }

    function getRandomNumber() {
        let num = Math.floor(Math.random() * 5);
        return num > 0 ? num : getRandomNumber();
    }

    updateHealth();
    updateLives();
    upadteScore();
    disableAtStart();
})();