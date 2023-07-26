import React from "react";
import DigitButton from "../../../src/components/calculator/DigitButton";
import OperationButton from "../../../src/components/calculator/OperationButton";
import { useReducer } from "react";
import styles from "../../styles/calculator.module.css";
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite == true) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      )
        return state;

      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false,
        };
      }
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length == 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const current = parseFloat(currentOperand);
  const prev = parseFloat(previousOperand);
  if (isNaN(current) || isNaN(prev)) return "";
  let result = "";
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "÷":
      result = prev / current;
      break;
    case "*":
      result = prev * current;
      break;
  }
  return result.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function operandFormatter(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function Calculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className={styles.calculatorBody}>
      <div className={styles.calculatorGrid}>
        <div className={styles.output}>
          <div className={styles.previousOperand}>
            {operandFormatter(previousOperand)} {operation}
          </div>
          <div className={styles.currentOperand}>
            {operandFormatter(currentOperand)}
          </div>
        </div>
        <button
          className={styles.spanTwo}
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />

        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />

        <OperationButton operation="*" dispatch={dispatch} />

        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />

        <OperationButton operation="+" dispatch={dispatch} />

        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />

        <OperationButton operation="-" dispatch={dispatch} />

        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button
          className={styles.spanTwo}
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
