//-//Just Another Platformer//-//
//-/This is a simple platformer game engine.
//-/It's quite simple to customize certain aspects of this game to your own liking, merely read the comments for instructions.
//-/Images used were either created by me or from:
//-/http://opengameart.org/content/bevouliin-free-game-background-for-game-developers - used for svg background
//-////-//
window.onload = function(){
    var vpW = window.innerWidth;
    var vpH = window.innerHeight;
    svg = document.getElementById('svg');
    var mapChoiceClass = document.getElementsByClassName('mapChoice');
    var charChoiceClass = document.getElementsByClassName('charChoice');
    svgW = 1250;
    svgH = 670;
    svg.setAttribute('width',svgW);
    svg.setAttribute('height',svgH);
    svg.style.marginLeft = ((vpW - svgW) / 2) + 'px';
    svg.style.marginTop = ((vpH - svgH) / 2) + 'px';
    //-/to changed the starting position of the "cube", simply change the second and third parameters of the gameSet function./-//
    mapChoiceClass[0].addEventListener('click',function(){gameSet(1,100,550);});
    mapChoiceClass[1].addEventListener('click',function(){gameSet(2,50,0);});
    mapChoiceClass[2].addEventListener('click',function(){gameSet(3,50,0);});
    cubePattern = 'solid';
    charChoiceClass[0].addEventListener('click',function(){
        cubePattern = 'solid';
        charChoiceClass[0].className += ' selected';
        charChoiceClass[1].className = 'charChoice char2';
        charChoiceClass[2].className = 'charChoice char3';
    });
    charChoiceClass[1].addEventListener('click',function(){
        cubePattern = 'smiley';
        charChoiceClass[1].className += ' selected';
        charChoiceClass[0].className = 'charChoice char1';
        charChoiceClass[2].className = 'charChoice char3';
    });
    charChoiceClass[2].addEventListener('click',function(){
        cubePattern = 'pinktopus';
        charChoiceClass[2].className += ' selected';
        charChoiceClass[0].className = 'charChoice char1';
        charChoiceClass[1].className = 'charChoice char2';
    });
}
function gameSet(mapNa,x,y){
    document.body.className = 'paused';
    mapSet(mapNa);
    cubeX = x;
    cubeY = y;
    //-/For best experience, its is recommended that the cube size remain 30. Although, if you would like to change the size, choose a multiple of 10. Also, the "characters" or fill patterns will not work for a non-30 size/-//
    cubeSize = 30;
    var cubeRect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    cubeRect.setAttribute('x',cubeX);
    cubeRect.setAttribute('y',cubeY);
    cubeRect.setAttribute('width',cubeSize);
    cubeRect.setAttribute('height',cubeSize);
    cubeRect.setAttribute('class','cube ' + cubePattern);
    svg.appendChild(cubeRect);
    cube = document.getElementsByClassName("cube")[0];
    rightInt = true;
    leftInt = true;
    jump = true;
    land = false;
    fbArray = [];
    window.addEventListener('keydown',
        function(e){
            switch(e.keyCode){
                case 37:
                    if(leftInt){
                        if(!rightInt){
                            clearInterval(moveRight);
                            rightInt = true;
                        }
                        leftInt = false;
                        moveLeft = setInterval(function(){
                            var move = true;
                            for(var i = 0; i < map.length; i++){
                                if(map[i][0] == 'ob' && cubeX - map[i][1] == 40 && cubeY - map[i][2] < 40 && -cubeSize < cubeY - map[i][2]){
                                    fin(map[i]);
                                }
                                if(cubeX - map[i][1] == 50 && cubeY - map[i][2] < 50 && -cubeSize < cubeY - map[i][2] && map[i][0] != 'g' && map[i][0] != 'gap' && map[i][0] != 'ob'){
                                    move = false;
                                    if(map[i][0] == 'spike'){
                                        fin(map[i]);   
                                    }
                                    else if(map[i][0] == 'fin'){
                                        fin(map[i]);   
                                    }
                                }
                                else if(map[i][0] == 'sf' && cubeY - map[i][1] < 50 && cubeY - map[i][1] > 0){
                                    move = false;   
                                }
                                else if(map[i][0] == 'sw' && cubeX - map[i][1] == 50){
                                    move = false;
                                }
                                /*Incase of error, change the cubeY - map[i][2] > 0 <-- to -1*/
                                if(map[i][0] == 'gap' && cubeY - map[i][2] > 0 && cubeY - map[i][2] < (50 - cubeSize + 1) && cubeX - map[i][1] < 51 && cubeX - map[i][1] > 0){
                                    move = true;
                                }
                            }
                            if(move){
                                cubeX -= 10;
                                cube.setAttribute('x',cubeX);
                                if(cubeX <= -cubeSize){
                                    cubeX = svgW - cubeSize;
                                    cube.setAttribute('x',cubeX);
                                }
                            }
                        },25);
                    }
                    break;
                case 38:
                    if(jump){
                        jumpStart = cubeY;
                        jump = false;
                        jumpInt = setInterval(function(){
                            var move = true;
                            for(var i = 0; i < map.length; i++){
                                if(map[i][0] == 'ob' && cubeY - map[i][2] == 40 && cubeX - map[i][1] < 40 && -cubeSize < cubeX - map[i][1]){
                                fin(map[i]);
                                }
                                if(cubeY - map[i][2] == 50 && cubeX - map[i][1] < 50 && -cubeSize < cubeX - map[i][1] && map[i][0] != 'g' && map[i][0] != 'gap' && map[i][0] !== 'ob'){
                                    if(map[i][0] == 'spike'){
                                        fin(map[i]);   
                                    }
                                    else if(map[i][0] == 'fin'){
                                        fin(map[i]);   
                                    }
                                    move = false;
                                }
                                else if(map[i][0] == 'sf' && cubeY - map[i][1] == 50){
                                    move = false;
                                }
                                else if(map[i][0] == 'sw' && cubeX - map[i][1] < 50 && cubeX - map[i][1] > 0){
                                    move = false;   
                                }
                                if(map[i][0] == 'gap' && cubeY - map[i][2] == 50 && cubeX - map[i][1] > -1 && cubeX - map[i][1] < 51 - cubeSize + 1){
                                    move = true;
                                }
                            }
                            if(move){
                                cubeY -= 10;
                                cube.setAttribute('y',cubeY);
                            }
                            else{
                                clearInterval(jumpInt);   
                            }
                            if(jumpStart - cubeY == 140){
                                clearInterval(jumpInt);
                            }
                        },2);
                    }
                    break;
                case 39:
                    if(rightInt){
                       if(!leftInt){
                            clearInterval(moveLeft);
                            leftInt = true;
                        }
                        rightInt = false;
                        moveRight = setInterval(function(){
                            var move = true;
                            for(var i = 0; i < map.length; i++){
                                if(map[i][0] == 'ob' && cubeX - map[i][1] == -cubeSize && cubeY - map[i][2] < 40 && -cubeSize < cubeY - map[i][2]){
                                    fin(map[i]);
                                }
                                if(cubeX - map[i][1] == -cubeSize && cubeY - map[i][2] < 50 && -cubeSize < cubeY - map[i][2] && map[i][0] != 'g' && map[i][0] != 'gap' && map[i][0] !== 'ob'){
                                    move = false;
                                    if(map[i][0] == 'spike'){
                                        fin(map[i]);   
                                    }
                                    else if(map[i][0] == 'fin'){
                                        fin(map[i]);   
                                    }
                                }
                                else if(map[i][0] == 'sf' && cubeY - map[i][1] < 50 && cubeY - map[i][1] > 0){
                                    move = false;   
                                }
                                else if(map[i][0] == 'sw' && cubeX - map[i][1] == -cubeSize){
                                    move = false;
                                }
                                if(map[i][0] == 'gap' && cubeY - map[i][2] > -1 && cubeY - map[i][2] < (50 - cubeSize) && cubeX - map[i][1] < (50 - cubeSize) && cubeX - map[i][1] > -(cubeSize + 1)){
                                    move = true;
                                }
                            }
                            if(move){
                                cubeX += 10;
                                cube.setAttribute('x',cubeX);
                                if(cubeX >= svgW + cubeSize){
                                    cubeX = -cubeSize;
                                    cube.setAttribute('x',cubeX);
                                }
                            }
                        },25);
                    }
                    break;
                default:;
            }
        }
    );
    window.addEventListener('keyup',
        function(e){
            switch(e.keyCode){
                case 37:
                    if(!leftInt){
                        clearInterval(moveLeft);
                        leftInt = true;
                    }
                    break;
                case 39:
                    if(!rightInt){
                        clearInterval(moveRight);
                        rightInt = true;
                    }
                    break;
                default:;
            }
        }
    );
    gravityInt = setInterval(gravity,10);
    /*setInterval(function(){
        var text = document.getElementById('text');
        text.innerHTML = "X: " + cubeX + " Y: " + cubeY ;
    },10);*/
}
function mapSet(mapNa){
    switch(mapNa){
        case 1:
            map = [['sw',-50],['sw',1250],['g',1030,590,'#aab'],['g',1050,590,'#aab'],['g',1070,590,'#aab'],['fin',1050,540],['ss',0,540,'#222'],['g',50,470,'#960'],['g',50,520,'#960'],['g',50,570,'#960'],['g',100,470,'#960'],['g',100,520,'#960'],['g',100,570,'#960'],['g',150,470,'#960'],['g',150,520,'#960'],['g',150,570,'#960'],['g',200,470,'#960'],['g',200,520,'#960'],['g',200,570,'#960'],['ss',0,580,'#640'],['ss',0,520,'#640'],['ss',0,480,'#222'],['ss',0,470,'#640'],['g',250,540,'#222'],['g',250,580,'#640'],['g',250,520,'#640'],['g',250,480,'#222'],['g',250,470,'#640'],['ss',250,440,'#750'],['ss',200,440,'#750'],['ss',150,440,'#750'],['ss',100,440,'#750'],['ss',50,440,'#750'],['ss',0,440,'#750'],['ss',250,440,'#750'],['ss',220,410,'#750'],['ss',170,410,'#750'],['ss',120,410,'#750'],['ss',70,410,'#750'],['ss',30,410,'#750'],['s',0,650],['s',50,650],['s',100,650],['s',150,650],['s',200,650],['s',250,650],['s',300,650],['s',350,650],['s',400,650],['s',550,650],['s',600,650],['s',650,650],['s',700,650],['s',750,650],['s',800,650],['s',850,650],['s',900,650],['s',950,650],['s',1000,650],['s',1050,650],['s',1100,650],['s',1150,650],['s',1200,650],['s',0,600],['s',50,600],['s',100,600],['s',150,600],['s',200,600],['s',250,600],['s',300,600],['s',350,600],['s',400,600],['s',550,600],['s',600,600],['s',650,600],['s',700,600],['s',750,600],['s',800,600],['s',850,600],['s',900,600],['s',950,600],['s',1000,600],['s',1050,600],['s',1100,600],['s',1150,600],['s',1200,600],['spike',450,650],['spike',500,650],['ob',650,560,,'up',120],['s',800,550],['s',850,550],['s',850,500],['s',900,550],['s',900,500],['s',900,450],['fb',950,450,'#a80'],['s',1000,450],['s',1050,450],['s',1100,450],['s',1150,450],['s',1200,450]];
            break;
        case 2:
            map = [['sw',-50],['sw',1250],['ss',0,0,'transparent'],['ss',0,50,'transparent'],['ss',50,0,'transparent'],['ss',100,0,'transparent'],['ss',100,50,'transparent'],['ss',100,100,'transparent'],['ss',100,100,'transparent'],['ss',100,150,'transparent'],['ss',50,150,'transparent'],['fb',0,150,'rgba(0,0,0,.1)'],['s',0,600],['s',50,600],['s',100,600],['s',150,600],['s',200,600],['s',250,600],['s',300,600],['s',350,600],['s',400,600],['s',450,600],['s',500,600],['s',550,600],['s',600,600],['s',650,600],['s',700,600],['s',750,600],['s',800,600],['s',900,600],['s',1000,600],['s',1050,600],['s',1100,600],['s',1150,600],['s',1200,600],['s',0,650],['s',50,650],['s',100,650],['s',150,650],['s',200,650],['s',250,650],['s',300,650],['s',350,650],['s',400,650],['s',450,650],['s',500,650],['s',550,650],['s',600,650],['s',650,650],['s',700,650],['s',750,650],['s',800,650],['s',900,650],['s',1000,650],['s',1050,650],['s',1100,650],['s',1150,650],['s',1200,650],['s',250,480],['s',300,480],['ob',100,560,,'right',200],['ob',440,560,,'left',200],['spike',560,550],['spike',595,550],['spike',630,550],['s',510,550],['s',510,500],['s',510,450],['s',500,420],['s',450,420],['s',500,400],['s',520,400],['s',670,400],['s',680,400],['s',680,450],['s',680,500],['s',680,550],['s',500,600],['s',680,600],['s',500,650],['s',680,650],['ob',930,360,,'left',200],['fb',730,400,'#850'],['s',780,400],['s',800,400],['s',800,450],['s',850,450],['s',900,450],['s',800,600],['s',800,650],['s',900,600],['s',900,650],['s',1000,650],['s',1000,600],['s',950,450],['s',1000,450],['s',1050,450],['sw',1200,'#850'],['s',1070,450],['g',1050,400,'#8b5900'],['g',1050,350,'#8b5900'],['s',1050,300],['s',1170,550],['s',1170,350],['s',900,250],['s',800,230],['s',760,230],['s',710,210],['fb',600,200,'#aa7900'],['g',450,190,'#aab'],['g',430,190,'#aab'],['g',470,190,'#aab'],['fin',450,140],['s',530,200],['s',500,200],['s',450,200],['s',400,200],['s',350,200],['s',360,220],['s',410,220],['s',460,220],['s',510,220],['s',450,240],['s',410,220]];
            break;
        case 3:
            map = [['sw',1250],['sw',-50],['g',100,640,'#aab'],['g',120,640,'#aab'],['g',140,640,'#aab'],['fin',120,590],['sf',-50],['sf',700],['sf',650,'#850'],['s',0,0],['s',0,50],['s',50,50],['s',100,50],['s',150,50],['fb',200,50,'#b90'],['s',250,0],['s',250,50],['s',250,100],['s',250,150],['s',250,200],['s',200,200],['s',150,200],['s',150,150],['s',100,150],['s',50,150],['fb',0,150,'#b90'],['s',50,200],['s',100,200],['s',0,350],['ob',100,360,,'up',110],['ob',180,250,,'down',110],['ob',260,360,,'up',110],['ob',360,380],['ob',410,250],['s',0,400],['s',50,400],['s',100,400],['s',150,400],['s',200,400],['s',250,400],['s',300,400],['s',350,400],['s',400,400],['s',450,400],['s',500,400],['s',550,400],['s',600,400],['s',300,200],['s',350,200],['s',400,200],['s',450,200],['s',500,200],['s',550,200],['s',600,200],['s',450,200],['ob',590,320],['ob',550,320],['s',600,450],['spike',650,450],['spike',700,450],['s',750,450],['s',750,400],['s',600,500],['s',650,500],['s',700,500],['s',750,500],['s',800,500],['s',800,450],['s',800,400],['s',800,350],['g',800,300,'rgba(136,85,0,.9)'],['s',800,250],['s',800,200],['s',750,200],['s',700,200],['s',650,200],['s',850,500],['s',900,500],['s',950,500],['s',1000,500],['s',1000,450],['s',1000,400],['s',1000,350],['s',1000,300],['s',1000,250],['s',1000,200],['s',850,350],['s',850,400],['s',850,450],['spike',900,450],['spike',950,450],['s',950,250],['s',1000,150],['s',1000,100],['s',1000,50],['ob',750,160,,'up',70],['ob',650,160,,'up',70],['ob',550,160,,'up',70],['s',950,50],['s',900,50],['s',850,50],['s',800,50],['s',750,50],['s',700,50],['s',650,50],['s',600,50],['s',550,50],['s',500,50],['s',450,50],['s',400,50],['s',400,100],['s',350,100],['spike',1050,550],['spike',1200,150],['spike',1100,250],['s',1000,550],['s',950,550],['s',900,550],['s',850,550],['s',800,550]];
            break;   
    }
    //-//Block & Map Information//-//
    //-/Before you begin changing the map, I recommend you to not have overlapping blocks, except in the case of "gap" blocks.`
    //-/To change a map, you must change the "map" array.
    //-/The keywords and letters (i.e. "s", "gap") represent specific types of blocks, of which your "cube" interacts with differently:
    //-/'ss': a regular solid block who's fill can be changed.
    //-/'s': a regular solid block. All solid blocks belonging to this group have one specific fill, which is 
    //-/'g': a "ghost" block. It can be passed through.
    //-/'sf': a svg.innerWidth x 50 sized block. It is solid. The second item of the array for this would include its y-position, and the third would include its fill.
    //-/'sw': a svg.innerHeight x 50 sized block. It is solid. The second item of the array for this would include its x-position, and the third would include its fill.
    //-/'fin': the ending of the map. If the "cube" gets within its range, the player will be brought to the end screen.
    //-/'spike': though it is called "spike", it can obviously be texture to appear as a completely different obstacle. It is solid and once touched, will cause the player to lose.
    //-/'fb': stands for "fall block". As the full name suggests, this block will fall until it comes in contact with another block. It only falls, however, when the "cube" is on top of this block. The fall block falls at the same rate as the "cube".
    //-/'gap': this block is used for gaps for 'sf' and such blocks. Basically, this should placed right on top of an 'sf' (or a similar type of block), creating a gap in which the "cube" is able to pass through. Also, there seems to be a bug when having two "gap" block next to each other,
    //-/'ob': short for "OctoBug", this is a moving enemy. Instead of chasing you and whatnot, it is set to go to a certain coordinate in the game and back. Once the "cube" comes in contact with the "OctoBug", the fin function will be called and the player loses. The first 4 items of the array for this enemy are similar to the first four of a regular solid's block array ('s','g','spike'), although there are two new items. NOTE: do have the "OctoBug" have a particular fill, you must first comment/delete the css giving it its original texture. The fifth item of the array would indicate which direction the "OctoBug" is going. Use the following:'right','left','up','down'. the sixth item (a number) is how far vertically or horizontally it goes before coming back to its starting point. The sixth item must be evenly divided by 10.
    //-/All 50 x 50 blocks have a similar array format: [keyword,x-position,y-position,fill] Except the 'ob', which may have two more.
    //-////-//
    var obCount = 0;
    for(var i = 0; i < map.length; i++){
        switch(map[i][0]){
            case 'sf':
                blockSizeX = svgW;
                blockSizeY = 50;
                rectClass = 'bottom';
                rX = 0;
                if(map[i][1] || map[i][1] === 0){
                    rY = map[i][1];
                }
                else{
                    rY = svgH - (svgH % 50) - 50;
                    map[i][1] = svgH - (svgH % 50) - 50;
                }
                break;
            case 'sw':
                blockSizeX = 50;
                blockSizeY = svgH;
                rectClass = 'wall';
                rY = 0;
                rX = map[i][1];
                if(map[i][1] || map[i][1] === 0){
                    rX = map[i][1];
                }
                else{
                    rX = svgW - (svgW % 50) - 50;
                    map[i][1] = svgW - (svgW % 50) - 50;
                }
                break;
            case 'ob':
                obCount++;
                var ob = map[i];
                blockSizeX = 40;
                blockSizeY = 40;
                rectClass = 'OctoBug';
                rX = map[i][1];
                rY = map[i][2];
                if(map[i][4] == 'down' || map[i][4] == 'up'){
                    var start = rY;
                }
                else{
                    var start = rX;
                }
                if(map[i][4] == 'down' || map[i][4] == 'right'){
                    map[i][5] = -map[i][5];
                }
                obDir = 'ob' + obCount;
                eval(obDir + ' = true');
                var obcl = document.getElementsByClassName('OctoBug')[obCount - 1];
                eval('obArray' + obCount + ' = [ob,start,obCount,obDir]');
                eval('setInterval(function(){obMove(obArray' + obCount + ');},35)');
                break;
            default:
                blockSizeX = 50;
                blockSizeY = 50;
                rectClass = map[i][0];
                rX = map[i][1];
                rY = map[i][2];
        }
        //map[i][5] = -map[i][5];
        var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
        rect.setAttribute('x',rX);
        rect.setAttribute('y',rY);
        rect.setAttribute('width',blockSizeX);
        rect.setAttribute('height',blockSizeY);
        if(map[i][0] == 'fb'){
            rectClass += ' fb' + i;
        }
        rect.setAttribute('class',rectClass);
        if(map[i][3] != null){
            rect.setAttribute('fill',map[i][3]);
        }
        else if(map[i][0] == 'sf' && map[i][2]){
            rect.setAttribute('fill',map[i][2]);   
        }
        else if(map[i][0] == 'sw' && map[i][2]){
            rect.setAttribute('fill',map[i][2]);   
        }
        svg.appendChild(rect);
    }  
}
function obMove(obArray){
    ob = obArray[0];
    start = obArray[1];
    obRect = document.getElementsByClassName('OctoBug')[obArray[2] - 1];
    obDir = obArray[3];
    var dir = eval(obDir);
    switch(ob[4]){
        case 'up':
            var i = 2;
            var z = 'y';
            var ten = 10;
            break;
        case 'down':
            var i = 2;
            var z = 'y';
            var ten = -10;
            break;
        case 'left':
            var i = 1;
            var z = 'x';
            var ten = 10;
            break;
        case 'right':
            var i = 1;
            var z = 'x';
            var ten = -10;
            break;
    }
    if(dir){
        ob[i] -= ten; 
        obRect.setAttribute(z,ob[i]);
        if(ob[i] == start - ob[5]){
            eval(obDir + ' = false');
        }
    }
    else{
        ob[i] += ten;
        obRect.setAttribute(z,ob[i]);
        if(ob[i] == start){
            eval(obDir + ' = true');
        }
    }
}
var gravity = function(){
    var move = true;
    for(var i = 0; i < map.length; i++){
        if(map[i][0] == 'ob' && cubeY - map[i][2] >= -cubeSize && cubeY - map[i][2] < 40 && cubeX - map[i][1] < 40 && -cubeSize < cubeX - map[i][1]){
            fin(map[i]);
        }
        if(cubeY - map[i][2] == -cubeSize && cubeX - map[i][1] < 50 && -cubeSize < cubeX - map[i][1] && map[i][0] != 'g' && map[i][0] != 'gap' && map[i][0] !== 'ob'){  
            if(map[i][0] == 'fb'){
                var fbInt = true;
                var mapSPID = i;
                if(fbArray.length !== 0){
                    for(var j = 0; j < fbArray.length; j++){
                        if(mapSPID == fbArray[j]){
                            fbInt = false;   
                        }
                    }
                }
                if(fbInt){
                    fbArray.push(mapSPID);
                    fbRect = document.getElementsByClassName('fb' + mapSPID)[0];
                    eval('fb' + mapSPID + ' = setInterval(function(){fbGravity(map[mapSPID],fbRect,mapSPID)},10)');
                }
            }
            if(map[i][0] == 'spike'){
                fin(map[i]);   
            }
            else if(map[i][0] == 'fin'){
                fin(map[i]);   
            }
            move = false;
        }
        else if(map[i][0] == 'sf' && cubeY - map[i][1] == -cubeSize){
            move = false;  
        }
        else if(map[i][0] == 'sw' && cubeX - map[i][1] < 50 && cubeX - map[i][1] > 0){
            move = false;   
        }
        if(map[i][0] == 'gap' && cubeY - map[i][2] == -cubeSize && cubeX - map[i][1] > -1 && cubeX - map[i][1] < 51 - cubeSize + 1){
            move = true;
        }
    }
    if(move){
        jump = false;
        land = true;
        cubeY += 10;
        cube.setAttribute('y',cubeY);
        if(cubeY > svgH + 30){
            //-/For infinite falling, simply uncomment these next two lines and comment the third and make sure there are no 'sf' blocks blocking the bottom/-//
            //cubeY = 0;
            //cube.setAttribute('y',cubeY);
            fin('fall');
        }
    }
    else{
        if(land){
            land = false;
            if(!jump){
                clearInterval(jumpInt);
            } 
        }
        jump = true;
    }
}  
function fbGravity(mapFB,fbRect,mapSPID){
    var move = true;
    for(var g = 0; g < map.length; g++){
        if(map[mapSPID][2] - map[g][2] == -50 && map[mapSPID][1] - map[g][1] < 50 && -50 < map[mapSPID][1] - map[g][1] && map[g][0] != 'g' && map[g][0] !== 'gap' && map[g][0] !== 'ob'){
            move = false;
            if(map[g][0] == 'spike'){
                map[mapSPID] = ['g',0,0,'white'];
                fbRect.style.display = "none";
                eval('clearInterval(fb' + mapSPID + ')'); 
            }
        }
        if(map[g][0] == 'sf' && map[mapSPID][2] - map[g][1] == -50){
            move = false;
        }
    }
    if(move){
        map[mapSPID][2] += 10;
        fbRect.setAttribute('y',map[mapSPID][2]);
    }
    else{
        fbRect.setAttribute('y',map[mapSPID][2]);
        map[mapSPID][0] = 's';
        eval('clearInterval(fb' + mapSPID + ')');
    }
}
function fin(endMsg){
    var svg = document.getElementById('svg');
    var endMSGClass = document.getElementsByClassName('endMsg');
    var endMsg1,endMsg2;
    if(endMsg == "fall"){
        endMsg1 = 'YOU FELL TO YOUR <strong>DOOM</strong>!';
        endMsg2 = 'You lose.';
    }
    else{
        switch (endMsg[0]){
            case 'spike':
                endMsg1 = 'YOU STEPPED ON A <strong>DEADLY SPIKE</strong>!';
                endMsg2 = 'You lose.';
                break;
            case 'ob':
                endMsg1 = 'YOU WERE POISONED BY AN <strong>OCTOBUG</strong>!';
                endMsg2 = 'You lose.';
                break;
            case 'fin':
                endMsg1 = 'YOU REACHED THE <strong>GOLDEN STAR</strong>!';
                endMsg2 = 'You win!';
                break;
        }
    }
    svg.parentNode.removeChild(svg);
    document.getElementById('endScreen').style.display = 'block';
    endMSGClass[0].innerHTML = endMsg1;
    endMSGClass[1].innerHTML = endMsg2;
	document.getElementById('reload').addEventListener('click',function(){window.location.href=window.location.href});
}