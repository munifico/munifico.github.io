// ☀️/🌙 일반·다크 테마 — 허브 계열의 평범한 대시보드. key 가 "dark" 면 다크 팔레트. deck.json 을 읽기만 한다.
window.DeckTheme = { mount(root, D, key) {
const STYLE = `
.bs{--bg:#f6f7f9;--card:#fff;--fg:#1a1d23;--muted:#6b7280;--line:#e5e7eb;--accent:#7c3aed;--up:#d92d20;--down:#1d4ed8;--soft:#f3f4f6;--chip:#ede9fe;
 background:var(--bg);color:var(--fg);font:14px/1.55 -apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
 padding:56px 16px 72px;min-height:100vh;box-sizing:border-box}
.bs.dark{--bg:#0f1115;--card:#171a21;--fg:#e5e7eb;--muted:#9aa3b2;--line:#2a2f3a;--accent:#a78bfa;--up:#f87171;--down:#60a5fa;--soft:#1f232c;--chip:#2e2550}
.bs *{box-sizing:border-box}
.bs .wrap{max-width:1180px;margin:0 auto}
.bs h1{font-size:20px;margin:0 0 2px}
.bs .sub{color:var(--muted);font-size:12px;margin-bottom:14px}
.bs .stale{display:inline-block;background:var(--up);color:#fff;border-radius:6px;padding:1px 6px;margin-left:6px;font-size:11px}
.bs .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:12px}
.bs .tile{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 12px}
.bs .tile .k{color:var(--muted);font-size:12px}
.bs .tile .v{font-size:22px;font-weight:700;font-variant-numeric:tabular-nums}
.bs .tile .d{font-size:12px;font-variant-numeric:tabular-nums}
.bs .up{color:var(--up)} .bs .down{color:var(--down)} .bs .muted{color:var(--muted)}
.bs .grid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:12px}
.bs .col{display:flex;flex-direction:column;gap:12px;min-width:0}
.bs .card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px;min-width:0}
.bs .card h2{font-size:14px;margin:0 0 8px;display:flex;justify-content:space-between;gap:8px;align-items:baseline}
.bs .card h2 small{color:var(--muted);font-weight:400;font-size:12px}
.bs svg{display:block;width:100%;height:auto}
.bs .kv{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 12px;font-size:13px}
.bs .kv span:nth-child(odd){color:var(--muted)}
.bs .filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}
.bs input,.bs select{font:inherit;font-size:13px;color:var(--fg);background:var(--soft);border:1px solid var(--line);border-radius:8px;padding:6px 10px;min-width:0}
.bs input{flex:1 1 160px}
.bs .tbl{overflow:auto;max-height:560px;border-top:1px solid var(--line)}
.bs table{width:100%;border-collapse:collapse;font-size:13px}
.bs th{position:sticky;top:0;background:var(--card);text-align:left;color:var(--muted);font-weight:600;font-size:12px;padding:6px;border-bottom:1px solid var(--line)}
.bs td{padding:6px;border-bottom:1px solid var(--line);vertical-align:top}
.bs tbody tr.r{cursor:pointer}
.bs tbody tr.r:hover td{background:var(--soft)}
.bs tbody tr.r:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.bs tr.det td{background:var(--soft);font-size:12px;color:var(--muted)}
.bs .conf{display:inline-block;border-radius:6px;padding:0 6px;font-size:11px;font-weight:700;background:var(--soft);color:var(--muted)}
.bs .conf.HIGH{background:var(--up);color:#fff}.bs .conf.MED{background:var(--chip);color:var(--accent)}
.bs .code{color:var(--muted);font-size:11px;font-variant-numeric:tabular-nums}
.bs .bars{display:grid;gap:6px}
.bs .brow{display:grid;grid-template-columns:minmax(0,9em) 1fr 3.6em;gap:8px;align-items:center;font-size:12px}
.bs .brow>span:first-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bs .brow>span:last-child{text-align:right;font-variant-numeric:tabular-nums}
.bs .track{height:8px;background:var(--soft);border-radius:4px;position:relative;overflow:hidden}
.bs .track i{position:absolute;top:0;bottom:0;border-radius:4px}
.bs .track.c::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--line)}
.bs .two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.bs ol{margin:0;padding-left:18px;font-size:12px}
.bs ol li{margin:2px 0}
.bs ul.ev{margin:0;padding-left:16px;font-size:12px}
.bs .note{color:var(--muted);font-size:12px;margin-top:14px}
.bs .zn{display:inline-block;min-width:4.4em;border-radius:6px;padding:0 6px;font-size:11px;font-weight:700;font-variant-numeric:tabular-nums;text-align:center;background:var(--soft);color:var(--muted)}
.bs .zn.burn{background:var(--up);color:#fff}.bs .zn.run{background:#f59e0b;color:#1a1d23}.bs .zn.ok{background:var(--chip);color:var(--accent)}.bs .zn.low{background:var(--down);color:#fff}
.bs details summary{cursor:pointer;font-size:13px;margin:10px 0 6px;color:var(--muted)}
.bs .fnote{font-size:12px;color:var(--muted);margin:0 0 8px}
@media (max-width:900px){.bs .grid{grid-template-columns:minmax(0,1fr)}}
@media (max-width:480px){.bs .two{grid-template-columns:1fr}}
`;
const st = document.createElement("style"); st.textContent = STYLE; document.head.appendChild(st);
const dark = key === "dark";
document.body.style.background = dark ? "#0f1115" : "#f6f7f9";

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const M = D.market || {}, S = D.signals || {items:[],types:[],stats:{}}, TH = D.themes || {items:[]}, FO = D.foreign || {buy:[],sell:[]}, EV = D.events || [];
const all = S.items || [];
const num = (v, d = 2) => v == null ? "—" : Number(v).toLocaleString("ko-KR", {minimumFractionDigits:d, maximumFractionDigits:d});
const sgn = (v, d = 2) => v == null ? "—" : (v > 0 ? "+" : "") + Number(v).toFixed(d);
const cls = v => v > 0 ? "up" : v < 0 ? "down" : "muted";
const ymd = s => s && s.length === 8 ? `${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6)}` : (s || "");
const ageH = (Date.now() - new Date((D.generated || "").replace(" ", "T") + ":00+09:00").getTime()) / 36e5;
const REGK = {BULL:"강세장", RANGE:"횡보장", BEAR:"약세장"};
const B = M.band || {};

/* ---------- KOSPI line (SVG) ---------- */
function kospiSvg() {
  const ser = M.series?.kospi || [], d = M.series?.dates || [];
  if (ser.length < 2) return '<p class="muted">데이터 없음</p>';
  const W = 640, H = 200, pl = 48, pr = 10, pt = 10, pb = 22, n = ser.length - 1;
  const mn = Math.min(...ser), mx = Math.max(...ser), rg = mx - mn || 1;
  const X = i => pl + i / n * (W - pl - pr), Y = v => pt + (1 - (v - mn) / rg) * (H - pt - pb);
  const pts = ser.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
  const ticks = [mn, (mn + mx) / 2, mx].map(v => `<line x1="${pl}" x2="${W - pr}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${pl - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${Math.round(v).toLocaleString("ko-KR")}</text>`).join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="KOSPI 최근 ${ser.length}거래일 확정 종가">${ticks}
    <polyline points="${pl},${H - pb} ${pts} ${X(n)},${H - pb}" fill="var(--chip)" opacity=".6" stroke="none"/>
    <polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="${X(n)}" cy="${Y(ser[n])}" r="3.5" fill="var(--accent)"/>
    <text x="${pl}" y="${H - 5}" font-size="11" fill="var(--muted)">${ymd(d[0])}</text>
    <text x="${W - pr}" y="${H - 5}" font-size="11" fill="var(--muted)" text-anchor="end">${ymd(d.at(-1))} · ${num(ser[n])}</text></svg>`;
}
const band = k => B[k] ? `PER ${num(B[k].per)} (${B[k].per_pct}%ile) · PBR ${num(B[k].pbr)} (${B[k].pbr_pct}%ile) · 배당 ${num(B[k].div)} (${B[k].div_pct}%ile)` : "—";
const mxN = Math.max(1, ...(S.types || []).map(t => t.n));
const mxT = Math.max(1, ...(TH.items || []).map(t => Math.abs(t.short ?? 0)));
const fRow = r => `<li><b>${esc(r.name)}</b> <span class="${cls(r.net5)}">${sgn(r.net5, 0)}억</span> <span class="muted">(주가 ${sgn(r.p5, 1)}%)</span></li>`;
const s = S.stats || {};
// 9대 테마 깔때기: 주봉 엔벨 pb 1.5↑ 과열 · 1↑ 상단 돌파 · 0.25↑ 밴드 안 · 미만 하단권
const FN = D.funnel || {rows: [], watch: []};
const zone = (pb, weekly) => pb == null ? ["", "—"] : weekly && pb >= 1.5 ? ["burn", "과열"] : pb >= 1 ? ["run", "상단"] : pb >= 0.25 ? ["ok", "밴드"] : ["low", "하단"];
const zn = (pb, weekly) => { const [c, t] = zone(pb, weekly); return `<span class="zn ${c}">${t} ${pb == null ? "" : pb.toFixed(2)}</span>`; };
const fnTable = rows => rows.length ? `<div class="tbl"><table><thead><tr><th>종목</th><th>테마</th><th>주봉 엔벨</th><th>일봉 엔벨</th><th>고점대비</th></tr></thead><tbody>${rows.map(r =>
  `<tr><td><b>${esc(r.name)}</b> <span class="code">${esc(r.code)} · ${esc(r.type)}</span></td><td class="muted">${esc((r.buckets || []).join(", "))}</td><td>${zn(r.w_pb, true)}</td><td>${zn(r.d_pb, false)}</td><td class="down">${sgn(r.dist_pct, 1)}%</td></tr>`).join("")}</tbody></table></div>` : '<p class="muted">통과 종목 없음</p>';

root.innerHTML = `<div class="bs ${dark ? "dark" : ""}"><div class="wrap">
<h1>🕹️ Signal Deck</h1>
<div class="sub">${esc(ymd(S.date))} 신호 · 데이터 생성 ${esc(D.generated || "-")}${ageH > 36 ? '<span class="stale">오래된 데이터</span>' : ""}</div>
<div class="tiles">
  <div class="tile"><div class="k">KOSPI</div><div class="v">${num(M.kospi?.value)}</div><div class="d ${cls(M.kospi?.chg)}">${sgn(M.kospi?.chg)}%</div></div>
  <div class="tile"><div class="k">KOSDAQ</div><div class="v">${num(M.kosdaq?.value)}</div><div class="d ${cls(M.kosdaq?.chg)}">${sgn(M.kosdaq?.chg)}%</div></div>
  <div class="tile"><div class="k">VKOSPI</div><div class="v">${num(M.vkospi?.value)}</div><div class="d muted">전일비 ${sgn(M.vkospi?.chg)}</div></div>
  <div class="tile"><div class="k">장세 (KOSPI MA20)</div><div class="v">${esc(REGK[M.regime] || "—")}</div><div class="d muted">${esc(M.regime || "")} · ${esc(ymd(M.regime_date))}</div></div>
  <div class="tile"><div class="k">오늘 신호</div><div class="v">${all.length}건</div><div class="d muted">${(S.types || []).length}개 유형</div></div>
</div>
<div class="grid">
  <div class="col">
    <section class="card"><h2>KOSPI 확정 종가 <small>최근 ${M.series ? M.series.dates.length : 0}거래일</small></h2>${kospiSvg()}</section>
    <section class="card"><h2>신호 목록 <small id="bscount"></small></h2>
      <div class="filters"><input id="bsq" type="search" placeholder="종목명·코드·테마 검색" aria-label="신호 검색">
        <select id="bst" aria-label="신호 유형"><option value="">전체 유형</option>${(S.types || []).map(t => `<option value="${esc(t.type)}">${esc(t.label)} (${t.n})</option>`).join("")}</select></div>
      <div class="tbl"><table><thead><tr><th>종목</th><th>신호</th><th>등급</th><th>테마</th></tr></thead><tbody id="bsrows"></tbody></table></div>
    </section>
    <section class="card"><h2>🧭 9대 테마 깔때기 <small>${(FN.rows || []).length}종목 · ${esc(ymd(FN.asof))}</small></h2>
      <p class="fnote">테마∩유동성 → 이익 → 강도(고점 −25%·정배열) 통과. 엔벨 = MA15 ±15% 안 위치(0 하단·1 상단). 주봉 <b>과열(1.5↑)</b>은 4년 검증상 8주 뒤 평균 −1.2%·중앙값 −10% → 신규 진입 보류 권장. 상단(1~1.5)은 추세 지속 구간.</p>
      ${fnTable(FN.rows || [])}
      ${(FN.watch || []).length ? `<details><summary>🔎 하단권 관찰 ${FN.watch.length}종목 — KOSPI 40주선 위에서는 추가 하락 쪽(8주 −1.5%), 아래에서만 반등(+5.9%)</summary>${fnTable(FN.watch)}</details>` : ""}
    </section>
  </div>
  <div class="col">
    <section class="card"><h2>시장 상태</h2><div class="kv">
      <span>KOSPI 밸류</span><span>${esc(band("kospi"))}</span>
      <span>KOSDAQ 밸류</span><span>${esc(band("kosdaq"))}</span>
      <span>위험 게이지</span><span>${esc(M.risk || "—")}</span>
      <span>디리스크</span><span>${esc(M.derisk || "—")}</span>
      <span>버블 체크</span><span>${esc(M.bubble || "—")}</span></div></section>
    <section class="card"><h2>테마 모멘텀 <small>단기수익률 % · ${esc(ymd(TH.date))}</small></h2><div class="bars">${(TH.items || []).map(t => { const v = t.short ?? 0, w = Math.abs(v) / mxT * 50;
      return `<div class="brow"><span title="${esc(t.name)}">${esc(t.name)}</span><div class="track c"><i style="${v < 0 ? `right:50%;width:${w}%;background:var(--down)` : `left:50%;width:${w}%;background:var(--up)`}"></i></div><span class="${cls(v)}">${sgn(v)}</span></div>`; }).join("") || '<p class="muted">데이터 없음</p>'}</div></section>
    <section class="card"><h2>신호 유형 분포</h2><div class="bars">${(S.types || []).slice(0, 10).map(t =>
      `<div class="brow"><span title="${esc(t.label)}">${esc(t.label)}</span><div class="track"><i style="left:0;width:${t.n / mxN * 100}%;background:var(--accent)"></i></div><span>${t.n}</span></div>`).join("")}</div></section>
    <section class="card"><h2>외국인 ${FO.window || 5}일 순매수 <small>억원 · ${esc(ymd(FO.asof))}</small></h2>
      <div class="two"><div><div class="muted" style="font-size:12px">순매수 상위</div><ol>${FO.buy.map(fRow).join("")}</ol></div>
      <div><div class="muted" style="font-size:12px">순매도 상위</div><ol>${FO.sell.map(fRow).join("")}</ol></div></div></section>
    <section class="card"><h2>이벤트</h2><ul class="ev">${EV.map(e => `<li><b>${e.kind === "RISK" ? "⚠️" : "📅"}</b> ${esc(e.text)}</li>`).join("") || "<li>없음</li>"}</ul></section>
    <section class="card"><h2>누적 신호 성과 <small>/signal_dashboard/ 집계</small></h2><div class="kv">
      <span>전체 / 평가완료</span><span>${s.total ?? "—"} / ${s.done ?? "—"}</span>
      <span>D+${S.fwd_days ?? 5} 최고가 +${S.surge_pct ?? 15}% 도달</span><span>${s.hit_rate ?? "—"}%</span>
      <span>평균 D+5 수익률</span><span class="${cls(s.avg_d5)}">${sgn(s.avg_d5)}%</span></div></section>
  </div>
</div>
<p class="note">정보 표시 전용 — 매매 신호·추천이 아닙니다. 데이터는 장후 1회 갱신됩니다. 행을 누르면 같은 종목의 다른 신호와 외국인 수급이 펼쳐집니다.</p>
</div></div>`;

const Q = q => root.querySelector(q), body = Q("#bsrows");
let open = null;
function render() {
  const q = Q("#bsq").value.trim().toLowerCase(), t = Q("#bst").value;
  const rows = all.filter(x => (!t || x.type === t) && (!q || `${x.name} ${x.code} ${(x.themes || []).join(" ")}`.toLowerCase().includes(q)));
  Q("#bscount").textContent = `${rows.length} / ${all.length}건`;
  body.innerHTML = rows.map(x => {
    const id = `${x.code}|${x.type}`;
    let h = `<tr class="r" tabindex="0" data-id="${esc(id)}"><td><b>${esc(x.name)}</b> <span class="code">${esc(x.code)} · ${esc(x.market)}</span></td><td>${esc(x.label)}</td><td><span class="conf ${esc(x.conf)}">${esc(x.conf || "—")}</span></td><td class="muted">${esc((x.themes || []).join(", "))}</td></tr>`;
    if (open === id) {
      const same = all.filter(y => y.code === x.code && y !== x).map(y => `${y.label}(${y.conf || "-"})`);
      const f = FO.buy.find(y => y.code === x.code) || FO.sell.find(y => y.code === x.code);
      h += `<tr class="det"><td colspan="4">발생 ${esc(x.stime)} · 같은 날 다른 신호: ${esc(same.join(", ") || "없음")} · 외국인 ${FO.window || 5}일: ${f ? `${sgn(f.net5, 1)}억 (주가 ${sgn(f.p5, 1)}%)` : "상위 목록 밖"}</td></tr>`;
    }
    return h;
  }).join("") || '<tr><td colspan="4" class="muted">조건에 맞는 신호가 없습니다</td></tr>';
}
const toggle = tr => { open = open === tr.dataset.id ? null : tr.dataset.id; render(); body.querySelector(`tr[data-id="${CSS.escape(tr.dataset.id)}"]`)?.focus(); };
body.addEventListener("click", e => { const tr = e.target.closest("tr.r"); if (tr) toggle(tr); });
body.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { const tr = e.target.closest("tr.r"); if (tr) { e.preventDefault(); toggle(tr); } } });
Q("#bsq").addEventListener("input", render);
Q("#bst").addEventListener("change", render);
render();
}};
