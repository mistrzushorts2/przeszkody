// === KONFIGURACJA GRY ===
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// === POZIOMY ===
const LEVEL_CONFIG = [
  { speed: 5.1, density: 0.051, jump: 16.5, moveSpeed: 8, scoreToNext: 10, scaleMin: 0.8, scaleMax: 1.2, colors: ["#ff5555","#ffaa00"] },
  { speed: 7.1, density: 0.061, jump: 17.4, moveSpeed: 9, scoreToNext: 26, scaleMin: 0.7, scaleMax: 1.4, colors: ["#ff8800","#d1aa0eff"] },
  { speed: 9.2, density: 0.071, jump: 18.3, moveSpeed: 10, scoreToNext: 47, scaleMin: 0.6, scaleMax: 1.5, colors: ["#1dcfb1ff","#18a5d8ff"] },
  { speed: 11.1, density: 0.081, jump: 19.4, moveSpeed: 11, scoreToNext: 73, scaleMin: 0.5, scaleMax: 1.6, colors: ["#ff00cc","#ba1ce1ff"] },
  { speed: 13.05, density: 0.091, jump: 20.5, moveSpeed: 12, scoreToNext: 102, scaleMin: 0.4, scaleMax: 1.7, colors: ["#00ff88","#1ac1b9ff"] },
  { speed: 14.95, density: 0.109, jump: 21.2, moveSpeed: 13, scoreToNext: 138, scaleMin: 0.37, scaleMax: 1.75, colors: ["#491ddcff","#ab1750ff"] },
  { speed: 16.93, density: 0.129, jump: 20.9, moveSpeed: 12, scoreToNext: 187, scaleMin: 0.34, scaleMax: 1.78, colors: ["#ff4400ff","#45e725ff"] },
  { speed: 18.91, density: 0.149, jump: 20, moveSpeed: 14, scoreToNext: 242, scaleMin: 0.31, scaleMax: 1.82, colors: ["#00ccff","#0d2dafff"] },
  { speed: 20.88, density: 0.168, jump: 19, moveSpeed: 12, scoreToNext: 314, scaleMin: 0.28, scaleMax: 1.85, colors: ["#dbdb1eff","#84122bff"] },
  { speed: 22.85, density: 0.188, jump: 18, moveSpeed: 14, scoreToNext: 393, scaleMin: 0.25, scaleMax: 1.90, colors: ["#3726d1ff","#167027ff"] },
  { speed: 24.83, density: 0.207, jump: 17, moveSpeed: 13, scoreToNext: 471, scaleMin: 0.23, scaleMax: 1.93, colors: ["#9a29d2ff","#79087cff"] },
  { speed: 26.81, density: 0.227, jump: 16, moveSpeed: 13, scoreToNext: 565, scaleMin: 0.21, scaleMax: 1.96, colors: ["#a8e12bff","#eec41dff","#d41d57e6"] },
  { speed: 28.79, density: 0.246, jump: 15, moveSpeed: 14, scoreToNext: 670, scaleMin: 0.205, scaleMax: 1.975, colors: ["#3118d6ff","#1886e0ff"] },
  { speed: 30.77, density: 0.265, jump: 14, moveSpeed: 15, scoreToNext: 789, scaleMin: 0.20, scaleMax: 1.99, colors: ["#c3d630ff","#1cd277ff"] },
  { speed: 32.75, density: 0.275, jump: 13.5, moveSpeed: 15.5, scoreToNext: 922, scaleMin: 0.19, scaleMax: 2.01, colors: ["#eb6c12ff","#e918a7ff"] },
  { speed: 34.71, density: 0.296, jump: 13, moveSpeed: 16, scoreToNext: 1089, scaleMin: 0.18, scaleMax: 2.05, colors: ["#0de466ff","#15b6dfff"] },
  { speed: 36.67, density: 0.310, jump: 13.2, moveSpeed: 16.2, scoreToNext: 1296, scaleMin: 0.17, scaleMax: 2.09, colors: ["#7dd10fff","#1482c6ff"] },
  { speed: 38.63, density: 0.322, jump: 13.4, moveSpeed: 16.4, scoreToNext: 1540, scaleMin: 0.16, scaleMax: 2.13, colors: ["#cd334dff","#a62465ff"] },
  { speed: 40.58, density: 0.334, jump: 13.6, moveSpeed: 16.6, scoreToNext: 1810, scaleMin: 0.15, scaleMax: 2.17, colors: ["#a0de24ff","#1ba074ff","#3366d5e6"] },
  { speed: 43.1, density: 0.351, jump: 13.8, moveSpeed: 16.9, scoreToNext: 2128, scaleMin: 0.143, scaleMax: 2.21, colors: ["#eb6c12ff","#e918a7ff","#92b70ce6"] },
  { speed: 45.4, density: 0.368, jump: 13.9, moveSpeed: 17.4, scoreToNext: 2502, scaleMin: 0.1367, scaleMax: 2.25, colors: ["#0de466ff","#15b6dfff","#4eace6e6"] }, 
  { speed: 47.9, density: 0.388, jump: 14.0, moveSpeed: 17.9, scoreToNext: 2937, scaleMin: 0.1298, scaleMax: 2.29, colors: ["#7dd10fff","#1482c6ff","#36d633e6"] },
  { speed: 50.7, density: 0.411, jump: 14.1, moveSpeed: 18.7, scoreToNext: 3456, scaleMin: 0.1245, scaleMax: 2.33, colors: ["#cd334dff","#a62465ff","#d74cbde6"] },
  { speed: 53.6, density: 0.436, jump: 14.2, moveSpeed: 19.6, scoreToNext: 4078, scaleMin: 0.1198, scaleMax: 2.37, colors: ["#a0de24ff","#1ba074ff","#3366d5e6"] },
  { speed: 56.8, density: 0.463, jump: 13.0, moveSpeed: 19.2, scoreToNext: 4771, scaleMin: 0.113, scaleMax: 2.42, colors: ["#1f139fff","#87431eff","#e64f84e6"] },
  { speed: 60.1, density: 0.498, jump: 12.6, moveSpeed: 19.4, scoreToNext: 5582, scaleMin: 0.107, scaleMax: 2.47, colors: ["#6c4a05ff","#72a0acff","#135a2ce6"] },
  { speed: 64.2, density: 0.528, jump: 12.2, moveSpeed: 19.9, scoreToNext: 6531, scaleMin: 0.098, scaleMax: 2.53, colors: ["#f4780bff","#031622ff","#2e7bf8e6"] },
  { speed: 68.7, density: 0.561, jump: 12.1, moveSpeed: 19.7, scoreToNext: 7641, scaleMin: 0.095, scaleMax: 2.59, colors: ["#762936ff","#470727ff","#15441ce6"] },
  { speed: 73.6, density: 0.606, jump: 12.2, moveSpeed: 20.6, scoreToNext: 8940, scaleMin: 0.092, scaleMax: 2.65, colors: ["#53770dff","#18e29fff","#819ddbe6"] }
];

// === ELEMENTY UI ===
const ui = document.getElementById("ui");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const startBtn = document.getElementById("startBtn");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const finalLevel = document.getElementById("finalLevel");
const nicknameInput = document.getElementById("nicknameInput");
const nicknameField = document.getElementById("nickname");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const restartBtn = document.getElementById("restartBtn");
const controls = document.getElementById("controls");
const rankingBody = document.getElementById("rankingBody");
const globalRankingBody = document.getElementById("globalRankingBody");
const progressFill = document.getElementById("progressFill");
const resetRankingBtn = document.getElementById("resetRankingBtn");
const resetPass = document.getElementById("resetPass");

let player, obstacles, score, level, running, keys, ranking;
let scoreSaved = false;
let gameStartTime = Date.now();

// === AUDIO ===
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type){
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const set = { jump:[400,0.15], level:[200,0.3], lose:[80,0.6], point:[600,0.1] };
  const [freq,dur]=set[type];
  osc.frequency.value=freq+Math.random()*30-15;
  osc.type="sine";
  gain.gain.setValueAtTime(0.2,audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime+dur);
}

// === INICJALIZACJA GRY ===
function initGame(){
  player={x:canvas.width/2-25,y:canvas.height-120,width:50,height:50,color:"#339cffff",dy:0,jumping:false};
  obstacles=[];
  score=0;
  level=1;
  running=true;
  keys={left:false,right:false,up:false};
  ui.style.display="block";
  controls.style.display="flex";
  gameOverScreen.style.display="none";
  nicknameInput.style.display="none";
  progressFill.style.width="0%";
  scoreSaved=false;
  gameStartTime = Date.now();
}

// === START MENU EFFECTS ===
function startMenuEffects() {
  const snowCount = 45;
  for(let i = 0; i < snowCount; i++) {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.style.left = `${Math.random() * 100}vw`;
    snow.style.animationDuration = `${3 + Math.random() * 4}s`;
    snow.style.width = `${10 + Math.random() * 15}px`;
    snow.style.height = snow.style.width;
    document.body.appendChild(snow);
  }
}

const particleCount = 100;
const container = document.createElement('div');
container.id = 'particles';
document.body.appendChild(container);
const colors = ['#ff0000', '#00ff00', '#ffffff'];
for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.top = Math.random() * 80 + 'vh';
  p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  p.style.animationDuration = (3 + Math.random() * 5) + 's';
  p.style.opacity = Math.random() * 0.7 + 0.3;
  container.appendChild(p);
}

// usuwanie efektów po starcie gry
startBtn.addEventListener('click', () => {
  document.getElementById('menuBackground').style.display = 'none';
  document.querySelectorAll('.snowflake').forEach(s => s.remove());
});

// wywołanie przy starcie
startMenuEffects();

// === STEROWANIE ===
document.addEventListener("keydown", e=>{
  if(["ArrowLeft","a","A"].includes(e.key)) keys.left=true;
  if(["ArrowRight","d","D"].includes(e.key)) keys.right=true;
  if(["ArrowUp","w","W"].includes(e.key)) keys.up=true;
});
document.addEventListener("keyup", e=>{
  if(["ArrowLeft","a","A"].includes(e.key)) keys.left=false;
  if(["ArrowRight","d","D"].includes(e.key)) keys.right=false;
  if(["ArrowUp","w","W"].includes(e.key)) keys.up=false;
});
["left","right","up"].forEach(id=>{
  const btn=document.getElementById(id);
  btn.addEventListener("mousedown",()=>keys[id]=true);
  btn.addEventListener("mouseup",()=>keys[id]=false);
  btn.addEventListener("touchstart",()=>keys[id]=true);
  btn.addEventListener("touchend",()=>keys[id]=false);
});

// === SKOK ===
function jump(conf){
  if(!player.jumping){
    player.dy=-conf.jump;
    player.jumping=true;
    playSound("jump");
  }
}

// === PRZESZKODY ===
function spawnObstacle(){
  const conf=LEVEL_CONFIG[Math.min(level-1,LEVEL_CONFIG.length-1)];
  const scale=conf.scaleMin+Math.random()*(conf.scaleMax-conf.scaleMin);
  const baseWidth=40+Math.random()*40;
  const baseHeight=20+Math.random()*30;
  const width=baseWidth*scale;
  const height=baseHeight*scale;
  const speed=conf.speed*(0.8+Math.random()*0.4);
  const color=conf.colors[Math.floor(Math.random()*conf.colors.length)];
  obstacles.push({x:Math.random()*(canvas.width-width),y:-height,width,height,color,speed,counted:false});
}

// === ANIMACJA "+1" ===
function showFloatingText(text,x,y){
  let alpha=1;
  const step=()=>{
    ctx.font="20px Arial";
    ctx.fillStyle=`rgba(255,255,255,${alpha})`;
    ctx.fillText(text,x,y);
    y-=1;
    alpha-=0.02;
    if(alpha>0) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// === FLASH SCREEN ===
function flashScreen(color){
  const overlay=document.createElement("div");
  overlay.style.position="absolute";
  overlay.style.top="0";
  overlay.style.left="0";
  overlay.style.width="100%";
  overlay.style.height="100%";
  overlay.style.backgroundColor=color;
  overlay.style.opacity="0.5";
  overlay.style.transition="opacity 0.5s ease-out";
  document.body.appendChild(overlay);
  setTimeout(()=>overlay.style.opacity="0",100);
  setTimeout(()=>overlay.remove(),600);
}

// === ZMIANA POZIOMU ===
function nextLevel(){
  if(level >= LEVEL_CONFIG.length) return;
  level++;
  playSound("level");
  flashScreen("#00ff88");
}
// === MECHANIKA SERC ===
let heartsCount = 3;
let heartCooldown = false; // nowy cooldown

function drawHearts() {
  const heartSize = 40;
  const spacing = 10;
  const totalWidth = heartsCount * heartSize + (heartsCount - 1) * spacing;
  let startX = canvas.width/2 - totalWidth/2;
  let y = 20;
  for(let i = 0; i < heartsCount; i++){
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.moveTo(startX + i*(heartSize+spacing) + heartSize/2, y + heartSize/4);
    ctx.bezierCurveTo(
      startX + i*(heartSize+spacing), y,
      startX + i*(heartSize+spacing), y + heartSize/2,
      startX + i*(heartSize+spacing) + heartSize/2, y + heartSize
    );
    ctx.bezierCurveTo(
      startX + i*(heartSize+spacing) + heartSize, y + heartSize/2,
      startX + i*(heartSize+spacing) + heartSize, y,
      startX + i*(heartSize+spacing) + heartSize/2, y + heartSize/4
    );
    ctx.fill();
  }
}

// === GŁÓWNA PĘTLA GRY ===
function gameLoop(){
  if(!running){ requestAnimationFrame(gameLoop); return; }
  const conf=LEVEL_CONFIG[Math.min(level-1,LEVEL_CONFIG.length-1)];
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Rysowanie gracza
  ctx.fillStyle=player.color;
  ctx.fillRect(player.x,player.y,player.width,player.height);

  // Sterowanie
  if(keys.left) player.x-=conf.moveSpeed;
  if(keys.right) player.x+=conf.moveSpeed;
  if(keys.up) jump(conf);

  // Grawitacja
  player.y+=player.dy;
  player.dy+=0.9;
  if(player.y+player.height>=canvas.height-50){
    player.y=canvas.height-50-player.height;
    player.dy=0;
    player.jumping=false;
  }
  player.x=Math.max(0,Math.min(player.x,canvas.width-player.width));

  // Generowanie przeszkód
  if(Math.random()<conf.density) spawnObstacle();

  for(let i=obstacles.length-1;i>=0;i--){
    const o=obstacles[i];
    o.y+=o.speed;
    ctx.fillStyle=o.color;
    ctx.fillRect(o.x,o.y,o.width,o.height);

    // Kolizja z cooldownem
    if(player.x<o.x+o.width && player.x+player.width>o.x &&
       player.y<o.y+o.height && player.y+player.height>o.y){
      if(!heartCooldown){
        playSound("lose");
        heartsCount--;
        heartCooldown = true;
        setTimeout(()=>heartCooldown=false, 900); // 0.9s cooldown
        if(heartsCount <= 0){
          return endGame();
        }
      }
    }

    // Punktacja
    if(o.y>canvas.height && !o.counted){
      score++;
      o.counted=true;
      playSound("point");
      showFloatingText("+1",player.x+20,player.y-10);
    }

    // Usuwanie
    if(o.y>canvas.height+100) obstacles.splice(i,1);
  }

  drawHearts();

  // Pasek postępu
  progressFill.style.width=Math.min(100,(score/conf.scoreToNext)*100)+"%";

  // Zmiana poziomu
  if(score>=conf.scoreToNext) nextLevel();

  scoreDisplay.textContent=score;
  levelDisplay.textContent=level;

  requestAnimationFrame(gameLoop);
}

// === KONIEC GRY ===
function endGame(){
  running=false;
  ui.style.display="none";
  controls.style.display="none";
  gameOverScreen.style.display="flex";
  finalScore.textContent=score;
  finalLevel.textContent=level;
  flashScreen("#ef0505ff");

  ranking = JSON.parse(localStorage.getItem("ranking")||"[]");
  const isTop = (ranking.length < 10 || score > ranking[ranking.length-1].score);
  nicknameInput.style.display = isTop ? "flex" : "none";

  updateLocalRanking();
  loadGlobalRanking();

  // Przycisk powrotu do menu
  let menuBtn = document.getElementById("backToMenu");
  if(!menuBtn){
    menuBtn = document.createElement("button");
    menuBtn.id = "backToMenu";
    menuBtn.textContent = "♿️Powrót do menu♿️";
    menuBtn.style.marginTop = "10px";
    menuBtn.onclick = backToMenu;
    gameOverScreen.appendChild(menuBtn);
  }
}

// === POWRÓT DO MENU ===
function backToMenu(){
  running = false;
  player = null;
  obstacles = [];
  keys = {left:false,right:false,up:false};
  score = 0;
  level = 1;
  heartsCount = 3;
  progressFill.style.width = "0%";

  ui.style.display = "none";
  controls.style.display = "none";
  gameOverScreen.style.display = "none";
  nicknameInput.style.display = "none";

  document.getElementById("menu").style.display = "block";

  const menuBtn = document.getElementById("backToMenu");
  if(menuBtn) menuBtn.remove();
}

// === RANKINGI ===
function updateLocalRanking(){
  ranking.sort((a,b)=>b.score-a.score);
  ranking = ranking.slice(0,10);
  localStorage.setItem("ranking",JSON.stringify(ranking));
  rankingBody.innerHTML = ranking.map((r,i)=>{
    let color="";
    if(i===0) color="style='color:gold;font-weight:bold'";
    else if(i===1) color="style='color:silver;font-weight:bold'";
    else if(i===2) color="style='color:#cd7f32;font-weight:bold'";
    else color="style='color:#cfcfcf'";
    return `<tr ${color}><td>${i+1}. ${r.name}</td><td>${r.score}</td><td>${r.level}</td></tr>`;
  }).join("");
}

function loadGlobalRanking(){
  fetch("global.json")
    .then(res=>res.json())
    .then(data=>{
      data.sort((a,b)=>b.score-a.score);
      const top10=data.slice(0,10);
      globalRankingBody.innerHTML = top10.map(r=>`<tr><td>${r.nick}</td><td>${r.score}</td><td>${r.level}</td><td>${Math.round(r.time/1000)}s</td><td>${r.date}</td></tr>`).join("");
    })
    .catch(err=>console.error("Błąd ładowania global.json",err));
}

// === ZAPIS WYNIKU ===
saveScoreBtn.onclick = () => {
  if(scoreSaved) return;
  const nick = nicknameField.value.trim() || "Gracz";
  const deviceId = localStorage.getItem("deviceId") || Math.random().toString(36).substr(2,9);
  localStorage.setItem('deviceId', deviceId);

  ranking.push({name:nick, score, level});
  updateLocalRanking();
  scoreSaved = true;

  const payload = { nick, score, level, time: Date.now()-gameStartTime, date: new Date().toISOString(), deviceId };
  fetch("save.php", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)})
    .then(res=>res.json())
    .then(data=>{ if(data.success) loadGlobalRanking(); })
    .catch(err=>console.error("Błąd zapisu globalnego",err));

  nicknameInput.style.display = "none";
};

// === RESTART ===
restartBtn.onclick=()=>{
  gameOverScreen.style.display="none";
  heartsCount = 3;
  initGame();
  gameLoop();
};

// === START ===
startBtn.onclick=()=>{
  document.getElementById("menu").style.display="none";
  heartsCount = 3;
  initGame();
  gameLoop();
  updateLocalRanking();
  loadGlobalRanking();
};

// === RESET RANKINGU ===
resetRankingBtn.onclick = () => {
  if(resetPass.value === "mistrz"){
    localStorage.removeItem("ranking");
    ranking=[];
    updateLocalRanking();
    alert("Ranking zresetowany!");
  } else alert("Niepoprawne hasło!");
};

// === STARTOWA AKTUALIZACJA ===
ranking = JSON.parse(localStorage.getItem("ranking")||"[]");
updateLocalRanking();
loadGlobalRanking();