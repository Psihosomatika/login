import { useState } from "react";

const useInput = (validateValueFanc) => {
  const [inputValue, setInputValue] = useState(""); //то, что ввел пользователь, отслеживается через onChange для любого поля
  const [wasInputTouch, setWasInputTouch] = useState(false); //показывает, касался ли пользователь мышкой input'а. Для любого поля.

  const isValueValid = validateValueFanc(inputValue); //валидное ли введенное значение? Валидность проверяется фукнцие, которую мы передаем в наш хук при вызове, и теперь  передаем в нее значение, которое ввел пользователь
  const isInputInvalid = !isValueValid && wasInputTouch; //не валидный ли инпут? Не валидный, если пользователь его касался (wasInputTouch) и ввел неправильное значение (!isValueValid)

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
    // console.log(inputValue);
  }; //обрабатываем изменения, которые пользователь вносит в поле

  const inputLostFocusHandler = () => {
    setWasInputTouch(true);
  }; //если был фокус на поле - меняем состояние

  const resetValues = () => {
    setInputValue("");
    setWasInputTouch(false);
  }; //очищаем оба поля через обратную передачу (в поле в разметке должно быть value)

  const styles = isInputInvalid ? "form-control invalid" : "form-control"; //если поле не валидно - делаем обводку красной

  return {
    value: inputValue,
    hasError: isInputInvalid,
    isValid: isValueValid,
    styles,
    inputChangeHandler: inputChangeHandler,
    inputLostFocusHandler,
    resetValues,
  };
};
export default useInput;
