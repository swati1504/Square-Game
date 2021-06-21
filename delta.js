var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var x = 0;
var y = 0;
var wid = 50;
var hei = 50;

var objx = 100;
var objy = 300;
var scrollposition = 0;

var upplatform = [];
var botplatform = [];

var mainloopstart;

var msggame = document.getElementById('gamelost');
var btnstart = document.getElementById('restart');
var shwmsg = document.getElementById('showmsg');

shwmsg.innerHTML="Welcome Player... Good Luck!!!";

var gamestart = true;
var yourscore = 0;

if (localStorage.highestscore) {
    localStorage.highestscore = localStorage.highestscore;
} else {
    localStorage.highestscore = 0;
}

for (i = 0; i < 27; i++) {
    upplatform.push(1);
    botplatform.push(1);
}

function upplat(type) {
    if(x < 1255){
        if (type === 0) {
            ctx.beginPath();
            ctx.rect(x, 50, 50, 150);
            ctx.fillStyle = "grey";
            ctx.fill();
            x = x + 50;
        }
        if (type >= 1) {
            ctx.beginPath();
            ctx.rect(x, 50, 50, 150);
            ctx.fillStyle = "black";
            ctx.fill();
            x = x + 50;
        }
    }
}

function botplat(type) {
    if (x < 1255) {
        if (type === 0) {
            ctx.beginPath();
            ctx.rect(x, 350, 50, 200);
            ctx.fillStyle = "grey";
            ctx.fill();
            x = x + 50;
        }
        if (type >= 1) {
            ctx.beginPath();
            ctx.rect(x, 350, 50, 200);
            ctx.fillStyle = "black";
            ctx.fill();
            x = x + 50;
        }
    }
}

botplatform.forEach(botplat);
x = 0;
upplatform.forEach(upplat);


function mainloop() {
    if(scrollposition < - 50){
        botplatform.shift();
        upplatform.shift();

        var upperplt = parseInt(Math.random() * 15);
        var botplt = parseInt(Math.random() * 15);
        if (upperplt === 0) {
            botplt = 1
        }

        botplatform.push(botplt);
        upplatform.push(upperplt);
        scrollposition = 0;
        x = scrollposition;
    }else{
        scrollposition = scrollposition-1;
        x = scrollposition;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    upplatform.forEach(upplat);
    x = scrollposition;
    botplatform.forEach(botplat);
    x = scrollposition;

    drawsq(objx, objy, 50, 50);

    if (objy > 200) {
        p = ctx.getImageData(objx , objy + 55, 1, 1).data;
    }else if(objy < 350){
        p = ctx.getImageData(objx, objy - 55, 1, 1).data;
    }
    
    if (p[0] === 128) {
        gamestart = false;
    }

    yourscore++;
    
    ctx.font = "25px Arial";
    ctx.fillStyle = '#ffff';
    ctx.fillText("Your Score :" + yourscore, 10, 30);
    ctx.fillStyle = '#66ffff';
    ctx.fillText("Highest Score : " + localStorage.highestscore, 950, 30);
    if (!gamestart) {
        lostgame();
    }
}

function lostgame() {
    clearInterval(mainloopstart);
    if (yourscore > localStorage.highestscore) {
        localStorage.highestscore = yourscore;
    }
    shwmsg.innerHTML="You Lost !!!!";
    msggame.style.display = "inline";
}


function drawsq(x, y, wid, hei) {
    ctx.fillStyle = '#728fce';
    ctx.fillRect(x, y, wid, hei);
}

window.onkeydown = function (event) {
    var keyPr = event.keyCode;

    if (keyPr === 32 && objy > 200) {
        objy = 200;
    }

    else if (keyPr === 32 && objy < 350) {
        objy = 300;
    }

};

btnstart.addEventListener('click', () => { 

    upplatform = [];
    botplatform = [];
    for (i = 0; i < 27; i++) {
        upplatform.push(1);
        botplatform.push(1);
    }
    gamestart = true;
    yourscore = 0;
    clearInterval(mainloopstart);
    mainloopstart = setInterval(mainloop, 3);
    msggame.style.display = "none";
    
    }
);
function switchobj() {
    if (objy > 200) {
        objy = 200;
    }

    else if (objy < 350) {
        objy = 300;
    }
}

canvas.addEventListener("click", switchobj, false);
