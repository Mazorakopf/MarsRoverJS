const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

let terrainPattern;
let stepValue = 150;
let playerSpeed = 1;
let angle = 0;
let startBlock = -2;
const blockImageUrl = 'img/block.png';
const marsRoverUrl = 'img/marsRover.png';
const surfaceMarsUrl = 'img/mars.jpg';

const initBlocks = () => {
  const blocksArray = [];
  for (let i = 0; i< 6; i++){
    blocksArray.push({
      pos : [canvas.width/2.8, canvas.height - 150 * i],
      size : [150, 150],
      url : blockImageUrl,
      num : startBlock + i,
    });
  }
  return blocksArray;
};

let blocks = initBlocks();

const init = () => {
    terrainPattern = ctx.createPattern(resources.get('img/mars.jpg'), 'repeat-y');

    render();
    setEventListeners();
}

const reset = () => {
    stepValue = 150;
    playerSpeed = 1;
    angle = 0;
    startBlock = -2;
    blocks = initBlocks();
};

resources.load([
    surfaceMarsUrl,
    marsRoverUrl,
    blockImageUrl
]);
resources.onReady(init);

var drawRover = function (angle) {
  var dx = 298 + 95 / 2;
  var dy = 316 + 106 / 2;

  angleRadian = angle * (Math.PI / 180);
  ctx.save();
  ctx.translate(dx, dy)
  ctx.rotate(angleRadian);
  ctx.translate(-dx, -dy)
  ctx.drawImage(resources.get('img/marsRover.png'), 298, 316);
  ctx.restore();
}

const setEventListeners = () => {
    const speedField = document.getElementById('speed-value');
    const positionField = document.getElementById('position-value');

    const updateSpeedField = () => speedField.innerText = `SPEED: ${playerSpeed}`;
    const updatePositionField = () => positionField.innerText = `POSITION: ${blocks[2].num}`;

    document.getElementById('step-button').addEventListener('click', () => {
      blocks.forEach((item) => {
         item.num += playerSpeed;
       });
       playerSpeed *= 2;
       updateSpeedField();
       updatePositionField();
       render();
    });

    document.getElementById('rotate-button').addEventListener('click', () => {
      angle == 0 ? angle = 180 : angle = 0;
      playerSpeed = playerSpeed > 0 ? -1 : 1;
      updateSpeedField();
      updatePositionField();
      render();
    });

    document.getElementById('reset-button').addEventListener('click', function() {
        reset();
        updateSpeedField();
        updatePositionField();
        render();
    });
}

const render = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = terrainPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.font="50px Georgia";
    for (let i = 0; i < blocks.length; i++){
      if (stepValue > 0){
        ctx.fillText(blocks[i].num, blocks[i].pos[0] + blocks[i].size[0] / 2.4,  blocks[i].pos[1] + blocks[i].size[1] /1.6, 50);
      }
    }

    blocks.forEach((block) => renderEntity(block));
    drawRover(angle);
};

const renderEntity = (entity) => {
    ctx.save();
    ctx.drawImage(resources.get(entity.url),entity.pos[0], entity.pos[1], entity.size[0], entity.size[1]);
    ctx.restore();
}
