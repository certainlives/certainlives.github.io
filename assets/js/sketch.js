var canvas;

const __framerate = 30;
const __clearrate = 1;

var snow;
var grounds = [];
var particle_img;

const __targetWidth = 1920;
const __targetHeight = 1080;


const __numParticles = 1000;
var __particleImage;
const __minParticleSpeed = 10, 
      __maxParticleSpeed = 128,
      __minParticleSize = 2,
      __maxParticleSize = 4,
      __minParticleOscillate = 0,
      __maxParticleOscillate = 5,
      __minParticleLifetime = 2,
      __maxParticleLifetime = 10;


const __minGroundWidth = 128,
      __maxGroundWidth = 720,
      __groundHeight = 16;


var frames = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight*3);
        canvas.elt.id = "p5_overlay";

    frameRate(__framerate);

    snow = new Snow();

    /*for(let i = 0; i < 10; i++)
        grounds.push(new Ground(false));
    grounds.push(new Ground(true));*/

    var url = document.getElementById("particles").getAttribute('src');
    particle_img = loadImage(url);
}

function draw(){
    if(++frames > __clearrate){
        clear();
        frames = 0;
    }

    for(let i = 0; i < grounds.length; i++)
        grounds[i].update();

   // ground.update(); // Update ground before snow so they land on ground
    snow.update(deltaTime / 1000.0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight*3);
}



function Snow(){
    this.particles = [];

    for(let i = 0; i < __numParticles; i++)
        this.particles.push(new Particle());
}

Snow.prototype.update = function(dt){
    let particle;
    for(let i = 0; i < this.particles.length; i++){
        particle = this.particles[i];
        particle.update(dt);
    }
}

function Particle(){
    this.lifetime = (Math.random() * (__maxParticleLifetime - __minParticleLifetime)) + __minParticleLifetime; 
    this.position = createVector(0, 0);
    
    this.init();
}

Particle.prototype.init = function(){  
    this.life = this.lifetime;
    this.position.set(Math.floor(Math.random() * windowWidth), Math.floor(Math.random() * windowHeight));

    this.oscillation = (Math.random() * (__maxParticleOscillate - __minParticleOscillate)) + __minParticleOscillate;
    this.velocity = (Math.random() * (__maxParticleSpeed - __minParticleSpeed)) + __minParticleSpeed;
    this.size = ((Math.random() * (__maxParticleSize - __minParticleSize)) + __minParticleSize) * (windowWidth * 1.0 / __targetWidth);

    this.sleep = 0;

    this.landed = false;
    this.ground = null;
    this.landOffset = createVector(0, 0);
}

Particle.prototype.update = function(dt){
    var landed = this.landed;

    let accel = 1.0;
    if(!landed) {
        this.position.add(this.oscillation * Math.sin(this.life * 3), this.velocity * dt);

        for(let i = 0; i < grounds.length; i++){
            let gr = grounds[i];

            if(gr.contains(this.position, this.size)) {
                this.ground = gr;

                this.land();
                break;
            }
        }

        accel = 1.0;
    }
    else {
        var offset = this.landOffset;
        this.position.set(this.ground.position.x + offset.x, this.ground.position.y + offset.y);

        accel = 1.33;
    }

    this.life -= (dt * accel);
    if(this.life < 0){
        this.life = 0;
        this.init();
    }

    if(++this.sleep > 3)
        this.draw();
}

Particle.prototype.draw = function(){
    let alpha = Math.abs(Math.abs(.5 - Math.max(0.0, this.life / this.lifetime))*2.0 - 1.0); 

    if(alpha > 1)   
        alpha = 1;
    if(alpha < 0)
        alpha = 0;

    let s = Math.min(this.size, this.size * alpha);
    let so = 0;
    if(this.landed)
        so = (s - this.size)/2.0;

    image(particle_img, this.position.x - so, this.position.y - so, s, s);
}

Particle.prototype.land = function(){
    this.landOffset.set((this.position.x - this.ground.position.x), (this.position.y - this.ground.position.y));
    this.landSize = this.size;

    this.landed = true;
}

function Ground(isFloor){
     this.width = ((Math.random() * (__maxGroundWidth - __minGroundWidth)) + __minGroundWidth) * (windowWidth * 1.0 / __targetWidth);
     this.height = __groundHeight;

     this.position = createVector(Math.floor(Math.random() * windowWidth), Math.floor(Math.random() * windowHeight));
     
     this.floor = isFloor;
     if(isFloor)
        this.height = 1;
}

Ground.prototype.update = function(){
    //this.position.set(Math.floor(Math.random() * windowWidth), Math.floor(Math.random() * windowHeight));
    //this.draw();

    if(this.floor){
        var w = this.width = windowWidth;

        this.position.x = (w / 2.0);
        this.position.y = windowHeight;
    }
}

Ground.prototype.draw = function(){
    var w = this.width;
    var h = this.height;

    rect(this.position.x - w/2.0, this.position.y - h/2.0, w, h);
}

Ground.prototype.contains = function(position, size){
    var x = this.position.x;
    var y = this.position.y;
    var w = this.width;
    var h = this.height;

    var dx = abs(x - position.x);
    var dy = (y - h/2.0) - (position.y + size);

    if(dx < w/2.0){
        if(dy < 0 && dy > -size/2.0)
            return true;
    }

    return false;
}



$(document).ready(function () {
   
    console.log("Sketch is ready on DOM load...")

});