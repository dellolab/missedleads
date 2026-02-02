(function () {
  let open = false;

  /* ---------- Root ---------- */
  const root = document.createElement("div");
  Object.assign(root.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    background: "#0070f3",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    fontFamily: "system-ui, sans-serif",
    zIndex: "9999",
    overflow: "hidden",
    transition: "all 0.45s cubic-bezier(.4,0,.2,1)",
    transformOrigin: "bottom right",
    cursor: "pointer",
  });
  document.body.appendChild(root);

  /* ---------- Button ---------- */
  const button = document.createElement("div");
  button.innerText = "Contact";
  Object.assign(button.style, {
    width: "100%",
    height: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  });
  root.appendChild(button);

  /* ---------- Panel ---------- */
  const panel = document.createElement("div");
  Object.assign(panel.style, {
    width: "100%",
    height: "100%",
    background: "white",
    opacity: "0",
    transform: "scale(0.9) translateY(20px)",
    transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
    pointerEvents: "none",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  });

  panel.innerHTML = `
    <div style="padding:14px;border-bottom:1px solid #eee;font-weight:600; display:flex; justify-content:space-between; align-items:center">
      <span>Contact us</span>
      <button id="close-btn" type="button"
        style="background:#eee;border:none;border-radius:6px;padding:4px 8px;cursor:pointer;font-size:12px">
        Close
      </button>
    </div>

    <form style="padding:14px;display:flex;flex-direction:column;gap:8px;flex:1">
      <input name="name" placeholder="Name" required style="padding:8px;border:1px solid #ccc;border-radius:6px">
      <input name="email" placeholder="Email" required style="padding:8px;border:1px solid #ccc;border-radius:6px">
      <input name="phone" placeholder="Phone" style="padding:8px;border:1px solid #ccc;border-radius:6px">
      <textarea name="message" placeholder="Message" rows="3"
        style="padding:8px;border:1px solid #ccc;border-radius:6px"></textarea>

      <button type="submit"
        style="margin-top:6px;padding:10px;border:none;border-radius:8px;
        background:#0070f3;color:white;font-weight:600;cursor:pointer">
        Send
      </button>
    </form>
  `;
  root.appendChild(panel);

  const closeBtn = panel.querySelector("#close-btn");

  /* ---------- Toggle ONLY on button click ---------- */
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!open) {
      open = true;
      openWidget();
    }
  });

  /* ---------- Close via Close button ---------- */
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (open) {
      open = false;
      closeWidget();
    }
  });

  /* ---------- Panel click does NOT close ---------- */
  panel.addEventListener("click", (e) => e.stopPropagation());

  /* ---------- Functions to open/close widget ---------- */
  function openWidget() {
    root.style.width = "320px";
    root.style.height = "420px";
    root.style.background = "white";
    root.style.borderRadius = "16px";

    button.style.opacity = "0";

    setTimeout(() => {
      button.style.display = "none";
      panel.style.opacity = "1";
      panel.style.transform = "scale(1) translateY(0)";
      panel.style.pointerEvents = "auto";
    }, 120);
  }

  function closeWidget() {
    panel.style.opacity = "0";
    panel.style.transform = "scale(0.9) translateY(20px)";
    panel.style.pointerEvents = "none";

    setTimeout(() => {
      button.style.display = "flex";
      button.style.opacity = "1";
      root.style.width = "60px";
      root.style.height = "60px";
      root.style.background = "#0070f3";
      root.style.borderRadius = "18px";
    }, 200);
  }

  /* ---------- Submit (NO POPUPS) ---------- */
  const form = panel.querySelector("form");
  form.onsubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      await fetch("https://missedleads.vercel.app/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      form.reset(); // silently reset the form
    } catch {
      // intentionally silent
    }
  };
})();
