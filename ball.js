onload = function () {// "=" 必須
    setup();
    setInterval(function() {bound();}, frame);
}; // ;を忘れない

// リテラル
var r_max = 4.9; // ボールの半径
var mass_max = 4.9;
var mass_min = 0.1;
var st = [30, 30]; // スタート地点
var hMax = 200; // 高さ（canvasによる）
var wMax = 1000; // 幅（同上）
var frame = 10; // [ms/frame]
var wind = [0.5 * frame * 0.0001, 0.0]; // 水平、垂直
var gravity = [0, 9.8 * frame * 0.001];
var num = 10; // ボールの数
var target = [];

function Mover() {
    this.v = [0.0, 0.0];
    this.a = [0.0, 0.0];
    this.m = mass_max * Math.random() + mass_min;
    this.r = this.m;
    this.loc = [this.r + st[0]*Math.random(), this.r + st[1] * Math.random()];
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
    for(i=0;i<num;i++){
        target[i] = new Mover();   
    }
}

function display_ball(mover, n) {
    var i;
    var ctx = document.getElementById('canvas1').getContext('2d');
    ctx.clearRect(0, 0, wMax, hMax);
    for(i=0;i<n;i++){
        ctx.beginPath();
        ctx.arc(mover[i].loc[0], mover[i].loc[1], mover[i].r, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(165,213,255,0.5)';
        ctx.fill();
    }
}

function bound (){
    var i;
    for(i=0;i<num;i++){
        applyForce (wind, target[i]);
        applyForce (gravity, target[i]);
        update(target[i]);
        checkEdges(target[i]);
    }
    display_ball(target,num);
}

// 床に落ちているボール
function ball() {
    var ctx = document.getElementById('canvas1').getContext('2d');
    ctx.beginPath();
    ctx.arc(target.r, hMax-target.r, target.r, 0, Math.PI * 2.0, false);
    ctx.fillStyle = 'rgba(165,213,255,0.5)';
    ctx.fill();
}

