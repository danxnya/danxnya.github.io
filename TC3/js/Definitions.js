//Definitions.js

export const dfaNumbers = {
  // Estados del autómata
  states: ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],

  // Estado inicial
  initialState: "q0",

  // Conjunto de estados de aceptación
  acceptingStates: ["q2", "q4", "q7", "q9", "q10"],

  // Función para verificar si una cadena es aceptada por el autómata
  accept: function (input) {
    let currentState = this.initialState;
    for (let i = 0; i < input.length; i++) {
      let symbol = input[i];

      switch (currentState) {
        case "q0":
          if (symbol === "+" || symbol === "-") {
            currentState = "q1";
          } else if (symbol === "0") {
            currentState = "q8";
          } else if (symbol >= "1" && symbol <= "9") {
            currentState = "q2";
          } else if (symbol === "(") {
            currentState = "q11";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q1":
          if (symbol === "0") {
            currentState = "q8";
          } else if (symbol >= "1" && symbol <= "9") {
            currentState = "q2";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q2":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q2";
          } else if (symbol === ".") {
            currentState = "q3";
          } else if (symbol === "E" || symbol === "e") {
            currentState = "q5";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q3":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q4";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q4":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q4";
          } else if (symbol === "E" || symbol === "e") {
            currentState = "q5";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q5":
          if (symbol === "+" || symbol === "-") {
            currentState = "q6";
          } else if (symbol >= "0" && symbol <= "9") {
            currentState = "q7";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q6":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q7";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q7":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q7";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q8":
          if (symbol >= "0" && symbol <= "7") {
            currentState = "q10";
          } else if (symbol === "x" || symbol === "X") {
            currentState = "q9";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q9":
          if (
            (symbol >= "0" && symbol <= "9") ||
            (symbol >= "a" && symbol <= "f") ||
            (symbol >= "A" && symbol <= "F")
          ) {
            currentState = "q9";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q10":
          if (symbol >= "0" && symbol <= "7") {
            currentState = "q10";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q11":
          if (symbol !== ")") {
            currentState = "q11";
          } else if (symbol === ")") {
            currentState = "q1";
          } else {
            return "No es un número en Java";
          }
          break;

        default:
          break;
      }
    }

    if (this.acceptingStates.includes(currentState)) {
      return 1;
    } else {
      return 0;
    }
  },
};

export const dfaIdentifiers = {
  states: ["q0", "q1", "q2"],

  initialState: "q0",

  acceptingStates: ["q0", "q1"],

  accept: function (input) {
    let currentState = this.initialState;

    for (let i = 0; i < input.length; i++) {
      let symbol = input[i];

      switch (currentState) {
        case "q0":
          if (
            (symbol >= "A" && symbol <= "Z") ||
            (symbol >= "a" && symbol <= "z") ||
            symbol === "_"
          ) {
            currentState = "q1";
          } else {
            return "No es un identificador en Java";
          }
          break;

        case "q1":
          if (
            (symbol >= "A" && symbol <= "Z") ||
            (symbol >= "a" && symbol <= "z") ||
            (symbol >= "0" && symbol <= "9") ||
            symbol === "_"
          ) {
            currentState = "q1";
          } else {
            return "No es un identificador en Java";
          }
          break;

        default:
          break;
      }
    }

    if (this.acceptingStates.includes(currentState)) {
      return 1;
    } else {
      return "No es un identificador en Java";
    }
  },
};

export const typesOfOperators = new Set(["+", "-", "*", "/", "%"]);

export const tiposDeDatos = new Set([
  "short",
  "int",
  "long",
  "unsigned short",
  "unsigned int",
  "unsigned long",
  "float",
  "double",
  "char",
]);

export const palabrasReservadas = new Set([
  "printf",
  "scanf",
  "return",
  "auto",
  "break",
  "case",
  "char",
  "const",
  "continue",
  "default",
  "do",
  "double",
  "else",
  "enum",
  "extern",
  "float",
  "for",
  "goto",
  "if",
  "inline",
  "int",
  "long",
  "register",
  "restrict",
  "return",
  "short",
  "signed",
  "sizeof",
  "static",
  "struct",
  "switch",
  "typedef",
  "union",
  "unsigned",
  "void",
  "volatile",
  "while",
  "_Alignas",
  "_Alignof",
  "_Atomic",
  "_Bool",
  "_Complex",
  "_Generic",
  "_Imaginary",
  "_Noreturn",
  "_Static_assert",
  "_Thread_local",
]);

export const extras = new Set([
  "printf",
  "scanf",
  "return",
  "//",
  "#include",
  "{",
  "}",
]);
