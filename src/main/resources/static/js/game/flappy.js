const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//========================PLAYER==============================
class Player {
  constructor(x, y, radius, gravity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gravity = gravity;
    this.velocity = 0;
    this.rotation = 0;

    // immagine del player
    this.image = new Image();
    this.image.src = "img/bird.png";
    this.scale = 2;
  }

  draw() {
    if (!this.image.complete) return;

    const width = this.image.width * this.scale;
    const height = this.image.height * this.scale;
    // c.drawImage(
    // this.image,
    // this.x - width / 2,
    // this.y - height / 2,
    // width,
    // height
    // );
    c.save();

    // spostiamo il centro nel player
    c.translate(this.x, this.y);

    // ruotiamo
    c.rotate(this.rotation);

    // disegniamo centrato
    c.drawImage(
      this.image,
      -width / 2,
      -height / 2,
      width,
      height
    );
    c.restore();
  }

  update() {
    this.velocity += this.gravity;
    if (this.velocity > 10) this.velocity = 10;
    this.y += this.velocity;

    // rotazione in base alla velocità
    this.rotation = this.velocity * 0.1;

    // limitiamo la rotazione
    if (this.rotation < -Math.PI / 2) this.rotation = -Math.PI / 2;
    if (this.rotation > Math.PI / 2) this.rotation = Math.PI / 2;

    this.draw();
  }

  jump() {
    this.velocity = -9;
    // riavvia il suono se sta già suonando
    jumpSound.currentTime = 0;
    jumpSound.play();
  }
}

//========================TUBI==============================
class Tubo {
  constructor() {
    this.x = innerWidth;
    this.width = 75;
    this.height = innerHeight; // altezza come il rettangolo
    this.velocity = 5;

    // distanza tra i due tubi
    this.spazio = 145;

    // posizione random dei tubi
    const floorHeight = floor.height / 2;
    const playableHeight = canvas.height - floorHeight;

    const margin = 100;

    const min = -playableHeight + margin;
    const max = -this.spazio - margin;

    this.y = Math.random() * (max - min) + min;

    // immagine del tubo (di base inferiore)
    this.image = new Image();
    this.image.src = "img/pipe-green.png";
  }

  draw() {
    if (!this.image.complete) return;

    // --- tubo inferiore ---
    c.drawImage(this.image, this.x, this.y + this.height + this.spazio, this.width, this.height);
    

    // --- tubo superiore capovolto ---
    c.save();
    // traslo il contesto al centro del rettangolo superiore
    c.translate(this.x + this.width / 2, this.y + this.height / 2);
    c.scale(1, -1); // capovolge verticalmente
    c.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    c.restore();
  }

  update() {
    this.x -= this.velocity;
    this.draw();
  }
}
function drawStartScreen() {
  c.fillStyle = "white";

  // Titolo
  c.font = "60px 'Press Start 2P'";
  const titleText = "FLAPPY BIRD";
  const titleWidth = c.measureText(titleText).width;

  applyGlow("#00ffff", 25);
  c.fillText(titleText, (canvas.width - titleWidth) / 2, canvas.height / 3);
  resetGlow();

  c.font = "30px 'Press Start 2P'";
  const instructionText = "Press W to Jump";
  const instructionWidth = c.measureText(instructionText).width;

  applyGlow("#fff", 15);
  c.fillText(instructionText, (canvas.width - instructionWidth) / 2, canvas.height / 2);
  resetGlow();
}

function drawGameOverScreen() {
  c.fillStyle = "red";
  c.font = "60px 'Press Start 2P'";
  const titleText = "GAME OVER";
   const titleWidth = c.measureText(titleText).width;
 
  applyGlow("#f00", 25);
  c.fillText(titleText, (canvas.width - titleWidth) / 2, canvas.height / 3);
  resetGlow();

  c.fillStyle = "white";
  c.font = "30px 'Press Start 2P'";
  const instructionText = "Press W to Restart";
  const instructionWidth = c.measureText(instructionText).width;
  
  applyGlow("#fff", 15)
  c.fillText(instructionText, (canvas.width - instructionWidth) / 2, canvas.height / 2);
  resetGlow();
}

let spawnInterval;

function startGame() {
  spawnInterval = setInterval(() => {
    tubi.push(new Tubo());
  }, 2000);
}

function resetGame() {
  clearInterval(spawnInterval);
  tubi = [];
  punteggio = 0;
  player.y = canvas.height / 2;
  player.velocity = 0;

  startGame();
}
function applyGlow(color, blur) {
  c.shadowColor = color;
  c.shadowBlur = blur;
}

function resetGlow() {
  c.shadowBlur = 0;
}
//=====================INIZIALIZZO==============================
let gameState = "start";
// "start" | "playing" | "gameover"

let backgroundLoaded = false;
const background = new Image();
background.src = "img/background.png";
background.onload = () => {
  backgroundLoaded = true;
};
let floorLoaded = false;
const floor = new Image();
floor.src = "img/base.png";
floor.onload = () => {
  floorLoaded = true;
};
let player = new Player(Math.round(canvas.width / 5), canvas.height / 2, 20, 0.5);
player.draw();

const jumpSound = new Audio("audio/wing.wav");
jumpSound.volume = 0.5; // opzionale

let tubi = [];
const hitSound = new Audio("audio/hit.wav");
jumpSound.volume = 0.5; // opzionale

let punteggio = 0;
const pointSound = new Audio("audio/point.wav");
jumpSound.volume = 0.5; // opzionale

// input per salto
addEventListener('keypress', e => {
  if (e.key === 'w') {

    if (gameState === "start") {
      gameState = "playing";
      startGame();
    }

    else if (gameState === "playing") {
      player.jump();
    }

    else if (gameState === "gameover") {
      resetGame();
      gameState = "playing";
    }
  }
});

//======================CICLO PRINCIPALE===========================
let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);

  // sfondo
  if (backgroundLoaded) {
    c.drawImage(background, 0, 0, canvas.width / 2, canvas.height);
    c.drawImage(background, canvas.width / 2, 0, canvas.width / 2, canvas.height);
  }

  // schermata iniziale
  if (gameState === "start") {
    drawStartScreen();
  }

  // =========================
  // AGGIORNA SOLO SE PLAYING
  // =========================
  if (gameState === "playing") {
    // aggiorna player
    player.update();

    // rimuove tubi fuori schermo
    if (tubi.length > 0 && tubi[0].x <= -75)
      tubi.splice(0, 1);

    // aggiorna tubi
    tubi.forEach(tubo => tubo.update());

    // collisioni tubi
    tubi.forEach(tubo => {
      if (player.x + player.radius >= tubo.x &&
        player.x - player.radius <= tubo.x + tubo.width) {

        if (
          (player.y - player.radius <= tubo.y + tubo.height &&
            player.y + player.radius >= tubo.y) ||

          (player.y - player.radius <= tubo.y + tubo.height + tubo.spazio + tubo.height &&
            player.y + player.radius >= tubo.y + tubo.height + tubo.spazio)
        ) {
          hitSound.currentTime = 0;
          hitSound.play();
          clearInterval(spawnInterval);
          gameState = "gameover";
        }
      }
    });

    // collisione limite schermo
    if (player.y - player.radius <= 0 ||
      player.y + player.radius >= canvas.height - floor.height / 2) {

      hitSound.currentTime = 0;
      hitSound.play();
      clearInterval(spawnInterval);
      gameState = "gameover";
    }

    // punteggio
    tubi.forEach(tubo => {
      if (player.x >= tubo.x + tubo.width - 2 &&
        player.x <= tubo.x + tubo.width + 2) {
        punteggio += 1;
        pointSound.currentTime = 0;
        pointSound.play();
      }
    });
  }
  if (gameState === "playing" || gameState === "gameover") {
    // punteggio
    c.font = "50px 'Press Start 2P'";
    c.fillStyle = "#fff";
    c.shadowColor = "#ffff00";   // giallo arcade
    c.shadowBlur = 20;
    let punteggioWidth = c.measureText(punteggio).width;
    c.fillText(punteggio, (canvas.width - punteggioWidth) / 2, canvas.height / 6);
    c.shadowBlur = 0;
  }

  // =========================
  // DISEGNO SEMPRE (anche in gameover)
  // =========================
  if (gameState !== "playing") {
    tubi.forEach(tubo => tubo.draw());
    player.draw();
  }

  // floor (sempre davanti ai tubi)
  if (floorLoaded) {
    c.drawImage(floor, 0, canvas.height - (floor.height / 2), canvas.width / 2, floor.height);
    c.drawImage(floor, canvas.width / 2, canvas.height - (floor.height / 2), canvas.width / 2, floor.height);
  }

  // game over overlay sopra tutto
  if (gameState === "gameover") {
    drawGameOverScreen();
  }
}


//============================AVVIO==============================
console.log(innerHeight);
animate();