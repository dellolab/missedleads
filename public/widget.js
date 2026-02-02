(function() {
  // Floating button
  const button = document.createElement("button");
  button.innerText = "Contact us";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.padding = "12px 20px";
  button.style.background = "#0070f3";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "8px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  button.style.fontSize = "16px";
  button.style.transition = "transform 0.2s ease";
  button.onmouseover = () => (button.style.transform = "scale(1.05)");
  button.onmouseout = () => (button.style.transform = "scale(1)");

  document.body.appendChild(button);

  let popup = null;

  button.onclick = () => {
    if (popup) { popup.remove(); popup = null; return; }

    popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.bottom = "80px";
    popup.style.right = "20px";
    popup.style.width = "300px";
    popup.style.maxWidth = "90%";
    popup.style.background = "white";
    popup.style.border = "1px solid #ccc";
    popup.style.borderRadius = "10px";
    popup.style.padding = "20px";
    popup.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
    popup.style.zIndex = "10000";
    popup.style.fontFamily = "sans-serif";
    popup.style.transition = "all 0.3s ease";

    popup.innerHTML = `
      <form id="missedleads-form">
        <h3 style="margin-top:0;margin-bottom:12px;">Contact Us</h3>
        <input name="name" placeholder="Name" style="width:100%;margin-bottom:8px;padding:8px;border:1px solid #ccc;border-radius:4px;">
        <input name="email" placeholder="Email" style="width:100%;margin-bottom:8px;padding:8px;border:1px solid #ccc;border-radius:4px;">
        <input name="phone" placeholder="Phone" style="width:100%;margin-bottom:8px;padding:8px;border:1px solid #ccc;border-radius:4px;">
        <select name="urgency" style="width:100%;margin-bottom:8px;padding:8px;border:1px solid #ccc;border-radius:4px;">
          <option value="">Select urgency</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <textarea name="message" placeholder="Message" style="width:100%;margin-bottom:8px;padding:8px;border:1px solid #ccc;border-radius:4px;"></textarea>
        <button type="submit" style="width:100%;padding:10px;background:#0070f3;color:white;border:none;border-radius:6px;cursor:pointer;">Send</button>
      </form>
    `;

    document.body.appendChild(popup);

    const form = popup.querySelector("form");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        urgency: form.urgency.value,
        message: form.message.value,
      };

      try {
        const res = await fetch("https://your-vercel-deployment.vercel.app/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error(await res.text());

        alert("Message sent! Thank you.");
        popup.remove();
        popup = null;
      } catch (err) {
        console.error(err);
        alert("Failed to send message. Please try again.");
      }
    };
  };
})();
