
	var Tetris = {};		
	Tetris.Ctrl = { 		
		direct : { 
        	Down: 40 , 
        	Left: 37,
        	Right: 39,
        	Rotate: 38
   	 		},
		curBlock:1, 
    	nextBlock:0,
    	blockRec:new Object(),		
    	Timer:null,
    	Score:0,
    	touchBottom:false,
    	inGame: false,	
    	firstRound: true,
	}

var buildMap = function(){			
		var x = 0; var y = 0;
		for(i = 1; i <169; i++){
    		var blk = document.createElement("div");
    		blk.id = "blkx"+x+"y"+y;
    		x++;
    		if (x === 12){
    			y++;
    			x = 0;
    		}
    		blk.className = "blkElement";  		
    		Tetris.Ctrl.blockRec["blkx"+x+"y"+y] = 0;		 
    	
    		document.getElementById("playconsole").appendChild(blk);
    		
    	} 
	}

Tetris.FK = { 
	1: {			
		1:{x:4,y:0},
		2:{x:5,y:0},
		3:{x:6,y:0},
		4:{x:7,y:0},
		5:{x:5,y:0}			
	},
	2: {			
		1:{x:4,y:0},
		2:{x:5,y:0},
		3:{x:4,y:1},
		4:{x:5,y:1},
		5:{x:0,y:0}
	},
	3: {			
		1:{x:4,y:1},
		2:{x:5,y:0},
		3:{x:5,y:1},
		4:{x:6,y:1},
		5:{x:5,y:1}
	},
	4: {			
		1:{x:5,y:0},
		2:{x:5,y:1},
		3:{x:5,y:2},
		4:{x:6,y:2},
		5:{x:5,y:1}
	},
	5: { 			
		1:{x:5,y:2},
		2:{x:6,y:2},
		3:{x:6,y:1},
		4:{x:6,y:0},
		5:{x:6,y:1}
	},
	6: {			
		1:{x:4,y:0},
		2:{x:5,y:0},
		3:{x:5,y:1},
		4:{x:6,y:1},
		5:{x:5,y:0}
	},
	7: {			
		1:{x:4,y:1},
		2:{x:5,y:1},
		3:{x:5,y:0},
		4:{x:6,y:0},
		5:{x:5,y:1}
	}
}
function draw(){		
	var block = Tetris.FK[Tetris.Ctrl.curBlock];
	for(i = 1; i < 5; i++){
		var blkId = "blkx"+block[i]["x"]+"y"+block[i]["y"];
		document.getElementById(blkId).style.background = "red";
	}
}
function down()			
{
	if(Tetris.Ctrl.inGame === true)
	{
		drop();
	}
}
function drop(){		
	var block = Tetris.FK[Tetris.Ctrl.curBlock];
	
	for(i = 1; i < 5; i++){
		if (block[i]["y"] >= 13||
		Tetris.Ctrl.blockRec["blkx"+block[i]["x"]+"y"+(block[i]["y"]+1)] === 1 ){
			Tetris.Ctrl.touchBottom = true;
			break;
			}
	}
	if(!Tetris.Ctrl.touchBottom){
		var i=1;

		
		for(i = 1; i < 5; i++){
			var blkId = "blkx"+block[i]["x"]+"y"+block[i]["y"];
			document.getElementById(blkId).style.background = "white";
		}

		
		for(i = 1; i < 5; i++){
			block[i]["y"] = block[i]["y"]+1;
			var blkId = "blkx"+block[i]["x"]+"y"+block[i]["y"];
			document.getElementById(blkId).style.background = "red";
		}
		block[5]["y"] = block[5]["y"]+1;
	}else{

	
		for(i = 1; i < 5; i++){
		var blkId = "blkx"+block[i]["x"]+"y"+block[i]["y"];
		Tetris.Ctrl.blockRec[blkId] = 1;

		
		}
		
		Tetris.ReFK(Tetris.Ctrl.curBlock);
	
		Tetris.Ctrl.curBlock = Math.floor((Math.random()*7)+1);
		clearInterval(myTimer);
		document.removeEventListener("keydown", checkKeyPressed);
		
		chkEnd();
		
		chkDelete();
		}
}
function left(){	
	var block = Tetris.FK[Tetris.Ctrl.curBlock];
	var flag = true;
	for(i = 1; i < 5; i++){
		if (block[i]["x"] <= 0||
		Tetris.Ctrl.blockRec["blkx"+(block[i]["x"]-1)+"y"+block[i]["y"]] === 1){
			flag = false;
			break;
			}
	}
	if(flag){
	for(i = 1; i < 5; i++){
		var blkId = "blkx"+block[i]["x"]+"y"+block[i]["y"];
		document.getElementById(blkId).style.background = "white";
	}
	for(i = 1; i < 5; i++){
		block[i]["x"] = block[i]["x"]-1;
		var blkId = "blkx"+block[i]["x"]+"y"+block[i]["y"];
		document.getElementById(blkId).style.background = "red";
	}
	block[5]["x"] = block[5]["x"]-1;
	}
}
function right(){	
	var block = Tetris.FK[Tetris.Ctrl.curBlock];
	var flag = true;
	for(i = 1; i < 5; i++){
		if (block[i]["x"] >= 11|| Tetris.Ctrl.blockRec["blkx"+(block[i]["x"]+1)+"y"+block[i]["y"]] === 1){
			flag = false;
			break;
			}
	}
	if(flag){
	for(i = 1; i < 5; i++){
		var blkId = "blkx"+block[i]["x"]+"y"+block[i]["y"];
		document.getElementById(blkId).style.background = "white";
	}
	for(i = 1; i < 5; i++){
		block[i]["x"] = block[i]["x"]+1;
		var blkId = "blkx"+block[i]["x"]+"y"+block[i]["y"];
		document.getElementById(blkId).style.background = "red";
	}
	block[5]["x"] = block[5]["x"]+1;
	}
}
function rotate(){			
	var block = Tetris.FK[Tetris.Ctrl.curBlock];
	var R = block[5];
	var flag = 1;
	for(i = 1; i < 5; i++){
		var x = block[i].x;
		var y = block[i].y;
		if((R.x+R.y-y) < 0 || (R.y-R.x+x) < 0)
		{
			flag = 0;
			break;	
		}
			
	}
	if (flag)
	{
		for(i = 1; i < 5; i++){
		var blkId = "blkx"+block[i]['x']+"y"+block[i]['y'];
		document.getElementById(blkId).style.background = "white";
		}
		var rotateCenter = 1;
		for (i = 1; i < 5; i++){
			var x = block[i].x;
			var y = block[i].y;
			if(R.x == x && R.y == y){
				rotateCenter = i;
			}else{
				var rotatedblock = new Object();
				rotatedblock.x = R.x+R.y-y;
				rotatedblock.y = R.y-R.x+x;
				block[i] = {x:rotatedblock.x, y:rotatedblock.y};
			}
		}
	
	}	
	
	for(i = 1; i < 5; i++){

		var blkId = "blkx"+block[i]["x"]+"y"+block[i]["y"];

		document.getElementById(blkId).style.background = "red";

	}
	
}
function checkKeyPressed(e){
	if (Tetris.Ctrl.inGame)
	{
		switch(e.keyCode){
			case Tetris.Ctrl.direct.Down:
        		down();
        		break;
        	case Tetris.Ctrl.direct.Left:
        		left();
        		break;
        	case Tetris.Ctrl.direct.Right:
        		right();
        		break;
        	case Tetris.Ctrl.direct.Rotate:
        		rotate();
		}
		
    	}
	}
function newRun(){			
	Tetris.Ctrl.touchBottom = false;
	draw();
	myTimer = setInterval(function(){down()},1000);
	window.addEventListener("keydown", checkKeyPressed, false);
	
}
function start(){		

	Tetris.Ctrl.inGame = true;
	if (Tetris.Ctrl.firstRound === false)
	{
		location.reload();
	}
	newRun();
}

function chkEnd(){ 			
	var block = Tetris.FK[Tetris.Ctrl.curBlock];
	var flag = true;	
	
	for (var i=1; i<=4; i++){
			var x = block[i].x;
			var y = block[i].y;
			if (Tetris.Ctrl.blockRec['blkx'+x+'y'+y] === 1){
				flag = false;
				break;
			}
		}
	if (flag)
	{
		newRun();
	}else{
		
		document.getElementById('score1').innerHTML = "Se FUDEU KAKAKA <br>" ; 
		Tetris.Ctrl.firstRound = false;
		Tetris.Ctrl.inGame = false;
		document.getElementById('start').innerHTML = 'Restart';
		draw();
		Tetris.Ctrl.inGame = false;
		

	}


}
Tetris.ReFK = function (cur){		
	
	switch (cur)
	{
		case 1: 		
			Tetris.FK[1] = {
								1:{x:4,y:0},
								2:{x:5,y:0},
								3:{x:6,y:0},
								4:{x:7,y:0},
								5:{x:5,y:0} 
							};
			break;
		case 2: 			
			Tetris.FK[2] = {
								1:{x:4,y:0},
								2:{x:5,y:0},
								3:{x:4,y:1},
								4:{x:5,y:1},
								5:{x:0,y:0}
							};
			break;
		case 3: 		
			Tetris.FK[3] = {
								1:{x:4,y:1},
								2:{x:5,y:0},
								3:{x:5,y:1},
								4:{x:6,y:1},
								5:{x:5,y:1}
							} ;
			break;
		case 4: 			
			Tetris.FK[4] = {
								1:{x:5,y:0},
								2:{x:5,y:1},
								3:{x:5,y:2},
								4:{x:6,y:2},
								5:{x:5,y:2}
							};
			break;
		case 5: 		
			Tetris.FK[5] = { 
								1:{x:5,y:2},
								2:{x:6,y:2},
								3:{x:6,y:1},
								4:{x:6,y:0},
								5:{x:6,y:2}
							};
			break;
		case 6: 		
			Tetris.FK[6] = {
								1:{x:4,y:0},
								2:{x:5,y:0},
								3:{x:5,y:1},
								4:{x:6,y:1},
								5:{x:5,y:0}
							} ;
			break;
		case 7: 		
			Tetris.FK[7] = {
								1:{x:4,y:1},
								2:{x:5,y:1},
								3:{x:5,y:0},
								4:{x:6,y:0},
								5:{x:5,y:1}
							};
			break;
	}
}
function chkDelete(){		
	var sum = 0;
	for(h = 13; h >= 0; h--)
	{
		sum = 0;
		for(w = 0; w <12; w++)
		{
			if(Tetris.Ctrl.blockRec['blkx'+w+'y'+h] === 1)
			{
				sum++;
			}
		}
		if (sum === 12)
		{
			del(h);
			h++;
			Tetris.Ctrl.Score = Tetris.Ctrl.Score +10;
			document.getElementById('score1').innerHTML = 'Score:'+Tetris.Ctrl.Score ;
		}
	}
}

function del(n)			
{
	for(y = n; y >= 1; y--)
	{
		for(x = 0; x < 12; x++)
		{
			document.getElementById("blkx"+x+"y"+y).style.background = document.getElementById("blkx"+x+"y"+(y-1)).style.background;

			Tetris.Ctrl.blockRec['blkx'+x+'y'+y] = Tetris.Ctrl.blockRec['blkx'+x+'y'+(y-1)];
			Tetris.Ctrl.blockRec['blkx'+x+'y'+0] = 0;
			
		}
	}
}
function resetMap()				
{
	var x = 0; var y = 0;
		for(i = 1; i <169; i++){
    		x++;
    		if (x === 12){
    			y++;
    			x = 0;
    		}
    		document.getElementById("blkx"+x+"y"+y).style.background = "white";
    		Tetris.Ctrl.blockRec["blkx"+x+"y"+y] = 0;
    		
		}
}
function pause()			
{
	if(Tetris.Ctrl.inGame)
	{
		Tetris.Ctrl.inGame=false;
		document.getElementById('pause').innerHTML = 'Continue';
	}else{
		Tetris.Ctrl.inGame = true;
		document.getElementById('pause').innerHTML = 'Pause';
		down();
	}

}
function help()			
{
	alert("Use right arrow to move right, left arrow to move left,downwards arrow to move down,upwords arrow to rotate.");
}
