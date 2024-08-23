import { useState } from "react";
import * as yup from "yup";
import "./App.css";

function App() {
  const [errorsObject, seterrorsObject] = useState({});
  const [formData, setformData] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      gender: "",
      message: "",
      ruleAccepted: false,
    },
  ]);
  const userschema = yup.object().shape({
    firstName: yup.string().min(4).required(),
    lastName: yup.string().min(4).required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).max(60).required(),
    gender: yup.string().oneOf(["male", "female"]).required(),
    message: yup.string().required(),
    ruleAccepted: yup.bool().oneOf([true]).required(),
  });
  async function testvalidation() {
    // seterrorsObject({});

    try {
      await userschema.validate(formData, {
        abortEarly: false,
      });
    } catch (err) {
      var errors = {};
      err.inner.forEach((e) => {
        console.log(`${e.path}:${e.message}`);
        errors[e.path] = e.message;
        console.log(errors);
      });
    }
    seterrorsObject(errors);
  }

  console.log(errorsObject);

  function handleOnchange(event) {
    var keyName = event.target.name;
    var KeyValue = event.target.value;
    var keyType = event.target.type;
    if (keyType == "checkbox") {
      KeyValue = event.target.checked;
    }
    setformData({ ...formData, [keyName]: KeyValue });
  }
  function handelFormOnSubmit(event) {
    testvalidation();
    event.preventDefault();
  }
  return (
    <main>
      <form onSubmit={handelFormOnSubmit}>
        <label htmlFor="firstName">First Name *</label>
        <input
          id="firstName"
          name="firstName"
          onChange={handleOnchange}
          value={formData.firstName}
          type="text"
        ></input>
        {errorsObject.firstName ? (
          <label className="error">* {errorsObject.firstName}</label>
        ) : null}

        <label htmlFor="lastName">Last Name *</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleOnchange}
          type="text"
        ></input>
        {errorsObject.lastName ? (
          <label className="error">* {errorsObject.lastName}</label>
        ) : null}

        <label htmlFor="age">Age *</label>
        <input
          name="age"
          value={formData.age}
          onChange={handleOnchange}
          type="number"
        ></input>
        {errorsObject.age ? (
          <label className="error">* {errorsObject.age} </label>
        ) : null}

        <label htmlFor="emailAdress">Email Adress *</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleOnchange}
          type="email"
        ></input>
        {errorsObject.email ? (
          <label className="error"> * {errorsObject.email}</label>
        ) : null}

        <label htmlFor="gender">Gender *</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleOnchange}
          ></input>
          <label htmlFor="male"> Male</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleOnchange}
          ></input>
          <label htmlFor="female">Female</label>
        </div>
        {errorsObject.gender ? (
          <label className="error">* {errorsObject.gender}</label>
        ) : null}

        <label htmlFor="message">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleOnchange}
        ></textarea>
        {errorsObject.message ? (
          <label className="error">* {errorsObject.message}</label>
        ) : null}

        <div>
          <input
            name="ruleAccepted"
            type="checkbox"
            onChange={handleOnchange}
            checked={formData.ruleAccepted}
          ></input>
          <label>I consent to being contacted by the team .</label>
        </div>
        {errorsObject.ruleAccepted ? (
          <label className="error">* {errorsObject.ruleAccepted}</label>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;
