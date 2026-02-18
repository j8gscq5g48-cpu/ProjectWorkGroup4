/* =========================================================
   guard.js - Protezione pagine (UX)
   - usa api.me() (ritorna null se 401)
   - se non loggato: redirect a /auth.html
   - salva redirect target per tornare alla pagina dopo login
========================================================= */

async function requireAuth({ redirectTo = "/auth.html", remember = true } = {}) {
    // api deve essere già caricato (api.js)
    const me = await api.me();

    if (me) return me; // loggato 

    if (remember) {
        // salva pagina corrente (path + query + hash)
        const target = window.location.pathname + window.location.search + window.location.hash;
        sessionStorage.setItem("postLoginRedirect", target);
    }

    window.location.href = redirectTo;
    return null;
}

// esponi global per semplicità (no moduli)
window.requireAuth = requireAuth;
