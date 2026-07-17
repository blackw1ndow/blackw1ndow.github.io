const SIZE = 20;

const ART_B64 =
  "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLi1+ICApCiAg" +
  "ICAgICAgICAgICAgICAgICAgIF8uLi0tfn5+fiwnICAgLC0vICAgICBfCiAgICAgICAgICAgICAgICAgLi0nLiAuIC4gLicgICAsLScs" +
  "JyAgICAsJyApCiAgICAgICAgICAgICAgICwnLiAuIC4gXyAgICwtLX4sLSdfXy4uLScgICwnCiAgICAgICAgICAgICAsJy4gLiAuICAo" +
  "QCknIC0tLX5+fn4gICAgICAsJwogICAgICAgICAgICAvLiAuIC4gLiAnfn4gICAgICAgICAgICAgLC0nCiAgICAgICAgICAgLy4gLiAu" +
  "IC4gLiAgICAgICAgICAgICAsLScKICAgICAgICAgIDsgLiAuIC4gLiAgLSAuICAgICAgICAsJwogICAgICAgICA6IC4gLiAuIC4gICAg" +
  "ICAgXyAgICAgLwogICAgICAgIC4gLiAuIC4gLiAgICAgICAgICBgLS46CiAgICAgICAuIC4gLiAuLyAgLSAuICAgICAgICAgICkKICAg" +
  "ICAgLiAgLiAuIHwgICAgICAgICAgICAgIC8gfi0tLX5+fn4tLS0tfn5+fgp+LS0tfn5+fi0tLS1+fn4tLS0tfn5+fn4tLS1+fn5+LS0tLX5+fn4=";

const art = atob(ART_B64).split("\n");

const EYE_ROW = 5, EYE_COL = 23;

const canvas = document.getElementById("dolphin");
const ctx = canvas.getContext("2d");

ctx.font = SIZE + "px monospace";
ctx.textBaseline = "top";
const CHAR_W = ctx.measureText("M").width;
const LINE_H = SIZE * 1.15;

const ROWS = art.length;
const COLS = Math.max(...art.map((l) => l.length));
const startX = (canvas.width - COLS * CHAR_W) / 2;
const startY = (canvas.height - ROWS * LINE_H) / 2;

const start = performance.now();

function draw(now) {
  const light = document.body.classList.contains("light");
const COLOR = light ? "#0A0A0A" : "aliceblue";
const BG = light ? "aliceblue" : "#0A0A0A";
  const t = (now - start) / 1000;
  const blink = (t % 2) < 0.3;

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = SIZE + "px monospace";
  ctx.fillStyle = COLOR;

  for (let r = 0; r < ROWS; r++) {
    const line = art[r];
    for (let c = 0; c < line.length; c++) {
      let ch = line[c];
      if (ch === " ") continue;
      if (r === EYE_ROW && c === EYE_COL) ch = blink ? "-" : "@";
      ctx.fillText(ch, startX + c * CHAR_W, startY + r * LINE_H);
    }
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("theme").addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
});