// for display or drawing object notes

let display = document.getElementById("display");
let ctx = display.getContext("2d");

let headPage = document.querySelector(".headPage");

// client based display size handle
display.width = display.clientWidth;
display.height = display.clientHeight;


// tools to help of make it interesting
let clr = document.getElementById("clr");
let cs = document.getElementById("cs");


//button
let save = document.getElementById("save");
let reset = document.getElementById("reset");


let background = document.getElementById("background");
let currentColor = "#000";
let bgColor = "#000";
clr.addEventListener("input", () => {
  if(background.checked){
    ctx.fillStyle = clr.value;
    ctx.fillRect(0,0,display.width,display.height);
  }else{
    currentColor = clr.value;
  }
});
display.addEventListener("touchend", (e) => {
  e.preventDefault();
});
let firstXNode;
let firstYNode;
display.addEventListener("touchstart", (e) => {
  e.preventDefault();
  let touch = e.touches[0];
  let edge = display.getBoundingClientRect();
  firstXNode = (touch.clientX - edge.left);
firstYNode = (touch.clientY - edge.top);
  
})
display.addEventListener("touchmove", (e) => {
  e.preventDefault();
  let touch = e.touches[0];
  let edge = display.getBoundingClientRect();
  let x = (touch.clientX - edge.left);
let y = (touch.clientY - edge.top);
  
  ctx.beginPath();
  ctx.moveTo(firstXNode, firstYNode);
  ctx.lineTo(x, y);
  ctx.lineCap = "round";
  ctx.lineWidth = 3;
  ctx.strokeStyle = currentColor;
  ctx.stroke();
  
  firstXNode = x;
  firstYNode = y;
})

reset.addEventListener("click",() =>{
  ctx.clearRect(0,0,display.width,display.height);
})


save.addEventListener("click",() =>{
  let name = "Canvas_Drawing.png";
  let ask = prompt("enter save name")+".png";
  name = ask;
  let img = display.toDataURL("image/png");
  let link = document.createElement("a");
  link.href = img;
  link.download = `${name}`;
  link.click()
})
