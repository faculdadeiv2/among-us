export function drawRoundedRectangle({
    ctx,
    fill,
    stroke,
    lineWidth,
    radius,
    x,
    y,
    width,
    height
}) {

    ctx.fillStyle = fill;
    if (stroke !== undefined) {
        ctx.strokeStyle = stroke;
    }
    ctx.lineWidth = lineWidth;

    ctx.beginPath();

    // Top Right
    ctx.moveTo(x + radius, y);
    ctx.arc(
        x + width - radius,
        y + radius,
        radius,
        Math.PI / -2,
        0,
    );

    // Bottom Right
    ctx.arc(
        x + width - radius,
        y + height - radius,
        radius,
        0,
        Math.PI / 2
    );

    // // Bottom Left
    ctx.arc(
        x + radius,
        y + height - radius,
        radius,
        Math.PI / 2,
        Math.PI,
    );

    // // Top Left
    ctx.arc(
        x + radius,
        y + radius,
        radius,
        Math.PI,
        Math.PI / -2
    );;

    ctx.fill();
    stroke && ctx.stroke();
    ctx.closePath();
}