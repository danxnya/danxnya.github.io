import { PDA } from "./PDA.js";

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        const fileContent = evt.target.result;
        const codeArea = document.getElementById("fileDisplayArea");
        codeArea.textContent = fileContent; // Establecer el texto
        hljs.highlightElement(codeArea); // Aplicar resaltado de sintaxis

        // Dividir el contenido del archivo en líneas y luego en palabras, eliminando los espacios en cada posición
        const linesArray = fileContent.split("\n");
        const inputArray = linesArray.map((line) =>
          line
            .split(" ")
            .map((word) => word.trim())
            .filter((word) => word !== "")
        );

        const pda = new PDA();
        let results = [];
        let counterLines = 0;

        inputArray.forEach((line) => {
          counterLines++;
          if (line.join("").trim() === "") {
            return;
          } else {
            if (!pda.accept(line)) {
              results.push(
                "ERROR: Línea: " + counterLines + " => " + line.join(" ")
              );
            }
          }
        });

        document.getElementById("resultContent").textContent =
          results.join("\n");
        $("#resultModal").modal("show");
      };
      reader.readAsText(file);
    } else {
      console.log("No se ha seleccionado ningún archivo");
    }
  });
