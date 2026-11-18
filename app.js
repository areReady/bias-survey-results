(() => {
  "use strict";
  const { forms: FORMS, questions: QUESTIONS } = window.SURVEY;
  const STORE_PREFIX = "bias-survey:";

  // ---------- Helpers ----------
  const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pct = (v) => (v === null || v === undefined || !isFinite(v)) ? "—" : (v > 0 && v < 1 ? v.toFixed(1) : Math.round(v)) + "%";
  const answersOf = (q) => q.answer == null ? [] : (Array.isArray(q.answer) ? q.answer : [q.answer]);
  const labelOf = (o) => o.label || o.value;
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(STORE_PREFIX + k) || "null"); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(STORE_PREFIX + k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem(STORE_PREFIX + k); } catch {} },
  };

  function parseCSV(text) {
    text = text.replace(/^﻿/, "");
    const rows = []; let row = [], field = "", inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false; }
        else field += c;
      } else if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); rows.push(row); row = []; field = "";
      } else field += c;
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows.filter((r) => r.some((x) => x.trim() !== ""));
  }

  // ---------- Tallying ----------
  function tally(text) {
    const rows = parseCSV(text);
    if (rows.length < 1) return { error: "This file is empty." };
    const headers = rows[0].map(norm);
    const data = rows.slice(1);
    const warnings = [];
    const results = {};
    QUESTIONS.forEach((q, i) => {
      const qn = norm(q.text);
      let col = headers.findIndex((h) => h === qn);
      if (col < 0) col = headers.findIndex((h) => h.startsWith(qn) || (h.length > 12 && qn.startsWith(h)));
      if (col < 0 && headers.length === QUESTIONS.length + 1) col = i + 1; // fall back to column order after Timestamp
      const counts = Object.fromEntries(q.options.map((o) => [o.value, 0]));
      const optByNorm = Object.fromEntries(q.options.map((o) => [norm(o.value), o.value]));
      let n = 0, other = 0;
      if (col < 0) { warnings.push(`No column found for Q${q.id} ("${q.text}").`); }
      else {
        for (const r of data) {
          const v = (r[col] || "").trim();
          if (!v) continue;
          n++;
          const match = optByNorm[norm(v)];
          if (match) counts[match]++; else other++;
        }
      }
      const share = (value) => n ? (counts[value] / n) * 100 : null;
      results[q.id] = { n, counts, other, share, found: col >= 0 };
    });
    const unrecognized = QUESTIONS.reduce((a, q) => a + results[q.id].other, 0);
    if (unrecognized) warnings.push(`${unrecognized} answer${unrecognized === 1 ? "" : "s"} didn't match any choice and ${unrecognized === 1 ? "was" : "were"} left out.`);
    return { responses: data.length, results, warnings };
  }

  // ---------- State ----------
  const state = {}; // form id -> { name, source, text, tally, error, repoAvailable }
  let slideIndex = 0;

  async function loadForm(f) {
    const s = state[f.id] = { name: "", source: null, tally: null, error: null, repoAvailable: false };
    let repoText = null;
    try {
      const res = await fetch(f.file, { cache: "no-store" });
      if (res.ok) { repoText = await res.text(); s.repoAvailable = true; }
    } catch {}
    const uploaded = store.get(f.id);
    if (uploaded?.text) setText(f.id, uploaded.text, uploaded.name, "upload");
    else if (repoText) setText(f.id, repoText, f.file, "repo");
    else s.error = `Couldn't load ${f.file}. Upload the CSV from Google Forms instead.`;
  }

  function setText(id, text, name, source) {
    const s = state[id];
    const t = tally(text);
    s.name = name; s.source = source; s.error = t.error || null; s.tally = t.error ? null : t;
  }

  // ---------- Data file cards ----------
  function renderDatasets() {
    const el = document.getElementById("datasets");
    el.innerHTML = FORMS.map((f, i) => {
      const s = state[f.id];
      const t = s.tally;
      return `<article class="ds" id="ds-${f.id}" style="--c: var(--c${i + 1})">
        <div class="ds-head"><h2>${esc(f.label)}</h2>
          <span class="ds-n">${t ? t.responses : "—"} <small>responses</small></span></div>
        <p class="ds-prompt">“${esc(f.prompt)}”</p>
        ${s.error ? `<p class="ds-warn">${esc(s.error)}</p>` : `<p class="ds-file">${s.source === "upload" ? "Uploaded file: " : "From "}${esc(s.name)}</p>`}
        ${t && t.warnings.length ? `<p class="ds-warn">${t.warnings.map(esc).join("<br>")}</p>` : ""}
        <div class="ds-actions">
          <label class="btn small drop">Upload a different CSV<input type="file" accept=".csv,text/csv" id="file-${f.id}" aria-label="Upload CSV for ${esc(f.label)}"></label>
          ${s.source === "upload" && s.repoAvailable ? `<button class="btn small" type="button" data-reset="${f.id}">Go back to ${esc(f.file)}</button>` : ""}
        </div>
      </article>`;
    }).join("") + `<article class="ds ds-ref">
        <div class="ds-head"><h2 class="c3">Real-world data</h2><span class="ds-n">17 <small>questions</small></span></div>
        <p>Best available US data for each question. Six questions have a percentage for each answer choice, five name a more likely answer without one, and six have no single answer.</p>
      </article>`;

    FORMS.forEach((f) => {
      const card = document.getElementById(`ds-${f.id}`);
      const input = document.getElementById(`file-${f.id}`);
      input.addEventListener("change", () => input.files[0] && readFile(f.id, input.files[0]));
      ["dragenter", "dragover"].forEach((ev) => card.addEventListener(ev, (e) => { e.preventDefault(); card.classList.add("over"); }));
      ["dragleave", "drop"].forEach((ev) => card.addEventListener(ev, (e) => { e.preventDefault(); card.classList.remove("over"); }));
      card.addEventListener("drop", (e) => { const file = e.dataTransfer.files[0]; if (file) readFile(f.id, file); });
    });
    el.querySelectorAll("[data-reset]").forEach((b) => b.addEventListener("click", async () => {
      const f = FORMS.find((x) => x.id === b.dataset.reset);
      store.del(f.id); await loadForm(f); renderAll();
    }));
  }

  function readFile(id, file) {
    const r = new FileReader();
    r.onload = () => {
      const text = String(r.result);
      setText(id, text, file.name, "upload");
      if (state[id].tally) store.set(id, { name: file.name, text });
      renderAll();
    };
    r.readAsText(file);
  }

  // ---------- Summary ----------
  const answerable = QUESTIONS.filter((q) => answersOf(q).length);
  const matchShare = (formId, q) => {
    const r = state[formId].tally?.results[q.id];
    if (!r || !r.n) return null;
    return answersOf(q).reduce((a, v) => a + r.share(v), 0);
  };
  const refShare = (q) => q.kind === "split" ? answersOf(q).reduce((a, v) => a + (q.options.find((o) => o.value === v)?.ref || 0), 0) : null;

  function renderSummary() {
    const el = document.getElementById("summary");
    const cards = FORMS.map((f, i) => {
      const vals = answerable.map((q) => matchShare(f.id, q)).filter((v) => v !== null);
      if (!vals.length) return `<div class="stat"><span class="stat-label">${esc(f.label)}</span><span class="stat-value">—</span><span class="stat-sub">No data loaded</span></div>`;
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      const maj = answerable.filter((q) => (matchShare(f.id, q) ?? 0) > 50).length;
      return `<div class="stat"><span class="stat-label">${esc(f.label)}</span>
        <span class="stat-value c${i + 1}">${pct(avg)}</span>
        <span class="stat-sub">of answers matched the real-world answer. The majority matched it on ${maj} of ${answerable.length} questions.</span></div>`;
    });
    // Biggest shift between the two forms on any single answer choice
    let best = null;
    if (state.form1.tally && state.form2.tally) {
      for (const q of QUESTIONS) {
        const a = state.form1.tally.results[q.id], b = state.form2.tally.results[q.id];
        if (!a.n || !b.n) continue;
        for (const o of q.options) {
          const d = b.share(o.value) - a.share(o.value);
          if (!best || Math.abs(d) > Math.abs(best.d)) best = { q, o, d, a: a.share(o.value), b: b.share(o.value) };
        }
      }
    }
    cards.push(best
      ? `<div class="stat"><span class="stat-label">Biggest change from Accurate to Fair</span>
          <span class="stat-value">${best.d > 0 ? "+" : "−"}${Math.round(Math.abs(best.d))} <small style="font-size:1rem">points</small></span>
          <span class="stat-sub">Q${best.q.id}: “${esc(labelOf(best.o))}” went from ${pct(best.a)} to ${pct(best.b)}.</span></div>`
      : `<div class="stat"><span class="stat-label">Biggest change from Accurate to Fair</span><span class="stat-value">—</span><span class="stat-sub">Needs both files</span></div>`);
    el.innerHTML = cards.join("");
  }

  // ---------- Overview ----------
  function renderOverview() {
    const el = document.getElementById("overview");
    const row = (q) => {
      const s1 = matchShare("form1", q), s2 = matchShare("form2", q), ref = refShare(q);
      const lo = Math.min(s1 ?? 0, s2 ?? 0), hi = Math.max(s1 ?? 0, s2 ?? 0);
      return `<a class="ov-row" href="#q${q.id}" data-q="${q.id}" aria-label="Question ${q.id}: Accurate ${pct(s1)}, Fair ${pct(s2)}${ref !== null ? `, real world ${pct(ref)}` : ""}">
        <span class="ov-q"><b>${q.id}</b>${esc(q.short)}</span>
        <span class="ov-track"><span class="ov-mid"></span>
          ${s1 !== null && s2 !== null ? `<span class="ov-link" style="left:${lo}%;width:${hi - lo}%"></span>` : ""}
          ${ref !== null ? `<span class="ov-ref" style="left:${ref}%" title="Real-world share ${pct(ref)}"></span>` : ""}
          ${s1 !== null ? `<span class="ov-dot d1" style="left:${s1}%"></span>` : ""}
          ${s2 !== null ? `<span class="ov-dot d2" style="left:${s2}%"></span>` : ""}
        </span>
        <span class="ov-vals"><span class="c1">${pct(s1)}</span> · <span class="c2">${pct(s2)}</span></span>
      </a>`;
    };
    const majority = (formId, q) => {
      const r = state[formId].tally?.results[q.id];
      if (!r || !r.n) return "—";
      const top = q.options.map((o) => ({ o, v: r.share(o.value) })).sort((a, b) => b.v - a.v)[0];
      return `${pct(top.v)} ${esc(labelOf(top.o))}`;
    };
    const openRow = (q) => `<a class="ov-row ov-open" href="#q${q.id}" data-q="${q.id}">
        <span class="ov-q"><b>${q.id}</b>${esc(q.short)}</span>
        <span class="ov-open-text"><span class="c1">Accurate: ${majority("form1", q)}</span> · <span class="c2">Fair: ${majority("form2", q)}</span></span>
        <span class="ov-vals">${esc(q.quality.split(" ")[0])} data</span>
      </a>`;
    el.innerHTML = `<div class="ov">
      <div class="ov-axis"><span></span><span class="ov-scale"><span style="left:0">0%</span><span style="left:50%">50%</span><span style="left:100%">100%</span></span><span class="ov-vals">Accurate · Fair</span></div>
      ${answerable.map(row).join("")}
      <p class="hint" style="padding:6px">The dark tick shows the real-world share where the data gives one.</p>
      <div class="ov-sep">No single real-world answer · most common choice</div>
      ${QUESTIONS.filter((q) => !answersOf(q).length).map(openRow).join("")}
    </div>`;
    el.querySelectorAll(".ov-row").forEach((a) => a.addEventListener("click", (e) => {
      if (document.body.classList.contains("slides")) { e.preventDefault(); goTo(QUESTIONS.findIndex((q) => q.id === +a.dataset.q)); }
    }));
  }

  // ---------- Question cards ----------
  function qualityClass(q) { return norm(q.quality).split(" ")[0]; }
  function kindLabel(q) {
    return q.kind === "split" ? "Real-world share for each choice" : q.kind === "answer" ? "Data favors one answer" : "No single real-world answer";
  }

  function shiftLine(q) {
    const a = state.form1.tally?.results[q.id], b = state.form2.tally?.results[q.id];
    if (!a?.n || !b?.n) return "";
    const target = answersOf(q).length === 1 ? q.options.find((o) => o.value === answersOf(q)[0]) : null;
    const pick = target || q.options.map((o) => ({ o, d: Math.abs(b.share(o.value) - a.share(o.value)) })).sort((x, y) => y.d - x.d)[0].o;
    const va = a.share(pick.value), vb = b.share(pick.value), d = Math.round(vb - va);
    const dir = d === 0 ? "no change" : `${d > 0 ? "+" : "−"}${Math.abs(d)} points`;
    return `<p class="shift">From Accurate to Fair, “${esc(labelOf(pick))}” went from <b class="c1">${pct(va)}</b> to <b class="c2">${pct(vb)}</b> (${dir}).</p>`;
  }

  function renderQuestions() {
    const el = document.getElementById("questions");
    let lastGroup = null, html = "";
    for (const q of QUESTIONS) {
      if (q.group !== lastGroup) { html += `<h2 class="group-title">${esc(q.group)}</h2>`; lastGroup = q.group; }
      const ans = answersOf(q);
      const opts = q.options.map((o) => {
        const bars = FORMS.map((f, i) => {
          const r = state[f.id].tally?.results[q.id];
          const v = r && r.n ? r.share(o.value) : null;
          const count = r && r.n ? `${r.counts[o.value]} of ${r.n}` : "";
          return `<div class="bar-row f${i + 1}" title="${esc(f.label)}: ${count}"><span>${i === 0 ? "Accurate" : "Fair"}</span><span class="bar"><i data-w="${v ?? 0}"></i></span><span class="bar-val">${pct(v)}</span></div>`;
        }).join("");
        const rw = q.kind === "split" ? `<div class="bar-row rw"><span>Real world</span><span class="bar"><i data-w="${o.ref}"></i></span><span class="bar-val">${pct(o.ref)}</span></div>` : "";
        return `<div class="opt"><div class="opt-label">${esc(labelOf(o))}${ans.includes(o.value) ? '<span class="tag-real">Real-world answer</span>' : ""}</div>${bars}${rw}</div>`;
      }).join("");
      html += `<article class="q" id="q${q.id}" data-index="${QUESTIONS.indexOf(q)}">
        <div class="q-head"><span class="q-num">Q${q.id}</span>
          <div class="q-title"><h3>${esc(q.text.trim())} <span class="blank">___</span></h3>
            <div class="chips"><span class="chip ${qualityClass(q)}">${esc(q.quality)} data</span><span class="chip">${kindLabel(q)}</span></div></div></div>
        <div class="q-body">
          <div class="opts">${opts}</div>
          <aside class="ref">
            <span class="ref-label">What the data shows</span>
            <p class="ref-answer">${esc(q.summary)}</p>
            <p class="ref-est">${esc(q.estimate)}</p>
            ${q.note ? `<p class="ref-note">${esc(q.note)}</p>` : ""}
            <details><summary>Sources</summary><ul>${q.sources.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></details>
          </aside>
        </div>
        ${shiftLine(q)}
      </article>`;
    }
    el.innerHTML = html;
    requestAnimationFrame(() => el.querySelectorAll(".bar i").forEach((i) => { i.style.width = Math.max(0, Math.min(100, +i.dataset.w)) + "%"; }));
  }

  // ---------- One-at-a-time view ----------
  const toggle = document.getElementById("slide-toggle");
  const nav = document.getElementById("slide-nav");
  function setSlides(on) {
    document.body.classList.toggle("slides", on);
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "Show all questions" : "Present one question at a time";
    nav.hidden = !on;
    if (on) goTo(slideIndex); else document.querySelectorAll(".q.current").forEach((c) => c.classList.remove("current"));
  }
  function goTo(i) {
    slideIndex = Math.max(0, Math.min(QUESTIONS.length - 1, i));
    document.querySelectorAll(".q").forEach((c) => c.classList.toggle("current", +c.dataset.index === slideIndex));
    document.getElementById("slide-pos").textContent = `Question ${QUESTIONS[slideIndex].id} of ${QUESTIONS.length}`;
    document.getElementById("prev").disabled = slideIndex === 0;
    document.getElementById("next").disabled = slideIndex === QUESTIONS.length - 1;
    history.replaceState(null, "", `#q${QUESTIONS[slideIndex].id}`);
    window.scrollTo({ top: 0 });
  }
  toggle.addEventListener("click", () => setSlides(!document.body.classList.contains("slides")));
  document.getElementById("slide-exit").addEventListener("click", () => setSlides(false));
  document.getElementById("prev").addEventListener("click", () => goTo(slideIndex - 1));
  document.getElementById("next").addEventListener("click", () => goTo(slideIndex + 1));
  document.addEventListener("keydown", (e) => {
    if (!document.body.classList.contains("slides") || e.target.closest("input, textarea, select")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); goTo(slideIndex + 1); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); goTo(slideIndex - 1); }
    if (e.key === "Escape") setSlides(false);
  });

  function renderAll() {
    renderDatasets(); renderSummary(); renderOverview(); renderQuestions();
    if (document.body.classList.contains("slides")) goTo(slideIndex);
  }

  // ---------- Boot ----------
  (async () => {
    await Promise.all(FORMS.map(loadForm));
    renderAll();
    const m = location.hash.match(/^#q(\d+)$/);
    if (m) {
      const i = QUESTIONS.findIndex((q) => q.id === +m[1]);
      if (i >= 0) { slideIndex = i; document.getElementById(`q${QUESTIONS[i].id}`)?.scrollIntoView(); }
    }
  })();
})();
