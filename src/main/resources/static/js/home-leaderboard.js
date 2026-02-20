document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.getElementById("home-lb-tbody");
    const status = document.getElementById("home-lb-status");
    if (!tbody) return;

    const setStatus = (msg = "") => {
        if (status) status.textContent = msg;
    };

    const IMG_1PX =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    try {
        setStatus("Caricamento classifica…");
        tbody.innerHTML = "";

        const payload = await api.get("/api/leaderboard/global?limit=5");
        const rows = Array.isArray(payload) ? payload : [];

        if (rows.length === 0) {
            setStatus("Nessun dato disponibile.");
            return;
        }

        rows.forEach((r, idx) => {
            const tr = document.createElement("tr");

            const th = document.createElement("th");
            th.scope = "row";
            th.className = "cell-rank";
            th.textContent = String(idx + 1);

            const tdAvatar = document.createElement("td");
            tdAvatar.className = "cell-avatar";
            const img = document.createElement("img");
            img.className = "avatar";
            img.loading = "lazy";
            img.width = 32;
            img.height = 32;
            img.src = r.avatarUrl || IMG_1PX;
            img.alt = r.username ? `Avatar di ${r.username}` : "Avatar";
            tdAvatar.appendChild(img);

            const tdUser = document.createElement("td");
            tdUser.textContent = r.username ?? "—";

            const tdScore = document.createElement("td");
            tdScore.textContent = String(r.totalScore ?? 0);

            const tdLevel = document.createElement("td");
            tdLevel.textContent = String(r.level ?? "—");

            tr.append(th, tdAvatar, tdUser, tdScore, tdLevel);
            tbody.appendChild(tr);
        });

        setStatus("");
    } catch (err) {
        console.error("Home Top5 load failed", err);
        setStatus("Impossibile caricare la classifica.");
    }
});