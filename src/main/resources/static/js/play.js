const overlay = document.getElementById("gameOverlay");
const btnClose = document.getElementById("btnCloseGame");
const cards = document.querySelectorAll(".game-card");

// MODAL (custom)
const exitModal = document.getElementById("exitModal");
const btnExitCancel = document.getElementById("btnExitCancel");
const btnExitConfirm = document.getElementById("btnExitConfirm");

const rotateOverlay = document.getElementById("rotateOverlay");
const btnRotateCheck = document.getElementById("btnRotateCheck");
const btnRotateBack = document.getElementById("btnRotateBack");

let pendingGameId = null;
let currentGame = null;
let lastFocusedEl = null;

function rememberFocus() {
    lastFocusedEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
}

function restoreFocus() {
    (lastFocusedEl && document.contains(lastFocusedEl) ? lastFocusedEl : btnClose)?.focus?.();
}

/* ---------------- OVERLAY ---------------- */
function openOverlay(gameId) {
    rememberFocus();                 // ✅ salva dove eri (card cliccata)
    currentGame = gameId;

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");

    btnClose?.focus?.();             // ✅ focus dentro dialog

    // Avvia gioco scelto
    if (gameId === "flappy") {
        window.Flappy?.start?.();
    }
}

function closeOverlay() {
    if (overlay.contains(document.activeElement)) {
        document.activeElement.blur();
    }

    window.Flappy?.stop?.();

    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");

    restoreFocus();                  // ✅ torna alla card giusta
    currentGame = null;
}

/* ---------------- MODAL ---------------- */
function openExitModal() {
    rememberFocus();
    exitModal.classList.add("is-open");
    exitModal.setAttribute("aria-hidden", "false");
    btnExitCancel.focus();
}

function closeExitModal() {
    document.activeElement?.blur?.();
    exitModal.classList.remove("is-open");
    exitModal.setAttribute("aria-hidden", "true");
    restoreFocus();
}

function confirmExit() {
    closeExitModal();
    closeOverlay();
}

/* ---------------- EVENTS ---------------- */
cards.forEach((btn) => {
    btn.addEventListener("click", () => {
        const gameId = btn.dataset.game;
        if (!gameId || btn.disabled) return;

        if (isMobilePortrait()) {
            openRotateOverlay(gameId);
            return;
        }

        openOverlay(gameId);
    });
});

btnClose.addEventListener("click", openExitModal);

// ✅ ESC fix: non chiudere subito dopo aver aperto
window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (exitModal.classList.contains("is-open")) {
        closeExitModal();
        return;
    }

    if (overlay.classList.contains("is-open")) {
        openExitModal();
    }
});

// Bottoni modal
btnExitCancel.addEventListener("click", closeExitModal);
btnExitConfirm.addEventListener("click", confirmExit);

// Click fuori (backdrop) per annullare
exitModal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeExitModal();
});

function isMobilePortrait() {
    const isSmall = window.matchMedia("(max-width: 900px)").matches;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    return isSmall && isPortrait;
}

function openRotateOverlay(gameId) {
    rememberFocus();
    pendingGameId = gameId;
    rotateOverlay.classList.add("is-open");
    rotateOverlay.setAttribute("aria-hidden", "false");
    btnRotateCheck.focus();
}

function closeRotateOverlay() {
    document.activeElement?.blur?.();

    pendingGameId = null;
    rotateOverlay.classList.remove("is-open");
    rotateOverlay.setAttribute("aria-hidden", "true");

    restoreFocus();
}

function tryStartPendingGame() {
    if (!pendingGameId) return;
    if (isMobilePortrait()) return;

    const gameId = pendingGameId;
    closeRotateOverlay();
    openOverlay(gameId);
}

btnRotateCheck.addEventListener("click", tryStartPendingGame);
btnRotateBack.addEventListener("click", closeRotateOverlay);

window.addEventListener("orientationchange", tryStartPendingGame);
window.addEventListener("resize", tryStartPendingGame);

/* =========================================================
   SCORE SUBMIT (guest vs logged)
   - Non blocca il gioco se non sei loggato
   - Se loggato: POST /api/game/score
   - Da chiamare da flappy.js quando la run finisce
========================================================= */
window.submitScore = async (gameCode, score) => {
    try {
        await api.post("/api/game/score", { gameCode, score });
    } catch (e) {
        console.error("Errore submitScore:", e);
    }
};
