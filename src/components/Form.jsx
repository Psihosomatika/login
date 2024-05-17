import { useState, useRef } from "react";
// import useInput from "../hooks/use-input";

const Form = () => {
  //TODO Задачи
  //TODO 1) при отправке формы все поля, которые есть в форме должны быть валидными
  //TODO 2) Если форма не валидна, то заблокирую возможность отправки вообще
  //TODO 3) создадим обработчик изменений в поле onChange={nameInputChangeHandler}
  //TODO 4) мы еще никак не проверили введенное пользователем занчение на валидность. Тут я буду проверять на пустую строку. const isEnteredNameValid = inputName.trim() !== ""; (валидное ли введенное значение?)
  //TODO 5)  Cоздадим переменную которая будет отвечать за валидность isNameInputInvalid (Поле инпута не валидно? ). В зависимости от того, какое в ней значение на странице либо будет появляться текст ошибки (ну и стили ошибки у поля, либо нет)  присвоим значение валидности поля (isEnteredNameValid) этой переменной. И сразу же столкнемся с непростой ситуацией. По умолчанию, при загрузке страницы поле ввода пустое, а значит в isEnteredNameValid будет false, это не очень приятный пользовательсякий опыт. Выход ввести еще один критерий валидации. Например расфокусировку. Это значит, что пользователь уже как-то взаимодейстовал с полем и мы можем ему смело выкатывать сообщение об ошибке в таком случае.
  //TODO 6) создадим еще один обработчик события onBlur={inputNameLostFocusHandler} и создадим состояение, которое он будет менять   const [wasInputNameTouch, setWasInputNameTouch] = useState(false); wasInputNameTouch (было ли касание поля name? )
  //TODO 7) теперь мы можем завязать итоговую валидность поля на две переменные. 1) isEnteredNameValid должно содержавть true и долюно быть касание поля

  // вернемся к первым тудушкам и создадим переменную, которая будет отвечать за то, валидна ли форма let isFormValid = false; (валидна ли форма? по умолчанию нет) оно меняется если поле валидное
  //TODO 1) при отправке формы все поля, которые есть в форме должны быть валидными (это и проверим)
  //TODO 2) Если форма не валидна, то заблокирую возможность отправки вообще. Передадим значени валидности формы в disabled кнопки (с противоположным значением)
  // если решите не блокировать кнопку, то нужно сделать принудительное касание при отправке формы, и в случае, если второе условие не соблюдено (поле пустое) прервать оптравку
  // setWasInputNameTouch(true);
  // if (!isEnteredNameValid) {
  //   return;
  // }
  //В случае успеха выводим значение поля в консоль (отправляем его по api в базу данных)
  //TODO 8) осталось очистить поле. Покажу как через ref const inputRef = useRef(null); inputRef.current.value = ""; ref={inputRef} Но лучше так не делать, а использовать концепцию оратного связывания.

  const [inputName, setInputName] = useState("");
  const [wasInputNameTouch, setWasInputNameTouch] = useState(false);

  const nameInputChangeHandler = (event) => {
    setInputName(event.target.value);
  };
  const isEnteredNameValid = inputName.trim() !== ""; //если true - то поле валидное, если false - не валидное

  const isNameInputInvalid = !isEnteredNameValid && wasInputNameTouch; // Если нет (false) то валидное, если (true) да, то поле не валидно!

  const inputNameLostFocusHandler = () => {
    setWasInputNameTouch(true);
  };

  const inputNameClasses = isNameInputInvalid
    ? "form-control invalid"
    : "form-control"; //стили, красная ли обводка

  let isFormValid = false;

  if (isEnteredNameValid) {
    isFormValid = true;
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    setWasInputNameTouch(true);
    // console.log(isEnteredNameValid);
    if (!isEnteredNameValid) {
      console.log("ошибка");
      return false;
    }
    console.log("отправка на сервер");
    console.log(inputName);
    setInputName("");
    setWasInputNameTouch(false);
  };
  return (
    //
    // className={inputNameClasses}
    //
    // value={inputName}
    //
    // ref={inputRef}
    <form onSubmit={formSubmitHandler}>
      <div className={inputNameClasses}>
        <label htmlFor="name">Введите Имя</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={inputNameLostFocusHandler}
          value={inputName}
        />
        {isNameInputInvalid && (
          <span className="error-text">Введите имя, пожалуйста</span>
        )}
      </div>
      {/* disabled={!isFormValid} */}
      <div className="form-actions">
        <button>Отправить</button>
      </div>
    </form>
  );
};

export default Form;
