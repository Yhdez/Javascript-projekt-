const Text_canvas = document.getElementById("Text_canvas")

ctx_text = Text_canvas.getContext("2d")

//console.log(Text_canvas.height)
ctx_text.font = Text_canvas.width*0.06 + "px Pixelify Sans, sans-serif"
ctx_text.fillText("Press  w , a , s , d  to move",62,80)

function tutorial(Part_of_tutorial){
    ctx_text.clearRect(0,0,Text_canvas.width,Text_canvas.height)
    if (Spelkaraktär.health <= 0){ctx_text.fillText("Press Enter to restart",62,80)}
    else if (Part_of_tutorial === "Walking"){ ctx_text.fillText("Press  w , a , s , d  to move",62,80)}
    else if (Part_of_tutorial === "Fighting"){ctx_text.fillText("Press  z to Swing",62,80)}
    else if (Part_of_tutorial === "Open_door"){ctx_text.fillText("Press  e  to open door",62,80)}
    else if (Part_of_tutorial === "Locked_door"){ctx_text.fillText("The Door is Locked",62,80)}
    else if (Part_of_tutorial === "Empty canvas"){return}
}

tutorial("Walking")
//ctx_text.clearRect(0,0,Text_canvas.width,Text_canvas.height)

