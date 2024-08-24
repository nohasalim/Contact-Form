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
      queryType: "",
      message: "",
      ruleAccepted: false,
    },
  ]);
  const userschema = yup.object().shape({
    firstName: yup.string().min(4).required(),
    lastName: yup.string().min(4).required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).max(60).required(),
    queryType: yup
      .string()
      .oneOf(["general enquiry", "support request"])
      .required(),
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
        <h1>Contact Us</h1>
        <div className="laptopScreen">
          <div className="username">
            <label htmlFor="firstName">
              First Name <span>*</span>
            </label>
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
          </div>

          <div className="username">
            <label htmlFor="lastName">
              Last Name <span>*</span>
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleOnchange}
              type="text"
            ></input>
            {errorsObject.lastName ? (
              <label className="error">* {errorsObject.lastName}</label>
            ) : null}
          </div>
        </div>

        <label htmlFor="age">
          Age <span>*</span>
        </label>
        <input
          name="age"
          value={formData.age}
          onChange={handleOnchange}
          type="number"
        ></input>
        {errorsObject.age ? (
          <label className="error">* {errorsObject.age} </label>
        ) : null}

        <label htmlFor="emailAddress">
          Email Address <span>*</span>
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleOnchange}
          type="email"
        ></input>
        {errorsObject.email ? (
          <label className="error"> * {errorsObject.email}</label>
        ) : null}

        <label htmlFor="queryType">
          Query Type <span>*</span>
        </label>
        <div className="laptopScreen">
          <div className="queryType">
            <input
              className="radio"
              type="radio"
              name="queryType"
              value="general enquiry"
              onChange={handleOnchange}
            ></input>
            <label htmlFor="general enquiry"> General Enquiry</label>
          </div>
          <div className="queryType">
            <input
              className="radio"
              type="radio"
              name="queryType"
              value="support request"
              onChange={handleOnchange}
            ></input>
            <label htmlFor="support request">Support Request</label>
          </div>
        </div>
        {errorsObject.queryType ? (
          <label className="error">* {errorsObject.queryType}</label>
        ) : null}

        <label htmlFor="message">
          Message <span>*</span>
        </label>
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

        <button type="submit" >Submit</button>
      
      </form>
    </main>
  );
}

export default App;
