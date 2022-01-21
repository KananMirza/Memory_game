let col = [];
let row = [];
let img = [];
let count = 0;
let Memory = [0,0,0];
let Check = [];
let chance = 5;
let point = 0;

onload = function Start(){
    Arr();
}
// for images
function Arr(){
    let k = 1;
    let x = 0;
    for(let i = 0; i< 16; i++){
        col[i] = k++;
        k = k == 9 ? 1 : k; 
     }
     for(let i = 0; i<4;i++){
        row[i] = [];
        img[i] = [];
        Check[i] = [];
         for(let j = 0; j<4;j++){
            x = Math.floor(Math.random() * (col.length - 1));
            row[i][j] = col[x];
            img[i][j] =col[x];
            col.splice(x,1);
        }
    }
}


function CreateTable(){
    let tbl = '';
    let k = 1;
    for(let i = 0; i<4; i++){
        tbl += '<tr>';
        for(let j = 0; j<4;j++){
            tbl += `<td id="${i}_${j}" onclick="Click(${i},${j})"><img src="img/${row[i][j]}.png" /></td>`;
        }
        tbl += '</tr>';
    }
    document.getElementsByTagName('table')[0].innerHTML = tbl;
    document.getElementById('point').innerHTML = `Point: ${point}`;

    if(point == 8){
        document.getElementById('result').innerHTML = "You Win!"
        document.getElementById('btn').style.display = "inline-block";
        
    }
}

function Close(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            row[i][j] = 0; 
        }
    }
    CreateTable();
}


function Click(i,j){
    row[i][j] = img[i][j];

    CreateTable();

    if(Check[i][j] !=1){
        if(Memory[2] == 1){
            if(row[i][j] != row[Memory[0]][Memory[1]]){
                row[i][j] = 0;
                row[Memory[0]][Memory[1]] = 0;
                if(document.getElementById('title').innerHTML === `Luck: ${chance}`){
                    chance--;
                    CheckLuck();
                    if(chance == 0){
                    setTimeout(GameOver,400);
                    }
                }else{
                    chance--;
                   console.log(chance)
                }
            }else{
               Check[i][j] = 1;
               Check[Memory[0]][Memory[1]] = 1;
               point++;
            }
            setTimeout(CreateTable,400);
            Memory[2] = 0;
        }else{
            Memory[0] = i;
            Memory[1] = j;
            Memory[2] = 1;
        }
    }
}

function refresh(){
    location.reload();
}

function LuckMode(){  
    Arr();
    CreateTable();
    setTimeout(Close,1500);
    CheckLuck()
    
    document.getElementById('choose').style.display ="none";
    document.getElementById('puzzle').style.display ="block"
}
function CheckLuck(){
    document.getElementById('title').innerHTML = `Luck: ${chance}`;
}

let time=20;
function TimeMode(){
    document.getElementById('title').innerHTML = `Time: ${time}`
    setInterval(CheckTime,1000)
    Arr();
    CreateTable();
    setTimeout(Close,1500);
    document.getElementById('choose').style.display ="none";
    document.getElementById('puzzle').style.display ="block";
}
function CheckTime(){
    chance = 100;
    document.getElementById('title').innerHTML = `Time: ${time}`
    if(time==0){
        time=0;
        setTimeout(GameOver,400);
      
    }else{
        time--;
    }
    if(point == 8){
        time = 20;
        return;
    }
}

function GameOver(){
    document.getElementById('result').innerHTML = "Game Over!"
    document.getElementById('btn').style.display = "inline-block";
    document.getElementsByTagName('table')[0].style.display='none'
}

