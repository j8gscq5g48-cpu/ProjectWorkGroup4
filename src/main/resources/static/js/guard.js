/* =========================================================
   guard.js - Protezione pagine (UX)
   - usa api.me() (ritorna null se 401/403)
   - se non loggato: redirect a /auth.html
========================================================= */

async function requireAuth() {
    try {
        const me = await api.me(); // chiama /auth/me
        if (!me) {
            window.location.replace("/auth.html");
            return null;
        }
        return me;
    } catch (err) {
        if (err?.name === "ApiError" && (err.status === 401 || err.status === 403)) {
            window.location.replace("/auth.html");
            return null;
        }
        console.error(err);
        return null;
    }
}

// esponi global (per usarla anche in altri script)
window.requireAuth = requireAuth;

// auto-run quando includi guard.js nella pagina protetta
requireAuth();
