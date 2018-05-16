/* 
 * 本ソースコードは以下のURLを参考に作成されました。
 * http://natureofcode.com/book/chapter-2-forces/
 */
onload = function () {// "=" 必須
    setup();
    setInterval(function() {bound(); frict();}, frame);
}; // ;を忘れない

// リテラル
var num = 10; // ボールの数
var mass_max = 5.0;
var mass_min = 0.1;
var st = [0, 0]; // スタート地点
var hMax = 500; // 高さ（canvasによる）
var wMax = 1000; // 幅（同上）
var frame = 100; // [ms/frame]
var target  = [];
var target2 = [];

function Mover(mass, x, y) {
    this.v = [0.0, 0.0];
    this.a = [0.0, 0.0];
    this.m = mass;
    this.r = this.m * 16;
    this.loc = [this.r + x, this.r + y];
}

function applyForce(force, mover) {
    var f = [0.0, 0.0];
    f[0] = force[0] / mover.m;
    f[1] = force[1] / mover.m;
    mover.a[0] += f[0];
    mover.a[1] += f[1];
}

function update(mover) {
    mover.v[0] += mover.a[0];
    mover.v[1] += mover.a[1];
    mover.loc[0] += mover.v[0];
    mover.loc[1] += mover.v[1];
    mover.a[0] = 0.0;
    mover.a[1] = 0.0;
}

function checkEdges(mover){
    if(mover.loc[0] > wMax - mover.r) {
        mover.loc[0] = wMax - mover.r;
        mover.v[0] *= -1;
    } else if(mover.loc[0] < mover.r){
        mover.loc[0] = mover.r;
        mover.v[0] *= -1;
    }
    if(mover.loc[1] > hMax - mover.r) {
        mover.loc[1] = hMax - mover.r;
        mover.v[1] *= -1;
    }
}

function setup(){
    var i;
    var rx, ry;
    rx = 0;
    ry = 0;
    for(i=0;i<num;i++){
        target[i] = new Mover(((mass_max - mass_min) * Math.random() + mass_min), rx, ry);
        target2[i] = new Mover(((mass_max - mass_min) * Math.random() + mass_min), rx, ry); 
    }
}

function display_ball(c, mover) {
    c.beginPath();
    c.arc(mover.loc[0], mover.loc[1], mover.r, 0, Math.PI * 2, false);
    c.strokeStyle = 'rgba(165,213,255,1)';
    c.fillStyle = 'rgba(165,213,255,0.1)';
    c.stroke();
    c.fill();
}

function normalize (vec) {
    var i, norm, len;
    var sqsum = 0;
    len = vec.length;
    for(i=0;i<len;i++){
        sqsum += vec[i] * vec[i]; 
    }
    norm = Math.sqrt(sqsum);
    if(norm > 0){
        for(i=0;i<len;i++){
            vec[i] /= norm;
        }
    }
}

function mult(vec, n){
    var i;
    for(i=0;i<vec.length;i++){
        vec[i] *= n;
    }
}

function veccopy(vec1, vec2){
    var i, len;
    len = vec1.length;
    for(i=0;i<len;i++){
        vec1[i] = vec2[i];
    }    
}

function bound (){
    var i;
    var ctx = document.getElementById('canvas1').getContext('2d');
    ctx.clearRect(0, 0, wMax, hMax);
    for(i=0;i<num;i++){
        var wind = [0.001, 0.0];
        var mass = target[i].m;
        var gravity = [0, 0.1 * mass];
        applyForce (wind, target[i]);
        applyForce (gravity, target[i]);
        update(target[i]);
        checkEdges(target[i]);
        display_ball(ctx, target[i]);
    }
}

function frict (){
    var i;
    var ctx = document.getElementById('canvas2').getContext('2d');
    ctx.clearRect(0, 0, wMax, hMax);
    var wind = [0.001, 0.0];
    var gravity = [0, 0.1];
    var friction = [0, 0];
    for(i=0;i<num;i++){
        var c = 0.01;
        veccopy(friction, target2[i].v);
        mult(friction, -1);
        normalize(friction);
       // console.log(friction);

        mult(friction, c);     
        applyForce (friction, target2[i]);
        applyForce (wind, target2[i]);
        applyForce (gravity, target2[i]);
        update(target2[i]);
        checkEdges(target2[i]);
        display_ball(ctx, target2[i]);
    } 
}