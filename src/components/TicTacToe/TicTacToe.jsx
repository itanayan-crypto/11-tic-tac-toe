import React, { useReducer, useEffect, useState } from 'react';

/* ============================== Styles ============================== */
const CSS = `
.ts-app{
  position:relative; overflow:hidden; max-width:520px; margin:0 auto; padding:20px 18px 24px; border-radius:28px;
  color:var(--text); font-family:inherit; font-size:16px; background:linear-gradient(165deg,var(--bg-a),var(--bg-b));
}
.ts-app *,.ts-app *::before,.ts-app *::after{box-sizing:border-box}
.ts-app button{font:inherit}
.ttt-th-neon{--bg-a:#0b1020; --bg-b:#1b1040; --text:#eaf0ff; --muted:#98a3c7; --x:#38e8ff; --o:#ff5fb0; --accent:#c8ff4d; --accent-text:#10200a;
  --slot:rgba(130,150,255,.09); --slot-hover:rgba(130,150,255,.2); --panel:rgba(255,255,255,.05); --edge:rgba(140,160,255,.28);
  --hot:#ff6b6b; --dlg:#131838; --glow-x:rgba(56,232,255,.55); --glow-o:rgba(255,95,176,.55); --glow:rgba(200,255,77,.4)}
.ttt-th-sunset{--bg-a:#2a1240; --bg-b:#7a2a4a; --text:#fff0e6; --muted:#e0b4c0; --x:#ffd166; --o:#ff5d8f; --accent:#ff9f1c; --accent-text:#2a1240;
  --slot:rgba(255,220,200,.1); --slot-hover:rgba(255,220,200,.22); --panel:rgba(255,255,255,.07); --edge:rgba(255,200,190,.32);
  --hot:#4de1ff; --dlg:#3a1648; --glow-x:rgba(255,209,102,.55); --glow-o:rgba(255,93,143,.55); --glow:rgba(255,159,28,.45)}
.ttt-th-ice{--bg-a:#e8f0fb; --bg-b:#d3e1f6; --text:#14213d; --muted:#54638a; --x:#2347d6; --o:#e0332f; --accent:#14213d; --accent-text:#ffffff;
  --slot:rgba(35,71,214,.08); --slot-hover:rgba(35,71,214,.16); --panel:rgba(255,255,255,.65); --edge:#b7c6e6;
  --hot:#c026d3; --dlg:#ffffff; --glow-x:rgba(35,71,214,.3); --glow-o:rgba(224,51,47,.3); --glow:rgba(20,33,61,.25)}
.ttt-screen{display:flex; flex-direction:column; gap:14px; min-height:600px}
.ttt-logo{display:flex; justify-content:center; gap:12px; margin-top:6px}
.ttt-logo .ttt-glyph{width:44px; height:44px}
.ttt-title{font-size:2.3rem; margin:0; text-align:center; letter-spacing:-.02em; line-height:1.05; font-weight:800}
.ttt-title small{display:block; font-size:.95rem; letter-spacing:.4em; color:var(--muted); font-weight:600; margin-top:4px}
.ttt-tag{text-align:center; color:var(--muted); margin:0 0 2px}
.ttt-field{display:flex; flex-direction:column; gap:6px}
.ttt-field > span{font-size:.78rem; letter-spacing:.08em; text-transform:uppercase; color:var(--muted)}
.ttt-themes{display:grid; grid-template-columns:repeat(3,1fr); gap:8px}
.ttt-theme{display:flex; align-items:center; justify-content:center; gap:6px; border:1px solid var(--edge); background:var(--panel); color:var(--text); border-radius:14px; padding:9px 6px; cursor:pointer}
.ttt-theme[aria-pressed="true"]{border-color:var(--text); box-shadow:0 0 0 1px var(--text)}
.ttt-theme i{width:12px; height:12px; border-radius:50%; display:inline-block}
.ttt-rules{list-style:none; margin:4px 0 0; padding:14px; display:grid; gap:9px; font-size:.92rem; color:var(--muted); border:1px solid var(--edge); border-radius:18px; background:var(--panel)}
.ttt-rules b{color:var(--text)}
.ttt-stats{display:grid; grid-template-columns:repeat(3,1fr); gap:8px; text-align:center}
.ttt-stats div{border:1px solid var(--edge); border-radius:14px; padding:8px; background:var(--panel)}
.ttt-stats b{display:block; font-size:1.5rem; line-height:1.1}
.ttt-stats span{font-size:.75rem; color:var(--muted)}
.ttt-top{display:flex; justify-content:space-between; align-items:center; margin-bottom:12px}
.ttt-round{font-weight:600}
.ttt-mini{border:1px solid var(--edge); background:var(--panel); color:var(--text); border-radius:999px; padding:5px 14px; cursor:pointer; font-size:.88rem}
.ttt-hud{display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px}
.ttt-pcard{border:1px solid var(--edge); border-radius:18px; padding:10px 12px; background:var(--panel); transition:box-shadow .2s,border-color .2s}
.ttt-pcard.ttt-on{border-color:var(--text); box-shadow:0 0 22px var(--glow)}
.ttt-phead{display:flex; align-items:center; gap:8px}
.ttt-phead .ttt-glyph{width:26px; height:26px}
.ttt-pname{font-weight:700}
.ttt-pips{display:flex; gap:5px; margin:8px 0}
.ttt-pip{width:13px; height:13px; border-radius:50%; border:2px solid var(--muted); opacity:.7}
.ttt-pcard.ttt-px .ttt-pip.ttt-full{background:var(--x); border-color:var(--x); opacity:1; box-shadow:0 0 8px var(--glow-x)}
.ttt-pcard.ttt-po .ttt-pip.ttt-full{background:var(--o); border-color:var(--o); opacity:1; box-shadow:0 0 8px var(--glow-o)}
.ttt-powers{display:flex; gap:6px; flex-wrap:wrap}
.ttt-pw{border:1px solid var(--edge); background:transparent; color:var(--text); border-radius:999px; padding:4px 11px; cursor:pointer; font-size:.8rem}
.ttt-pw:disabled{opacity:.3; cursor:default}
.ttt-pw.ttt-armed{background:var(--hot); border-color:var(--hot); color:#101010}
.ttt-panel{border:1px solid var(--edge); border-radius:24px; padding:14px; background:var(--panel)}
.ttt-status{margin:0 0 8px 2px; min-height:1.5em}
.ttt-timer{height:7px; border-radius:99px; background:var(--slot); overflow:hidden; margin:0 2px 12px}
.ttt-timer i{display:block; height:100%; background:var(--accent); transition:width 1s linear}
.ttt-timer.ttt-low i{background:var(--hot)}
.ttt-board{position:relative; display:grid; gap:3%; aspect-ratio:1; width:100%}
.ttt-sq{appearance:none; position:relative; border:0; padding:0; cursor:pointer; border-radius:20px; background:var(--slot); color:inherit}
.ttt-n4 .ttt-sq{border-radius:14px}
.ttt-sq:disabled{cursor:default}
.ttt-sq:not(:disabled):hover{background:var(--slot-hover)}
.ttt-sq:focus-visible,.ttt-btn:focus-visible,.ttt-mini:focus-visible,.ttt-pw:focus-visible,.ttt-seg button:focus-visible,.ttt-link:focus-visible,.ttt-theme:focus-visible{outline:3px solid var(--text); outline-offset:2px}
.ttt-sq.ttt-win{box-shadow:inset 0 0 0 2px var(--text), 0 0 22px var(--glow)}
.ttt-sq.ttt-target:not(:disabled){box-shadow:inset 0 0 0 2px var(--hot), 0 0 16px var(--hot); cursor:crosshair}
.ttt-glyph{display:block; overflow:visible}
.ttt-sq .ttt-glyph{position:absolute; inset:19%; width:62%; height:62%}
.ttt-stroke{fill:none; stroke-width:13; stroke-linecap:round; stroke-dasharray:100}
.ttt-gx .ttt-stroke{stroke:var(--x)} .ttt-go .ttt-stroke{stroke:var(--o)}
.ttt-gx{filter:drop-shadow(0 0 6px var(--glow-x))} .ttt-go{filter:drop-shadow(0 0 6px var(--glow-o))}
.ttt-glyph.ttt-pop .ttt-stroke{animation:ttt-draw .32s ease-out both}
.ttt-glyph.ttt-pop .ttt-stroke:nth-child(2){animation-delay:.14s}
.ttt-sq.ttt-win .ttt-glyph{animation:ttt-pulse 1s ease-in-out .5s 2}
.ttt-sq .ttt-ghost{pointer-events:none; animation:ttt-burst .6s ease-out both}
@keyframes ttt-draw{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}
@keyframes ttt-pulse{50%{transform:scale(1.15)}}
@keyframes ttt-burst{from{transform:scale(1);opacity:1}to{transform:scale(2.4) rotate(40deg);opacity:0}}
.ttt-strike{position:absolute; inset:0; width:100%; height:100%; pointer-events:none; overflow:visible}
.ttt-strike-line{fill:none; stroke:var(--text); stroke-width:4; stroke-linecap:round; stroke-dasharray:100; filter:drop-shadow(0 0 5px var(--glow)); animation:ttt-draw .45s ease-out .15s both}
.ttt-actions{display:flex; justify-content:center; gap:12px; align-items:center; margin-top:14px; min-height:44px}
.ttt-seg{display:flex; padding:3px; gap:2px; border:1px solid var(--edge); border-radius:999px; background:var(--panel)}
.ttt-seg button{flex:1; background:transparent; color:var(--muted); border:0; border-radius:999px; padding:8px 10px; cursor:pointer; font-size:.95rem}
.ttt-seg button[aria-pressed="true"]{background:var(--text); color:var(--bg-a); font-weight:700}
.ttt-btn{font-weight:700; background:var(--accent); color:var(--accent-text); border:0; border-radius:999px; padding:10px 22px; cursor:pointer}
.ttt-btn.ttt-big{padding:15px; font-size:1.15rem; width:100%; box-shadow:0 0 26px var(--glow)}
.ttt-link{background:none; border:0; color:var(--muted); text-decoration:underline; cursor:pointer; padding:6px}
.ttt-overlay{position:absolute; inset:0; z-index:10; display:flex; align-items:center; justify-content:center; padding:16px; background:rgba(6,8,24,.72); backdrop-filter:blur(3px); animation:ttt-fade .3s ease-out .9s both; overflow:hidden}
.ttt-dialog{position:relative; background:var(--dlg); color:var(--text); border:1px solid var(--edge); border-radius:28px; padding:26px 22px 20px; text-align:center; max-width:340px; width:100%; box-shadow:0 0 60px var(--glow)}
.ttt-dialog .ttt-pair{display:flex; justify-content:center; gap:10px; margin-bottom:10px}
.ttt-dialog .ttt-glyph{width:60px; height:60px}
.ttt-dialog h2{margin:0 0 6px; font-size:2rem; letter-spacing:-.02em; line-height:1.1}
.ttt-dialog.ttt-px h2{color:var(--x)} .ttt-dialog.ttt-po h2{color:var(--o)}
.ttt-dialog p{margin:0; color:var(--muted)}
.ttt-dialog-actions{display:flex; gap:10px; justify-content:center; align-items:center; margin-top:18px}
.ttt-conf{position:absolute; top:-12px; width:12px; height:12px; background:currentColor; clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); animation:ttt-fall 3s linear infinite}
@keyframes ttt-fall{to{transform:translateY(700px) rotate(360deg)}}
@keyframes ttt-fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion: reduce){.ttt-glyph .ttt-stroke,.ttt-glyph,.ttt-strike-line,.ttt-overlay,.ttt-conf,.ttt-sq .ttt-ghost{animation:none!important}}
`;

/* ============================ Game logic ============================
   Pure functions, no React. Classic rules, plus:
   - Bomb:   erase one opponent mark (costs your turn), once per round
   - Shot clock: TURN_TIME seconds per turn, otherwise a random move is played */
const HUMAN = 'X', AI = 'O', TURN_TIME = 12, GAP = 0.03;

const linesFor = (n) => {
  const rows = [], cols = [], d1 = [], d2 = [];
  for (let r = 0; r < n; r++) {
    rows.push(Array.from({ length: n }, (_, c) => r * n + c));
    cols.push(Array.from({ length: n }, (_, c) => c * n + r));
  }
  for (let i = 0; i < n; i++) { d1.push(i * (n + 1)); d2.push((i + 1) * (n - 1)); }
  return [...rows, ...cols, d1, d2];
};
const LINES = { 3: linesFor(3), 4: linesFor(4) };       // you need a full line: 3 on 3x3, 4 on 4x4

const other = (p) => (p === HUMAN ? AI : HUMAN);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const sizeOf = (b) => Math.round(Math.sqrt(b.length));
const emptyCells = (b) => b.reduce((a, v, i) => (v ? a : a.concat(i)), []);
const needWins = (len) => Math.ceil(len / 2);
const nameOf = (mode, p) => (mode === 'single' ? (p === HUMAN ? 'You' : 'Computer') : 'Player ' + p);
const centerCells = (n) => (n === 3 ? [4] : [5, 6, 9, 10]);

function evaluate(b) {
  for (const line of LINES[sizeOf(b)]) {
    const v = b[line[0]];
    if (v && line.every((i) => b[i] === v)) return { winner: v, line };
  }
  return { winner: null, line: [] };
}

const winMoves = (b, p) => emptyCells(b).filter((mv) => {
  const t = b.slice(); t[mv] = p;
  return evaluate(t).winner === p;
});

// Heuristic for depth-limited search on the 4x4 board.
function heuristic(b) {
  const w = [0, 1, 4, 16, 64];
  let score = 0;
  for (const line of LINES[sizeOf(b)]) {
    const o = line.filter((i) => b[i] === AI).length, x = line.filter((i) => b[i] === HUMAN).length;
    if (!x) score += w[o]; else if (!o) score -= w[x];
  }
  return score;
}

function minimax(b, player, depth, maxDepth, alpha, beta) {
  const { winner } = evaluate(b);
  if (winner === AI) return 1000 - depth;
  if (winner === HUMAN) return depth - 1000;
  const moves = emptyCells(b);
  if (!moves.length) return 0;
  if (depth >= maxDepth) return heuristic(b);
  let best = player === AI ? -Infinity : Infinity;
  for (const mv of moves) {
    b[mv] = player;
    const s = minimax(b, other(player), depth + 1, maxDepth, alpha, beta);
    b[mv] = null;
    if (player === AI) { best = Math.max(best, s); alpha = Math.max(alpha, best); }
    else { best = Math.min(best, s); beta = Math.min(beta, best); }
    if (beta <= alpha) break;
  }
  return best;
}

const strategies = {
  easy: (b) => pick(emptyCells(b)),
  medium: (b) => {
    const win = winMoves(b, AI); if (win.length) return pick(win);
    const block = winMoves(b, HUMAN); if (block.length) return pick(block);
    const mid = centerCells(sizeOf(b)).filter((i) => !b[i]);
    return mid.length ? pick(mid) : pick(emptyCells(b));
  },
  hard: (b) => {
    const moves = emptyCells(b);
    if (moves.length === b.length) return pick(centerCells(sizeOf(b)));
    const maxDepth = sizeOf(b) === 3 ? 9 : 4;
    let bestScore = -Infinity, best = [];
    for (const mv of moves) {
      const t = b.slice(); t[mv] = AI;
      const s = minimax(t, HUMAN, 1, maxDepth, -Infinity, Infinity);
      if (s > bestScore) { bestScore = s; best = [mv]; } else if (s === bestScore) best.push(mv);
    }
    return pick(best);
  }
};
const chooseMove = (b, difficulty) => strategies[difficulty](b);

// The AI bombs a human mark when the human is one move from winning and the AI can't win first.
function aiBombTarget(b) {
  if (!winMoves(b, HUMAN).length || winMoves(b, AI).length) return null;
  const hit = b.findIndex((v, i) => {
    if (v !== HUMAN) return false;
    const t = b.slice(); t[i] = null;
    return !winMoves(t, HUMAN).length;
  });
  return hit === -1 ? null : hit;
}

/* ========================= State management ========================= */
const freshPowers = () => ({ X: { bomb: true }, O: { bomb: true } });
const freshRound = (starter, size) => ({
  board: Array(size * size).fill(null), turn: starter, starter, result: null, powers: freshPowers(),
  pending: false,
  burst: { key: 0, cells: [] }, timeLeft: TURN_TIME, moveCount: 0
});
const freshMatch = (cfg) => ({ ...cfg, screen: 'game', round: 1, series: { X: 0, O: 0 }, champion: null, ...freshRound(HUMAN, cfg.size) });
const initialState = {
  screen: 'menu', mode: 'single', difficulty: 'hard', seriesLen: 3, size: 3, theme: 'neon',
  round: 1, series: { X: 0, O: 0 }, champion: null, ...freshRound(HUMAN, 3)
};

const canAct = (s) => s.screen === 'game' && !s.result && (s.mode === 'multi' || s.turn === HUMAN);

function afterMove(state, board, burst, extra) {
  const { winner, line } = evaluate(board);
  const next = {
    ...state, ...extra, board, turn: other(state.turn), pending: false,
    timeLeft: TURN_TIME, moveCount: state.moveCount + 1, burst: { key: state.burst.key + 1, cells: burst }
  };
  if (winner) {
    const series = { ...state.series, [winner]: state.series[winner] + 1 };
    return { ...next, result: { winner, line }, series, champion: series[winner] >= needWins(state.seriesLen) ? winner : null };
  }
  if (!emptyCells(board).length) return { ...next, result: { winner: null, line: [] } };
  return next;
}

function applyMove(state, index) {
  if (state.result || state.board[index]) return state;
  const p = state.turn, board = state.board.slice();
  board[index] = p;
  return afterMove(state, board, [], {});
}

function applyBomb(state, target) {
  const p = state.turn, o = other(p);
  if (state.result || !state.powers[p].bomb || state.board[target] !== o) return state;
  const board = state.board.slice();
  board[target] = null;
  return afterMove(state, board, [{ i: target, p: o }], { powers: { ...state.powers, [p]: { ...state.powers[p], bomb: false } } });
}

function reducer(state, action) {
  switch (action.type) {
    case 'THEME':
      return { ...state, theme: action.theme };
    case 'START':
      return freshMatch({ mode: action.mode, difficulty: action.difficulty, seriesLen: action.seriesLen, size: action.size, theme: state.theme });
    case 'REMATCH':
      return freshMatch({ mode: state.mode, difficulty: state.difficulty, seriesLen: state.seriesLen, size: state.size, theme: state.theme });
    case 'MENU':
      return { ...state, screen: 'menu' };
    case 'NEXT_ROUND':
      return { ...state, ...freshRound(other(state.starter), state.size), round: state.round + 1 };
    case 'PLAY':
      if (!canAct(state)) return state;
      return state.pending ? applyBomb(state, action.index) : applyMove(state, action.index);
    case 'POWER':   // Bomb: tap to arm, tap again to cancel
      if (!canAct(state) || !state.powers[state.turn].bomb) return state;
      return { ...state, pending: !state.pending };
    case 'AI_MOVE': {
      if (state.screen !== 'game' || state.mode !== 'single' || state.turn !== AI || state.result) return state;
      if (state.powers.O.bomb && state.difficulty !== 'easy' && Math.random() < 0.5) {
        const target = aiBombTarget(state.board);
        if (target !== null) return applyBomb(state, target);
      }
      return applyMove(state, chooseMove(state.board, state.difficulty));
    }
    case 'TICK':
      if (!canAct(state)) return state;
      if (state.timeLeft > 1) return { ...state, timeLeft: state.timeLeft - 1 };
      return applyMove({ ...state, pending: false }, pick(emptyCells(state.board)));
    default:
      return state;
  }
}

/* ============================ Sound & record ============================ */
let audioCtx = null;
const TONES = {
  place: [[520, .07]], burst: [[300, .09], [200, .13]], power: [[400, .06], [700, .1]],
  win: [[523, .12], [659, .12], [784, .22]], lose: [[300, .15], [220, .26]], draw: [[400, .12], [400, .12]], tick: [[880, .04]]
};
function sfx(kind) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    let t = audioCtx.currentTime;
    TONES[kind].forEach(([freq, dur]) => {
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = 'triangle'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, t); gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(t); osc.stop(t + dur); t += dur;
    });
  } catch (e) { /* sound is optional */ }
}

const SAVE_KEY = 'tic-tac-toe-arena';
const BLANK = { played: 0, wins: 0, streak: 0, best: 0, theme: 'neon' };
function loadSaved() {
  try { return { ...BLANK, ...JSON.parse(localStorage.getItem(SAVE_KEY) || '{}') }; } catch (e) { return BLANK; }
}
function save(data) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch (e) { /* storage unavailable */ } }

/* ============================== Components ============================== */
const THEMES = { neon: ['Neon', '#38e8ff', '#ff5fb0'], sunset: ['Sunset', '#ffd166', '#ff5d8f'], ice: ['Ice', '#2347d6', '#e0332f'] };

function Glyph({ player, animate, ghost }) {
  const cls = ' ttt-glyph' + (animate ? ' ttt-pop' : '') + (ghost ? ' ttt-ghost' : '');
  if (player === HUMAN) {
    return (
      <svg className={'ttt-gx' + cls} viewBox="0 0 100 100" aria-hidden="true">
        <path className="ttt-stroke" pathLength="100" d="M20 20 L80 80" />
        <path className="ttt-stroke" pathLength="100" d="M80 20 L20 80" />
      </svg>
    );
  }
  return (
    <svg className={'ttt-go' + cls} viewBox="0 0 100 100" aria-hidden="true">
      <circle className="ttt-stroke" pathLength="100" cx="50" cy="50" r="31" />
    </svg>
  );
}

function Segmented({ label, options, value, onChange }) {
  return (
    <div className="ttt-seg" role="group" aria-label={label}>
      {options.map(([val, text]) => (
        <button key={val} aria-pressed={value === val} onClick={() => onChange(val)}>{text}</button>
      ))}
    </div>
  );
}

function Field({ label, children }) {
  return <div className="ttt-field" role="group" aria-label={label}><span>{label}</span>{children}</div>;
}

function Menu({ state, saved, onTheme, onStart }) {
  const [mode, setMode] = useState(state.mode);
  const [difficulty, setDifficulty] = useState(state.difficulty);
  const [size, setSize] = useState(state.size);
  const [len, setLen] = useState(state.seriesLen);
  return (
    <div className="ttt-screen">
      <div className="ttt-logo"><Glyph player={HUMAN} /><Glyph player={AI} /></div>
      <h2 className="ttt-title">Tic-Tac-Toe<small>ARENA</small></h2>
      <p className="ttt-tag">Classic game, with a Bomb power and a shot clock.</p>
      <Field label="Theme">
        <div className="ttt-themes">
          {Object.entries(THEMES).map(([key, [name, x, o]]) => (
            <button key={key} className="ttt-theme" aria-pressed={state.theme === key} onClick={() => onTheme(key)}>
              <i style={{ background: x }} /><i style={{ background: o }} />{name}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Mode"><Segmented label="Game mode" value={mode} onChange={setMode} options={[['single', 'Single player'], ['multi', 'Two players']]} /></Field>
      {mode === 'single' && (
        <Field label="Difficulty"><Segmented label="Difficulty" value={difficulty} onChange={setDifficulty} options={[['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']]} /></Field>
      )}
      <Field label="Board"><Segmented label="Board size" value={size} onChange={setSize} options={[[3, 'Classic 3×3'], [4, 'Grand 4×4']]} /></Field>
      <Field label="Match"><Segmented label="Match length" value={len} onChange={setLen} options={[[3, 'Best of 3'], [5, 'Best of 5']]} /></Field>
      <button className="ttt-btn ttt-big" onClick={() => onStart({ mode, difficulty, seriesLen: len, size })}>Start game</button>
      <ul className="ttt-rules">
        <li><b>Goal:</b> a full row, column or diagonal ({size} marks in a line).</li>
        <li><b>Bomb:</b> erase one enemy mark, but it costs your turn. Once per round.</li>
        <li><b>Shot clock:</b> {TURN_TIME} seconds per turn, or a random move is played.</li>
      </ul>
      {saved.played > 0 && (
        <div className="ttt-stats" aria-label="Your record against the computer">
          <div><b>{saved.played}</b><span>Matches</span></div>
          <div><b>{saved.wins}</b><span>Won</span></div>
          <div><b>{saved.best}</b><span>Best streak</span></div>
        </div>
      )}
    </div>
  );
}

function PlayerCard({ player, mode, wins, goal, active, powers, usable, armed, onPower }) {
  return (
    <div className={'ttt-pcard ' + (player === HUMAN ? 'ttt-px' : 'ttt-po') + (active ? ' ttt-on' : '')}>
      <div className="ttt-phead"><Glyph player={player} /><span className="ttt-pname">{nameOf(mode, player)}</span></div>
      <div className="ttt-pips" role="img" aria-label={`${wins} of ${goal} rounds won`}>
        {Array.from({ length: goal }, (_, i) => <i key={i} className={'ttt-pip' + (i < wins ? ' ttt-full' : '')} />)}
      </div>
      <div className="ttt-powers">
        <button className={'ttt-pw' + (armed ? ' ttt-armed' : '')} disabled={!usable || !powers.bomb}
          title="Erase one opponent mark (uses your turn)" onClick={() => onPower('bomb')}>Bomb</button>
      </div>
    </div>
  );
}

function Square({ value, index, onClick, disabled, isWinning, target, ghost, ghostKey }) {
  return (
    <button className={'ttt-sq' + (isWinning ? ' ttt-win' : '') + (target ? ' ttt-target' : '')}
      onClick={onClick} disabled={disabled}
      aria-label={`Square ${index + 1}: ${value || 'empty'}`}>
      {value && <Glyph player={value} animate />}
      {!value && ghost && <Glyph key={ghostKey} player={ghost} ghost />}
    </button>
  );
}

// Line through the winning squares (viewBox 300 matches the 3% grid gap).
function Strike({ line, n }) {
  const cell = (1 - (n - 1) * GAP) / n;
  const pt = (i) => [((i % n) * (cell + GAP) + cell / 2) * 300, (Math.floor(i / n) * (cell + GAP) + cell / 2) * 300];
  const [x1, y1] = pt(line[0]), [x2, y2] = pt(line[line.length - 1]);
  const len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len, ext = (300 / n) * 0.28;
  return (
    <svg className="ttt-strike" viewBox="0 0 300 300" aria-hidden="true">
      <line className="ttt-strike-line" pathLength="100"
        x1={x1 - ux * ext} y1={y1 - uy * ext} x2={x2 + ux * ext} y2={y2 + uy * ext} />
    </svg>
  );
}

function Board({ state, locked, onPlay }) {
  const { board, burst, pending, turn, result } = state;
  const n = sizeOf(board), line = result ? result.line : [];
  const targetP = pending ? other(turn) : null;
  return (
    <div className={'ttt-board ttt-n' + n} style={{ gridTemplateColumns: `repeat(${n},1fr)` }} role="group" aria-label="Game board">
      {board.map((v, i) => {
        const g = burst.cells.find((c) => c.i === i);
        return (
          <Square key={i} index={i} value={v}
            disabled={locked || (targetP ? v !== targetP : !!v)}
            target={!!targetP && v === targetP} isWinning={line.includes(i)}
            ghost={g ? g.p : null} ghostKey={burst.key} onClick={() => onPlay(i)} />
        );
      })}
      {line.length ? <Strike line={line} n={n} /> : null}
    </div>
  );
}

function statusText(s) {
  const { mode, result, turn, pending, round } = s;
  if (result) {
    if (!result.winner) return `Round ${round}: it's a draw.`;
    if (mode === 'single') return result.winner === HUMAN ? `Round ${round}: you win!` : `Round ${round}: the computer wins.`;
    return `Round ${round}: Player ${result.winner} wins!`;
  }
  if (pending) return `Bomb armed. Tap one of ${nameOf(mode, other(turn))}'s marks.`;
  if (mode === 'single' && turn === AI) return 'Computer is thinking…';
  return mode === 'single' ? 'Your turn.' : `Player ${turn}'s turn.`;
}

function RoundModal({ state, onNext, onClose }) {
  const w = state.result.winner;
  return (
    <div className="ttt-overlay">
      <div className={'ttt-dialog ' + (w === HUMAN ? 'ttt-px' : w ? 'ttt-po' : '')} role="dialog" aria-modal="true" aria-labelledby="ttt-round-title">
        <div className="ttt-pair">{w ? <Glyph player={w} /> : <><Glyph player={HUMAN} /><Glyph player={AI} /></>}</div>
        <h2 id="ttt-round-title">{w ? `Player ${w} wins!` : "It's a draw!"}</h2>
        <p>{w ? `Round ${state.round} · series ${state.series.X} – ${state.series.O}` : 'Nobody scores. Replay the round.'}</p>
        <div className="ttt-dialog-actions">
          <button className="ttt-btn" autoFocus onClick={onNext}>{w ? 'Next round' : 'Replay round'}</button>
          <button className="ttt-link" onClick={onClose}>View board</button>
        </div>
      </div>
    </div>
  );
}

function ChampionModal({ state, onRematch, onMenu }) {
  const w = state.champion;
  const title = state.mode === 'single' ? (w === HUMAN ? 'Champion!' : 'Computer wins the match') : `Player ${w} is champion!`;
  return (
    <div className="ttt-overlay">
      {Array.from({ length: 18 }, (_, i) => (
        <i key={i} className="ttt-conf" style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 6) * 0.3}s`, color: i % 2 ? 'var(--x)' : 'var(--o)' }} />
      ))}
      <div className={'ttt-dialog ' + (w === HUMAN ? 'ttt-px' : 'ttt-po')} role="dialog" aria-modal="true" aria-labelledby="ttt-champ-title">
        <div className="ttt-pair"><Glyph player={w} /></div>
        <h2 id="ttt-champ-title">{title}</h2>
        <p>Final score {state.series.X} – {state.series.O}</p>
        <div className="ttt-dialog-actions">
          <button className="ttt-btn" autoFocus onClick={onRematch}>Rematch</button>
          <button className="ttt-link" onClick={onMenu}>Main menu</button>
        </div>
      </div>
    </div>
  );
}

export default function TicTacToe() {
  const [state, dispatch] = useReducer(reducer, initialState, (s) => ({ ...s, theme: loadSaved().theme }));
  const [sound, setSound] = useState(true);
  const [saved, setSaved] = useState(loadSaved);
  const [closedRound, setClosedRound] = useState(0);

  const single = state.mode === 'single';
  const acting = canAct(state);
  const aiTurn = state.screen === 'game' && single && state.turn === AI && !state.result;
  const goal = needWins(state.seriesLen);
  const root = 'ts-app ttt-th-' + state.theme;
  const power = (name) => { if (sound) sfx('power'); dispatch({ type: 'POWER', name }); };

  // computer's move after a short pause
  useEffect(() => {
    if (!aiTurn) return;
    const t = setTimeout(() => dispatch({ type: 'AI_MOVE' }), 600);
    return () => clearTimeout(t);
  }, [aiTurn, state.moveCount, state.round]);

  // shot clock
  useEffect(() => {
    if (!acting) return;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [acting, state.turn, state.moveCount, state.round]);

  // sound effects
  useEffect(() => { if (sound && state.moveCount > 0) sfx('place'); }, [state.moveCount]);
  useEffect(() => { if (sound && state.burst.cells.length) sfx('burst'); }, [state.burst.key]);
  useEffect(() => { if (sound && acting && state.timeLeft <= 3) sfx('tick'); }, [state.timeLeft]);
  useEffect(() => {
    if (!sound || !state.result) return;
    sfx(!state.result.winner ? 'draw' : single && state.result.winner === AI ? 'lose' : 'win');
  }, [state.result]);

  // record for single-player matches, saved in the browser
  useEffect(() => {
    if (!state.champion || !single) return;
    const won = state.champion === HUMAN, streak = won ? saved.streak + 1 : 0;
    const next = { ...saved, played: saved.played + 1, wins: saved.wins + (won ? 1 : 0), streak, best: Math.max(saved.best, streak) };
    setSaved(next); save(next);
  }, [state.champion]);

  const start = (cfg) => {
    const next = { ...saved, theme: state.theme };
    setSaved(next); save(next); setClosedRound(0);
    dispatch({ type: 'START', ...cfg });
  };

  if (state.screen === 'menu') {
    return (
      <div className={root}>
        <style>{CSS}</style>
        <Menu state={state} saved={saved} onTheme={(theme) => dispatch({ type: 'THEME', theme })} onStart={start} />
      </div>
    );
  }

  const card = (p) => (
    <PlayerCard player={p} mode={state.mode} wins={state.series[p]} goal={goal}
      active={acting && state.turn === p} powers={state.powers[p]}
      usable={acting && state.turn === p} armed={state.pending && state.turn === p} onPower={power} />
  );

  return (
    <div className={root}>
      <style>{CSS}</style>
      <div className="ttt-top">
        <button className="ttt-mini" onClick={() => dispatch({ type: 'MENU' })}>Menu</button>
        <span className="ttt-round">Round {state.round} · First to {goal}</span>
        <button className="ttt-mini" aria-pressed={sound} onClick={() => setSound(!sound)}>Sound {sound ? 'on' : 'off'}</button>
      </div>
      <div className="ttt-hud">{card(HUMAN)}{card(AI)}</div>
      <div className="ttt-panel">
        <p className="ttt-status" role="status" aria-live="polite">{statusText(state)}</p>
        <div className={'ttt-timer' + (state.timeLeft <= 3 ? ' ttt-low' : '')} role="progressbar"
          aria-label="Time left for this turn" aria-valuemin="0" aria-valuemax={TURN_TIME} aria-valuenow={acting ? state.timeLeft : 0}>
          <i style={{ width: acting ? `${(state.timeLeft / TURN_TIME) * 100}%` : '0%' }} />
        </div>
        <Board state={state} locked={!acting} onPlay={(index) => dispatch({ type: 'PLAY', index })} />
      </div>
      <div className="ttt-actions">
        {state.result && !state.champion && <button className="ttt-btn" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>{state.result.winner ? 'Next round' : 'Replay round'}</button>}
        {state.champion && <button className="ttt-btn" onClick={() => dispatch({ type: 'REMATCH' })}>Rematch</button>}
      </div>
      {state.result && !state.champion && closedRound !== state.round && (
        <RoundModal state={state} onNext={() => dispatch({ type: 'NEXT_ROUND' })} onClose={() => setClosedRound(state.round)} />
      )}
      {state.champion && (
        <ChampionModal state={state} onRematch={() => dispatch({ type: 'REMATCH' })} onMenu={() => dispatch({ type: 'MENU' })} />
      )}
    </div>
  );
}