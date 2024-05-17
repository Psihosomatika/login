import { useState } from "react";
import useInput from "../hooks/use-input";

const SomeInput = () => {
  // const { title: titleh2, name, email, password } = props; Внизу то же самое, деструктурируем объект, через двоеточие задаем переменным новые имена аналог as при import'е
  const {
    value: inputEmail,
    hasError: isEmailInputInvalid,
    isValid: isEmailValid,
    inputChangeHandler: emailInputChangeHandler,
    inputLostFocusHandler: inputEmailLostFocusHandler,
    resetValues: resetInputEmail,
    styles: inputEmailClasses,
  } = useInput((value) => {
    return value.includes("@");
  }); //в этом пункте делаем валидацию для поля email при промощи самодельного хука, он делает то же самое, что и код ниже для поля name. При этом в ситуации с повторяющимся кодом правильнее использовать хук. параметром передается функция валидации. В value попадет поле, которое ввел пользователь (это можно посмтреть в хуке)

  const {
    value: inputPassword,
    hasError: isPasswordInputInvalid,
    isValid: isPasswordValid,
    inputChangeHandler: passwordInputChangeHandler,
    inputLostFocusHandler: inputPasswordLostFocusHandler,
    resetValues: resetInputPassword,
    styles: inputPasswordClasses,
  } = useInput((value) => {
    return value.trim() !== "";
  });
  const [inputName, setInputName] = useState(""); //то, что ввел пользователь, отслеживается через onChange, при помощи фукнции nameInputChangeHandler в разметке
  const [wasInputNameTouch, setWasInputNameTouch] = useState(false); //показывает, касался ли пользователь мышкой input'а.

  const isEnteredNameValid = inputName.trim() !== ""; //валидное ли введенное значение?
  const isNameInputInvalid = !isEnteredNameValid && wasInputNameTouch; //не валидный ли инпут? Не валидный, если пользователь его касался (wasInputNameTouch) и ввел неправильное значение (!isEnteredNameValid)

  let isFormValid = false; //валидность всей формы, по умолчанию не валидна. Блокирует кнопку в разметке

  if (isEnteredNameValid && isEmailValid && isPasswordValid) {
    isFormValid = true;
  } //если введенное значение валидно  - все ок. Если полей несколько - должны быть валидными все поля, что бы форма стала валидной тоже

  const nameInputChangeHandler = (event) => {
    setInputName(event.target.value);
  }; //обрабатываем изменения, которые пользователь вносит в поле name

  const inputNameLostFocusHandler = () => {
    setWasInputNameTouch(true);
  }; //если был фокус на поле name - меняем состояние

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setWasInputNameTouch(true);
    if (!isEnteredNameValid && !isEmailValid && !isPasswordValid) {
      return;
    }
    console.log(inputName);
    console.log(inputEmail);
    console.log(inputPassword);
    setInputName("");
    setWasInputNameTouch(false);
    resetInputEmail();
    resetInputPassword();
  }; //отправлять запрос на сервер будем тут в итоге, в UseEffect его можно отправлять, когда надо получить первоначальные данные.

  const inputNameClasses = isNameInputInvalid
    ? "form-control invalid"
    : "form-control"; //стили, красная ли обводка
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputNameClasses}>
        <label htmlFor="name">Введите Имя</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={inputName}
          onBlur={inputNameLostFocusHandler}
        />
        {isNameInputInvalid && (
          <span className="error-text">Введите имя, пожалуйста</span>
        )}
      </div>
      <div className={inputEmailClasses}>
        <label htmlFor="email">Введите email</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          value={inputEmail}
          onBlur={inputEmailLostFocusHandler}
        />
        {isEmailInputInvalid && (
          <span className="error-text">Введите корректную почту</span>
        )}
      </div>
      <div className={inputPasswordClasses}>
        <label htmlFor="password">Введите пароль</label>
        <input
          type="password"
          id="password"
          onChange={passwordInputChangeHandler}
          value={inputPassword}
          onBlur={inputPasswordLostFocusHandler}
        />
        {isPasswordInputInvalid && (
          <span className="error-text">Введите пароль</span>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!isFormValid}>Отправить</button>
      </div>
    </form>
  );
};

export default SomeInput;
