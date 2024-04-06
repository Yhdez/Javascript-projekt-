const canvas = document.getElementById("my_canvas")
const ctx = canvas.getContext("2d")
const spelkaraktären = document.getElementById("Spelkaraktär")
var swidth = spelkaraktären.width;
var sheight = spelkaraktären.height;
console.log(sheight)
console.log(swidth)

ctx.drawImage(spelkaraktären, 120, 100, 650, 650, 10, 10, 100, 100);