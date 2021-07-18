export const drawCircle = (ctx,{color,x,y,radius}) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y, radius, 0, 2*Math.PI);
    ctx.fill();
}

export const drawRectangle = (ctx,{color,x,y,width,height}) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x - width/2,y-height/2,width,height);
    ctx.fill();
}

export const drawText = (ctx,{color,font,text,x,y}) => {
    ctx.fillStyle = color;
    ctx.font = font || "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text,x,y);
}