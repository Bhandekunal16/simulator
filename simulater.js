const c = document.getElementById("container");
const body = document.body;

async function a() {
  let len, bg;
  fetch("http://localhost:3000/config")
    .then(async (res) => {
      const Res = await res.json();
      len = Res.len;
      bg = Res.bg;
    })
    .then(() => {
      if (len > 0) {
        const responses = [];
        for (let i = 1; i < len; i++) {
          responses.push(`http://localhost:3000/image_${i}.png`);
        }

        let index = 0;

        body.style.backgroundColor = bg;

        setInterval(() => {
          if (c.firstChild) {
            c.removeChild(c.firstChild);
          }

          const img = document.createElement("img");
          img.src = responses[index];
          img.alt = `Image ${index}`;
          img.style.maxWidth = "100%";
          c.appendChild(img);

          index = (index + 1) % responses.length;
        }, 200);
      }
    });
}

a();
