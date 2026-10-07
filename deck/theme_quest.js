// 🎮 퀘스트 테마 — 8비트 게임기 스킨. 신호 종목 = 몬스터, 테마 = 파이프. deck.json 을 읽기만 한다 (정보 표시 전용).
window.DeckTheme = { mount(root, D) {
const CSS = `
.qs{--desk:#1a1420;--shell:#ece4cf;--shell-dk:#c8bc9f;--trim:#7a1d26;--trim-dk:#4e1018;--ink:#2b2230;--gold:#d9a441;
 --pixel:"Press Start 2P",ui-monospace,monospace;--kr:"Galmuri11","Apple SD Gothic Neo","Malgun Gothic",sans-serif;
 background:var(--desk);color:var(--shell);font-family:var(--kr);padding:56px 16px 72px;min-height:100vh;box-sizing:border-box}
.qs *{box-sizing:border-box}
.qs .console{max-width:1040px;margin:0 auto;background:linear-gradient(180deg,var(--shell),var(--shell-dk));border-radius:26px 26px 70px 70px;padding:20px 22px 28px;display:grid;grid-template-columns:150px minmax(0,1fr) 150px;grid-template-areas:"logo logo logo" "pad screen ab" "pad ss ab";gap:14px 22px;align-items:center;box-shadow:0 22px 50px rgba(0,0,0,.6),inset 0 2px 0 rgba(255,255,255,.6),inset 0 -6px 0 rgba(0,0,0,.12)}
.qs .logo{grid-area:logo;display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px 16px;padding:0 6px}
.qs .logo b{font-family:var(--pixel);font-weight:400;color:var(--trim);font-size:clamp(14px,2.4vw,22px);letter-spacing:.04em;text-shadow:2px 2px 0 var(--gold)}
.qs .logo span{font-family:var(--pixel);font-size:8px;color:var(--ink);letter-spacing:.12em}
.qs .screenwrap{grid-area:screen;background:var(--trim);padding:14px 14px 10px;border-radius:12px;box-shadow:inset 0 0 0 3px var(--trim-dk),inset 0 6px 14px rgba(0,0,0,.45);min-width:0}
.qs canvas{display:block;width:100%;max-width:100%;margin:0 auto;aspect-ratio:256/224;image-rendering:pixelated;image-rendering:crisp-edges;background:#000;border-radius:4px;outline:none}
.qs canvas:focus-visible{box-shadow:0 0 0 3px var(--gold)}
.qs .power{display:flex;align-items:center;gap:6px;margin-top:8px;font-family:var(--pixel);font-size:7px;color:#e9c9c9;letter-spacing:.12em}
.qs .power i{width:7px;height:7px;border-radius:50%;background:#ff3b3b;box-shadow:0 0 6px #ff3b3b}
.qs .pad{grid-area:pad;display:grid;grid-template-columns:repeat(3,44px);grid-template-rows:repeat(3,44px);justify-content:center}
.qs .pad button{background:var(--ink);border:none;color:#9b93a3;font-family:var(--pixel);font-size:10px;cursor:pointer;touch-action:manipulation}
.qs .pad .u{grid-area:1/2;border-radius:6px 6px 0 0}.qs .pad .d{grid-area:3/2;border-radius:0 0 6px 6px}
.qs .pad .l{grid-area:2/1;border-radius:6px 0 0 6px}.qs .pad .r{grid-area:2/3;border-radius:0 6px 6px 0}
.qs .pad .c{grid-area:2/2;background:var(--ink)}
.qs .pad button:active,.qs .pad button.on{background:#120d16}
.qs .ab{grid-area:ab;display:flex;gap:14px;justify-content:center;align-items:center}
.qs .ab button{width:58px;height:58px;border-radius:50%;border:none;background:var(--trim);color:var(--shell);font-family:var(--pixel);font-size:14px;cursor:pointer;box-shadow:0 4px 0 var(--trim-dk);touch-action:manipulation}
.qs .ab .b{margin-top:34px}
.qs .ab button:active,.qs .ab button.on{transform:translateY(3px);box-shadow:0 1px 0 var(--trim-dk)}
.qs .ss{grid-area:ss;display:flex;gap:22px;justify-content:center}
.qs .ss button{display:flex;flex-direction:column;align-items:center;gap:6px;background:none;border:none;cursor:pointer;font-family:var(--pixel);font-size:7px;color:var(--ink);letter-spacing:.1em;touch-action:manipulation}
.qs .ss button::before{content:"";width:46px;height:12px;border-radius:8px;background:#6d6472;transform:rotate(-18deg);box-shadow:0 2px 0 #3c3540}
.qs .ss button:active::before,.qs .ss button.on::before{background:#4a434f}
.qs button:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.qs .help{max-width:1040px;margin:14px auto 0;display:flex;flex-wrap:wrap;gap:6px 18px;font-size:12px;color:#9e95a8;line-height:1.6}
.qs .help kbd{font-family:var(--pixel);font-size:8px;background:#2c2433;color:var(--shell);padding:3px 5px;border-radius:3px}
@media (max-width:760px){.qs .console{grid-template-columns:1fr 1fr;grid-template-areas:"logo logo" "screen screen" "pad ab" "ss ss";padding:14px 14px 24px;border-radius:20px 20px 46px 46px}
 .qs .screenwrap{padding:10px 10px 8px}.qs .pad{grid-template-columns:repeat(3,40px);grid-template-rows:repeat(3,40px)}.qs .ab button{width:52px;height:52px}}
`;
for (const href of ["https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap", "https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css"]) {
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; document.head.appendChild(l);
}
const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
document.body.style.background = "#1a1420";

const M = D.market || {}, S = D.signals || {items:[]}, TH = D.themes || {items:[]}, FO = D.foreign || {buy:[],sell:[]};
const all = S.items || [];
const ymd = s => s && s.length === 8 ? `${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6)}` : (s || "");
const sgn = (v, d = 1) => v == null ? "-" : (v > 0 ? "+" : "") + Number(v).toFixed(d);
const josa = (w, a, b) => { const ch = w.charCodeAt(w.length - 1); if (ch >= 0xAC00 && ch <= 0xD7A3) return w + (((ch - 0xAC00) % 28) ? a : b); return w + b; };

root.innerHTML = `<div class="qs"><div class="console">
  <div class="logo"><b>KOSPI QUEST</b><span>SIGNAL ENTERTAINMENT SYSTEM</span></div>
  <div class="pad" aria-label="방향 패드">
    <button class="u" data-k="up" aria-label="위" type="button">▲</button>
    <button class="l" data-k="left" aria-label="왼쪽" type="button">◀</button>
    <span class="c"></span>
    <button class="r" data-k="right" aria-label="오른쪽" type="button">▶</button>
    <button class="d" data-k="down" aria-label="아래" type="button">▼</button>
  </div>
  <div class="screenwrap">
    <canvas id="qscr" width="256" height="224" tabindex="0" aria-label="신호 종목을 몬스터로 보여주는 8비트 화면"></canvas>
    <div class="power"><i></i>POWER</div>
  </div>
  <div class="ab"><button class="b" data-k="b" aria-label="B 버튼" type="button">B</button><button class="a" data-k="a" aria-label="A 버튼" type="button">A</button></div>
  <div class="ss"><button data-k="select" type="button">SELECT</button><button data-k="start" type="button">START</button></div>
</div>
<div class="help">
  <span><kbd>↑↓</kbd> 이동</span><span><kbd>Z</kbd> A 결정</span><span><kbd>X</kbd> B 취소</span><span><kbd>ENTER</kbd> START 지도</span><span><kbd>SHIFT</kbd> SELECT 소리</span>
  <span>정보 표시 전용 — 매매 신호·추천 아님. ${ymd(S.date)} 신호 · 장후 1회 갱신.</span>
</div></div>`;

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const W = 256, H = 224;
const cv = root.querySelector("#qscr"), ctx = cv.getContext("2d"); ctx.imageSmoothingEnabled = false;
const P = {black:"#000000",white:"#fcfcfc",gray:"#bcbcbc",dgray:"#545454",red:"#d82800",orange:"#fc9838",yellow:"#f8d878",green:"#00a800",lgreen:"#b8f818",blue:"#0058f8",lblue:"#3cbcfc",navy:"#0000a8",brown:"#c84c0c",dbrown:"#7c2c00",pink:"#f878f8"};
const KR = '12px "Galmuri11", "Apple SD Gothic Neo", sans-serif', PX = '8px "Press Start 2P", monospace';

const stocks = all.slice(0, 10);
const flagOf = s => s.conf === "HIGH" ? "HIGH" : s.conf === "MED" ? "MED" : "LOW";
const flagCol = f => f === "HIGH" ? P.red : f === "MED" ? P.lgreen : P.lblue;
const ser = (M.series?.kospi || []).filter(v => v != null);

/* ---------- pixel text ---------- */
const tcache = new Map();
const hasKr = s => /[ㄱ-힣]/.test(s);
const mctx = document.createElement("canvas").getContext("2d");
const measure = (s, kr) => { mctx.font = kr ? KR : PX; return mctx.measureText(s).width; };
const hexRGB = h => { const n = parseInt(h.slice(1), 16); return [n>>16&255, n>>8&255, n&255]; };
function glyph(s, col, kr) {
  const font = kr ? KR : PX, key = font + "|" + col + "|" + s;
  let c = tcache.get(key);
  if (!c) {
    if (tcache.size > 900) tcache.clear();
    c = document.createElement("canvas"); const g = c.getContext("2d"); g.font = font;
    const w = Math.ceil(g.measureText(s).width) + 2, h = kr ? 16 : 10; c.width = Math.max(1, w); c.height = h;
    g.font = font; g.textBaseline = "top"; g.fillStyle = "#fff"; g.fillText(s, 1, 1);
    const d = g.getImageData(0, 0, c.width, h), [r, gg, b] = hexRGB(col);
    for (let i = 0; i < d.data.length; i += 4) { if (d.data[i+3] > 105) { d.data[i] = r; d.data[i+1] = gg; d.data[i+2] = b; d.data[i+3] = 255; } else d.data[i+3] = 0; }
    g.putImageData(d, 0, 0); tcache.set(key, c);
  }
  return c;
}
function txt(s, x, y, col, o = {}) {
  if (!s) return 0;
  const kr = o.kr || hasKr(s), c = glyph(s, col, kr);
  let dx = x; if (o.align === "right") dx = x - c.width; if (o.align === "center") dx = x - (c.width >> 1);
  if (o.shadow) ctx.drawImage(glyph(s, P.black, kr), (dx|0) + 1, (y|0) + 1);
  ctx.drawImage(c, dx|0, y|0); return c.width;
}
function fitTxt(s, maxW, kr = true) { if (measure(s, kr) <= maxW) return s; while (s.length > 1 && measure(s + "…", kr) > maxW) s = s.slice(0, -1); return s + "…"; }

const rect = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x|0, y|0, w|0, h|0); };
function box(x, y, w, h) {
  rect(x, y, w, h, P.black);
  rect(x+1, y, w-2, 2, P.white); rect(x+1, y+h-2, w-2, 2, P.white); rect(x, y+1, 2, h-2, P.white); rect(x+w-2, y+1, 2, h-2, P.white);
  rect(x+3, y+3, w-6, 1, P.navy); rect(x+3, y+h-4, w-6, 1, P.navy); rect(x+3, y+3, 1, h-6, P.navy); rect(x+w-4, y+3, 1, h-6, P.navy);
}
let frame = 0;
function cursor(x, y) { if (!reduce && ((frame >> 4) & 1)) return; for (let i = 0; i < 4; i++) rect(x+i, y+i, 1, 7-2*i, P.white); }
function downArrow(x, y) { if (!reduce && ((frame >> 4) & 1)) return; for (let i = 0; i < 4; i++) rect(x+i, y+i, 7-2*i, 1, P.white); }

/* ---------- monster sprites (seeded by ticker) ---------- */
const sprites = {};
function sprite(s) {
  if (sprites[s.code]) return sprites[s.code];
  const r = rng(parseInt(s.code, 10) + 7), N = 12, g = [];
  for (let y = 0; y < N; y++) { g.push(new Array(N).fill(0)); for (let x = 0; x < N/2; x++) {
    const dist = Math.abs(x - 5.5)/6 + Math.abs(y - 6)/9, v = r();
    let cell = v > dist*0.9 + 0.18 ? (v > 0.8 ? 2 : 1) : 0; if (y >= 2 && y <= 10 && x >= 3) cell = cell || (r() > 0.35 ? 1 : 0);
    g[y][x] = cell; g[y][N-1-x] = cell; } }
  g[4][3] = g[4][8] = 3; g[5][3] = g[5][8] = 4;
  const pal = {HIGH: [P.red, P.orange], MED: [P.green, P.lgreen], LOW: [P.blue, P.lblue]}[flagOf(s)];
  const c = document.createElement("canvas"); c.width = N; c.height = N; const x2 = c.getContext("2d");
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const v = g[y][x]; if (!v) continue; x2.fillStyle = v === 1 ? pal[0] : v === 2 ? pal[1] : v === 3 ? P.white : P.black; x2.fillRect(x, y, 1, 1); }
  return sprites[s.code] = c;
}

/* ---------- state ---------- */
let scene = "menu", cur = 0, mode = "dlg", cmdCur = 0, snd = true, toast = null, dlg = null;
const kst = () => new Date().toLocaleTimeString("en-GB", {timeZone: "Asia/Seoul", hour12: false});
let clock = kst();

function wrap(msg, maxW) { const out = []; let line = ""; for (const ch of msg) { const t = line + ch; if (measure(t, true) > maxW && line) { out.push(line.trimEnd()); line = ch.trimStart(); } else line = t; } if (line) out.push(line); return out; }
function setDialog(msgs, onEnd) { const pages = []; msgs.forEach(m => { const ls = wrap(m, 226); for (let i = 0; i < ls.length; i += 2) pages.push(ls.slice(i, i + 2)); }); dlg = {pages, p: 0, shown: reduce ? 999 : 0, onEnd}; mode = "dlg"; }
const pageLen = () => dlg.pages[dlg.p].join("").length;

let actx = null;
function beep(f, d, type) { if (!snd) return; try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), g = actx.createGain(); o.type = type || "square"; o.frequency.value = f; o.connect(g); g.connect(actx.destination); const t = actx.currentTime; g.gain.setValueAtTime(0.035, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.start(t); o.stop(t + d + 0.02); } catch (e) {} }

const sameCode = s => all.filter(x => x.code === s.code);
const foreignOf = s => FO.buy.find(x => x.code === s.code) || FO.sell.find(x => x.code === s.code);

function enterBattle(i) {
  const s = stocks[i]; scene = "battle"; cmdCur = 0;
  const n = sameCode(s).length;
  setDialog([`야생의 ${josa(s.name, "이", "가")} 나타났다!`, n > 1 ? `오늘 신호가 ${n}개나 겹쳐 있다.` : `${s.label} 신호를 들고 왔다.`]);
  beep(220, .08); setTimeout(() => beep(330, .08), 90); setTimeout(() => beep(440, .12), 180);
}
const CMDS = ["분석", "수급", "도망"];
function runCmd(k) {
  const s = stocks[cur];
  if (k === "분석") {
    const sig = sameCode(s).map(x => `${x.label}(${x.conf || "-"})`).join(", ");
    setDialog([`신호: ${sig}.`, `테마: ${(s.themes || []).join(" / ") || "없음"}.`, `장세는 ${M.regime || "-"}. 판단은 플레이어 몫이다.`]);
  } else if (k === "수급") {
    const f = foreignOf(s);
    setDialog(f ? [`외국인 ${FO.window || 5}일 순매수 ${sgn(f.net5)}억!`, `같은 기간 주가 ${sgn(f.p5)}%.`] : ["외국인 상위 매수·매도 목록에는 없다…"]);
  } else {
    setDialog(["무사히 도망쳤다!"], () => { scene = "menu"; });
  }
}

function press(k) {
  if (k === "select") { snd = !snd; toast = {t: "SOUND " + (snd ? "ON" : "OFF"), until: frame + 80}; beep(880, .06); return; }
  if (k === "start") { scene = scene === "map" ? "menu" : "map"; beep(scene === "map" ? 523 : 392, .1); return; }
  if (scene === "menu") {
    if (!stocks.length) return;
    if (k === "up") { cur = (cur + stocks.length - 1) % stocks.length; beep(660, .04); }
    if (k === "down") { cur = (cur + 1) % stocks.length; beep(660, .04); }
    if (k === "a") enterBattle(cur);
    return;
  }
  if (scene === "map") { if (k === "b" || k === "a") { scene = "menu"; beep(392, .06); } return; }
  if (scene === "battle") {
    if (mode === "dlg") {
      if (k === "b") { scene = "menu"; beep(392, .06); return; }
      if (k !== "a") return;
      if (dlg.shown < pageLen()) { dlg.shown = 999; return; }
      beep(990, .03);
      if (dlg.p < dlg.pages.length - 1) { dlg.p++; dlg.shown = reduce ? 999 : 0; return; }
      const end = dlg.onEnd; dlg = null; mode = "cmd"; if (end) end(); return;
    }
    if (k === "up") { cmdCur = (cmdCur + CMDS.length - 1) % CMDS.length; beep(660, .04); }
    if (k === "down") { cmdCur = (cmdCur + 1) % CMDS.length; beep(660, .04); }
    if (k === "b") { scene = "menu"; beep(392, .06); }
    if (k === "a") { beep(880, .05); runCmd(CMDS[cmdCur]); }
  }
}

function header() {
  rect(0, 0, W, 14, P.navy);
  txt("KOSPI " + (M.kospi?.value ?? 0).toFixed(2), 4, 3, P.white);
  const pct = M.kospi?.chg ?? 0;
  txt((pct >= 0 ? "+" : "") + pct.toFixed(2) + "%", 124, 3, pct >= 0 ? P.pink : P.lblue);
  txt(clock, 252, 3, P.yellow, {align: "right"});
}

function drawMenu() {
  rect(0, 14, W, H - 14, P.black);
  txt("SIGNAL PARTY", 6, 18, P.yellow);
  txt(`${stocks.length}/${all.length} ${M.regime || ""}`, 250, 18, P.gray, {align: "right"});
  box(4, 28, 248, 137);
  if (!stocks.length) { txt("오늘은 몬스터가 없다", 128, 90, P.white, {kr: true, align: "center"}); }
  stocks.forEach((s, i) => {
    const y = 33 + i * 13;
    if (i === cur) { rect(8, y - 1, 240, 13, "#101040"); cursor(10, y + 2); }
    txt(fitTxt(s.name, 74), 19, y - 2, P.white, {kr: true});
    txt(fitTxt(s.label, 112), 98, y - 2, P.gray, {kr: true});
    const f = flagOf(s);
    txt(f === "HIGH" ? "HOT" : f === "MED" ? "GO" : "...", 246, y + 2, f === "HIGH" ? ((!reduce && (frame >> 3) & 1) ? P.yellow : P.red) : flagCol(f), {align: "right"});
  });
  const s = stocks[cur];
  box(4, 168, 248, 54);
  if (s) {
    txt(fitTxt(`${s.name} · ${s.market} · ${s.code}`, 232), 12, 173, P.white, {kr: true});
    txt(fitTxt(`테마 ${(s.themes || []).join(" / ") || "-"}`, 232), 12, 188, P.gray, {kr: true});
  }
  txt("A 전투   START 지도   SELECT 소리", 12, 203, P.yellow, {kr: true});
}

function bar(x, y, w, frac, col) { rect(x, y, w, 6, P.dgray); rect(x+1, y+1, w-2, 4, P.black); rect(x+1, y+1, Math.round((w-2) * Math.max(0, Math.min(1, frac))), 4, col); }
function drawBattle() {
  const s = stocks[cur], f = flagOf(s), fo = foreignOf(s), n = sameCode(s).length;
  rect(0, 14, W, 138, P.black);
  const sr = rng(42); for (let i = 0; i < 40; i++) { const x = sr()*W|0, y = 16 + sr()*70|0; if (reduce || ((frame + i*7) >> 5) % 4) rect(x, y, 1, 1, i % 5 ? P.dgray : P.gray); }
  for (let r = 0; r < 10; r++) { const w = Math.round(48 * Math.sqrt(1 - ((r - 5)/5.5)**2)); rect(186 - w, 112 + r, w*2, 1, r < 3 ? P.lgreen : P.green); }
  const bob = reduce ? 0 : (((frame >> 4) & 1) ? -1 : 0);
  ctx.drawImage(sprite(s), 162, 66 + bob, 48, 48);
  box(6, 20, 140, 80);
  txt(fitTxt(s.name, 84), 12, 25, P.white, {kr: true});
  rect(98, 25, 42, 14, {HIGH: P.red, MED: P.green, LOW: P.navy}[f]); txt(s.conf || "LOW", 119, 28, P.white, {align: "center"});
  txt("SIG", 12, 46, P.gray); bar(44, 46, 96, Math.min(1, n / 3), n >= 3 ? P.lgreen : n === 2 ? P.yellow : P.orange);
  txt(`${n}`, 140, 56, P.gray, {align: "right"});
  txt("FOR", 12, 66, P.gray); rect(44, 66, 96, 6, P.dgray); rect(45, 67, 94, 4, P.black); rect(91, 65, 2, 8, P.white);
  if (fo) { const mx = Math.max(1, ...[...FO.buy, ...FO.sell].map(x => Math.abs(x.net5))), w = Math.max(2, Math.round(Math.abs(fo.net5) / mx * 46)); if (fo.net5 > 0) rect(93, 67, w, 4, P.lgreen); else rect(91 - w, 67, w, 4, P.red); }
  txt(fo ? `${sgn(fo.net5, 0)}억` : "목록 밖", 140, 76, fo && fo.net5 < 0 ? P.red : P.gray, {kr: true, align: "right"});
  box(6, 106, 140, 42);
  txt(fitTxt(s.label, 124), 12, 111, P.white, {kr: true});
  txt(fitTxt(`테마 ${(s.themes || [])[0] || "-"}`, 124), 12, 127, P.lblue, {kr: true});
  box(4, 152, 248, 70);
  if (mode === "dlg" && dlg) {
    let left = Math.floor(dlg.shown);
    dlg.pages[dlg.p].forEach((ln, i) => { const part = ln.slice(0, Math.max(0, left)); left -= ln.length; txt(part, 12, 160 + i*20, P.white, {kr: true}); });
    if (dlg.shown < pageLen()) { const before = Math.floor(dlg.shown); dlg.shown += 1.2; if (Math.floor(dlg.shown) !== before && Math.floor(dlg.shown) % 3 === 0) beep(1320, .015); }
    else downArrow(238, 208);
  } else {
    txt("무엇을 할까?", 12, 160, P.white, {kr: true});
    txt("B 메뉴로", 12, 196, P.dgray, {kr: true});
    rect(156, 156, 2, 62, P.navy);
    CMDS.forEach((c, i) => { const y = 160 + i*19; if (i === cmdCur) cursor(166, y + 4); txt(c, 178, y, P.white, {kr: true}); });
  }
}

let gcache = null;
function drawMap() {
  rect(0, 14, W, H - 14, P.lblue);
  [[30, 40], [120, 30], [200, 52]].forEach(([cx, cy], i) => { const x = ((cx + (reduce ? 0 : frame * 0.15 * (i + 1))) % 300) - 30; rect(x, cy, 22, 6, P.white); rect(x + 4, cy - 4, 14, 4, P.white); rect(x + 8, cy - 7, 6, 3, P.white); });
  if (!gcache) {
    const mn = Math.min(...ser), mx = Math.max(...ser);
    gcache = Array.from({length: W}, (_, x) => ser.length > 1 ? Math.round(182 - (ser[Math.round(x / (W - 1) * (ser.length - 1))] - mn) / (mx - mn || 1) * 66) : 160);
  }
  for (let x = 0; x < W; x++) { const gy = gcache[x]; rect(x, gy, 1, 3, P.lgreen); rect(x, gy + 3, 1, 1, P.green); rect(x, gy + 4, 1, H - gy - 4, P.brown);
    for (let y = gy + 8; y < H; y += 8) rect(x, y, 1, 1, P.dbrown); if (((x + ((Math.floor(x / 16)) % 2) * 8) % 16) === 0) rect(x, gy + 4, 1, H - gy - 4, P.dbrown); }
  const th = (TH.items || []).slice(0, 7), mxT = Math.max(1, ...th.map(t => Math.abs(t.short ?? 0)));
  const pipes = th.map((t, i) => { const px = 20 + i*36, gy = gcache[px + 8] || gcache[px]; const h = Math.round(Math.abs(t.short ?? 0) / mxT * 40) + 8; return {t, px, gy, top: gy - h}; });
  pipes.forEach(({t, px, gy, top}, i) => {
    const pos = (t.short ?? 0) >= 0, body = pos ? P.green : P.red, hi = pos ? P.lgreen : P.orange;
    rect(px, top + 6, 16, gy - top - 6 + 2, P.black); rect(px + 1, top + 6, 14, gy - top - 6 + 2, body); rect(px + 3, top + 6, 2, gy - top - 6 + 2, hi);
    rect(px - 2, top, 20, 7, P.black); rect(px - 1, top + 1, 18, 5, body); rect(px + 1, top + 1, 2, 5, hi);
    txt(sgn(t.short), px + 8, top - 11 - (i % 2) * 10, P.black, {align: "center"});
    txt(fitTxt(t.name, 40), px + 8, i % 2 ? 206 : 193, P.white, {kr: true, align: "center", shadow: true});
  });
  const x = reduce ? 8 : ((frame * 0.7) % (W + 20)) - 10;
  let y = (gcache[Math.max(0, Math.min(W - 1, x + 4 | 0))] || 150) - 8;
  pipes.forEach(p => { const d = x + 4 - (p.px + 8); if (Math.abs(d) < 20) { const t = (d + 20) / 40; y = Math.min(y, p.top - 8 - Math.sin(t * Math.PI) * 8); } });
  const leg = reduce ? 0 : ((frame >> 3) & 1);
  rect(x + 1, y, 6, 2, P.red); rect(x + 1, y + 2, 6, 2, P.orange); rect(x + 2, y + 3, 1, 1, P.black); rect(x + 1, y + 4, 6, 2, P.blue); rect(x + (leg ? 0 : 1), y + 6, 2, 2, P.dbrown); rect(x + (leg ? 6 : 5), y + 6, 2, 2, P.dbrown);
  txt(`WORLD 1-1  KOSPI ${ser.length}D`, 6, 20, P.white, {shadow: true});
  txt("파이프 = 테마 단기수익률", 6, 30, P.navy, {kr: true});
  txt("B 돌아가기", 250, 30, P.navy, {kr: true, align: "right"});
}

function drawToast() { if (!toast || frame > toast.until) return; const w = measure(toast.t, false) + 16; box(128 - w/2, 96, w, 24); txt(toast.t, 128, 104, P.yellow, {align: "center"}); }

function loop() {
  frame++;
  if (scene === "menu") drawMenu(); else if (scene === "battle") drawBattle(); else drawMap();
  header(); drawToast();
  requestAnimationFrame(loop);
}

const keymap = {ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",z:"a",Z:"a",x:"b",X:"b",Enter:"start",Shift:"select",Escape:"b",Backspace:"b"," ":"a"};
addEventListener("keydown", e => { const k = keymap[e.key]; if (!k) return; if (e.target.closest && e.target.closest("button, input, textarea") && (e.key === "Enter" || e.key === " ")) return; e.preventDefault(); if (!e.repeat || k === "up" || k === "down") press(k); });
root.querySelectorAll("[data-k]").forEach(b => {
  b.addEventListener("pointerdown", e => { e.preventDefault(); b.classList.add("on"); press(b.dataset.k); });
  ["pointerup", "pointerleave", "pointercancel"].forEach(t => b.addEventListener(t, () => b.classList.remove("on")));
  b.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); press(b.dataset.k); } });
});
function fitScale() { const wr = cv.parentElement, cs = getComputedStyle(wr); const avail = wr.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); const k = avail >= 512 ? Math.floor(avail / 256) : avail / 256; cv.style.width = Math.floor(256 * k) + "px"; }
addEventListener("resize", fitScale); fitScale();
setInterval(() => { clock = kst(); }, 1000);
Promise.all([document.fonts.load(PX, "A"), document.fonts.load(KR, "가")]).then(() => tcache.clear()).catch(() => {});
loop();
}};
