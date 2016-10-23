 /*global navigator, $, atob, Blob, params*/
 
 var makeblob = function (dataURI) {
//     // convert base64/URLEncoded data component to raw binary data held in a string
    //console.log(dataURI.length);
    var byteString = dataURI.split(",")[1];
    byteString = atob(byteString);
    //console.log(byteString.length);

//     // separate out the mime component
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    
//     var blob = new Blob(byteArrays, { type: contentType });
// var file = new File([blob], filename, {type: contentType, lastModified: Date.now()});

    var tmp = new File([new Blob([ia],{type : 'image/png'})], "poo_surprise.png",{type : 'image/png', lastModified: Date.now() });
    //console.log(tmp);
    return tmp;
      
  }

     var apiKey = "4ca8bd58cdea473da3626b9a6bd209b8";
 
 //apiUrl: The base URL for the API. Find out what this is for other APIs via the API documentation
 var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";
    function CallAPI(file)//, apiUrl, apiKey)
 {
 $.ajax({
 url: apiUrl,
 beforeSend: function (xhrObj) {
 xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
 },
 type: "POST",
 data: file,//"https://hackmizzou16-dpr989.c9users.io/images/poo.png",//file,
 processData: false
 })
 .done(function (response) {
 /*console.log(response); */ calcScore(response);
 })
 .fail(function (error) { console.log(error);
//  $("#response").text(error.getAllResponseHeaders());
 });
 }
    
    // $(document).ready(
    //     function (){
    //     	 // Elements for taking the snapshot
    //         var canvas = document.getElementById('canvas');
    //         var context = canvas.getContext('2d');
    //         var video = document.getElementById('video');
            
    //         // Get access to the camera!
    //         if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //             // Not adding `{ audio: true }` since we only want video now
    //             navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    //              video.src = window.URL.createObjectURL(stream);
    //              video.play();
    //              console.dir(video)
    //             });
    //         }
			 //   console.log("Smile!")
        
    //         // Trigger photo take
    //         document.getElementById("snap").addEventListener("click", function() {
    //           context.drawImage(video, 0, 0, 640, 480);
    //           console.log(canvas);
    //           var s = canvas.toDataURL("image/png");
    //           //console.log(s);
    //             // getEmotions(s);
    //         CallAPI(makeblob(s));
    //         });
    //     });