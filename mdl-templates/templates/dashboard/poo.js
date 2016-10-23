/*global navigator, $, atob, Blob, params*/
//
var _continue = false;
var score = {bad: 0, good: 0};
var score2 = {bad: 0, good: 0};
var reading;
var secondRead = false;
var firstRead = true;
var skipCounter = 0;
var numCalls = 0;
var ndelta_threshold = 0;
var pdelta_threshold = 0;

function startLoop(){
    console.log("Song playing");
    
    if(_continue == false)
    {
        _continue = true;
         //Take picture
       setTimeout('takePicture()', 75);
    }
    else
    {
        setTimeout('takePicture()', 2000);
        
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
        score2['bad'] += s['anger'] * 1;
        score2['bad'] += s['disgust'] * 1;
       score2['bad'] += s['fear'] * 1;
       score2['bad'] += s['sadness'] * 1;
       score2['good'] += s['contempt'] * 1;
       score2['good'] += s['happiness'] * 1;    
        if(secondRead)
        {
            secondRead = false;
            ndelta_threshold = score2['bad'] - score['bad'];
            pdelta_threshold = score2['good'] - score2['good'];
        }
        else
        {
            if((score2['bad'] - score['bad'])/(score2['good'] - score['good']) > ndelta_threshold)
            {
                skipCounter++;
                pdelta_threshold += .1;
            }
            if((score2['good'] - score['good'])/(score2['bad'] - score['bad']) > pdelta_threshold)
            {
                skipCounter--;
                ndelta_threshold += .1;
            }
            
            console.log("skipCounter: " + skipCounter + " | score1: ");
            console.dir(score);
            console.log("score2: "); 
            console.dir(score2);
            console.log(" | ndelta_threshold, pdelta_threshold: " + ndelta_threshold + "," + pdelta_threshold);
            if(skipCounter > 2) 
            {
                score2['bad'] = score2['good'] = score['bad'] = score['good'] = 0;
                secondRead = false;
                firstRead = true;
                skipCounter = 0; 
                skipPoo();
            }
                
            else
            {
                score['bad'] = score2['bad'];
                score['good'] = score2['good'];
            }
        }
        
    }
    
    if(_continue)
        startLoop();
}