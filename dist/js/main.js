!function(){var t={},o=[];function n(e){if(t[e])return t[e];var n=new Image;n.onload=function(){t[e]=n,a()&&o.forEach(function(e){e()})},t[e]=!1,n.src=e}function a(){var e=!0;for(var n in t)t.hasOwnProperty(n)&&!t[n]&&(e=!1);return e}window.Resources={load:function(e){e instanceof Array?e.forEach(function(e){n(e)}):n(e)},get:function(e){return t[e]},onReady:function(e){o.push(e)},isReady:a}}();var level=1,popsUp=!1,Enemy=function(e,n,t){this.x=e,this.y=n,this.speed=50+Math.random()*t,this.sprite="images/enemy-bug.png"};Enemy.prototype.update=function(e){popsUp||(this.x+=e*this.speed,505<=this.x&&(this.x=-101))},Enemy.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)};var Player=function(){this.x=200,this.y=400,this.sprite="images/char-boy.png",this.update=function(e,n){popsUp||(this.x+=e,this.y+=n)},this.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)},this.handleInput=function(e){"up"===e&&this.update(0,-87.5),"down"===e&&400!==player.y&&this.update(0,87.5),"left"===e&&0!==player.x&&this.update(-100,0),"right"===e&&400!==player.x&&this.update(100,0)}},bug1=new Enemy(-101,50,100),bug2=new Enemy(-101,137.5,100),bug3=new Enemy(-101,225,100),allEnemies=[bug1,bug2,bug3],player=new Player;document.addEventListener("keyup",function(e){player.handleInput({37:"left",38:"up",39:"right",40:"down"}[e.keyCode])});var levelUp=function(){var e=200,n=225,t=1;return function(){level++,document.querySelector("#lvl-count").innerText=level,allEnemies.push(new Enemy(-101,n,e)),e+=30,3===t?(n=225,t=1):n-=87.5,t++}}(),Engine=function(e){var o,n=e.document,a=e.window,r=n.createElement("canvas"),i=r.getContext("2d");function s(){var e,n,t=Date.now();n=(t-o)/1e3,allEnemies.forEach(function(e){e.update(n)}),e=allEnemies,player.y<=-25&&(levelUp(),player.x=200,player.y=400),e.forEach(function(e){player.y===e.y&&(player.x>=e.x&&player.x<=e.x+75||player.x+75>=e.x&&player.x+75<=e.x+75)&&(popsUp=!0,document.querySelector(".l-score").innerText=level,document.querySelector(".modal").classList.add("modal-show"),document.querySelector("i").addEventListener("click",function(e){popsUp=!(level=1),player.x=200,player.y=400,allEnemies=[],(allEnemies=[bug1,bug2,bug3]).forEach(function(e){e.x=-101}),document.querySelector(".modal").classList.remove("modal-show"),document.querySelector("#lvl-count").innerText=level}))}),function(){var e,n,t=["images/water-block.png","images/stone-block.png","images/stone-block.png","images/stone-block.png","images/grass-block.png","images/grass-block.png"];for(i.clearRect(0,0,r.width,r.height),e=0;e<6;e++)for(n=0;n<5;n++)i.drawImage(Resources.get(t[e]),101*n,83*e);allEnemies.forEach(function(e){e.render()}),player.render()}(),o=t,a.requestAnimationFrame(s)}r.width=505,r.height=606,n.body.appendChild(r),Resources.load(["images/stone-block.png","images/water-block.png","images/grass-block.png","images/enemy-bug.png","images/char-boy.png","images/enemy-bug.png"]),Resources.onReady(function(){o=Date.now(),s()}),e.ctx=i}(void 0);