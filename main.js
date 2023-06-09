const game = document.getElementById("game");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
const ball = {
    elem: document.getElementById("ball"),
    w: 30,
    h: 30,
    color: 'red',
    x: 500,
    y: 500,
    dx: -5,
    dy: 5,
    show() {
        this.elem.style.width = this.w + 'px'
        this.elem.style.height = this.h + 'px'
        this.elem.style.backgroundColor = this.color
        this.elem.style.borderRadius = '50%'
        this.elem.style.left = this.x + 'px'
        this.elem.style.top = this.y + 'px'
    },
    move() {
        if (this.y < 0 || this.y >= 570) {
            this.dy *= -1;
        }

        if ((this.x < 10 && this.y >= playerBar.y - 15 && this.y <= playerBar.y + 135) ||
            (this.x > 760 && this.y >= computerBar.y - 15 && this.y <= computerBar.y + 135)) {
            this.dx *= -1;
        } else if (this.x < 0) {
            computerScore.innerHTML = `Computer: ${computerBar.score+=10}`;
            this.dx *= -1;
        } else if (this.x > 760) {
            playerScore.innerHTML = `Player: ${playerBar.score+=10}`;
            this.dx *= -1;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.show();
    }
};

const playerBar = {
    elem: document.getElementById("playerBar"),
    w: 10,
    h: 150,
    color: 'cyan',
    x: 0,
    y: 200,
    dx: 0,
    dy: 10,
    score: 0,
    show() {
        this.elem.style.width = this.w + 'px'
        this.elem.style.height = this.h + 'px'
        this.elem.style.backgroundColor = this.color
        this.elem.style.left = this.x + 'px'
        this.elem.style.top = this.y + 'px'
    },
    move(e) {
        if (e.keyCode == 38 && this.y > 0) this.y -= 10;
        if (e.keyCode == 40 && this.y < 450) this.y += 10;
        this.show();
    }
};

const computerBar = {
    elem: document.getElementById("computerBar"),
    w: 10,
    h: 150,
    color: '#F6AF65',
    x: 790,
    y: 0,
    dx: 0,
    dy: 10,
    score: 0,
    show() {
        this.elem.style.width = this.w + 'px'
        this.elem.style.height = this.h + 'px'
        this.elem.style.backgroundColor = this.color
        this.elem.style.left = this.x + 'px'
        this.elem.style.top = this.y + 'px'
    },
    move() {
        if (this.y < 0 || this.y > 450) this.dy *= -1;
        this.y += this.dy;
        this.show();
    }
};

function checkScore() {
    if (playerBar.score === 10) {
        gameOver("You Win:)","green","black");
    }
    else if (computerBar.score === 10) {
        gameOver("Computer Win:))","red","white");
    }
}

function updateScores() {
    playerScore.innerHTML = `Player: ${playerBar.score}`;
    computerScore.innerHTML = `Computer: ${computerBar.score}`;
}

let timer = setInterval(() => {
    ball.move();
    computerBar.move();
    checkScore();
    updateScores();
}, 40);

document.onkeydown = (e) => playerBar.move(e);
playerBar.show();
computerBar.show();

function gameOver(message,backgroundColor,messagecolor) {
    clearInterval(timer);
    const winMessage = document.createElement("div");
    winMessage.textContent = message;
    game.style.backgroundColor = backgroundColor;
    winMessage.style.color = messagecolor;
    winMessage.style.fontSize = "24px";
    winMessage.style.position = "absolute";
    winMessage.style.left = "50%";
    winMessage.style.top = "50%";
    winMessage.style.transform = "translate(-50%, -50%)";
    game.appendChild(winMessage);

    const line = document.getElementById("line");
    const circle = document.getElementById("circle");
    game.removeChild(line);
    game.removeChild(circle);
    playerBar.elem.remove();
    computerBar.elem.remove();
    ball.elem.remove();
}