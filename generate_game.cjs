const fs = require('fs');

const boardB64 = fs.readFileSync('board.png').toString('base64');
const titleB64 = fs.readFileSync('title.png').toString('base64');
const avatarB64 = fs.readFileSync('avatar.png').toString('base64');

const boardDataUri = `data:image/png;base64,${boardB64}`;
const titleDataUri = `data:image/png;base64,${titleB64}`;
const avatarDataUri = `data:image/png;base64,${avatarB64}`;

const css = `
:root {
  --bg-deep: #051433;
  --bg-dark: #082154;
  --cyan-bright: #00d2ff;
  --cyan-glow: rgba(0, 210, 255, 0.45);
  --gold-halo: rgba(255, 215, 0, 0.4);
  --gold-border: #ffd85b;
  --gold-text: #ffd700;
  --cream-panel: #fbf7ee;
  --navy-text: #081c3d;
  --font-game: 'Trebuchet MS', 'Arial Rounded MT Bold', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --col-p1: #ff5d66;
  --col-p2: #1878ee;
  --col-p3: #18a75b;
  --col-p4: #8a4de1;
  --col-p5: #ef8b20;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: radial-gradient(circle at 50% 15%, #0f3570 0%, #081d45 45%, #040e24 100%);
  font-family: var(--font-game);
  color: #ffffff;
}

/* Accessibility Focus */
button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: 3px solid #ffea79 !important;
  outline-offset: 2px !important;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* App Header */
header.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  max-width: 1320px;
  margin: 0 auto;
  gap: 16px;
}

.title-img-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
}

.title-img {
  width: min(72vw, 720px);
  height: 120px;
  object-fit: cover;
  object-position: left 40%;
  filter: drop-shadow(0 6px 12px rgba(4, 20, 60, 0.85));
  user-select: none;
  display: block;
}

.sound-btn {
  background: linear-gradient(135deg, #09479e, #052a61);
  color: #ffea79;
  border: 2px solid var(--cyan-bright);
  padding: 10px 18px;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3);
  transition: transform 0.15s ease, background 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}
.sound-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 210, 255, 0.4);
}
.sound-btn:active {
  transform: translateY(1px);
}

/* Main Container */
main.main-stage {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px 32px 20px;
}

/* Screen visibility */
.view-screen {
  display: none;
}
.view-screen.active {
  display: block;
}

/* Settings Screen */
.settings-panel {
  background: linear-gradient(180deg, rgba(8, 33, 84, 0.95), rgba(4, 18, 50, 0.98));
  border: 3px solid var(--cyan-bright);
  border-radius: 20px;
  padding: 28px;
  max-width: 840px;
  margin: 10px auto;
  box-shadow: 0 0 35px var(--gold-halo), 0 12px 35px rgba(0, 0, 0, 0.6);
}

.settings-panel h1 {
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  color: #ffea79;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
  margin-bottom: 6px;
  text-align: center;
}

.settings-panel p.subtitle {
  text-align: center;
  color: #b8d5ff;
  font-size: 1.05rem;
  margin-bottom: 24px;
}

.section-label {
  font-size: 1.15rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mode-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.mode-card {
  background: linear-gradient(135deg, rgba(14, 53, 120, 0.8), rgba(7, 28, 68, 0.9));
  border: 3px solid #1a519b;
  border-radius: 16px;
  padding: 18px;
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.mode-card:hover {
  border-color: var(--cyan-bright);
  transform: translateY(-2px);
}

.mode-card[aria-pressed="true"] {
  border-color: var(--cyan-bright);
  background: linear-gradient(135deg, #0e4eab, #083277);
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.6), inset 0 0 12px rgba(0, 210, 255, 0.3);
}

.player-count-group {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.btn-pill {
  flex: 1;
  min-width: 80px;
  padding: 10px 16px;
  border-radius: 12px;
  background: #092c66;
  border: 2px solid #1d5ca8;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-pill:hover {
  border-color: var(--cyan-bright);
}

.btn-pill.active {
  background: #0088cc;
  border-color: #ffea79;
  color: #ffffff;
  box-shadow: 0 0 12px rgba(0, 210, 255, 0.5);
}

.player-names-grid {
  display: grid;
  gap: 12px;
  margin-bottom: 18px;
}

.player-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(4, 16, 42, 0.6);
  padding: 8px 14px;
  border-radius: 12px;
  border: 1px solid #163d7a;
}

.player-color-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.5);
  flex-shrink: 0;
}

.player-name-input {
  flex: 1;
  background: #081d42;
  border: 2px solid #1c4b8e;
  border-radius: 8px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 1rem;
  font-family: var(--font-game);
}
.player-name-input:focus {
  border-color: var(--cyan-bright);
  outline: none;
}
.player-name-input:disabled {
  background: #041029;
  color: #7b98c5;
  border-color: #0c244c;
}

.save-names-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.btn-green-action {
  background: linear-gradient(135deg, #18a75b, #10753e);
  color: #ffffff;
  border: 2px solid #48e28f;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(24, 167, 91, 0.4);
  transition: transform 0.15s ease;
}
.btn-green-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(24, 167, 91, 0.6);
}

.names-status-badge {
  font-size: 0.95rem;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: bold;
}
.names-status-badge.saved {
  color: #48e28f;
  background: rgba(24, 167, 91, 0.2);
  border: 1px solid #18a75b;
}
.names-status-badge.unsaved {
  color: #ffc83b;
  background: rgba(255, 200, 59, 0.2);
  border: 1px solid #ffc83b;
}

/* Question Editor Collapsible */
details.questions-accordion {
  background: rgba(5, 20, 52, 0.85);
  border: 2px solid #1a4f94;
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 24px;
}

details.questions-accordion summary {
  font-size: 1.15rem;
  font-weight: bold;
  color: #ffea79;
  cursor: pointer;
  user-select: none;
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.q-count-indicator {
  font-size: 0.85rem;
  background: #18a75b;
  color: #ffffff;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: normal;
}

.questions-accordion-content {
  margin-top: 16px;
  border-top: 1px solid #163e76;
  padding-top: 16px;
}

.bulk-editor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 14px;
}

.bulk-textarea-wrap label {
  display: block;
  font-size: 0.95rem;
  color: #b8d5ff;
  margin-bottom: 6px;
  font-weight: bold;
}

.bulk-textarea {
  width: 100%;
  height: 140px;
  background: #081d42;
  border: 2px solid #1c4b8e;
  border-radius: 8px;
  color: #ffffff;
  padding: 10px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
}

.single-square-editor {
  background: rgba(3, 14, 38, 0.7);
  border: 1px solid #1c4b8e;
  border-radius: 10px;
  padding: 14px;
  margin-top: 16px;
}

.single-sq-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.select-square {
  background: #081d42;
  color: #ffffff;
  border: 2px solid #1c4b8e;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 1rem;
}

.single-sq-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.btn-secondary {
  background: #0a3575;
  color: #ffffff;
  border: 1px solid #1c5ab0;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
.btn-secondary:hover {
  background: #114494;
}

.editor-status-msg {
  min-height: 24px;
  margin-top: 8px;
  font-size: 0.95rem;
  font-weight: bold;
}
.editor-status-msg.success { color: #48e28f; }
.editor-status-msg.error { color: #ff6b72; }

/* Start Game Button */
.btn-start-game {
  width: 100%;
  background: linear-gradient(135deg, #18a75b, #0f6f3a);
  color: #ffffff;
  border: 3px solid #52f09a;
  padding: 16px;
  border-radius: 16px;
  font-size: 1.4rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 0 25px rgba(24, 167, 91, 0.6), 0 8px 20px rgba(0,0,0,0.5);
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  letter-spacing: 0.5px;
}
.btn-start-game:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 35px rgba(24, 167, 91, 0.8), 0 10px 24px rgba(0,0,0,0.6);
}
.btn-start-game:active {
  transform: translateY(1px);
}

/* GAME SCREEN */
.game-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  gap: 12px;
}

.top-nav-btn {
  background: linear-gradient(135deg, #093777, #062452);
  color: #ffea79;
  border: 2px solid var(--cyan-bright);
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
  transition: all 0.15s ease;
}
.top-nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 210, 255, 0.4);
}

.game-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.board-column {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.board-frame-container {
  border: 8px solid transparent;
  background: linear-gradient(135deg, #02a5eb, #0876ed, #582bc2, #40e8ff) border-box;
  box-shadow: 0 0 35px var(--gold-halo), 0 0 65px rgba(0, 210, 255, 0.35), inset 0 0 16px rgba(4, 20, 60, 0.85);
  border-radius: 22px;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.board-inner-grid-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 4;
  overflow: hidden;
  background: #0b2a63;
}

.board-bg-img {
  position: absolute;
  left: 49.5%;
  top: 52.8%;
  width: 120%;
  height: 123%;
  transform: translate(-50%, -50%);
  object-fit: fill;
  pointer-events: none;
  user-select: none;
  z-index: 1;
}

.board-grid-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  z-index: 3;
  pointer-events: none;
}

.board-cell {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

/* Question button */
.sq-q-btn {
  position: absolute;
  top: 11%;
  right: 7%;
  width: clamp(22px, 3.2vw, 34px);
  height: clamp(22px, 3.2vw, 34px);
  border-radius: 50%;
  border: 2px solid #ffffff;
  color: #ffffff;
  font-weight: 900;
  font-size: clamp(12px, 1.8vw, 18px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.7);
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
  z-index: 10;
  user-select: none;
}
.sq-q-btn:hover {
  transform: scale(1.18);
}
.sq-q-btn.sq-10 {
  right: 24%;
}

/* Column repeating colors */
.sq-q-btn[data-col="1"] { background: #18a75b; }
.sq-q-btn[data-col="2"] { background: #1878ee; }
.sq-q-btn[data-col="3"] { background: #8a4de1; }
.sq-q-btn[data-col="4"] { background: #ff5d66; }
.sq-q-btn[data-col="5"] { background: #ef8b20; }

.sq-q-btn.has-question {
  background: #18a75b !important;
  box-shadow: 0 0 14px #22c55e, inset 0 1px 3px rgba(255,255,255,0.85);
  border-color: #ffffff;
}

/* Snake bite crying badge */
.crying-overlay-badge {
  position: absolute;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 20, 50, 0.45);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}
.crying-overlay-badge.show {
  opacity: 1;
}
.crying-emoji-icon {
  font-size: clamp(60px, 12vw, 130px);
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.7));
  animation: snakeCryingBounce 0.6s ease infinite alternate;
}
@keyframes snakeCryingBounce {
  from { transform: scale(0.9) rotate(-6deg); }
  to { transform: scale(1.1) rotate(6deg); }
}

/* Starting Dock */
.starting-dock-wrap {
  background: linear-gradient(180deg, #07193d, #030b1e);
  border: 2px solid var(--cyan-bright);
  border-radius: 14px;
  padding: 10px 16px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2);
}

.dock-header-label {
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: var(--cyan-bright);
  text-align: center;
  margin-bottom: 8px;
  text-shadow: 0 0 8px rgba(0, 210, 255, 0.6);
}

.dock-slots-stage {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
}

/* Token elements */
.player-token {
  width: clamp(24px, 4vw, 42px);
  height: clamp(24px, 4vw, 42px);
  border-radius: 50%;
  border: 2.5px solid #ffffff;
  color: #ffffff;
  font-weight: 900;
  font-size: clamp(12px, 1.8vw, 17px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 12px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.5);
  position: absolute;
  z-index: 20;
  pointer-events: none;
  user-select: none;
  transition: left 0.22s ease-out, top 0.22s ease-out, transform 0.22s ease-out;
  transform: translate(-50%, -50%);
}

.player-token.hopping {
  transform: translate(-50%, -90%) scale(1.18) !important;
}

.token-p1 { background: var(--col-p1); }
.token-p2 { background: var(--col-p2); }
.token-p3 { background: var(--col-p3); }
.token-p4 { background: var(--col-p4); }
.token-p5 { background: var(--col-p5); }

/* Control Column (Right) */
.control-column {
  width: clamp(260px, 25vw, 320px);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-card-panel {
  background: var(--cream-panel);
  border: 3.5px solid var(--cyan-bright);
  outline: 4px solid #083c84;
  border-radius: 20px;
  padding: 18px 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.65), 0 0 20px rgba(0, 210, 255, 0.3);
  color: var(--navy-text);
}

.turn-header {
  text-align: center;
  margin-bottom: 12px;
}

.turn-subhead {
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  font-weight: 900;
  color: #0b3a7a;
  text-transform: uppercase;
}

.active-player-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
}

.active-dot-indicator {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.active-player-name {
  font-size: 1.3rem;
  font-weight: 900;
  color: #081d45;
}

.status-message-banner {
  background: #edf3fc;
  border: 1.5px solid #bdd6f7;
  border-radius: 10px;
  padding: 8px 10px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: bold;
  color: #0a2f6b;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

/* Avatar + Dice Stage */
.avatar-dice-stage {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 12px;
  margin-bottom: 16px;
}

.avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
}

.animated-question-marks {
  position: absolute;
  top: -24px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
}

.floating-q {
  font-size: 1.2rem;
  font-weight: 900;
  color: #087cf4;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  animation: floatQuestion 1.4s ease-in-out infinite alternate;
}
.floating-q:nth-child(2) {
  animation-delay: 0.3s;
  color: #ff5d66;
}
.floating-q:nth-child(3) {
  animation-delay: 0.6s;
  color: #18a75b;
}

@keyframes floatQuestion {
  from { transform: translateY(0); }
  to { transform: translateY(-7px) scale(1.1); }
}

.avatar-img-box {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  overflow: hidden;
  border: 3px solid #087cf4;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  background: #ffffff;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 3D Dice Stage */
.dice-container-btn {
  width: 96px;
  height: 96px;
  background: transparent;
  border: none;
  cursor: pointer;
  perspective: 600px;
  position: relative;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dice-container-btn:disabled {
  cursor: not-allowed;
  opacity: 0.85;
}

.cube-dice {
  width: 76px;
  height: 76px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s cubic-bezier(0.2, 0.9, 0.3, 1.1);
  transform: rotateX(-12deg) rotateY(16deg);
}

.cube-face {
  position: absolute;
  width: 76px;
  height: 76px;
  border-radius: 15px;
  border: 2px solid var(--gold-border);
  background: linear-gradient(135deg, #32dfff 0%, #087cf4 35%, #0a439f 70%, #061c52 100%);
  box-shadow: 0 0 10px rgba(255, 216, 91, 0.4), inset 0 0 8px rgba(0, 0, 0, 0.6);
  display: grid;
  padding: 8px;
  box-sizing: border-box;
}

/* 6 physical faces */
.face-1 { transform: rotateY(0deg) translateZ(38px); }
.face-2 { transform: rotateX(90deg) translateZ(38px); }
.face-3 { transform: rotateY(90deg) translateZ(38px); }
.face-4 { transform: rotateY(-90deg) translateZ(38px); }
.face-5 { transform: rotateX(-90deg) translateZ(38px); }
.face-6 { transform: rotateY(180deg) translateZ(38px); }

/* Pips */
.dice-pip {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fff099 0%, #ffd85b 50%, #ba890a 100%);
  box-shadow: 0 0 4px #ffd85b, inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.6);
  align-self: center;
  justify-self: center;
}

/* Face layouts */
.face-1 { display: flex; align-items: center; justify-content: center; }
.face-2 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.face-2 .dice-pip:nth-child(1) { grid-area: 1 / 2; }
.face-2 .dice-pip:nth-child(2) { grid-area: 2 / 1; }

.face-3 {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
.face-3 .dice-pip:nth-child(1) { grid-area: 1 / 3; }
.face-3 .dice-pip:nth-child(2) { grid-area: 2 / 2; }
.face-3 .dice-pip:nth-child(3) { grid-area: 3 / 1; }

.face-4 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.face-4 .dice-pip:nth-child(1) { grid-area: 1 / 1; }
.face-4 .dice-pip:nth-child(2) { grid-area: 1 / 2; }
.face-4 .dice-pip:nth-child(3) { grid-area: 2 / 1; }
.face-4 .dice-pip:nth-child(4) { grid-area: 2 / 2; }

.face-5 {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
.face-5 .dice-pip:nth-child(1) { grid-area: 1 / 1; }
.face-5 .dice-pip:nth-child(2) { grid-area: 1 / 3; }
.face-5 .dice-pip:nth-child(3) { grid-area: 2 / 2; }
.face-5 .dice-pip:nth-child(4) { grid-area: 3 / 1; }
.face-5 .dice-pip:nth-child(5) { grid-area: 3 / 3; }

.face-6 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

/* Move button */
.btn-move-space {
  width: 100%;
  background: linear-gradient(135deg, #087cf4, #054ea0);
  color: #ffffff;
  border: 2px solid #57beff;
  border-radius: 12px;
  padding: 12px;
  font-size: 1.1rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(8, 124, 244, 0.6);
  margin-bottom: 16px;
  display: none;
  animation: pulseGlow 1.2s infinite alternate;
}
.btn-move-space.show {
  display: block;
}
@keyframes pulseGlow {
  from { box-shadow: 0 0 12px rgba(8, 124, 244, 0.5); transform: scale(0.99); }
  to { box-shadow: 0 0 22px rgba(8, 124, 244, 0.85); transform: scale(1.01); }
}

/* Player scores list */
.players-list-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.player-score-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 10px;
  background: #ffffff;
  border: 2px solid #dde5f0;
  transition: all 0.2s ease;
}

.player-score-row.active {
  border-color: #087cf4;
  outline: 2px solid #087cf4;
  background: #eaf4ff;
  box-shadow: 0 2px 8px rgba(8, 124, 244, 0.25);
}

.score-name-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.score-player-name {
  font-weight: bold;
  font-size: 0.95rem;
  color: #081d45;
}

.trophy-badge {
  font-weight: 900;
  font-size: 0.95rem;
  color: #8c6300;
  background: #fff8d6;
  border: 1px solid #e5c35b;
  padding: 2px 8px;
  border-radius: 12px;
}

/* Signature */
.signature-box {
  text-align: center;
  margin-top: 14px;
  line-height: 1.35;
}
.sig-author {
  font-size: 1.05rem;
  font-weight: bold;
  color: var(--gold-text);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}
.sig-title {
  font-size: 0.85rem;
  color: #ffeed1;
}

/* Modal Dialog */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(3, 10, 28, 0.8);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.modal-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}

.modal-dialog {
  background: linear-gradient(180deg, #0e3778, #071f4c);
  border: 3px solid var(--cyan-bright);
  border-radius: 20px;
  padding: 24px;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 0 35px var(--gold-halo), 0 16px 40px rgba(0,0,0,0.8);
  color: #ffffff;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.modal-title {
  font-size: 1.35rem;
  color: #ffea79;
}
.modal-close-btn {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.modal-question-text {
  font-size: 1.15rem;
  line-height: 1.45;
  margin-bottom: 18px;
  background: rgba(3, 12, 34, 0.6);
  padding: 14px;
  border-radius: 12px;
  border-left: 4px solid var(--cyan-bright);
}

.modal-input-field {
  width: 100%;
  background: #081d42;
  border: 2px solid #1c4b8e;
  border-radius: 10px;
  padding: 10px 14px;
  color: #ffffff;
  font-size: 1.05rem;
  font-family: inherit;
  margin-bottom: 14px;
}

.modal-feedback {
  min-height: 24px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 14px;
}
.modal-feedback.correct { color: #48e28f; }
.modal-feedback.wrong { color: #ff6b72; }
.modal-feedback.info { color: #ffea79; }

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Quick Add Box in Modal */
.modal-quick-add {
  display: none;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 14px;
  background: rgba(4, 15, 38, 0.6);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #1b4d90;
}
.modal-quick-add.show {
  display: flex;
}
.modal-quick-add label {
  font-size: 0.9rem;
  color: #ffea79;
  font-weight: bold;
}

/* Victory Overlay */
.victory-overlay {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 50% 40%, rgba(13, 61, 138, 0.98), rgba(4, 17, 46, 0.99));
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  text-align: center;
}
.victory-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.victory-trophy-icon {
  font-size: clamp(80px, 15vw, 140px);
  filter: drop-shadow(0 0 35px rgba(255, 215, 0, 0.8));
  margin-bottom: 12px;
  animation: trophyFloat 1.5s infinite alternate ease-in-out;
}
@keyframes trophyFloat {
  from { transform: translateY(0) scale(0.95); }
  to { transform: translateY(-12px) scale(1.05); }
}

.victory-title {
  font-size: clamp(2.4rem, 6vw, 4rem);
  color: #ffea79;
  text-shadow: 0 0 25px rgba(255, 215, 0, 0.8);
  margin-bottom: 8px;
}

.victory-msg {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #ffffff;
  margin-bottom: 24px;
  max-width: 600px;
}

.btn-play-again {
  background: linear-gradient(135deg, #18a75b, #0e7239);
  color: #ffffff;
  border: 3px solid #57ff9e;
  padding: 14px 32px;
  border-radius: 16px;
  font-size: 1.3rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 0 30px rgba(24, 167, 91, 0.8);
  transition: transform 0.15s ease;
}
.btn-play-again:hover {
  transform: translateY(-3px) scale(1.03);
}

/* Confetti particles */
.confetti-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  width: 10px;
  height: 16px;
  top: -20px;
  opacity: 0.9;
  animation: confettiFall linear infinite;
}

@keyframes confettiFall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
}

/* Toast message */
.toast-notice {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: #081d45;
  border: 2px solid var(--cyan-bright);
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.95rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.6);
  z-index: 150;
  transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  pointer-events: none;
}
.toast-notice.show {
  transform: translateX(-50%) translateY(0);
}

/* Responsive Media Queries */
@media (max-width: 850px) {
  .game-layout {
    flex-direction: column;
  }
  .control-column {
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
  }
  .mode-cards {
    grid-template-columns: 1fr;
  }
  .bulk-editor-grid {
    grid-template-columns: 1fr;
  }
  .single-sq-inputs {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  header.app-header {
    padding: 8px 12px;
  }
  .title-img {
    width: min(64vw, 250px);
    height: 46px;
  }
  main.main-stage {
    padding: 0 10px 24px 10px;
  }
  .settings-panel {
    padding: 18px 14px;
  }
  .board-frame-container {
    border-width: 5px;
    border-radius: 16px;
  }
  .starting-dock-wrap {
    padding: 8px 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

const js = `
// Engaging Educational Default Questions (ready out-of-the-box!)
const DEFAULT_QUESTIONS = [
  { q: "What is 7 + 8?", a: "15" },
  { q: "What planet is known as the Red Planet?", a: "Mars" },
  { q: "How many days are in a week?", a: "7" },
  { q: "What is the capital of France?", a: "Paris" },
  { q: "What gas do plants absorb from the air?", a: "Carbon dioxide" },
  { q: "What is 9 x 6?", a: "54" },
  { q: "What is the largest ocean on Earth?", a: "Pacific" },
  { q: "How many legs does a spider have?", a: "8" },
  { q: "What is the frozen form of water called?", a: "Ice" },
  { q: "What is 100 divided by 4?", a: "25" },
  { q: "Which animal is known as the King of the Jungle?", a: "Lion" },
  { q: "How many hours are there in one day?", a: "24" },
  { q: "What is the opposite of hot?", a: "Cold" },
  { q: "What is 15 - 7?", a: "8" },
  { q: "What shape has 3 sides?", a: "Triangle" },
  { q: "What colors mix to make green?", a: "Blue and yellow" },
  { q: "What is 12 x 12?", a: "144" },
  { q: "Which continent is Egypt located in?", a: "Africa" },
  { q: "How many centimeters are in 1 meter?", a: "100" },
  { q: "What do bees make that is sweet and golden?", a: "Honey" }
];

// Game State
const state = {
  mode: 'cpu', // 'cpu' or 'local'
  localCount: 2,
  savedNames: ['P1', 'CPU'],
  players: [],
  activeIndex: 0,
  rolledValue: 1,
  busy: false,
  sound: true,
  questions: JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)),
  activeSquareModal: null,
  gameOver: false,
  unsavedNames: false
};

// Player order colors
const PLAYER_COLORS = ['#ff5d66', '#1878ee', '#18a75b', '#8a4de1', '#ef8b20'];

// Ladders & Snakes maps
const LADDERS = { 2: 9, 7: 14, 12: 19 };
const SNAKES = { 11: 10, 13: 8, 15: 6 };

// Serpentine Grid coordinates (5 cols x 4 rows)
// Row 4 (top): 20, 19, 18, 17, 16
// Row 3: 11, 12, 13, 14, 15
// Row 2: 10, 9, 8, 7, 6
// Row 1 (bottom): 1, 2, 3, 4, 5
const SQUARE_COORDS = {
  1: { col: 0, row: 3 },
  2: { col: 1, row: 3 },
  3: { col: 2, row: 3 },
  4: { col: 3, row: 3 },
  5: { col: 4, row: 3 },
  6: { col: 4, row: 2 },
  7: { col: 3, row: 2 },
  8: { col: 2, row: 2 },
  9: { col: 1, row: 2 },
  10: { col: 0, row: 2 },
  11: { col: 0, row: 1 },
  12: { col: 1, row: 1 },
  13: { col: 2, row: 1 },
  14: { col: 3, row: 1 },
  15: { col: 4, row: 1 },
  16: { col: 4, row: 0 },
  17: { col: 3, row: 0 },
  18: { col: 2, row: 0 },
  19: { col: 1, row: 0 },
  20: { col: 0, row: 0 }
};

// Web Audio API Controller
class SoundManager {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  playTone(freq, duration, type = 'sine', startTimeOffset = 0, gainLevel = 0.15) {
    if (!state.sound) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime + startTimeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(gainLevel, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }
  playSave() {
    this.playTone(523.25, 0.1, 'sine', 0);
    this.playTone(659.25, 0.1, 'sine', 0.08);
    this.playTone(783.99, 0.18, 'sine', 0.16);
  }
  playRoll() {
    if (!state.sound) return;
    for (let i = 0; i < 6; i++) {
      this.playTone(280 + Math.random() * 200, 0.04, 'triangle', i * 0.06, 0.1);
    }
  }
  playStep() {
    this.playTone(480, 0.09, 'sine', 0, 0.18);
  }
  playBlocked() {
    this.playTone(180, 0.15, 'square', 0, 0.12);
    this.playTone(130, 0.22, 'square', 0.1, 0.12);
  }
  playLadder() {
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.14, 'triangle', idx * 0.08, 0.2);
    });
  }
  playSnake() {
    if (!state.sound) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.45);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }
  playWrong() {
    this.playTone(200, 0.14, 'sawtooth', 0, 0.15);
    this.playTone(160, 0.2, 'sawtooth', 0.14, 0.15);
  }
  playCorrect() {
    this.playTone(659.25, 0.12, 'sine', 0, 0.2);
    this.playTone(987.77, 0.25, 'sine', 0.1, 0.22);
  }
  playTrophy() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.18, 'sine', idx * 0.07, 0.25);
    });
  }
  playVictory() {
    const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.22, 'triangle', idx * 0.14, 0.25);
    });
  }
}

const sounds = new SoundManager();

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Storage helpers with memory fallback
function loadSavedState() {
  try {
    const savedNames = localStorage.getItem('snakeTrailNames');
    if (savedNames) {
      const parsed = JSON.parse(savedNames);
      if (Array.isArray(parsed) && parsed.length >= 2) {
        state.savedNames = parsed.map(n => String(n).trim().slice(0, 22));
      }
    }
  } catch (e) {
    console.warn('Failed to parse saved names', e);
  }

  try {
    const savedQ = localStorage.getItem('snakeTrailQuestions');
    if (savedQ) {
      const parsed = JSON.parse(savedQ);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let hasAnyNonEmpty = false;
        for (let i = 0; i < 20; i++) {
          if (parsed[i] && (parsed[i].q || parsed[i].a)) {
            state.questions[i] = {
              q: String(parsed[i].q || '').trim(),
              a: String(parsed[i].a || '').trim()
            };
            if (state.questions[i].q) hasAnyNonEmpty = true;
          } else {
            state.questions[i] = DEFAULT_QUESTIONS[i] ? { ...DEFAULT_QUESTIONS[i] } : { q: '', a: '' };
          }
        }
        if (!hasAnyNonEmpty) {
          state.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
        }
      } else {
        state.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
      }
    } else {
      state.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
    }
  } catch (e) {
    console.warn('Failed to parse saved questions', e);
    state.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
  }
}

function saveNamesToStorage() {
  try {
    localStorage.setItem('snakeTrailNames', JSON.stringify(state.savedNames));
  } catch (e) {
    console.warn('localStorage save names error', e);
  }
  state.unsavedNames = false;
  updateNamesStatusBadge();
  sounds.playSave();
}

function saveQuestionsToStorage() {
  try {
    localStorage.setItem('snakeTrailQuestions', JSON.stringify(state.questions));
  } catch (e) {
    console.warn('localStorage save questions error', e);
  }
  updateQuestionIconsHighlight();
  updateQuestionsCountBadge();
}

function updateQuestionsCountBadge() {
  const badge = document.getElementById('q-count-indicator');
  if (!badge) return;
  const count = state.questions.filter(item => item && item.q && item.q.trim().length > 0).length;
  badge.textContent = count + '/20 active questions';
}

function showToast(msg) {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// UI Initialization
let bulkDebounce = null;

function initUI() {
  loadSavedState();

  // Mode Buttons
  const btnCpu = document.getElementById('mode-cpu');
  const btnLocal = document.getElementById('mode-local');
  const localCountGroup = document.getElementById('local-count-group');

  btnCpu.addEventListener('click', () => {
    state.mode = 'cpu';
    btnCpu.setAttribute('aria-pressed', 'true');
    btnLocal.setAttribute('aria-pressed', 'false');
    localCountGroup.style.display = 'none';
    renderPlayerInputs();
  });

  btnLocal.addEventListener('click', () => {
    state.mode = 'local';
    btnCpu.setAttribute('aria-pressed', 'false');
    btnLocal.setAttribute('aria-pressed', 'true');
    localCountGroup.style.display = 'flex';
    renderPlayerInputs();
  });

  // Local Count Pills
  document.querySelectorAll('.btn-count-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-count-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.localCount = parseInt(btn.dataset.count, 10);
      renderPlayerInputs();
    });
  });

  // Save Player Names Button
  const btnSaveNames = document.getElementById('btn-save-names');
  btnSaveNames.addEventListener('click', () => {
    gatherPlayerNamesFromInputs();
    saveNamesToStorage();
    showToast('✓ Player names saved!');
  });

  // Bulk Question Import Button
  const btnImportBulk = document.getElementById('btn-import-bulk');
  btnImportBulk.addEventListener('click', () => {
    commitBulkTextareas(true);
  });

  // Bulk Question Input Listeners (Auto-save as teacher types!)
  const qArea = document.getElementById('bulk-questions-input');
  const aArea = document.getElementById('bulk-answers-input');
  if (qArea) {
    qArea.addEventListener('input', () => {
      clearTimeout(bulkDebounce);
      bulkDebounce = setTimeout(() => {
        commitBulkTextareas(false);
      }, 500);
    });
  }
  if (aArea) {
    aArea.addEventListener('input', () => {
      clearTimeout(bulkDebounce);
      bulkDebounce = setTimeout(() => {
        commitBulkTextareas(false);
      }, 500);
    });
  }

  // Single Question Editor Dropdown
  const selectSq = document.getElementById('select-square');
  for (let i = 1; i <= 20; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = 'Square ' + i;
    selectSq.appendChild(opt);
  }
  selectSq.addEventListener('change', () => {
    updateSingleEditorInputs();
  });

  // Single Question Input Listeners (Auto-save on keystroke!)
  const singleQ = document.getElementById('single-q-input');
  const singleA = document.getElementById('single-a-input');
  if (singleQ) {
    singleQ.addEventListener('input', () => {
      const sq = parseInt(selectSq.value, 10);
      state.questions[sq - 1] = {
        q: singleQ.value.trim(),
        a: singleA.value.trim()
      };
      saveQuestionsToStorage();
      populateBulkInputsFromState();
    });
  }
  if (singleA) {
    singleA.addEventListener('input', () => {
      const sq = parseInt(selectSq.value, 10);
      state.questions[sq - 1] = {
        q: singleQ.value.trim(),
        a: singleA.value.trim()
      };
      saveQuestionsToStorage();
      populateBulkInputsFromState();
    });
  }

  const btnSaveSingle = document.getElementById('btn-save-single');
  btnSaveSingle.addEventListener('click', handleSaveSingleSquare);

  const btnClearSingle = document.getElementById('btn-clear-single');
  btnClearSingle.addEventListener('click', handleClearSingleSquare);

  // Start Game Button
  const btnStartGame = document.getElementById('btn-start-game');
  btnStartGame.addEventListener('click', () => {
    gatherPlayerNamesFromInputs();
    autoCommitAllQuestionInputs(); // Always commits user questions right into the game!
    startGame();
  });

  // Back to Settings & Restart Game
  const btnBackSettings = document.getElementById('btn-back-settings');
  btnBackSettings.addEventListener('click', () => {
    if (state.busy) return;
    switchView('settings');
  });

  const btnRestartGame = document.getElementById('btn-restart-game');
  btnRestartGame.addEventListener('click', () => {
    if (state.busy) return;
    restartGame();
  });

  // Sound Toggle
  const btnSound = document.getElementById('sound-toggle-btn');
  btnSound.addEventListener('click', () => {
    state.sound = !state.sound;
    btnSound.setAttribute('aria-pressed', state.sound ? 'true' : 'false');
    btnSound.textContent = state.sound ? '🔊 Sound on' : '🔇 Sound off';
    sounds.init();
  });

  // Dice Button
  const btnDice = document.getElementById('dice-btn');
  btnDice.addEventListener('click', handleDiceClick);

  // Move Space Button
  const btnMoveSpace = document.getElementById('btn-move-space');
  btnMoveSpace.addEventListener('click', handleMoveSpaceClick);

  // Question Modal Elements
  const modalClose = document.getElementById('modal-close-btn');
  modalClose.addEventListener('click', closeModal);

  const modalBackdrop = document.getElementById('modal-backdrop');
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  const btnCheckAns = document.getElementById('modal-check-ans');
  btnCheckAns.addEventListener('click', handleCheckAnswer);

  const modalInput = document.getElementById('modal-answer-input');
  modalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleCheckAnswer();
    if (e.key === 'Escape') closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.activeSquareModal !== null) {
      closeModal();
    }
  });

  // Quick Add inside Modal button
  const btnQuickSave = document.getElementById('modal-quick-save-btn');
  if (btnQuickSave) {
    btnQuickSave.addEventListener('click', handleQuickSaveModalQuestion);
  }

  // Play Again Button
  const btnPlayAgain = document.getElementById('btn-play-again');
  btnPlayAgain.addEventListener('click', () => {
    document.getElementById('victory-overlay').classList.remove('open');
    restartGame();
  });

  // Build Board Cells & Grid
  buildBoardGrid();
  renderPlayerInputs();
  updateSingleEditorInputs();
  populateBulkInputsFromState();
  updateQuestionsCountBadge();

  // Resize handler for perfect token positions
  window.addEventListener('resize', () => {
    repositionAllTokens();
  });
}

function switchView(viewName) {
  document.getElementById('settings-view').classList.toggle('active', viewName === 'settings');
  document.getElementById('game-view').classList.toggle('active', viewName === 'game');
  if (viewName === 'game') {
    updateQuestionIconsHighlight();
    setTimeout(repositionAllTokens, 60);
  } else if (viewName === 'settings') {
    populateBulkInputsFromState();
    updateSingleEditorInputs();
    updateQuestionsCountBadge();
  }
}

function renderPlayerInputs() {
  const container = document.getElementById('player-names-container');
  container.innerHTML = '';

  const total = state.mode === 'cpu' ? 2 : state.localCount;

  for (let i = 0; i < total; i++) {
    const row = document.createElement('div');
    row.className = 'player-name-row';

    const dot = document.createElement('div');
    dot.className = 'player-color-dot';
    dot.style.background = PLAYER_COLORS[i];

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'player-name-input';
    input.maxLength = 22;
    input.dataset.index = i;

    if (state.mode === 'cpu' && i === 1) {
      input.value = 'CPU';
      input.disabled = true;
      input.setAttribute('aria-label', 'CPU player name');
    } else {
      const fallback = 'P' + (i + 1);
      input.value = state.savedNames[i] && state.savedNames[i] !== 'CPU' ? state.savedNames[i] : (i === 0 && state.savedNames[0] ? state.savedNames[0] : '');
      input.placeholder = fallback;
      input.setAttribute('aria-label', 'Player ' + (i + 1) + ' name');
      input.addEventListener('input', () => {
        state.unsavedNames = true;
        updateNamesStatusBadge();
      });
    }

    row.appendChild(dot);
    row.appendChild(input);
    container.appendChild(row);
  }

  updateNamesStatusBadge();
}

function gatherPlayerNamesFromInputs() {
  const inputs = document.querySelectorAll('.player-name-input');
  const count = state.mode === 'cpu' ? 2 : state.localCount;
  const names = [];

  for (let i = 0; i < count; i++) {
    if (state.mode === 'cpu' && i === 1) {
      names.push('CPU');
    } else {
      const val = inputs[i] ? inputs[i].value.trim() : '';
      names.push(val.slice(0, 22) || ('P' + (i + 1)));
    }
  }

  state.savedNames = names;
}

function updateNamesStatusBadge() {
  const badge = document.getElementById('names-status-badge');
  const total = state.mode === 'cpu' ? 2 : state.localCount;
  if (state.unsavedNames) {
    badge.className = 'names-status-badge unsaved';
    badge.textContent = 'Unsaved changes';
  } else {
    badge.className = 'names-status-badge saved';
    badge.textContent = '✓ ' + total + ' names saved';
  }
}

// Auto-commit whatever is in input boxes into state.questions
function autoCommitAllQuestionInputs() {
  // 1. Check single square input
  const sel = document.getElementById('select-square');
  if (sel) {
    const sqNum = parseInt(sel.value, 10);
    const qIn = document.getElementById('single-q-input');
    const aIn = document.getElementById('single-a-input');
    if (sqNum >= 1 && sqNum <= 20 && qIn && aIn) {
      const qVal = qIn.value.trim();
      const aVal = aIn.value.trim();
      if (qVal.length > 0 || aVal.length > 0) {
        state.questions[sqNum - 1] = { q: qVal, a: aVal };
      }
    }
  }

  // 2. Check bulk textareas
  const qArea = document.getElementById('bulk-questions-input');
  if (qArea && qArea.value.trim().length > 0) {
    commitBulkTextareas(false);
  }

  saveQuestionsToStorage();
}

// Bulk Question Parser & Importer
function commitBulkTextareas(showNotifications = true) {
  const qArea = document.getElementById('bulk-questions-input');
  const aArea = document.getElementById('bulk-answers-input');
  const msgEl = document.getElementById('bulk-status-msg');
  if (!qArea) return;

  const qLines = qArea.value.split(/\\r?\\n/).map(l => l.trim()).filter(l => l.length > 0);
  const aLines = aArea ? aArea.value.split(/\\r?\\n/).map(l => l.trim()).filter(l => l.length > 0) : [];

  if (qLines.length === 0) {
    if (showNotifications && msgEl) {
      msgEl.className = 'editor-status-msg error';
      msgEl.textContent = 'Please enter at least 1 question.';
    }
    return;
  }

  const count = Math.min(20, qLines.length);

  for (let i = 0; i < count; i++) {
    let q = qLines[i];
    let a = aLines[i] || '';

    // If answer box was empty or shorter, check if question line has embedded answer:
    // e.g. "What is 2+2? = 4" or "What is 2+2? - 4" or "What is 2+2? -> 4"
    if (!a) {
      const delimMatch = q.match(/^(.+?)\\s*(?:=|->|=>|\\t|--|::|Answer:\\s*|A:\\s*)(.+)$/i);
      if (delimMatch) {
        q = delimMatch[1].trim();
        a = delimMatch[2].trim();
      }
    }

    state.questions[i] = { q: q, a: a };
  }

  saveQuestionsToStorage();
  updateSingleEditorInputs();
  updateQuestionIconsHighlight();
  updateQuestionsCountBadge();

  if (showNotifications && msgEl) {
    msgEl.className = 'editor-status-msg success';
    msgEl.textContent = '✓ Saved ' + count + ' question(s) directly to the game board!';
    sounds.playSave();
  }
}

function populateBulkInputsFromState() {
  const qs = [];
  const as = [];
  state.questions.forEach(item => {
    if (item && item.q) {
      qs.push(item.q);
      as.push(item.a || '');
    }
  });
  const qArea = document.getElementById('bulk-questions-input');
  const aArea = document.getElementById('bulk-answers-input');
  if (qArea) qArea.value = qs.join('\\n');
  if (aArea) aArea.value = as.join('\\n');
}

// Single Question Handling
function updateSingleEditorInputs() {
  const sel = document.getElementById('select-square');
  const sqNum = parseInt(sel.value, 10);
  const qObj = state.questions[sqNum - 1] || { q: '', a: '' };
  const qIn = document.getElementById('single-q-input');
  const aIn = document.getElementById('single-a-input');
  const msgEl = document.getElementById('single-status-msg');

  if (qIn) qIn.value = qObj.q || '';
  if (aIn) aIn.value = qObj.a || '';
  if (msgEl) msgEl.textContent = '';
}

function handleSaveSingleSquare() {
  const sel = document.getElementById('select-square');
  const sqNum = parseInt(sel.value, 10);
  const qVal = document.getElementById('single-q-input').value.trim();
  const aVal = document.getElementById('single-a-input').value.trim();
  const msgEl = document.getElementById('single-status-msg');

  state.questions[sqNum - 1] = { q: qVal, a: aVal };
  saveQuestionsToStorage();
  populateBulkInputsFromState();

  msgEl.className = 'editor-status-msg success';
  msgEl.textContent = '✓ Square ' + sqNum + ' saved!';
  sounds.playSave();
}

function handleClearSingleSquare() {
  const sel = document.getElementById('select-square');
  const sqNum = parseInt(sel.value, 10);
  const msgEl = document.getElementById('single-status-msg');

  state.questions[sqNum - 1] = { q: '', a: '' };
  document.getElementById('single-q-input').value = '';
  document.getElementById('single-a-input').value = '';
  saveQuestionsToStorage();
  populateBulkInputsFromState();

  msgEl.className = 'editor-status-msg success';
  msgEl.textContent = '✓ Square ' + sqNum + ' cleared.';
  sounds.playSave();
}

// Build Board Cells
function buildBoardGrid() {
  const overlay = document.getElementById('board-grid-overlay');
  overlay.innerHTML = '';

  for (let sq = 1; sq <= 20; sq++) {
    const coords = SQUARE_COORDS[sq];
    const cell = document.createElement('div');
    cell.className = 'board-cell';
    cell.dataset.square = sq;
    // CSS Grid area (1-indexed)
    cell.style.gridColumn = (coords.col + 1) + ' / span 1';
    cell.style.gridRow = (coords.row + 1) + ' / span 1';

    // Repeating icon colors based on column
    const colNum = coords.col + 1;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sq-q-btn' + (sq === 10 ? ' sq-10' : '');
    btn.dataset.square = sq;
    btn.dataset.col = colNum;
    btn.setAttribute('aria-label', 'Open question for square ' + sq);
    btn.textContent = '?';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleSquareQuestionClick(sq);
    });

    cell.appendChild(btn);
    overlay.appendChild(cell);
  }

  updateQuestionIconsHighlight();
}

function updateQuestionIconsHighlight() {
  document.querySelectorAll('.sq-q-btn').forEach(btn => {
    const sq = parseInt(btn.dataset.square, 10);
    const hasQ = state.questions[sq - 1] && state.questions[sq - 1].q && state.questions[sq - 1].q.trim().length > 0;
    btn.classList.toggle('has-question', !!hasQ);
  });
}

// Start Game
function startGame() {
  const total = state.mode === 'cpu' ? 2 : state.localCount;
  state.players = [];

  for (let i = 0; i < total; i++) {
    const name = state.savedNames[i] || ('P' + (i + 1));
    state.players.push({
      id: i,
      name: name,
      color: PLAYER_COLORS[i],
      position: 0,
      trophySquares: new Set(),
      isCpu: state.mode === 'cpu' && i === 1
    });
  }

  state.activeIndex = 0;
  state.rolledValue = 1;
  state.busy = false;
  state.gameOver = false;

  renderPlayerTokens();
  renderPlayerList();
  updateTurnDisplay();
  updateQuestionIconsHighlight(); // Always ensure highlights on the board!
  setStatusMessage('Click the dice to roll.');

  switchView('game');
  resetDiceToFace(1);
}

function restartGame() {
  state.players.forEach(p => {
    p.position = 0;
    p.trophySquares = new Set();
  });
  state.activeIndex = 0;
  state.rolledValue = 1;
  state.busy = false;
  state.gameOver = false;

  document.getElementById('btn-move-space').classList.remove('show');
  renderPlayerList();
  updateTurnDisplay();
  updateQuestionIconsHighlight();
  setStatusMessage('Click the dice to roll.');
  resetDiceToFace(1);
  repositionAllTokens();
}

// Render Player Tokens
function renderPlayerTokens() {
  const dockSlots = document.getElementById('dock-slots-stage');
  const boardStage = document.getElementById('board-inner-grid-stage');

  document.querySelectorAll('.player-token').forEach(el => el.remove());

  state.players.forEach(p => {
    const token = document.createElement('div');
    token.className = 'player-token token-p' + (p.id + 1);
    token.id = 'token-p-' + p.id;
    token.dataset.playerId = p.id;
    token.textContent = p.isCpu ? 'C' : (p.id + 1);
    token.style.background = p.color;
    boardStage.appendChild(token);
  });

  repositionAllTokens();
}

function repositionAllTokens() {
  const boardStage = document.getElementById('board-inner-grid-stage');
  const dockStage = document.getElementById('dock-slots-stage');
  if (!boardStage || !dockStage) return;

  const stageRect = boardStage.getBoundingClientRect();
  const dockRect = dockStage.getBoundingClientRect();

  // Group players by position
  const posGroups = {};
  state.players.forEach(p => {
    if (!posGroups[p.position]) posGroups[p.position] = [];
    posGroups[p.position].push(p);
  });

  Object.entries(posGroups).forEach(([posStr, group]) => {
    const pos = parseInt(posStr, 10);

    if (pos === 0) {
      // In Starting Dock
      const count = group.length;
      const totalWidth = count * 44;
      group.forEach((p, idx) => {
        const token = document.getElementById('token-p-' + p.id);
        if (!token) return;
        const dockCenterX = dockRect.left + dockRect.width / 2;
        const dockCenterY = dockRect.top + dockRect.height / 2;
        const offsetX = (idx - (count - 1) / 2) * 44;

        // Convert to boardStage coords
        const finalX = (dockCenterX + offsetX) - stageRect.left;
        const finalY = dockCenterY - stageRect.top;

        token.style.left = finalX + 'px';
        token.style.top = finalY + 'px';
      });
    } else {
      // On Board Square
      const cell = document.querySelector('.board-cell[data-square="' + pos + '"]');
      if (!cell) return;
      const cellRect = cell.getBoundingClientRect();
      const centerX = (cellRect.left + cellRect.width / 2) - stageRect.left;
      const centerY = (cellRect.top + cellRect.height / 2) - stageRect.top;

      const count = group.length;
      const offset = Math.min(cellRect.width, cellRect.height) * 0.22;

      group.forEach((p, idx) => {
        const token = document.getElementById('token-p-' + p.id);
        if (!token) return;

        let dx = 0;
        let dy = 0;

        if (count === 1) {
          dx = 0;
          dy = 0;
        } else if (count === 2) {
          dx = idx === 0 ? -offset : offset;
          dy = 0;
        } else if (count === 3) {
          if (idx === 0) { dx = -offset * 0.9; dy = -offset * 0.7; }
          else if (idx === 1) { dx = offset * 0.9; dy = -offset * 0.7; }
          else { dx = 0; dy = offset * 0.8; }
        } else if (count === 4) {
          const sx = idx % 2 === 0 ? -1 : 1;
          const sy = idx < 2 ? -1 : 1;
          dx = sx * offset * 0.8;
          dy = sy * offset * 0.8;
        } else if (count === 5) {
          if (idx === 0) { dx = -offset * 0.85; dy = -offset * 0.85; }
          else if (idx === 1) { dx = offset * 0.85; dy = -offset * 0.85; }
          else if (idx === 2) { dx = -offset * 0.85; dy = offset * 0.85; }
          else if (idx === 3) { dx = offset * 0.85; dy = offset * 0.85; }
          else { dx = 0; dy = 0; }
        }

        token.style.left = (centerX + dx) + 'px';
        token.style.top = (centerY + dy) + 'px';
      });
    }
  });
}

function renderPlayerList() {
  const container = document.getElementById('players-list-card');
  container.innerHTML = '';

  state.players.forEach((p, idx) => {
    const row = document.createElement('div');
    row.className = 'player-score-row' + (idx === state.activeIndex ? ' active' : '');
    row.id = 'player-score-row-' + p.id;

    const left = document.createElement('div');
    left.className = 'score-name-group';

    const dot = document.createElement('div');
    dot.className = 'score-dot';
    dot.style.background = p.color;

    const name = document.createElement('span');
    name.className = 'score-player-name';
    name.textContent = p.name;

    left.appendChild(dot);
    left.appendChild(name);

    const trophy = document.createElement('span');
    trophy.className = 'trophy-badge';
    trophy.id = 'trophy-badge-' + p.id;
    trophy.textContent = '🏆 ' + p.trophySquares.size + '/5';

    row.appendChild(left);
    row.appendChild(trophy);
    container.appendChild(row);
  });
}

function updateTurnDisplay() {
  const activePlayer = state.players[state.activeIndex];
  if (!activePlayer) return;

  const dot = document.getElementById('active-player-dot');
  dot.style.background = activePlayer.color;

  const nameEl = document.getElementById('active-player-name-text');
  nameEl.textContent = activePlayer.name;

  document.querySelectorAll('.player-score-row').forEach((row, idx) => {
    row.classList.toggle('active', idx === state.activeIndex);
  });

  const diceBtn = document.getElementById('dice-btn');
  diceBtn.disabled = state.busy || activePlayer.isCpu;

  if (activePlayer.isCpu && !state.busy && !state.gameOver) {
    setStatusMessage('CPU is thinking...');
    setTimeout(cpuTakeTurn, 900);
  }
}

function setStatusMessage(msg) {
  const el = document.getElementById('status-message-banner');
  el.textContent = msg;
}

// 3D Dice Logic
function resetDiceToFace(val) {
  const cube = document.getElementById('cube-dice');
  const angles = getFaceRotations(val);
  cube.style.transform = 'rotateX(' + (angles.rx - 12) + 'deg) rotateY(' + (angles.ry + 16) + 'deg)';
}

function getFaceRotations(face) {
  switch (face) {
    case 1: return { rx: 0, ry: 0 };
    case 2: return { rx: -90, ry: 0 };
    case 3: return { rx: 0, ry: -90 };
    case 4: return { rx: 0, ry: 90 };
    case 5: return { rx: 90, ry: 0 };
    case 6: return { rx: 0, ry: 180 };
    default: return { rx: 0, ry: 0 };
  }
}

function handleDiceClick() {
  if (state.busy || state.gameOver) return;
  const activePlayer = state.players[state.activeIndex];
  if (activePlayer.isCpu) return;

  rollDiceAndProceed(false);
}

function cpuTakeTurn() {
  if (state.busy || state.gameOver) return;
  const activePlayer = state.players[state.activeIndex];
  if (!activePlayer.isCpu) return;

  setStatusMessage('CPU rolls the dice...');
  rollDiceAndProceed(true);
}

function rollDiceAndProceed(isCpu) {
  state.busy = true;
  document.getElementById('dice-btn').disabled = true;
  document.getElementById('btn-move-space').classList.remove('show');

  const rolled = Math.floor(Math.random() * 6) + 1;
  state.rolledValue = rolled;

  sounds.playRoll();

  const cube = document.getElementById('cube-dice');
  const targetAngles = getFaceRotations(rolled);

  // Multi-spin 3D tumble
  const tumbleX = (Math.floor(Math.random() * 3) + 2) * 360 + targetAngles.rx;
  const tumbleY = (Math.floor(Math.random() * 3) + 2) * 360 + targetAngles.ry;

  cube.style.transition = 'transform 1s cubic-bezier(0.18, 0.9, 0.28, 1.05)';
  cube.style.transform = 'rotateX(' + (tumbleX - 12) + 'deg) rotateY(' + (tumbleY + 16) + 'deg)';

  setTimeout(() => {
    cube.style.transition = 'none';
    cube.style.transform = 'rotateX(' + (targetAngles.rx - 12) + 'deg) rotateY(' + (targetAngles.ry + 16) + 'deg)';

    const p = state.players[state.activeIndex];
    const spaceWord = rolled === 1 ? '1 space' : (rolled + ' spaces');

    if (isCpu) {
      setStatusMessage('CPU rolled a ' + rolled + '!');
      setTimeout(() => {
        executeMovementSequence(p, rolled);
      }, 1000);
    } else {
      setStatusMessage(p.name + ' rolled ' + rolled + '! Click Move.');
      const moveBtn = document.getElementById('btn-move-space');
      moveBtn.textContent = 'Move ' + spaceWord;
      moveBtn.classList.add('show');
      state.busy = false;
    }
  }, 1050);
}

function handleMoveSpaceClick() {
  if (state.busy || state.gameOver) return;
  const btn = document.getElementById('btn-move-space');
  btn.classList.remove('show');
  state.busy = true;

  const p = state.players[state.activeIndex];
  executeMovementSequence(p, state.rolledValue);
}

// Movement & Step Logic
async function executeMovementSequence(player, steps) {
  state.busy = true;
  const token = document.getElementById('token-p-' + player.id);

  // Check overshoot: if position + steps > 20, token stays put
  if (player.position + steps > 20) {
    sounds.playBlocked();
    setStatusMessage(player.name + ' needs an exact roll. The token stays put.');
    await delay(1600);
    state.busy = false;
    passTurn();
    return;
  }

  // Hop step by step
  for (let s = 1; s <= steps; s++) {
    player.position += 1;
    sounds.playStep();
    if (token) token.classList.add('hopping');
    repositionAllTokens();
    await delay(250);
    if (token) token.classList.remove('hopping');
    await delay(120);
  }

  // Check victory by exact finish
  if (player.position === 20) {
    triggerVictory(player, 'reaching square 20!');
    return;
  }

  // Check Ladders
  if (LADDERS[player.position]) {
    const dest = LADDERS[player.position];
    setStatusMessage('Ladder! ' + player.name + ' climbs to square ' + dest + '.');
    sounds.playLadder();
    await delay(600);
    player.position = dest;
    repositionAllTokens();
    await delay(600);

    if (player.position === 20) {
      triggerVictory(player, 'reaching square 20!');
      return;
    }
  }
  // Check Snakes
  else if (SNAKES[player.position]) {
    const dest = SNAKES[player.position];
    setStatusMessage('Oh no! A snake bites ' + player.name + ' and slides the token down to square ' + dest + '.');
    sounds.playSnake();

    const cryingBadge = document.getElementById('crying-overlay-badge');
    cryingBadge.classList.add('show');
    await delay(800);
    cryingBadge.classList.remove('show');

    player.position = dest;
    repositionAllTokens();
    await delay(600);
  }

  state.busy = false;
  passTurn();
}

function passTurn() {
  if (state.gameOver) return;
  state.activeIndex = (state.activeIndex + 1) % state.players.length;
  updateTurnDisplay();
  const nextPlayer = state.players[state.activeIndex];
  if (!nextPlayer.isCpu) {
    setStatusMessage('It is ' + nextPlayer.name + '\\'s turn. Click the dice to roll.');
  }
}

// Questions, Answers & Trophies
function handleSquareQuestionClick(sqNum) {
  if (state.busy || state.gameOver) return;
  const activePlayer = state.players[state.activeIndex];
  if (activePlayer && activePlayer.isCpu) return;

  state.activeSquareModal = sqNum;
  const qRecord = state.questions[sqNum - 1];

  if (!qRecord || !qRecord.q || !qRecord.q.trim()) {
    // Open modal with quick-add prompt!
    openModalForQuickAdd(sqNum);
  } else {
    openModal(sqNum, qRecord.q);
  }
}

function openModal(sqNum, questionText) {
  const backdrop = document.getElementById('modal-backdrop');
  const title = document.getElementById('modal-title');
  const textEl = document.getElementById('modal-question-text');
  const input = document.getElementById('modal-answer-input');
  const feedback = document.getElementById('modal-feedback');
  const quickAdd = document.getElementById('modal-quick-add');
  const checkBtn = document.getElementById('modal-check-ans');

  title.textContent = 'Square ' + sqNum + ' question';
  textEl.textContent = questionText;
  textEl.style.display = 'block';
  input.style.display = 'block';
  input.value = '';
  feedback.textContent = '';
  feedback.className = 'modal-feedback';

  if (quickAdd) quickAdd.classList.remove('show');
  if (checkBtn) checkBtn.style.display = 'inline-block';

  backdrop.classList.add('open');
  setTimeout(() => input.focus(), 60);
}

function openModalForQuickAdd(sqNum) {
  const backdrop = document.getElementById('modal-backdrop');
  const title = document.getElementById('modal-title');
  const textEl = document.getElementById('modal-question-text');
  const input = document.getElementById('modal-answer-input');
  const feedback = document.getElementById('modal-feedback');
  const quickAdd = document.getElementById('modal-quick-add');
  const checkBtn = document.getElementById('modal-check-ans');

  title.textContent = 'Square ' + sqNum + ' question';
  textEl.textContent = 'No question is set for Square ' + sqNum + ' yet. You can add one right now:';
  input.style.display = 'none';
  feedback.textContent = '';
  feedback.className = 'modal-feedback';

  if (quickAdd) {
    quickAdd.classList.add('show');
    document.getElementById('modal-quick-q').value = '';
    document.getElementById('modal-quick-a').value = '';
  }
  if (checkBtn) checkBtn.style.display = 'none';

  backdrop.classList.add('open');
  setTimeout(() => {
    const qField = document.getElementById('modal-quick-q');
    if (qField) qField.focus();
  }, 60);
}

function handleQuickSaveModalQuestion() {
  if (state.activeSquareModal === null) return;
  const sqNum = state.activeSquareModal;
  const qVal = document.getElementById('modal-quick-q').value.trim();
  const aVal = document.getElementById('modal-quick-a').value.trim();

  if (!qVal) {
    const feedback = document.getElementById('modal-feedback');
    feedback.className = 'modal-feedback wrong';
    feedback.textContent = 'Please type a question!';
    return;
  }

  state.questions[sqNum - 1] = { q: qVal, a: aVal };
  saveQuestionsToStorage();
  populateBulkInputsFromState();
  updateSingleEditorInputs();
  sounds.playSave();

  // Switch modal directly to asking this question
  openModal(sqNum, qVal);
}

function closeModal() {
  state.activeSquareModal = null;
  document.getElementById('modal-backdrop').classList.remove('open');
}

function handleCheckAnswer() {
  if (state.activeSquareModal === null) return;
  const sqNum = state.activeSquareModal;
  const qRecord = state.questions[sqNum - 1];
  if (!qRecord) return;

  const userAns = document.getElementById('modal-answer-input').value.trim();
  const feedback = document.getElementById('modal-feedback');
  const activePlayer = state.players[state.activeIndex];

  // Normalize: outer spaces trimmed, multiple inner spaces collapsed, lowercased
  const normUser = userAns.replace(/\\s+/g, ' ').toLowerCase();
  const normExpected = (qRecord.a || '').trim().replace(/\\s+/g, ' ').toLowerCase();

  // If teacher left expected answer blank, accept any thoughtful non-empty student answer!
  const isMatch = normExpected.length === 0 ? normUser.length > 0 : (normUser === normExpected);

  if (isMatch && normUser.length > 0) {
    if (activePlayer.trophySquares.has(sqNum)) {
      feedback.className = 'modal-feedback info';
      feedback.textContent = 'Correct! You already earned the trophy for this square.';
      sounds.playCorrect();
    } else {
      activePlayer.trophySquares.add(sqNum);
      const count = activePlayer.trophySquares.size;
      const badge = document.getElementById('trophy-badge-' + activePlayer.id);
      if (badge) badge.textContent = '🏆 ' + count + '/5';

      feedback.className = 'modal-feedback correct';
      feedback.textContent = 'Correct! Trophy earned! ✨🏆';
      sounds.playTrophy();

      // Check 5 trophies victory condition
      if (count >= 5) {
        setTimeout(() => {
          closeModal();
          activePlayer.position = 20;
          repositionAllTokens();
          triggerVictory(activePlayer, 'collected five trophies!');
        }, 1200);
      }
    }
  } else {
    feedback.className = 'modal-feedback wrong';
    feedback.textContent = 'Not quite—try again. Check spelling and spacing.';
    sounds.playWrong();
  }
}

// Victory Handler
function triggerVictory(winner, reason) {
  state.gameOver = true;
  state.busy = true;

  sounds.playVictory();

  const overlay = document.getElementById('victory-overlay');
  const msgEl = document.getElementById('victory-msg');
  msgEl.textContent = winner.name + ' won by ' + reason;

  generateConfetti();
  overlay.classList.add('open');
}

function generateConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#ffd700', '#00d2ff', '#ff5d66', '#18a75b', '#ffffff', '#8a4de1'];

  for (let i = 0; i < 90; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (2.2 + Math.random() * 2.5) + 's';
    c.style.animationDelay = (Math.random() * 2.2) + 's';
    c.style.transform = 'scale(' + (0.5 + Math.random() * 0.8) + ')';
    container.appendChild(c);
  }
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', initUI);
`;

const htmlBody = `
  <header class="app-header">
    <div class="title-img-wrapper">
      <img src="${titleDataUri}" alt="SNAKES AND LADDER" class="title-img" onerror="this.src='https://raw.githubusercontent.com/cs0028monglish-cmd/pictures-for-my-site-/main/title%20for%20snakes%20and%20ladder%20.png'" />
    </div>
    <button id="sound-toggle-btn" class="sound-btn" aria-pressed="true" aria-label="Toggle game sound">
      🔊 Sound on
    </button>
  </header>

  <main class="main-stage">
    <!-- SETTINGS SCREEN -->
    <section id="settings-view" class="view-screen active" aria-labelledby="settings-heading">
      <div class="settings-panel">
        <h1 id="settings-heading">Set up your game</h1>
        <p class="subtitle">Choose how to play, save the player names, and add your learning questions.</p>

        <div class="section-label">🎮 Play Mode</div>
        <div class="mode-cards" role="radiogroup" aria-label="Play mode">
          <button type="button" id="mode-cpu" class="mode-card" aria-pressed="true">
            🤖 Versus computer
          </button>
          <button type="button" id="mode-local" class="mode-card" aria-pressed="false">
            👥 Various players
          </button>
        </div>

        <div id="local-count-group" class="player-count-group" style="display: none;" role="group" aria-label="Number of local players">
          <button type="button" class="btn-pill btn-count-pill active" data-count="2">2 Players</button>
          <button type="button" class="btn-pill btn-count-pill" data-count="3">3 Players</button>
          <button type="button" class="btn-pill btn-count-pill" data-count="4">4 Players</button>
          <button type="button" class="btn-pill btn-count-pill" data-count="5">5 Players</button>
        </div>

        <div class="section-label">👤 Player Names (Optional)</div>
        <div id="player-names-container" class="player-names-grid">
          <!-- Populated by JavaScript -->
        </div>

        <div class="save-names-bar">
          <button type="button" id="btn-save-names" class="btn-green-action">Save player names</button>
          <span id="names-status-badge" class="names-status-badge saved" aria-live="polite">✓ 2 names saved</span>
        </div>

        <details class="questions-accordion" open>
          <summary>
            <span>Add or edit my questions</span>
            <span id="q-count-indicator" class="q-count-indicator">20/20 active questions</span>
          </summary>
          <div class="questions-accordion-content">
            <div class="bulk-editor-grid">
              <div class="bulk-textarea-wrap">
                <label for="bulk-questions-input">Questions, one per line (1 to 20):</label>
                <textarea id="bulk-questions-input" class="bulk-textarea" placeholder="Line 1 = Square 1&#10;Line 2 = Square 2&#10;..."></textarea>
              </div>
              <div class="bulk-textarea-wrap">
                <label for="bulk-answers-input">Answers, one per line (matching order):</label>
                <textarea id="bulk-answers-input" class="bulk-textarea" placeholder="Line 1 answer&#10;Line 2 answer&#10;..."></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
              <button type="button" id="btn-import-bulk" class="btn-green-action">Save all questions to game ✓</button>
              <span style="font-size: 0.9rem; color: #a2c6f5;">*Questions also save automatically as you type!</span>
            </div>
            <div id="bulk-status-msg" class="editor-status-msg" aria-live="polite"></div>

            <div class="single-square-editor">
              <div class="single-sq-controls">
                <label for="select-square" style="font-weight: bold; color: #b8d5ff;">Edit by square:</label>
                <select id="select-square" class="select-square"></select>
                <button type="button" id="btn-save-single" class="btn-green-action" style="padding: 6px 14px; font-size: 0.95rem;">Save this square</button>
                <button type="button" id="btn-clear-single" class="btn-secondary">Clear this square</button>
              </div>
              <div class="single-sq-inputs">
                <input type="text" id="single-q-input" class="player-name-input" placeholder="Question text for this square" />
                <input type="text" id="single-a-input" class="player-name-input" placeholder="Expected answer" />
              </div>
              <div id="single-status-msg" class="editor-status-msg" aria-live="polite"></div>
            </div>
          </div>
        </details>

        <button type="button" id="btn-start-game" class="btn-start-game">Start the game ▶</button>
      </div>
    </section>

    <!-- GAMEPLAY SCREEN -->
    <section id="game-view" class="view-screen" aria-label="Game board and controls">
      <div class="game-top-bar">
        <button type="button" id="btn-back-settings" class="top-nav-btn">← Back to settings</button>
        <button type="button" id="btn-restart-game" class="top-nav-btn">↻ Restart game</button>
      </div>

      <div class="game-layout">
        <!-- Board Column -->
        <div class="board-column">
          <div class="board-frame-container" role="region" aria-label="Snakes and Ladders 20 square board">
            <div id="board-inner-grid-stage" class="board-inner-grid-stage">
              <img src="${boardDataUri}" alt="Snakes and Ladders Board" class="board-bg-img" onerror="this.src='https://raw.githubusercontent.com/cs0028monglish-cmd/pictures-for-my-site-/main/snakes%20and%20Ladder.png'" />
              <div id="board-grid-overlay" class="board-grid-overlay">
                <!-- 20 cells with ? buttons -->
              </div>
              <div id="crying-overlay-badge" class="crying-overlay-badge" aria-hidden="true">
                <span class="crying-emoji-icon">😭</span>
              </div>
            </div>
          </div>

          <!-- Starting Dock -->
          <div class="starting-dock-wrap" role="region" aria-label="Starting dock for position zero">
            <div class="dock-header-label">STARTING DOCK</div>
            <div id="dock-slots-stage" class="dock-slots-stage">
              <!-- Tokens resting at 0 -->
            </div>
          </div>
        </div>

        <!-- Control Column -->
        <aside class="control-column" aria-label="Game controls and player status">
          <div class="control-card-panel">
            <div class="turn-header">
              <div class="turn-subhead">CURRENT TURN</div>
              <div class="active-player-banner">
                <span id="active-player-dot" class="active-dot-indicator"></span>
                <span id="active-player-name-text" class="active-player-name">P1</span>
              </div>
            </div>

            <div id="status-message-banner" class="status-message-banner" aria-live="polite">
              Click the dice to roll.
            </div>

            <div class="avatar-dice-stage">
              <div class="avatar-wrapper" aria-hidden="true">
                <div class="animated-question-marks">
                  <span class="floating-q">?</span>
                  <span class="floating-q">?</span>
                  <span class="floating-q">?</span>
                </div>
                <div class="avatar-img-box">
                  <img src="${avatarDataUri}" alt="Learning companion snake avatar" class="avatar-img" onerror="this.src='https://raw.githubusercontent.com/cs0028monglish-cmd/pictures-for-my-site-/main/snakes%20and%20ladder%203.png'" />
                </div>
              </div>

              <!-- 3D Realistic stationary dice button -->
              <button type="button" id="dice-btn" class="dice-container-btn" aria-label="Roll the 3D dice">
                <div id="cube-dice" class="cube-dice">
                  <!-- Face 1 -->
                  <div class="cube-face face-1">
                    <span class="dice-pip"></span>
                  </div>
                  <!-- Face 2 -->
                  <div class="cube-face face-2">
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                  </div>
                  <!-- Face 3 -->
                  <div class="cube-face face-3">
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                  </div>
                  <!-- Face 4 -->
                  <div class="cube-face face-4">
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                  </div>
                  <!-- Face 5 -->
                  <div class="cube-face face-5">
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                  </div>
                  <!-- Face 6 -->
                  <div class="cube-face face-6">
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                    <span class="dice-pip"></span>
                  </div>
                </div>
              </button>
            </div>

            <button type="button" id="btn-move-space" class="btn-move-space">Move 1 space</button>

            <div id="players-list-card" class="players-list-card" role="region" aria-label="Player scoreboard">
              <!-- Populated by JavaScript -->
            </div>
          </div>

          <!-- Footer Signature -->
          <footer class="signature-box">
            <div class="sig-author">Dr.Abir Wafa</div>
            <div class="sig-title">Head of EdTech at Edulixa</div>
          </footer>
        </aside>
      </div>
    </section>
  </main>

  <!-- Question Modal -->
  <div id="modal-backdrop" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal-dialog">
      <div class="modal-header">
        <h2 id="modal-title" class="modal-title">Square question</h2>
        <button type="button" id="modal-close-btn" class="modal-close-btn" aria-label="Close question dialog">&times;</button>
      </div>
      <div id="modal-question-text" class="modal-question-text">Question goes here</div>

      <!-- Quick add fields when question was not set yet -->
      <div id="modal-quick-add" class="modal-quick-add">
        <label for="modal-quick-q">Type your question for this square:</label>
        <input type="text" id="modal-quick-q" class="player-name-input" placeholder="e.g. What is 8 + 9?" />
        <label for="modal-quick-a">Expected answer:</label>
        <input type="text" id="modal-quick-a" class="player-name-input" placeholder="e.g. 17" />
        <button type="button" id="modal-quick-save-btn" class="btn-green-action" style="align-self: flex-start; margin-top: 4px;">Save &amp; Play Question</button>
      </div>

      <input type="text" id="modal-answer-input" class="modal-input-field" placeholder="Type your answer here..." autocomplete="off" />
      <div id="modal-feedback" class="modal-feedback" aria-live="assertive"></div>
      <div class="modal-actions">
        <button type="button" id="modal-close-action" class="btn-secondary" onclick="document.getElementById('modal-close-btn').click()">Close</button>
        <button type="button" id="modal-check-ans" class="btn-green-action">Check my answer</button>
      </div>
    </div>
  </div>

  <!-- Victory Fullscreen Overlay -->
  <div id="victory-overlay" class="victory-overlay" role="dialog" aria-modal="true" aria-labelledby="victory-heading">
    <div id="confetti-container" class="confetti-container" aria-hidden="true"></div>
    <div class="victory-trophy-icon" aria-hidden="true">🏆</div>
    <h1 id="victory-heading" class="victory-title">Victory!</h1>
    <p id="victory-msg" class="victory-msg">Player 1 won!</p>
    <button type="button" id="btn-play-again" class="btn-play-again">Play again</button>
  </div>

  <!-- Toast notification -->
  <div id="toast-notice" class="toast-notice" role="status" aria-live="polite"></div>
`;

const fullHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Snakes and Ladder</title>
  <meta name="description" content="Educational snakes and ladders board game with custom questions, trophies, and 3D dice." />
  <meta property="og:title" content="Snakes and Ladder" />
  <meta property="og:description" content="Educational snakes and ladders board game with custom questions, trophies, and 3D dice." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <style>
${css}
  </style>
</head>
<body>
${htmlBody}
  <script>
${js}
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', fullHtml);
fs.writeFileSync('snake-learning-game-latest-edition.html', fullHtml);
fs.writeFileSync('generate_game.cjs', fs.readFileSync('make_improved_game.cjs'));
console.log('Successfully wrote index.html and snake-learning-game-latest-edition.html with rock-solid questions system!');
