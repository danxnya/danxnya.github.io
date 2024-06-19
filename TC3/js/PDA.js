import { Stack } from "./Stack.js";
import {
  dfaIdentifiers,
  dfaNumbers,
  tiposDeDatos,
  palabrasReservadas,
  typesOfOperators,
  extras,
} from "./Definitions.js";

export class PDA {
  constructor() {
    this.stack = new Stack();
    this.currentState = "q1";
    this.acceptStates = new Set(["qa", "q9"]);
  }

  transition(input) {
    switch (this.currentState) {
      case "q1":
        if (tiposDeDatos.has(input)) {
          this.stack.push("Z");
          this.currentState = "q9";
        } else if (palabrasReservadas.has(input)) {
          this.stack.push("Z");
          this.currentState = "q9";
        } else if (
          dfaIdentifiers.accept(input) === 1 &&
          !tiposDeDatos.has(input) &&
          !palabrasReservadas.has(input)
        ) {
          this.stack.push("Z");
          this.currentState = "q2";
        } else if (extras.has(input)) {
          this.stack.push("Z");
          this.currentState = "q9";
        } else {
          this.currentState = "qX";
        }
        break;

      case "q2":
        if (input === "=") {
          this.currentState = "q3";
        } else {
          this.currentState = "qX";
        }
        break;

      case "q3":
        if (input === "(") {
          if (this.stack.top() === "Z") {
            this.stack.push("A");
          } else if (this.stack.top() === "A") {
            this.stack.push("A");
          }
          // Mantén el estado en q3
        } else if (input === ")") {
          if (this.stack.top() === "A") {
            this.stack.pop();
          } else if (this.stack.top() === "Z") {
            this.stack.pop();
          }
          // Mantén el estado en q3
        } else if (dfaNumbers.accept(input) === 1) {
          this.currentState = "q4";
        } else if (
          dfaIdentifiers.accept(input) === 1 &&
          !tiposDeDatos.has(input)
        ) {
          this.currentState = "q7";
        } else {
          this.currentState = "qX";
        }
        break;

      case "q4":
        if (input === "(") {
          if (this.stack.top() === "Z") {
            this.stack.push("A");
          } else if (this.stack.top() === "A") {
            this.stack.push("A");
          }
          // Mantén el estado en q4
        } else if (input === ")") {
          if (this.stack.top() === "A") {
            this.stack.pop();
          } else if (this.stack.top() === "Z") {
            this.stack.pop();
          }
          // Mantén el estado en q4
        } else if (typesOfOperators.has(input)) {
          this.currentState = "q5";
        } else if (input === ";") {
          this.currentState = "qa";
        } else {
          this.currentState = "qX";
        }
        break;

      case "q5":
        if (input === "(") {
          if (this.stack.top() === "Z") {
            this.stack.push("A");
          } else if (this.stack.top() === "A") {
            this.stack.push("A");
          }
        } else if (input === ")") {
          if (this.stack.top() === "A") {
            this.stack.pop();
          } else if (this.stack.top() === "Z") {
            this.stack.pop();
          }
        } else if (
          (dfaIdentifiers.accept(input) === 1 && !tiposDeDatos.has(input)) ||
          dfaNumbers.accept(input) === 1
        ) {
          this.currentState = "q6";
        } else {
          this.currentState = "qX";
        }
        break;

      case "q6":
        if (input === "(") {
          if (this.stack.top() === "Z") {
            this.stack.push("A");
          } else if (this.stack.top() === "A") {
            this.stack.push("A");
          }
        } else if (input === ")") {
          if (this.stack.top() === "A") {
            this.stack.pop();
          } else if (this.stack.top() === "Z") {
            this.stack.pop();
          }
        } else if (input === ";") {
          this.currentState = "qa"; // Estado de aceptación
        } else if (typesOfOperators.has(input)) {
          this.currentState = "q5";
        } else {
          this.currentState = "qX";
        }
        break;

      case "q7":
        if (input === "=") {
          this.currentState = "q3";
        } else if (typesOfOperators.has(input)) {
          this.currentState = "q5";
        } else {
          this.currentState = "qX";
        }
        break;

      case "q9":
        if (input === "=") {
          this.currentState = "qX";
        } else {
          this.currentState = "q9";
        }
        break;

      default:
        this.currentState = "qX";
        break;
    }
  }

  accept(inputArray) {
    // Vaciar la pila antes de empezar a procesar la nueva línea
    this.stack.clear();

    // Restablecer el estado inicial antes de procesar la entrada
    this.currentState = "q1";

    for (const symbol of inputArray) {
      console.log(
        `State: ${
          this.currentState
        }, Symbol: ${symbol} \n Stack: ${this.stack.items.join(", ")} \n`
      );
      this.transition(symbol);
      if (this.currentState === "qX") {
        console.log(
          `\x1b[31mRefused. Current state: ${
            this.currentState
          }, Stack contents: ${this.stack.items.join(
            ", "
          )}, Symbol: ${symbol}\x1b[0m`
        );
        return false;
      }
    }

    if (this.acceptStates.has(this.currentState) && this.stack.top() === "Z") {
      console.log(
        `\x1b[32mACCEPTED => Current state: ${
          this.currentState
        }, Stack contents: ${this.stack.items.join(", ")}\x1b[0m`
      );
      return true;
    } else {
      console.log(
        `\x1b[31mREFUSED => Current state: ${
          this.currentState
        }, Stack contents: ${this.stack.items.join(", ")}\x1b[0m`
      );
      return false;
    }
  }
}
