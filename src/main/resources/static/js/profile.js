document.addEventListener("DOMContentLoaded", async () => {
    const me = await requireAuth();
    if (!me) return;

    console.log("Utente loggato:", me);

    // ... resto del codice profile.js
});
