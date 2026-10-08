// 💾 터미널 테마 — 1989 CRT 단말기 스킨. deck.json 을 읽기만 한다 (정보 표시 전용).
window.DeckTheme = { mount(root, D) {
const CSS = `
.t89{--desk:#1b1712;--bezel:#cfc4a8;--bezel-dk:#9c917a;--bezel-ink:#4a4334;--glass:#020a04;
 --ph:#41ff7a;--ph-mid:#25b052;--ph-dim:#13612d;--ph-glow:rgba(65,255,122,.55);
 --crt:"VT323","Nanum Gothic Coding",ui-monospace,monospace;--kr:"Nanum Gothic Coding","VT323",ui-monospace,monospace;
 background:var(--desk);color:var(--ph);font-family:var(--crt);padding:56px 16px 72px;min-height:100vh;box-sizing:border-box}
.t89.amber{--glass:#0b0600;--ph:#ffb53a;--ph-mid:#c27e19;--ph-dim:#6b420a;--ph-glow:rgba(255,181,58,.5)}
.t89 *{box-sizing:border-box}
.t89 .monitor{max-width:1180px;margin:0 auto;background:linear-gradient(180deg,var(--bezel),var(--bezel-dk));border-radius:22px;padding:26px 26px 18px;box-shadow:0 18px 40px rgba(0,0,0,.55),inset 0 2px 0 rgba(255,255,255,.35)}
.t89 .screen{position:relative;background:var(--glass);border-radius:28px/22px;padding:22px 26px 18px;overflow:hidden;box-shadow:inset 0 0 0 3px #0c0c0a,inset 0 0 60px rgba(0,0,0,.9);font-size:20px;line-height:1.15;text-shadow:0 0 4px var(--ph-glow),0 0 1px var(--ph)}
.t89 .screen::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:5;background:repeating-linear-gradient(180deg,rgba(0,0,0,.28) 0 1px,transparent 1px 3px)}
.t89 .screen::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:6;background:radial-gradient(ellipse at center,transparent 58%,rgba(0,0,0,.55) 100%)}
.t89 .flicker{animation:t89f 6s infinite}
@keyframes t89f{0%,97%,100%{opacity:1}98%{opacity:.86}99%{opacity:.95}}
@keyframes t89b{50%{opacity:0}}
.t89 .blink{animation:t89b 1s steps(1) infinite}
@media (prefers-reduced-motion:reduce){.t89 .flicker,.t89 .blink{animation:none}}
.t89 .kr{font-family:var(--kr);font-size:.82em;letter-spacing:0}
.t89 .dim{color:var(--ph-mid)} .t89 .faint{color:var(--ph-dim)}
.t89 .inv{background:var(--ph);color:var(--glass);text-shadow:none;padding:0 4px}
.t89 .status{display:flex;flex-wrap:wrap;gap:4px 22px;border-bottom:2px solid var(--ph-mid);padding-bottom:4px}
.t89 .status .sp{flex:1}
.t89 .wrap{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:16px;margin-top:16px}
.t89 .box{border:3px double var(--ph-mid);padding:10px 10px 10px;position:relative;min-width:0}
.t89 .box>.ttl{position:absolute;top:-14px;left:12px;max-width:calc(100% - 24px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:var(--glass);padding:0 6px;color:var(--ph)}
.t89 .right{display:flex;flex-direction:column;gap:20px;min-width:0}
.t89 table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}
.t89 th{font-weight:400;text-align:left;color:var(--ph-mid);border-bottom:1px dashed var(--ph-dim);padding:2px 4px}
.t89 td{text-align:left;padding:2px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:14em}
.t89 tbody tr{cursor:pointer}
.t89 tbody tr:hover td{background:rgba(65,255,122,.08)}
.t89.amber tbody tr:hover td{background:rgba(255,181,58,.08)}
.t89 tbody tr:focus-visible{outline:1px dashed var(--ph);outline-offset:-1px}
.t89 tr.hot td{background:var(--ph);color:var(--glass);text-shadow:none}
.t89 tr.sel td:first-child::before{content:"> "}
.t89 .tbl{overflow-x:auto}
.t89 canvas{width:100%;display:block;image-rendering:pixelated;image-rendering:crisp-edges;aspect-ratio:240/64}
.t89 .row{display:grid;grid-template-columns:8.5em 1fr 4.6em;gap:8px;align-items:center;margin-top:3px}
.t89 .blocks{height:14px;display:flex;gap:2px;overflow:hidden}
.t89 .blocks i{flex:0 0 9px;background:var(--ph);box-shadow:0 0 4px var(--ph-glow)}
.t89 .blocks.neg i{background:transparent;border:1px solid var(--ph)}
.t89 .kv{display:grid;grid-template-columns:auto 1fr;gap:2px 14px}
.t89 .term{margin-top:20px}
.t89 #t89out{height:230px;overflow-y:auto;white-space:pre-wrap;word-break:break-word;scrollbar-width:thin;scrollbar-color:var(--ph-dim) transparent}
.t89 .prompt{display:flex;gap:8px;align-items:center;margin-top:6px}
.t89 #t89cmd{flex:1;min-width:0;background:transparent;border:none;color:var(--ph);font:inherit;text-shadow:inherit;caret-color:var(--ph);outline:none;text-transform:uppercase}
.t89 #t89cmd::placeholder{color:var(--ph-dim)}
.t89 .fkeys{display:flex;flex-wrap:wrap;gap:6px 10px;margin-top:12px;border-top:2px solid var(--ph-mid);padding-top:8px}
.t89 .fk{background:none;border:none;font:inherit;color:var(--ph);text-shadow:inherit;cursor:pointer;padding:0;display:flex;gap:4px}
.t89 .fk b{font-weight:400;background:var(--ph);color:var(--glass);text-shadow:none;padding:0 4px}
.t89 .fk:focus-visible{outline:1px dashed var(--ph);outline-offset:3px}
.t89 .chin{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-top:14px;padding:0 8px;color:var(--bezel-ink);font-family:Georgia,"Times New Roman",serif;font-size:13px}
.t89 .badge{font-style:italic;font-weight:700;letter-spacing:.06em}
.t89 .knobs{display:flex;gap:14px;align-items:center}
.t89 .led{width:10px;height:10px;border-radius:50%;background:var(--ph);box-shadow:0 0 8px var(--ph)}
.t89 .knob{width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#e9e1cc,#8d8470);border:1px solid #6d6555;cursor:pointer}
.t89 .note{max-width:1180px;margin:12px auto 0;color:#8a826f;font-family:var(--kr);font-size:12px;line-height:1.6}
@media (max-width:860px){.t89 .wrap{grid-template-columns:minmax(0,1fr)}.t89 .screen{font-size:18px;padding:16px 14px}.t89 .monitor{padding:14px 12px 12px;border-radius:16px}}
@media (max-width:480px){.t89 .screen{font-size:17px}.t89 .hide-sm{display:none}}
`;
const font = document.createElement("link");
font.rel = "stylesheet";
font.href = "https://fonts.googleapis.com/css2?family=VT323&family=Nanum+Gothic+Coding:wght@400;700&display=swap";
document.head.appendChild(font);
const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);

/* ---------- data helpers ---------- */
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const M = D.market || {}, S = D.signals || {items:[],types:[],stats:{}}, TH = D.themes || {items:[]}, FO = D.foreign || {buy:[],sell:[]};
const EV = D.events || [];
const num = (v, d = 2) => v == null ? "----" : Number(v).toLocaleString("en-US", {minimumFractionDigits:d, maximumFractionDigits:d});
const sgn = (v, d = 2) => v == null ? "--" : (v > 0 ? "+" : "") + Number(v).toFixed(d);
const ymd = s => s && s.length === 8 ? `${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6)}` : (s || "");
const pad = (s, n) => String(s).padStart(n);
const ageH = (Date.now() - new Date((D.generated || "").replace(" ", "T") + ":00+09:00").getTime()) / 36e5;
const REG = {BULL:"BULL",RANGE:"RANGE",BEAR:"BEAR"}[M.regime] || "----";
const items = S.items || [];
const TOPN = 15;
// 9대 테마 깔때기 + 주봉 엔벨 하단권 관찰. 엔벨 pb: 0 하단 · 1 상단, 주봉 1.5↑ = BURN(과열)
const FN = D.funnel || {rows: [], watch: []};
const fnAll = [...(FN.rows || []), ...(FN.watch || [])];
const zoneT = (pb, weekly) => pb == null ? "----" : weekly && pb >= 1.5 ? '<span class="inv">BURN</span>' : pb >= 1 ? "RUN " : pb >= 0.25 ? "OK  " : "LOW ";
const f2 = v => v == null ? "--" : v.toFixed(2);

/* ---------- layout ---------- */
root.innerHTML = `<div class="t89"><div class="monitor"><div class="screen flicker">
  <div class="status">
    <span>KSE-89 SIGNAL DECK</span>
    <span>KOSPI ${num(M.kospi?.value)} ${sgn(M.kospi?.chg)}%</span>
    <span class="hide-sm">KOSDAQ ${num(M.kosdaq?.value)} ${sgn(M.kosdaq?.chg)}%</span>
    <span class="hide-sm">VKOSPI ${num(M.vkospi?.value)}</span>
    <span>REGIME <span class="inv">${REG}</span></span>
    <span class="sp"></span>
    ${ageH > 36 ? '<span class="inv blink">STALE</span>' : ""}
    <span class="dim">DATA ${esc(D.generated || "")}</span>
    <span>KST <span id="t89clock">--:--:--</span></span>
  </div>
  <div class="wrap">
    <div class="box"><span class="ttl">[ SIGNAL LIST · ${Math.min(TOPN, items.length)} OF ${items.length} · ${esc(ymd(S.date))} ]</span>
      <div class="tbl"><table><thead><tr><th>NAME</th><th>CODE</th><th>SIGNAL</th><th>CONF</th></tr></thead><tbody id="t89sig"></tbody></table></div>
      <div class="faint" style="margin-top:8px">CONF 순 정렬 · 행 클릭 = SHOW · 전체는 LIST ALL</div>
    </div>
    <div class="right">
      <div class="box"><span class="ttl">[ KOSPI ${M.series ? M.series.dates.length : 0}D · 확정 종가 ]</span>
        <canvas id="t89k" width="240" height="64" aria-label="KOSPI 최근 확정 종가 픽셀 차트"></canvas>
        <div class="dim" style="display:flex;justify-content:space-between"><span>${esc(ymd(M.series?.dates[0]))}</span><span>LAST ${num(M.series?.kospi.at(-1))}</span><span>${esc(ymd(M.series?.dates.at(-1)))}</span></div>
      </div>
      <div class="box"><span class="ttl">[ MARKET STATE ]</span><div class="kv" id="t89mkt"></div></div>
      <div class="box"><span class="ttl">[ THEME MOMENTUM · 단기수익률 % · ${esc(ymd(TH.date))} ]</span><div id="t89th"></div></div>
    </div>
  </div>
  <div class="box term"><span class="ttl">[ TERMINAL ]</span>
    <div id="t89out" aria-live="polite"></div>
    <form class="prompt" id="t89form" autocomplete="off">
      <label for="t89cmd">C:\\DECK&gt;</label><input id="t89cmd" spellcheck="false" placeholder="TYPE HELP">
      <span class="blink" aria-hidden="true">█</span>
    </form>
  </div>
  <div class="fkeys" id="t89fk"></div>
</div>
<div class="chin"><span class="badge">KSE Datasystems · Model 89-G</span>
  <span class="knobs"><span class="led" aria-hidden="true"></span><button class="knob" type="button" id="t89knob" aria-label="화면 색 전환"></button><span>PHOSPHOR</span></span></div>
</div>
<p class="note">정보 표시 전용 — 매매 신호·추천 아님. 데이터는 장후 1회 갱신 (생성 ${esc(D.generated || "-")}).
행을 클릭하거나 <b>SHOW 005930</b> · <b>SHOW 삼성전자</b> 처럼 입력해 보세요. 키보드 F1~F10 도 동작합니다.</p></div>`;
const T = root.querySelector(".t89");
try { if (localStorage.getItem("deck_t89_amber") === "1") T.classList.add("amber"); } catch (e) {}

/* ---------- signal table ---------- */
const tb = T.querySelector("#t89sig");
let sel = -1;
function renderTable() {
  tb.innerHTML = items.slice(0, TOPN).map((s, i) => `<tr tabindex="0" data-i="${i}" class="${s.conf === "HIGH" ? "hot" : ""} ${i === sel ? "sel" : ""}">
    <td><span class="kr">${esc(s.name)}</span></td><td>${esc(s.code)}</td><td><span class="kr">${esc(s.label)}</span></td><td>${esc(s.conf || "-")}</td></tr>`).join("")
    || `<tr><td colspan="4" class="dim">NO SIGNALS</td></tr>`;
}
renderTable();
function pick(i) { sel = i; renderTable(); run("SHOW " + items[i].code); }
tb.addEventListener("click", e => { const r = e.target.closest("tr[data-i]"); if (r) pick(+r.dataset.i); });
tb.addEventListener("keydown", e => { if (e.key === "Enter") { const r = e.target.closest("tr[data-i]"); if (r) { pick(+r.dataset.i); tb.querySelector(`tr[data-i="${sel}"]`)?.focus(); } } });

/* ---------- market + themes ---------- */
const B = M.band || {};
const bandTxt = k => B[k] ? `PER ${num(B[k].per)} (${B[k].per_pct}%ile) · PBR ${num(B[k].pbr)} (${B[k].pbr_pct}%ile)` : "----";
T.querySelector("#t89mkt").innerHTML = [
  ["KOSPI 밸류", bandTxt("kospi")], ["KOSDAQ 밸류", bandTxt("kosdaq")],
  ["VKOSPI", `${num(M.vkospi?.value)} (${sgn(M.vkospi?.chg)})`],
  ["위험 게이지", M.risk || "-"], ["디리스크", M.derisk || "-"], ["버블 체크", M.bubble || "-"],
].map(([k, v]) => `<span class="dim kr">${esc(k)}</span><span class="kr">${esc(v)}</span>`).join("");
T.querySelector("#t89th").innerHTML = (TH.items || []).map(t => {
  const v = t.short ?? 0, n = Math.max(1, Math.min(15, Math.round(Math.abs(v) * 3)));
  return `<div class="row"><span class="kr" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${esc(t.name)}">${esc(t.name)}</span><span class="blocks ${v < 0 ? "neg" : ""}">${"<i></i>".repeat(n)}</span><span style="text-align:right">${sgn(v)}</span></div>`;
}).join("") || '<span class="dim">NO DATA</span>';

/* ---------- pixel chart ---------- */
function drawK() {
  const cv = T.querySelector("#t89k"), x = cv.getContext("2d"), W = cv.width, H = cv.height;
  const ser = (M.series?.kospi || []).filter(v => v != null);
  x.clearRect(0, 0, W, H);
  if (ser.length < 2) return;
  const cs = getComputedStyle(T), ph = cs.getPropertyValue("--ph").trim(), dim = cs.getPropertyValue("--ph-dim").trim();
  const mn = Math.min(...ser), mx = Math.max(...ser), Y = v => Math.round((1 - (v - mn) / (mx - mn || 1)) * (H - 3)) + 1;
  const X = i => Math.round(i / (ser.length - 1) * (W - 4));
  x.fillStyle = dim;
  for (let gx = 0; gx < W; gx += 4) for (const gy of [H >> 2, H >> 1, (3 * H) >> 2]) x.fillRect(gx, gy, 1, 1);
  x.fillStyle = ph;
  let px = X(0), py = Y(ser[0]);
  ser.forEach((v, i) => { const cx = X(i), cy = Y(v); for (let k = px; k <= cx; k++) { const yy = Math.round(py + (cy - py) * ((k - px) / Math.max(1, cx - px))); x.fillRect(k, Math.min(yy, cy), 1, Math.abs(cy - yy) + 1); } px = cx; py = cy; });
  x.fillRect(W - 4, Y(ser.at(-1)) - 1, 3, 3);
}
drawK();
if (document.fonts?.ready) document.fonts.ready.then(drawK);

/* ---------- terminal ---------- */
const out = T.querySelector("#t89out");
const print = html => { out.insertAdjacentHTML("beforeend", html + "\n"); out.scrollTop = out.scrollHeight; };
const HR = '<span class="dim">----------------------------------------</span>';
const line = s => ` ${esc(s.code)} ${pad(esc(s.conf || "-"), 4)}  <span class="kr">${esc(s.name)} · ${esc(s.label)}</span>`;
const fnLine = r => ` ${esc(r.code)} WK ${pad(f2(r.w_pb), 5)} ${zoneT(r.w_pb, true)} DY ${pad(f2(r.d_pb), 5)} ${pad(sgn(r.dist_pct, 1), 6)}%  <span class="kr">${esc(r.name)} · ${esc((r.buckets || []).join("/"))}</span>`;
const fnDetail = r => ` FUNNEL  WK ${f2(r.w_pb)} ${zoneT(r.w_pb, true)} · DY ${f2(r.d_pb)} ${zoneT(r.d_pb, false)} · <span class="kr">고점 ${sgn(r.dist_pct, 1)}% · ${esc(r.type)} · ${esc((r.buckets || []).join("/"))}</span>`;
function show(q) {
  const hits = items.filter(s => s.code === q || s.name.toUpperCase() === q);
  const fn = fnAll.find(r => r.code === q || r.name.toUpperCase() === q);
  if (!hits.length && fn) return `${HR}\n <span class="kr">${esc(fn.name)}</span> (${esc(fn.code)})  <span class="dim">NO SIGNAL TODAY</span>\n${fnDetail(fn)}\n${HR}`;
  if (!hits.length) return `NOT FOUND IN ${esc(ymd(S.date))} SIGNALS: ${esc(q || "(EMPTY)")}\nTRY: LIST ALL`;
  const s = hits[0];
  const fb = FO.buy.find(f => f.code === s.code), fs = FO.sell.find(f => f.code === s.code), f = fb || fs;
  return `${HR}
 <span class="kr">${esc(s.name)}</span> (${esc(s.code)})  <span class="kr">${esc(s.market)}</span>
 SIGNALS ${hits.length}
${hits.map(h => `   · <span class="kr">${esc(h.label)}</span>  CONF ${esc(h.conf || "-")}  ${esc(h.stime)}`).join("\n")}
 THEMES  <span class="kr">${esc((s.themes || []).join(" / ") || "-")}</span>
 FOREIGN ${f ? `<span class="kr">5일 ${sgn(f.net5, 1)}억 · 1일 ${sgn(f.net1, 1)}억 · 주가 ${sgn(f.p5, 1)}%</span>` : '<span class="dim">TOP 외인 리스트 밖</span>'}
${fn ? fnDetail(fn) + "\n" : ""}${HR}`;
}
const cmds = {
  HELP: () => `AVAILABLE COMMANDS
  LIST [ALL]      SIGNALS BY CONF (DEFAULT TOP 20)
  SHOW &lt;CODE|NAME&gt; DETAIL (E.G. SHOW 005930)
  TYPES           SIGNAL COUNT BY TYPE
  THEMES          THEME MOMENTUM (SHORT/MID %)
  FOREIGN         외국인 5일 순매수/순매도 TOP
  MARKET          REGIME · VALUATION · RISK
  EVENTS          EARNINGS D-DAY · RISK ITEMS
  STATS           누적 신호 성과
  FUNNEL          9대 테마 깔때기 + 주봉/일봉 엔벨
  LOWCAVE         주봉 엔벨 하단권 관찰
  PHOSPHOR        GREEN / AMBER
  CLS             CLEAR SCREEN`,
  LIST: a => { const all = a[0] === "ALL", l = all ? items : items.slice(0, 20); return ` CODE   CONF  NAME · SIGNAL   (${l.length}/${items.length})\n` + l.map(line).join("\n"); },
  TYPES: () => (S.types || []).map(t => ` ${pad(t.n, 3)}  <span class="kr">${esc(t.label)}</span>  <span class="faint">${esc(t.type)}</span>`).join("\n") || "NO DATA",
  THEMES: () => ` SHORT   MID   THEME\n` + (TH.items || []).map(t => ` ${pad(sgn(t.short), 6)} ${pad(sgn(t.mid), 6)}  <span class="kr">${esc(t.name)} · ${esc(t.label)} · 상승비율 ${Math.round((t.breadth ?? 0) * 100)}%</span>`).join("\n"),
  FOREIGN: () => { const f = r => ` ${pad(sgn(r.net5, 0), 8)}억  <span class="kr">${esc(r.name)}</span>  <span class="faint">주가 ${sgn(r.p5, 1)}%</span>`;
    return `외국인 ${FO.window || 5}일 누적 (${esc(ymd(FO.asof))})\n[BUY]\n${FO.buy.map(f).join("\n")}\n[SELL]\n${FO.sell.map(f).join("\n")}`; },
  MARKET: () => ` REGIME   ${REG}  <span class="faint">(KOSPI 종가 vs MA20 · 기울기, ${esc(ymd(M.regime_date))})</span>
 KOSPI    ${num(M.kospi?.value)} ${sgn(M.kospi?.chg)}%
 KOSDAQ   ${num(M.kosdaq?.value)} ${sgn(M.kosdaq?.chg)}%
 VKOSPI   ${num(M.vkospi?.value)} (${sgn(M.vkospi?.chg)})
 <span class="kr">KOSPI ${esc(bandTxt("kospi"))}</span>
 <span class="kr">위험 ${esc(M.risk || "-")} · 디리스크 ${esc(M.derisk || "-")} · 버블 ${esc(M.bubble || "-")}</span>`,
  EVENTS: () => EV.map(e => ` <span class="inv">${esc(e.kind)}</span> <span class="kr">${esc(e.text)}</span>`).join("\n") || "NO EVENTS",
  STATS: () => { const s = S.stats || {}; return ` TOTAL ${s.total ?? "-"} · DONE ${s.done ?? "-"} · PENDING ${s.pending ?? "-"}
 <span class="kr">D+${S.fwd_days ?? 5} 내 최고가 +${S.surge_pct ?? 15}% 도달 ${s.hit_rate ?? "-"}% · 평균 D+5 ${sgn(s.avg_d5)}%</span>
 <span class="faint kr">신호 성과 대시보드(/signal_dashboard/) 집계 기준</span>`; },
  PHOSPHOR: () => { T.classList.toggle("amber"); const a = T.classList.contains("amber"); try { localStorage.setItem("deck_t89_amber", a ? "1" : "0"); } catch (e) {} drawK(); return "PHOSPHOR SET TO " + (a ? "P3 AMBER" : "P1 GREEN"); },
  FUNNEL: () => (FN.rows || []).length ? ` 9대 테마 깔때기 (${esc(ymd(FN.asof))}) · <span class="kr">엔벨 MA15±15% 위치 0 하단 · 1 상단</span>
 CODE   WK-ENV       DY-ENV   HIGH%   NAME · THEME
${FN.rows.map(fnLine).join("\n")}
 <span class="faint kr">BURN = 주봉 15주선 +30% 초과: 4년 검증 8주 뒤 평균 −1.2%·중앙값 −10% → 신규 진입 보류 권장</span>` : "NO FUNNEL DATA",
  LOWCAVE: () => (FN.watch || []).length ? ` 주봉 엔벨 하단권 관찰 (${FN.watch.length})
${FN.watch.map(fnLine).join("\n")}
 <span class="faint kr">KOSPI 40주선 위에서는 8주 −1.5%(추가 하락 쪽), 아래에서만 +5.9% 반등 — REGIME 먼저 확인</span>` : "NO LOWCAVE DATA",
  CLS: () => { out.innerHTML = ""; return null; },
};
function run(raw) {
  const ln = String(raw).trim().toUpperCase(); if (!ln) return;
  print(`<span class="dim">C:\\DECK&gt;</span> ${esc(ln)}`);
  const [c, ...a] = ln.split(/\s+/);
  if (c === "SHOW") { print(show(a.join(" "))); return; }
  if (cmds[c]) { const r = cmds[c](a); if (r !== null) print(r); return; }
  print(`BAD COMMAND OR FILE NAME: ${esc(c)}\nTYPE HELP FOR A LIST OF COMMANDS`);
}
T.querySelector("#t89form").addEventListener("submit", e => { e.preventDefault(); const i = T.querySelector("#t89cmd"); run(i.value); i.value = ""; });
const FK = [["F1","HELP"],["F2","LIST"],["F3","TYPES"],["F4","THEMES"],["F5","FOREIGN"],["F6","MARKET"],["F7","EVENTS"],["F8","STATS"],["F9","PHOSPHOR"],["F10","CLS"],["FN","FUNNEL"],["LC","LOWCAVE"]];
T.querySelector("#t89fk").innerHTML = FK.map(([k, c]) => `<button class="fk" type="button" data-cmd="${c}"><b>${k}</b>${c}</button>`).join("");
T.querySelectorAll(".fk").forEach(b => b.addEventListener("click", () => run(b.dataset.cmd)));
T.querySelector("#t89knob").addEventListener("click", () => run("PHOSPHOR"));
const fmap = Object.fromEntries(FK);
addEventListener("keydown", e => { if (fmap[e.key]) { e.preventDefault(); run(fmap[e.key]); } });

const kst = () => new Date().toLocaleTimeString("en-GB", {timeZone: "Asia/Seoul", hour12: false});
const clk = T.querySelector("#t89clock"); clk.textContent = kst(); setInterval(() => { clk.textContent = kst(); }, 1000);

print(`<span class="dim">KSE DATASYSTEMS BIOS 2.03  (C) 1989
MEMORY TEST ........ 640K OK
LOADING DECK.JSON .. ${esc(D.generated || "?")}</span>
${esc(ymd(S.date))} SIGNALS ${items.length} · TYPES ${(S.types || []).length} · REGIME <span class="inv">${REG}</span>
FUNNEL ${(FN.rows || []).length} · LOWCAVE ${(FN.watch || []).length}
TYPE HELP OR PRESS F1`);
}};
