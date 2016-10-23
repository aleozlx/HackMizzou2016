/*global navigator, $, atob, Blob, params*/
//
var _continue = false;
var score = {bad: 0, good: 0};
var score2 = {bad: 0, good: 0};
var secondRead = false;
var firstRead = true;
var ndelta_threshold = 0;
var pdelta_threshold = 0;
var ndelta = 0;
var pdelta = 0; 
var sum = 0; 
var timer = 0; 
var timer2 = 1;
var timer3 = 0; 
var check = 0; 
var check2 = 0; 
var check3 = 0;

function startLoop(){
    console.log("Song playing");
    
    if(_continue == false)
    {
        _continue = true;
         //Take picture
       setTimeout('takePicture()', 0);
    }
    else
    {
        setTimeout('takePicture()', (timer2)*1000);
    }
}

function pauseLoop(){
    console.log("Song paused");
    _continue = false;
}

function skipPoo(){
    document.getElementById("btnNext").click();
}

function calcScore(score_set){
    //console.log(score_set);
    //parse score_set
    if(score_set.length < 1)
    {
        console.log("empty set...");
        if(_continue)
            startLoop();
        return;
    }
    
    var s = score_set[0].scores;
    console.log(s);
    if(firstRead)
    {
       firstRead = false; 
       secondRead = true;
       score['bad'] += s['anger'] * 1;
       score['bad'] += s['disgust'] * 1;
        score['bad'] += s['fear'] * 1;
        score['bad'] += s['sadness'] * 1;
        score['good'] += s['contempt'] * 1;
        score['good'] += s['happiness'] * 1;
    }
    else
    {
        score2['bad'] = score2['good'] = 0;
        score2['bad'] += s['anger'] * 1;
        score2['bad'] += s['disgust'] * 1;
       score2['bad'] += s['fear'] * 1;
       score2['bad'] += s['sadness'] * 1;
       score2['good'] += s['contempt'] * 1;
       score2['good'] += s['happiness'] * 1; 
        if(secondRead)
        {
            if(check2 == 1)
            {
            ndelta = score2['bad'] - score['bad'];
            pdelta = score2['good'] - score['good'];
                check3=1;
            }
            else
              {
            check2++;
               }
        }
        if(check3 == 1)
        {
            var tmp = ndelta / pdelta;
            sum += tmp;
            if(tmp > (1/timer2) + sum)
            {
                check++;
            }
            var tmp3 = 1/timer2 + sum;
            /*console.log("tmp, compare: " + tmp + "," + tmp3);
            console.log("pdelta, ndelta: " + pdelta + "," + ndelta);
            console.log("timer: " + timer2);
            console.log(score);
            console.log(score2);*/
            if(check > 1) 
            {
                score2['bad'] = score2['good'] = score['bad'] = score['good'] = 0;
                pdelta = ndelta = 0;
                secondRead = false;
                firstRead = true;
                timer = timer2 = 0; 
                skipPoo();
            }
                
            else
            {
                score['bad'] = score2['bad'];
                score['good'] = score2['good'];
            }
        }
        
    }
    
    timer3 = timer + timer2;
    timer = timer2; 
    timer2 = timer3;
    
    if(_continue)
        startLoop();
}