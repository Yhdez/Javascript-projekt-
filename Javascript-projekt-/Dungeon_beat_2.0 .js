const canvas = document.getElementById("Game_canvas")
let namn = document.getElementById("Spelnamn")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

namn.innerHTML ="Dungeon Beat 2.0"
const ctx = canvas.getContext("2d")

const spelkaraktären = document.getElementById("Spelkaraktär")
var swidth = spelkaraktären.width;
var sheight = spelkaraktären.height;
let Player_picture_position_x = 320
let Player_picture_position__y = 200
ctx.drawImage(spelkaraktären, 120, 100, 650, 650, Player_picture_position_x, Player_picture_position__y, 100, 100);