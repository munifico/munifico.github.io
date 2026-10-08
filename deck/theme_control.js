// 🛰️ 관제실 테마 — 테마 극점 구체 + 신호표 + 계기판. deck.json 을 읽기만 한다 (정보 표시 전용).
window.DeckTheme = { mount(root, D) {
const CSS = `
.cr{--bg:#060b1a;--panel:#0a1226;--line:#1b2a4d;--line-hi:#2c4479;--fg:#c9d6f2;--dim:#6f80a8;--faint:#3e4d72;
 --accent:#6fa8ff;--accent-hi:#b9d4ff;--warn:#ff4d5e;--ok:#4fd1a5;--amber:#ffb547;
 --mono:"JetBrains Mono",ui-monospace,Menlo,Consolas,monospace;--kr:"IBM Plex Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif;
 background:var(--bg);color:var(--fg);font:400 11px/1.45 var(--mono);font-variant-numeric:tabular-nums;letter-spacing:.02em;
 padding:52px 16px 72px;min-height:100vh;box-sizing:border-box}
.cr *{box-sizing:border-box}
.cr .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--dim)}
.cr .kr{font-family:var(--kr);letter-spacing:0}
.cr .warn{color:var(--warn)}.cr .ok{color:var(--ok)}.cr .amb{color:var(--amber)}.cr .acc{color:var(--accent)}
.cr .topbar{display:flex;flex-wrap:wrap;gap:10px 28px;align-items:center;border:1px solid var(--line);padding:8px 12px;background:var(--panel)}
.cr .brand{font-weight:700;letter-spacing:.18em;color:var(--accent-hi)}
.cr .stat{display:flex;gap:8px;align-items:baseline}
.cr .stat b{font-size:20px;font-weight:300;color:var(--accent-hi)}
.cr .chip{border:1px solid var(--line-hi);padding:1px 8px;font-size:10px;letter-spacing:.12em;color:var(--accent)}
.cr .chip.amb{border-color:var(--amber);color:var(--amber)}
.cr .spacer{flex:1}
.cr .clock{font-size:18px;font-weight:300;color:var(--accent-hi)}
.cr .grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.7fr) minmax(0,1.25fr);gap:10px;margin-top:10px}
.cr .bottom{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.2fr);gap:10px;margin-top:10px}
.cr .panel{border:1px solid var(--line);background:var(--panel);padding:10px 12px;min-width:0;display:flex;flex-direction:column;gap:8px}
.cr .ph{display:flex;justify-content:space-between;gap:8px;border-bottom:1px solid var(--line);padding-bottom:6px}
.cr .ph .t{font-weight:500;letter-spacing:.14em;text-transform:uppercase}
.cr .col{display:flex;flex-direction:column;gap:10px;min-width:0}
.cr .kv{display:grid;grid-template-columns:auto minmax(0,1fr);gap:3px 10px}
.cr .kv span:nth-child(odd){color:var(--dim)}
.cr .kv span:nth-child(even){text-align:right}
.cr .big{font-size:30px;font-weight:300;color:var(--accent-hi);line-height:1}
.cr .bar{height:6px;background:#0f1a36;position:relative}
.cr .bar i{position:absolute;top:0;bottom:0;background:var(--accent)}
.cr .bar i.neg{background:var(--warn)}
.cr .bar.c::after{content:"";position:absolute;left:50%;top:-2px;bottom:-2px;width:1px;background:var(--faint)}
.cr .srow{display:grid;grid-template-columns:7.5em 1fr 46px;gap:8px;align-items:center}
.cr .srow>span:first-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cr .center{padding:0;position:relative;min-height:520px}
.cr .center .ph{position:absolute;top:10px;left:12px;right:12px;border:none;z-index:2}
.cr canvas.globe{width:100%;height:100%;display:block;min-height:520px}
.cr .legend{position:absolute;left:12px;bottom:10px;z-index:2;border:1px solid var(--line);background:rgba(6,11,26,.8);padding:6px 9px;display:grid;gap:3px}
.cr .legend div{display:flex;gap:8px;align-items:center}
.cr .dot{width:8px;height:8px;border-radius:50%;display:inline-block}
.cr .caption{position:absolute;right:12px;bottom:10px;z-index:2;max-width:260px;color:var(--dim);font-size:10px;text-align:right}
.cr table{width:100%;border-collapse:collapse}
.cr th{font-weight:400;color:var(--dim);font-size:10px;letter-spacing:.1em;text-align:left;padding:3px 4px;border-bottom:1px solid var(--line)}
.cr td{padding:4px 4px;border-bottom:1px solid #0f1a36;white-space:nowrap;max-width:11em;overflow:hidden;text-overflow:ellipsis}
.cr tr.sel td{background:rgba(111,168,255,.1)}
.cr tr.sel td:first-child{box-shadow:inset 2px 0 0 var(--accent-hi)}
.cr tbody tr{cursor:pointer}
.cr tbody tr:hover td{background:rgba(111,168,255,.07)}
.cr tbody tr:focus-visible{outline:1px solid var(--accent);outline-offset:-1px}
.cr .tag{font-size:9px;letter-spacing:.12em;padding:1px 5px;border:1px solid currentColor}
.cr .tablewrap{overflow-x:auto;max-height:430px;overflow-y:auto}
.cr .adv{border:1px solid var(--line);padding:8px 10px;white-space:pre-wrap;font-family:var(--kr);font-size:12px;line-height:1.55;min-height:150px}
.cr .advhead{display:flex;justify-content:space-between;align-items:center}
.cr .btn{background:none;border:1px solid var(--line-hi);color:var(--accent);font:inherit;font-size:10px;letter-spacing:.12em;padding:3px 9px;cursor:pointer}
.cr .btn:hover{border-color:var(--accent);color:var(--accent-hi)}
.cr .btn:focus-visible{outline:1px solid var(--accent-hi);outline-offset:2px}
.cr canvas.chart{width:100%;height:150px;display:block}
.cr .log{height:150px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;font-size:10.5px}
.cr .log div{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cr .btn.on{border-color:var(--accent-hi);color:var(--accent-hi);background:rgba(111,168,255,.12)}
.cr .fnp{margin-top:10px}
.cr .fnp tbody tr{cursor:default}
.cr .fnp td{max-width:none}
.cr .gauge{width:120px;height:6px;background:#0f1a36;position:relative;display:inline-block;vertical-align:middle}
.cr .gauge i{position:absolute;left:0;top:0;bottom:0}
.cr .gauge::after{content:"";position:absolute;left:50%;top:-3px;bottom:-3px;width:1px;background:var(--fg)}
.cr .foot{margin-top:10px;color:var(--faint);font-size:10px;display:flex;flex-wrap:wrap;gap:6px 20px}
@media (max-width:1100px){.cr .grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.cr .center{grid-column:1/-1;order:-1}.cr .bottom{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
@media (max-width:640px){.cr .grid,.cr .bottom{grid-template-columns:minmax(0,1fr)}.cr .center,.cr canvas.globe{min-height:400px}.cr .caption{display:none}}
`;
const font = document.createElement("link");
font.rel = "stylesheet";
font.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap";
document.head.appendChild(font);
const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
document.body.style.background = "#060b1a";

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const M = D.market || {}, S = D.signals || {items:[],types:[],stats:{}}, TH = D.themes || {items:[]}, FO = D.foreign || {buy:[],sell:[]}, EV = D.events || [];
const num = (v, d = 2) => v == null ? "—" : Number(v).toLocaleString("en-US", {minimumFractionDigits:d, maximumFractionDigits:d});
const sgn = (v, d = 2) => v == null ? "—" : (v > 0 ? "+" : "") + Number(v).toFixed(d);
const ymd = s => s && s.length === 8 ? `${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6)}` : (s || "");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const R = rng(20261007);
const all = S.items || [];
const stocks = all.slice(0, 12);
const confCol = c => c === "HIGH" ? "var(--warn)" : c === "MED" ? "var(--accent-hi)" : "var(--dim)";
const regCls = {BULL:"ok", BEAR:"warn", RANGE:"amb"}[M.regime] || "";
// 9대 테마 깔때기 + 주봉 엔벨 하단권 관찰. 엔벨 pb: 0 하단 · 1 상단(게이지 눈금), 주봉 1.5↑ = BURN
const FN = D.funnel || {rows: [], watch: []};

root.innerHTML = `<div class="cr">
<header class="topbar">
  <span class="brand">KOSPI · SIGNAL DECK</span>
  <span class="chip amb">DAILY · 장후 갱신</span>
  <div class="stat"><span class="lbl">KOSPI</span><b>${num(M.kospi?.value)}</b><span class="${(M.kospi?.chg ?? 0) >= 0 ? "ok" : "warn"}">${sgn(M.kospi?.chg)}%</span></div>
  <div class="stat"><span class="lbl">Regime</span><b class="${regCls}">${esc(M.regime || "—")}</b></div>
  <div class="stat"><span class="lbl">Signals</span><b>${all.length}</b><span class="lbl">/ ${(S.types || []).length} types · ${esc(ymd(S.date))}</span></div>
  <span class="spacer"></span>
  <span class="lbl">DATA ${esc(D.generated || "")}</span>
  <span class="lbl">KST</span><span class="clock" id="crclock">--:--:--</span>
</header>
<div class="grid">
  <div class="col">
    <section class="panel">
      <div class="ph"><span class="t">Market State</span><span class="lbl">${esc(ymd(M.regime_date))}</span></div>
      <div style="display:flex;gap:16px;align-items:flex-end;flex-wrap:wrap">
        <div><div class="lbl">KOSDAQ</div><div class="big">${num(M.kosdaq?.value)}</div></div>
        <div><div class="lbl">VKOSPI</div><div class="big">${num(M.vkospi?.value)}</div></div>
      </div>
      <div class="kv" id="crkv"></div>
    </section>
    <section class="panel">
      <div class="ph"><span class="t">Theme Momentum</span><span class="lbl">단기 % · ${esc(ymd(TH.date))}</span></div>
      <div id="crth" style="display:grid;gap:6px"></div>
    </section>
    <section class="panel">
      <div class="ph"><span class="t">Signal Mix</span><span class="lbl">by type</span></div>
      <div id="crmix" style="display:grid;gap:6px"></div>
    </section>
  </div>
  <section class="panel center">
    <div class="ph"><span class="t">Signal Sphere · ${(TH.items || []).length} theme poles</span><span class="lbl" id="crcursor">CURSOR · —</span></div>
    <canvas class="globe" id="crglobe" aria-label="상위 테마를 극점으로 두고 신호 종목을 배치한 회전 구체"></canvas>
    <div class="legend">
      <div class="lbl" style="color:var(--fg)">Marker = conf</div>
      <div><span class="dot" style="background:var(--warn)"></span><span>HIGH</span></div>
      <div><span class="dot" style="background:var(--accent-hi)"></span><span>MED</span></div>
      <div><span class="dot" style="background:var(--dim)"></span><span>LOW · 미분류</span></div>
    </div>
    <div class="caption">극점 = 단기수익률 상위 테마, 연결선 밝기 = 두 테마 수익률 크기(음수면 붉은색). 신호 종목은 소속 테마 극점 근처에, 상위 테마 밖이면 임의 위치에 놓입니다.</div>
  </section>
  <div class="col">
    <section class="panel">
      <div class="ph"><span class="t">Signal Table</span><span class="lbl">conf 순 · ${all.length}건</span></div>
      <div class="tablewrap"><table><thead><tr><th>종목</th><th>신호</th><th>CONF</th></tr></thead><tbody id="crsig"></tbody></table></div>
    </section>
    <section class="panel">
      <div class="advhead"><span class="lbl" style="color:var(--fg)">Signal Detail</span><button class="btn" id="crcopy" type="button">COPY</button></div>
      <div class="adv" id="cradv"></div>
    </section>
  </div>
</div>
<div class="bottom">
  <section class="panel"><div class="ph"><span class="t">KOSPI ${M.series ? M.series.dates.length : 0}D</span><span class="lbl">확정 종가 · LAST ${num(M.series?.kospi.at(-1))}</span></div><canvas class="chart" id="crk"></canvas></section>
  <section class="panel"><div class="ph"><span class="t">Signal Types</span><span class="lbl">상위 8</span></div><canvas class="chart" id="crhist"></canvas></section>
  <section class="panel"><div class="ph"><span class="t">Foreign · ${FO.window || 5}D</span><span class="lbl">억원 · 상위 매수/매도</span></div><canvas class="chart" id="crflow"></canvas></section>
  <section class="panel"><div class="ph"><span class="t">Events</span><span class="lbl">실적 D-day · 위험</span></div><div class="log" id="crlog"></div></section>
</div>
<section class="panel fnp"><div class="ph"><span class="t">Theme Funnel · Envelope 15</span>
  <span style="display:flex;gap:6px"><button class="btn on" type="button" data-fn="rows">FUNNEL ${(FN.rows || []).length}</button><button class="btn" type="button" data-fn="watch">LOW CAVE ${(FN.watch || []).length}</button></span></div>
  <div class="tablewrap" style="max-height:360px"><table><thead><tr><th>종목</th><th>테마</th><th>W-ENV</th><th>D-ENV</th><th>HIGH%</th></tr></thead><tbody id="crfn"></tbody></table></div>
  <div class="lbl kr" id="crfnnote" style="text-transform:none;letter-spacing:0"></div>
</section>
<div class="foot"><span>정보 표시 전용 — 매매 신호·추천 아님. 데이터는 장후 1회 갱신.</span><span>Render: Canvas 2D · no libraries</span></div>
</div>`;
const Q = s => root.querySelector(s);
const css = n => getComputedStyle(Q(".cr")).getPropertyValue(n).trim();
const C = {accent:css("--accent"),hi:css("--accent-hi"),warn:css("--warn"),dim:css("--dim"),faint:css("--faint"),line:css("--line"),fg:css("--fg"),ok:css("--ok"),bg:css("--bg")};
const hexA = (hex, a) => { const n = parseInt(hex.replace("#", ""), 16); return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`; };
const confHex = c => c === "HIGH" ? C.warn : c === "MED" ? C.hi : C.dim;

/* ---------- left panels ---------- */
const B = M.band || {};
Q("#crkv").innerHTML = [
  ["KOSDAQ 등락", `${sgn(M.kosdaq?.chg)}%`],
  ["VKOSPI 전일비", sgn(M.vkospi?.chg)],
  ["KOSPI PER", B.kospi ? `${num(B.kospi.per)} · ${B.kospi.per_pct}%ile` : "—"],
  ["KOSPI PBR", B.kospi ? `${num(B.kospi.pbr)} · ${B.kospi.pbr_pct}%ile` : "—"],
  ["위험 게이지", M.risk || "—"], ["디리스크", M.derisk || "—"], ["버블 체크", M.bubble || "—"],
].map(([k, v]) => `<span class="kr">${esc(k)}</span><span class="kr">${esc(v)}</span>`).join("");
const mxT = Math.max(1, ...(TH.items || []).map(t => Math.abs(t.short ?? 0)));
Q("#crth").innerHTML = (TH.items || []).map(t => {
  const v = t.short ?? 0, w = Math.abs(v) / mxT * 50, neg = v < 0;
  return `<div class="srow"><span class="kr" title="${esc(t.name)}">${esc(t.name)}</span><div class="bar c"><i class="${neg ? "neg" : ""}" style="${neg ? `right:50%;width:${w}%` : `left:50%;width:${w}%`}"></i></div><span style="text-align:right" class="${neg ? "warn" : ""}">${sgn(v)}</span></div>`;
}).join("") || '<span class="lbl">NO DATA</span>';
const types = S.types || [], mxN = Math.max(1, ...types.map(t => t.n));
Q("#crmix").innerHTML = types.slice(0, 6).map(t =>
  `<div class="srow"><span class="kr" title="${esc(t.label)}">${esc(t.label)}</span><div class="bar"><i style="left:0;width:${t.n / mxN * 100}%"></i></div><span style="text-align:right">${t.n}</span></div>`).join("");

/* ---------- table + detail ---------- */
let selected = 0;
const tb = Q("#crsig"), advEl = Q("#cradv");
function renderTable() {
  tb.innerHTML = all.map((s, i) => `<tr tabindex="0" data-i="${i}" class="${i === selected ? "sel" : ""}">
    <td><span class="kr">${esc(s.name)}</span> <span style="color:var(--faint)">${esc(s.code)}</span></td>
    <td><span class="kr">${esc(s.label)}</span></td>
    <td><span class="tag" style="color:${confCol(s.conf)}">${esc(s.conf || "—")}</span></td></tr>`).join("")
    || '<tr><td colspan="3" class="lbl">NO SIGNALS</td></tr>';
}
function renderAdv() {
  const s = all[selected]; if (!s) { advEl.textContent = "신호 없음"; return; }
  const same = all.filter(x => x.code === s.code);
  const f = FO.buy.find(x => x.code === s.code) || FO.sell.find(x => x.code === s.code);
  advEl.textContent =
`[${ymd(S.date)}] ${s.name} (${s.code}) · ${s.market}
${same.map(x => `· ${x.label}  conf ${x.conf || "-"}  ${x.stime}`).join("\n")}
테마: ${(s.themes || []).join(" / ") || "-"}
외국인 ${FO.window || 5}일: ${f ? `${sgn(f.net5, 1)}억 (주가 ${sgn(f.p5, 1)}%)` : "상위 매수/매도 목록 밖"}
장세: ${M.regime || "-"}

정보 표시용 요약입니다. 매매 판단은 사용자 몫입니다.`;
  const g = stocks.indexOf(s);
  Q("#crcursor").textContent = g >= 0 ? `CURSOR · ${s.code} · ${s.conf || "—"} · LAT ${s.lat.toFixed(1)}° LON ${s.lon.toFixed(1)}°` : `CURSOR · ${s.code} · 구체 밖(상위 12 외)`;
}
const pick = i => { selected = i; renderTable(); renderAdv(); };
tb.addEventListener("click", e => { const r = e.target.closest("tr[data-i]"); if (r) pick(+r.dataset.i); });
tb.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { const r = e.target.closest("tr[data-i]"); if (r) { e.preventDefault(); pick(+r.dataset.i); tb.querySelector(`tr[data-i="${selected}"]`)?.focus(); } } });
/* ---------- theme funnel ---------- */
const zoneOf = (pb, weekly) => pb == null ? ["—", "var(--dim)"] : weekly && pb >= 1.5 ? ["BURN", "var(--warn)"] : pb >= 1 ? ["RUN", "var(--amber)"] : pb >= 0.25 ? ["OK", "var(--ok)"] : ["LOW", "var(--accent)"];
const gauge = (pb, weekly) => { const [z, c] = zoneOf(pb, weekly); return `<span class="gauge"><i style="width:${Math.max(0, Math.min(1, (pb ?? 0) / 2)) * 100}%;background:${c}"></i></span> <span style="color:${c}">${pb == null ? "—" : pb.toFixed(2)} ${z}</span>`; };
const FN_NOTE = {
  rows: "테마∩유동성 → 이익 → 강도(고점 −25%·정배열) 통과. BURN = 주봉 15주선 +30% 초과: 4년 검증 8주 뒤 평균 −1.2%·중앙값 −10% → 신규 진입 보류 권장. RUN = 상단 돌파(추세 지속, 평균 수준).",
  watch: "주봉 엔벨 하단권. KOSPI 40주선 위에서는 8주 −1.5%(추가 하락 쪽), 아래(하락장)에서만 +5.9% 반등 — regime 먼저 확인.",
};
function renderFunnel(k) {
  const rows = FN[k] || [];
  Q("#crfn").innerHTML = rows.map(r => `<tr><td><span class="kr">${esc(r.name)}</span> <span style="color:var(--faint)">${esc(r.code)}</span></td>
    <td><span class="kr" style="color:var(--dim)">${esc((r.buckets || []).join(" · "))}</span></td>
    <td>${gauge(r.w_pb, true)}</td><td>${gauge(r.d_pb, false)}</td><td class="warn">${sgn(r.dist_pct, 1)}%</td></tr>`).join("")
    || '<tr><td colspan="5" class="lbl">NO DATA</td></tr>';
  Q("#crfnnote").textContent = `${ymd(FN.asof)} · ${FN_NOTE[k]}`;
  root.querySelectorAll("[data-fn]").forEach(b => b.classList.toggle("on", b.dataset.fn === k));
}
root.querySelectorAll("[data-fn]").forEach(b => b.addEventListener("click", () => renderFunnel(b.dataset.fn)));
renderFunnel("rows");

const copyBtn = Q("#crcopy");
copyBtn.addEventListener("click", () => {
  const done = () => { copyBtn.textContent = "COPIED"; setTimeout(() => copyBtn.textContent = "COPY", 1400); };
  const fallback = () => { const r = document.createRange(); r.selectNodeContents(advEl); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); copyBtn.textContent = "SELECTED"; setTimeout(() => copyBtn.textContent = "COPY", 1400); };
  try { navigator.clipboard.writeText(advEl.textContent).then(done, fallback); } catch (e) { fallback(); }
});

/* ---------- canvas helpers ---------- */
function fit(cv) {
  const dpr = Math.min(2, window.devicePixelRatio || 1), r = cv.getBoundingClientRect();
  cv.width = Math.max(1, r.width * dpr); cv.height = Math.max(1, r.height * dpr);
  const x = cv.getContext("2d"); x.setTransform(dpr, 0, 0, dpr, 0, 0);
  return {x, w: r.width, h: r.height};
}

/* ---------- globe ---------- */
const POLES = [[38,-20],[-12,40],[22,95],[-40,150],[55,-130],[-25,-75],[5,-175]];
const poles = (TH.items || []).slice(0, 7).map((t, i) => ({k: t.name, v: t.short ?? 0, lat: POLES[i][0], lon: POLES[i][1]}));
stocks.forEach(s => {
  const p = poles.find(p => (s.themes || []).includes(p.k));
  const r = rng(parseInt(s.code, 10) || 7);
  if (p) { s.lat = p.lat + (r() - .5) * 26; s.lon = p.lon + (r() - .5) * 34; }
  else { s.lat = (r() - .5) * 120; s.lon = (r() - .5) * 360; }
});
const toV = (lat, lon, r = 1) => { const la = lat * Math.PI / 180, lo = lon * Math.PI / 180; return [r*Math.cos(la)*Math.sin(lo), r*Math.sin(la), r*Math.cos(la)*Math.cos(lo)]; };
const slerpOut = (a, b, t, lift) => {
  const dot = Math.max(-1, Math.min(1, a[0]*b[0] + a[1]*b[1] + a[2]*b[2])), om = Math.acos(dot), so = Math.sin(om) || 1e-6;
  const k1 = Math.sin((1-t)*om)/so, k2 = Math.sin(t*om)/so, r = 1 + lift*Math.sin(Math.PI*t);
  return [(a[0]*k1 + b[0]*k2)*r, (a[1]*k1 + b[1]*k2)*r, (a[2]*k1 + b[2]*k2)*r];
};
const poleV = poles.map(p => toV(p.lat, p.lon));
const lines = [];
for (let i = 0; i < poles.length; i++) for (let j = i + 1; j < poles.length; j++) {
  const strength = Math.min(1, (Math.abs(poles[i].v) + Math.abs(poles[j].v)) / (2 * mxT));
  const n = 2 + Math.round(strength * 3);
  for (let k = 0; k < n; k++) {
    const lift = 0.15 + k * 0.22 + R() * 0.08, pts = [];
    for (let t = 0; t <= 1.0001; t += 1/48) pts.push(slerpOut(poleV[i], poleV[j], t, lift));
    lines.push({pts, a: 0.08 + strength * 0.25, neg: poles[i].v < 0 && poles[j].v < 0});
  }
}
for (let p = 0; p < 20; p++) {
  const phi = p / 20 * Math.PI * 2;
  for (const L of [1.6, 2.3]) {
    const pts = [];
    for (let th = 0.25; th <= Math.PI - 0.25; th += 0.05) { const r = L * Math.sin(th) ** 2; if (r < 1) continue; pts.push([r*Math.sin(th)*Math.cos(phi), r*Math.cos(th), r*Math.sin(th)*Math.sin(phi)]); }
    if (pts.length > 2) lines.push({pts, a: 0.06, neg: false, dip: true});
  }
}
let rot = 0.4, G;
function project(v, cx, cy, sc) {
  const cr = Math.cos(rot), sr = Math.sin(rot);
  const x = v[0]*cr + v[2]*sr, z = -v[0]*sr + v[2]*cr, y = v[1], tl = -0.32, ct = Math.cos(tl), stl = Math.sin(tl);
  const y2 = y*ct - z*stl, z2 = y*stl + z*ct, f = 3.6 / (3.6 - z2);
  return [cx + x*sc*f, cy - y2*sc*f, z2];
}
function drawGlobe() {
  const {x, w, h} = G; x.clearRect(0, 0, w, h);
  const cx = w/2, cy = h/2 + 10, sc = Math.min(w, h) * 0.22;
  x.strokeStyle = hexA(C.faint, .35); x.lineWidth = 1;
  for (const k of [1.55, 2.2]) { x.beginPath(); x.arc(cx, cy, sc*k, 0, Math.PI*2); x.stroke(); }
  x.setLineDash([2, 6]); x.beginPath(); x.moveTo(cx - sc*2.6, cy); x.lineTo(cx + sc*2.6, cy); x.moveTo(cx, cy - sc*2.2); x.lineTo(cx, cy + sc*2.2); x.stroke(); x.setLineDash([]);
  const g = x.createRadialGradient(cx - sc*.35, cy - sc*.4, sc*.1, cx, cy, sc*1.05);
  g.addColorStop(0, "#1b2c5c"); g.addColorStop(.7, "#0a1430"); g.addColorStop(1, "#050a1a");
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, sc, 0, Math.PI*2); x.fill();
  x.fillStyle = hexA(C.accent, .35);
  for (let la = -75; la <= 75; la += 15) for (let lo = -180; lo < 180; lo += 6) { const p = project(toV(la, lo), cx, cy, sc); if (p[2] > 0) x.fillRect(p[0], p[1], 1, 1); }
  x.globalCompositeOperation = "lighter";
  for (const L of lines) {
    x.beginPath(); let started = false;
    for (const v of L.pts) {
      const p = project(v, cx, cy, sc), hidden = p[2] < 0 && Math.hypot(p[0]-cx, p[1]-cy) < sc;
      if (hidden) { started = false; continue; }
      if (!started) { x.moveTo(p[0], p[1]); started = true; } else x.lineTo(p[0], p[1]);
    }
    x.strokeStyle = L.neg ? hexA(C.warn, L.a*1.4) : hexA(L.dip ? C.accent : C.hi, L.a); x.lineWidth = L.dip ? 0.8 : 1; x.stroke();
  }
  x.globalCompositeOperation = "source-over";
  x.font = "500 11px " + css("--kr");
  poles.forEach((s, i) => {
    const p = project(poleV[i], cx, cy, sc); if (p[2] < -0.15) return;
    x.strokeStyle = hexA(s.v < 0 ? C.warn : C.hi, .8); x.lineWidth = 1; x.beginPath(); x.arc(p[0], p[1], 5, 0, Math.PI*2); x.stroke();
    x.fillStyle = s.v < 0 ? C.warn : C.hi; x.fillText(s.k.length > 10 ? s.k.slice(0, 10) + "…" : s.k, p[0] + 8, p[1] - 6);
  });
  const labels = [], selS = all[selected];
  stocks.forEach((s, i) => {
    const p = project(toV(s.lat, s.lon, 1.02), cx, cy, sc), front = p[2] > 0, col = confHex(s.conf);
    x.fillStyle = hexA(col, front ? 1 : .25);
    const r = s.conf === "HIGH" ? 5 : s.conf === "MED" ? 4 : 3;
    x.beginPath(); x.arc(p[0], p[1], r, 0, Math.PI*2); x.fill();
    if (front) { x.fillStyle = hexA(col, .18); x.beginPath(); x.arc(p[0], p[1], r*3, 0, Math.PI*2); x.fill(); }
    if (front && (i < 5 || s === selS)) labels.push({s, p, col, on: s === selS});
  });
  const used = [];
  labels.forEach(({s, p, col, on}) => {
    const right = p[0] > cx, bw = 140, bh = 26;
    let lx = right ? Math.min(w - bw - 8, p[0] + sc*0.9) : Math.max(8, p[0] - sc*0.9 - bw), ly = p[1] - 18;
    while (used.some(u => Math.abs(u - ly) < 30)) ly += 30;
    ly = Math.max(40, Math.min(h - 60, ly)); used.push(ly);
    x.strokeStyle = hexA(col, .7); x.lineWidth = 1; x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(right ? lx : lx + bw, ly + bh/2); x.stroke();
    x.fillStyle = hexA(C.bg, .85); x.fillRect(lx, ly, bw, bh);
    x.strokeStyle = hexA(col, on ? 1 : .6); x.strokeRect(lx + .5, ly + .5, bw, bh);
    x.fillStyle = col; x.font = "500 11px " + css("--kr"); x.fillText(s.name, lx + 6, ly + 11);
    x.font = "10px " + css("--kr"); x.fillStyle = hexA(C.fg, .75);
    const lab = `${s.conf || "—"} · ${s.label}`; x.fillText(lab.length > 18 ? lab.slice(0, 18) + "…" : lab, lx + 6, ly + 22);
  });
}

/* ---------- bottom charts ---------- */
function drawK() {
  const {x, w, h} = fit(Q("#crk")), ser = (M.series?.kospi || []).filter(v => v != null);
  if (ser.length < 2) return;
  const pad = {l: 44, r: 8, t: 8, b: 18}, n = ser.length - 1;
  const mn = Math.min(...ser), mx = Math.max(...ser), rg = mx - mn || 1;
  const X = i => pad.l + i / n * (w - pad.l - pad.r), Y = v => pad.t + (1 - (v - mn) / rg) * (h - pad.t - pad.b);
  x.font = "9px " + css("--mono"); x.fillStyle = C.dim; x.strokeStyle = C.line; x.lineWidth = 1;
  [mn, (mn + mx) / 2, mx].forEach(v => { x.beginPath(); x.moveTo(pad.l, Y(v)); x.lineTo(w - pad.r, Y(v)); x.stroke(); x.fillText(v.toFixed(0), 2, Y(v) + 3); });
  const d = M.series.dates; x.fillText(ymd(d[0]).slice(5), pad.l, h - 4); x.fillText(ymd(d.at(-1)).slice(5), w - pad.r - 30, h - 4);
  const gr = x.createLinearGradient(0, pad.t, 0, h - pad.b); gr.addColorStop(0, hexA(C.accent, .28)); gr.addColorStop(1, hexA(C.accent, 0));
  x.beginPath(); ser.forEach((v, i) => i ? x.lineTo(X(i), Y(v)) : x.moveTo(X(i), Y(v))); x.lineTo(X(n), h - pad.b); x.lineTo(X(0), h - pad.b); x.closePath(); x.fillStyle = gr; x.fill();
  x.beginPath(); ser.forEach((v, i) => i ? x.lineTo(X(i), Y(v)) : x.moveTo(X(i), Y(v))); x.strokeStyle = C.hi; x.lineWidth = 1.2; x.stroke();
  x.fillStyle = C.hi; x.beginPath(); x.arc(X(n), Y(ser[n]), 3, 0, Math.PI*2); x.fill();
}
function drawHist() {
  const {x, w, h} = fit(Q("#crhist")), tt = types.slice(0, 8);
  if (!tt.length) return;
  const pad = {l: 22, r: 6, t: 8, b: 8}, bw = (w - pad.l - pad.r) / tt.length;
  x.font = "9px " + css("--mono"); x.fillStyle = C.dim; x.strokeStyle = C.line;
  [0, mxN].forEach(v => { const y = pad.t + (1 - v / mxN) * (h - pad.t - pad.b); x.beginPath(); x.moveTo(pad.l, y); x.lineTo(w - pad.r, y); x.stroke(); x.fillText(v, 2, y + 3); });
  tt.forEach((t, i) => {
    const bh = t.n / mxN * (h - pad.t - pad.b);
    x.fillStyle = hexA(C.accent, i ? .55 : .9); x.fillRect(pad.l + i*bw + 1, h - pad.b - bh, bw - 2, bh);
    x.save(); x.translate(pad.l + i*bw + bw/2 + 3, h - pad.b - 4); x.rotate(-Math.PI/2);
    x.fillStyle = C.fg; x.font = "9px " + css("--kr"); x.fillText(t.label.slice(0, 12), 0, 0); x.restore();
  });
}
function drawFlow() {
  const {x, w, h} = fit(Q("#crflow")), rows = [...FO.buy.slice(0, 4), ...FO.sell.slice(0, 4)];
  if (!rows.length) return;
  const pad = {l: 6, r: 6, t: 8, b: 8}, mx = Math.max(1, ...rows.map(r => Math.abs(r.net5)));
  const rh = (h - pad.t - pad.b) / rows.length, mid = pad.l + (w - pad.l - pad.r) / 2, half = (w - pad.l - pad.r) / 2 - 4;
  x.strokeStyle = C.faint; x.beginPath(); x.moveTo(mid, pad.t); x.lineTo(mid, h - pad.b); x.stroke();
  rows.forEach((r, i) => {
    const y = pad.t + i * rh, bw = Math.abs(r.net5) / mx * half, neg = r.net5 < 0;
    x.fillStyle = neg ? hexA(C.warn, .75) : hexA(C.ok, .75);
    x.fillRect(neg ? mid - bw : mid, y + 2, bw, rh - 4);
    x.font = "9px " + css("--kr"); x.fillStyle = C.fg; x.textAlign = neg ? "left" : "right";
    x.fillText(`${r.name} ${sgn(r.net5, 0)}`, neg ? mid + 4 : mid - 4, y + rh/2 + 3);
  });
  x.textAlign = "left";
}
Q("#crlog").innerHTML = EV.map(e => `<div><span class="${e.kind === "RISK" ? "warn" : "acc"}">${esc(e.kind)}</span> <span class="kr">${esc(e.text)}</span></div>`).join("") || '<div class="lbl">NO EVENTS</div>';

const kst = () => new Date().toLocaleTimeString("en-GB", {timeZone: "Asia/Seoul", hour12: false});
const clk = Q("#crclock"); clk.textContent = kst(); setInterval(() => { clk.textContent = kst(); }, 1000);

renderTable(); renderAdv();
function resizeAll() { G = fit(Q("#crglobe")); drawGlobe(); drawK(); drawHist(); drawFlow(); }
addEventListener("resize", resizeAll);
if (document.fonts?.ready) document.fonts.ready.then(resizeAll);
resizeAll();
if (!reduce) (function loop() { rot += 0.0025; drawGlobe(); requestAnimationFrame(loop); })();
}};
