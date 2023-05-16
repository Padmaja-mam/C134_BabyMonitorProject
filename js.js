
alert = "";
objects = [];
status1 = "";

function preload()
{
  alert = loadSound("babycrying.mp3");
}


function setup()
{
  canvas = createCanvas(500, 400);
  canvas.position(550,200);

  video = createCapture(VIDEO);
  video.size(500,400);
  video.hide();

  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() 
{
  console.log("Model Loaded!")
  status1 = true;
}

function gotResult(error, results)
{
  
  if (error)
  {
    console.log(error);
  }
  else
  {
   console.log(results);
   objects = results;
  }
}


function draw() 
{
  image(video, 0, 0, 500, 400);

      if(status1 != "")
      {
       
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) 
        {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          
          document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
 
          fill("blue");
          
          percent = floor(objects[i].confidence * 100);

          textSize(25);
         
          text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
          
          noFill();

          stroke("magenta");

          rect(objects[i].x - 50, objects[i].y - 150, objects[i].width, objects[i].height);

          if(objects[i].label == "person")
          {
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
            console.log("Baby found");
            alert.stop();
          }
          else
          {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            console.log("Baby Not Found"); 
            alert.play();
          }
         }

        if(objects.length == 0)
        {
          document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
          console.log("Baby Not Found"); 
          alert.play();
        }
      }
        
      
}
