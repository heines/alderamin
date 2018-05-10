onload = function () {// "=" 必須
    setInterval(function() {bound();}, frame);
}; // ;を忘れない

// リテラル
var r = 30; // ボールの半径
var hMax = 200; // 高さ（canvasによる）
var wMax = 1000; // 幅（同上）
var frame = 10; // [ms/frame]
var wind = [0.5 * frame * 0.0001, 0.0];
var gravity = [0, 9.8 * frame * 0.001];

var target = {
    loc: [30.0 + r, 30.0 + r],
    v : [0.0, 0.0],
    a : [0.0, 0.0],
    m : 1.0
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
    if(mover.loc[0] > wMax - r) {
        mover.loc[0] = wMax - r;
        mover.v[0] *= -1;
    } else if(mover.loc[0] < r){
        mover.loc[0] = r;
        mover.v[0] *= -1;
    }
    if(mover.loc[1] > hMax - r) {
        mover.loc[1] = hMax - r;
        mover.v[1] *= -1;
    }
}

function display_ball(mover) {
    var ctx = document.getElementById('canvas1').getContext('2d');
    ctx.clearRect(0, 0, wMax, hMax);
    ctx.beginPath();
    ctx.arc(mover.loc[0], mover.loc[1], r, 0, Math.PI * 2, false);
    ctx.fillStyle = 'rgba(165,213,255,0.5)';
    ctx.fill();
}

function bound (){
    applyForce (wind, target);
    applyForce (gravity, target);
    update(target);
    checkEdges(target);
    display_ball(target);
}

// 床に落ちているボール
function ball() {
    var ctx = document.getElementById('canvas1').getContext('2d');
    ctx.beginPath();
    ctx.arc(r, hMax-r, r, 0, Math.PI * 2.0, false);
    ctx.fillStyle = 'rgba(165,213,255,0.5)';
    ctx.fill();
}

