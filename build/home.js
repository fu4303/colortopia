const colors = [
         // Red
         { name: "Red 0", color: "#fff5f5" },
         { name: "Red 1", color: "#ffe3e3" },
         { name: "Red 2", color: "#ffc9c9" },
         { name: "Red 3", color: "#ffa8a8" },
         { name: "Red 4", color: "#ff8787" },
         { name: "Red 5", color: "#ff6b6b" },
         { name: "Red 6", color: "#fa5252" },
         { name: "Red 7", color: "#f03e3e" },
         { name: "Red 8", color: "#e03131" },
         { name: "Red 9", color: "#c92a2a" },
        
         // Pink
         { name: "Pink 0", color: "#fff0f6" },
         { name: "Pink 1", color: "#ffdeeb" },
         { name: "Pink 2", color: "#fcc2d7" },
         { name: "Pink 3", color: "#faa2c1" },
         { name: "Pink 4", color: "#f783ac" },
         { name: "Pink 5", color: "#f06595" },
         { name: "Pink 6", color: "#e64980" },
         { name: "Pink 7", color: "#d6336c" },
         { name: "Pink 8", color: "#c2255c" },
         { name: "Pink 9", color: "#a61e4d" },

         // Pink
         { name: "Grape 0", color: "#f8f0fc" },
         { name: "Grape 1", color: "#f3d9fa" },
         { name: "Grape 2", color: "#eebefa" },
         { name: "Grape 3", color: "#e599f7" },
         { name: "Grape 4", color: "#da77f2" },
         { name: "Grape 5", color: "#cc5de8" },
         { name: "Grape 6", color: "#be4bdb" },
         { name: "Grape 7", color: "#ae3ec9" },
         { name: "Grape 8", color: "#9c36b5" },
         { name: "Grape 9", color: "#862e9c" },

        // Gray
        { name: "Gray 0", color: "#f8f9fa" },
        { name: "Gray 1", color: "#f1f3f5" },
        { name: "Gray 2", color: "#e9ecef" },
        { name: "Gray 3", color: "#dee2e6" },
        { name: "Gray 4", color: "#ced4da" },
        { name: "Gray 5", color: "#adb5bd" },
        { name: "Gray 6", color: "#868e96" },
        { name: "Gray 7", color: "#495057" },
        { name: "Gray 8", color: "#343a40" },
        { name: "Gray 9", color: "#212529" },

        
      ];
      const grid = document.getElementById("grid");
      const text_colors = ["black", "white"];
      const levels = [
        {
          range: [0, 3],
          pass: "Fail",
          message: "Fails WCAG 2.0",
        },
        {
          range: [3, 4.5],
          pass: "AA Large",
          message: "Passes AA for large text (above 18pt or bold above 14pt)",
        },
        {
          range: [4.5, 7],
          pass: "AA",
          message:
            "Passes AA level for any size text and AAA for large text (above 18pt or bold above 14pt)",
        },
        {
          range: [7, 23], // 22 is highest, but upper bound check is < not <=
          pass: "AAA",
          message: "Passes AAA level for any size text",
        },
      ];
      const copy_buffer = document.getElementById("copy-buffer");

      // build the color chips grid
      for (let i in colors) {
        const d = document.createElement("a");
        d.classList.add("chip");
        d.href = "#";
        const sample = document.createElement("div");
        sample.classList.add("sample");
        sample.style.backgroundColor = colors[i].color;
        sample.appendChild(document.createTextNode(""));

       


        const info = document.createElement("div");
        info.classList.add("info");
        d.appendChild(sample);
        d.appendChild(info);

        let info_text = `<strong>${colors[i].name}</strong><br><span class="color" data-hex="${colors[i].color}">${colors[i].color}</span>`;

        //info.appendChild(document.createTextNode('YIQ: ' + getYIQ(colors[i].color)))

        let text_ratio = 0;
        let text_color = "#888";
        text_colors.map((color) => {
          const ratio = contrast(colors[i].color, color);
          if (ratio > text_ratio) {
            text_ratio = ratio;
            text_color = color;
          }
          const level = levels.filter(
            (o) => ratio >= o.range[0] && ratio < o.range[1]
          )[0];
          info_text += `<br>${color} ratio: ${ratio.toFixed(1)} (${
            level.pass
          })`;
        });
        info.innerHTML = info_text;

        sample.style.color = text_color;

        grid.appendChild(d);
      }

      grid.querySelector("[data-hex]").setAttribute("checked", true);

      // click on a chip (event delegation) to copy to clipboard
      grid.addEventListener(
        "click",
        (ev) => {
          var el = ev.target;
          while (el && el.nodeName !== "A") {
            el = el.parentNode;
          }
          if (el.nodeName === "A") {
            ev.preventDefault();
            el.classList.add("highlight");
            setTimeout(() => el.classList.remove("highlight"), 500);
            try {
              copy_buffer.value = el.querySelector("[data-hex]").innerHTML;
              copy_buffer.focus();
              copy_buffer.select();
              document.execCommand("copy");
              copy_buffer.value = "";
            } catch (err) {
              console.log("Failed to copy.");
            }
            ev.target.focus();
          }
        },
        false
      );

      function hex2Rgb(hex) {
        if (hex[0] === "#") {
          hex = hex.substr(1);
        } else if (hex === "black") {
          hex = "000000";
        } else if (hex === "white") {
          hex = "ffffff";
        }
        let r = 0,
          b = 0,
          g = 0;
        if (hex.length === 6) {
          r = parseInt(hex.substr(0, 2), 16);
          g = parseInt(hex.substr(2, 2), 16);
          b = parseInt(hex.substr(4, 2), 16);
        } else if (hex.length === 3) {
          r = parseInt(hex[0] + hex[0], 16);
          g = parseInt(hex[1] + hex[1], 16);
          b = parseInt(hex[2] + hex[2], 16);
        }
        return { r: r, g: g, b: b };
      }

      // rgb decimal value (0.0 - 1.0)
      function rgb2Decimal(n) {
        let d = (n / 255).toFixed(4).toString();
        return d.replace(/0+$/, "").replace(/\.$/, "");
      }

     

      // get color luminance
      function luminanace(hex) {
        const rgb = hex2Rgb(hex);
        const a = [rgb.r, rgb.g, rgb.b].map(function (v) {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
      }

      // two hex colors contrast based on luminance
      function contrast(hex1, hex2) {
        const lum1 = luminanace(hex1) + 0.05;
        const lum2 = luminanace(hex2) + 0.05;
        const ratio = lum1 / lum2;
        return lum2 > lum1 ? 1 / ratio : ratio;
      }