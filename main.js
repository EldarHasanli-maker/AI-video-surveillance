status="";
video="";
objects=[];
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
canvas=createCanvas(480,300);
canvas.center();
}
function draw(){
 image(video,0,0,480,300);
 if(status!=""){
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="Status:Objects Detected";
    document.getElementById("number_of_objects").innerHTML="Number of objects are:"+objects.length;
    fill("#08007a");
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke("#08007a");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
 }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }

}
function start(){
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}