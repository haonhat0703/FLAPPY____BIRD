var canvas= document.getElementById('gamezone');
var context= canvas.getContext('2d');
var scoreshow=document.getElementById('score');
var ac = document.getElementById("active");
var ok = true;
var maxscore=document.getElementById("maxscore");
var news = document.getElementsByClassName("new");

var birdimg= new Image();
var hinhnenchinh=new Image();
var ongtren= new Image();
var ongduoi=new Image();
birdimg.src="./image/bird.png";
hinhnenchinh.src="./image/nenchinh.png";
ongtren.src="./image/ongtren.png";
ongduoi.src="./image/ongduoi.png";

var score=0;
var max_score = 0;
var khoangcachhaiong=140;
var bird={
    x: 900/5,
    y: 500/2
}
var ong=[]; 
ong[0]={
    x:canvas.width,
    y:0 
}

function run(){
    // load hình ảnh vào
    context.drawImage(hinhnenchinh,0,0);
    context.drawImage(birdimg,bird.x,bird.y);

    for(var i=0;i<ong.length;i++){
        khoangcachdenongduoi=ongtren.height+khoangcachhaiong;
        context.drawImage(ongtren,ong[i].x,ong[i].y);
        // vẽ ống trên theo tọa độ của ống đó
        //  ống dưới phụ thuộc ống trên
        let hiu = Math.floor(Math.random()*10);
        context.drawImage(ongduoi,ong[i].x,ong[i].y+khoangcachdenongduoi);
        // mình lấy vị trí ống trên cộng khoảng cách đến
        // ống dưới vì tí nữa mình random nó lên xuống
        ong[i].x-=5;  //để ống di chuyển

        // lập trình thêm ống khi ống di chuyển đến giữa
        // nó sẽ tạo thêm 1 ống nữa
        if(ong[i].x ==canvas.width/2){
            ong.push({
                x:canvas.width,
                y:Math.floor(Math.random()*ongtren.height)-ongtren.height
            })
        }
        if(ong[i].x ==-6 )ong.splice(0,1);
        // nếu ống đụng lề trái thì xóa nó đi để tránh mảng ống
        //  bị đầy làm chậm       
        if(ong[i].x==bird.x)score++;  
        // giờ làm cái khó nhất là thua  
        if(bird.y+birdimg.height>=canvas.height||
        bird.x+birdimg.width>= ong[i].x && bird.x <= ong[i].x +ongtren.width
        && (bird.y<=ong[i].y+ongtren.height||
        bird.y +birdimg.height>= ong[i].y+ khoangcachdenongduoi)    
        ){
            ok = false;
            if (score > max_score){
                max_score = score;
                maxscore.innerHTML="Max Score: "+max_score;
            }
            news[0].classList.remove("hid");
            score = 0;
            return;
        }                   
    }
    
    scoreshow.innerHTML="Score: "+score;
    // cho bird rơi xuống
    bird.y+=3;
    requestAnimationFrame(run);
}
//thêm function cho nó bay lên khi nhấn
document.addEventListener("keydown",function(){
    bird.y-=60;   
})
document.addEventListener('mousedown', function(){
    bird.y-=60;
})
run();

news[0].addEventListener('click', function(){
    news[0].classList.add("hid");
    var bird={
        x: 900/5,
        y: 500/2
    }
    ong.length = 0; 
    ong[0]={
        x:canvas.width,
        y:0 
    }
    run();
})