class Enemy {
  constructor(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.run = Math.floor(Math.random() * 80 + Math.random() * 60 + 40);
  }
  //faz o inimiho andar e verifica se inimigo atingio o jogador
  update(dt) {
    if (this.x <= 550) {
      this.x += this.run * dt;
    }
    else {
      this.x = -2;
    }
    if (player.x >= this.x - 50 &&
      player.x <= this.x + 50 &&
      player.y >= this.y - 50 &&
      player.y <= this.y + 50) {
      player.reset('Voce Morreu');
      score = 0;
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

class Player {
  //mostra o jogador na posição inicial
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //reinicia e mostra status
  reset(status) {
    this.x = 200;
    this.y = 400;
    const div = document.createElement('div');
    div.id = 'dialog';
    div.innerHTML = `<p> ${status} </p>`;
    document.body.appendChild(div);
    setTimeout(function () {
      document.body.removeChild(div);
    }, 2000);
  }
  //mapeia as posições e movimentos permitidos
  update() {
    if (this.ctlKey === 'left' && this.x > 0) {
      this.x = this.x - 15;
    }
    else if (this.ctlKey === 'right' && this.x < 400) {
      this.x = this.x + 15;
    }
    else if (this.ctlKey === 'up') {
      this.y = this.y - 15;
    }
    else if (this.ctlKey === 'down' && this.y < 400) {
      this.y = this.y + 15;
    }
    this.ctlKey = null;
    //verifica se jogador ganhou
    if (this.y < 25) {
      this.reset(`Voce ganhou ${score += 1} ponto`);
    }
  }
  handleInput(e) {
    this.ctlKey = e;
  }
};

const player = new Player();
const allEnemies = [];
let score = 0;

(function addEnemies() {
  allEnemies.push(new Enemy(-2, 60));
  allEnemies.push(new Enemy(-2, 100));
  allEnemies.push(new Enemy(-2, 150));
  allEnemies.push(new Enemy(-2, 220));
})();

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
