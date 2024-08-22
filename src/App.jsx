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
      massege: "",
      ruleAccepted: false,
    },
  ]);
  const userschema = yup.object().shape({
    firstName: yup.string().min(4).required(),
    lastName: yup.string().min(4).required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).max(60).required(),
    gender: yup.string().oneOf(["male", "female"]).required(),
    massege: yup.string().required(),
    ruleAccepted: yup.bool().oneOf([true]).required(),
  });
  async function testvalidation() {
    try {
      const response = await userschema.validate(formData, {
        abortEarly: false,
      });
      console.log(response);

      seterrorsObject({});
    } catch (err) {
      var errors = {};
      err.inner.forEach((e) => {
        console.log(`${e.path}:${e.massege}`);
        errors[e.path] = e.massege;
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
          <label>{errorsObject.firstName}</label>
        ) : null}
        
        <label htmlFor="lastName">Last Name *</label>
        <input
        
          name="lastName"
          value={formData.lastName}
          onChange={handleOnchange}
          type="text"
        ></input>
        {errorsObject.lastName ? (
          <label>this feild is required , must be four letters at least</label>
        ) : null}

        <label htmlFor="age">Age *</label>
        <input
      
          name="age"
          value={formData.age}
          onChange={handleOnchange}
          type="number"
        ></input>
        {errorsObject.age ? <label>this feild is required </label> : null}

        <label htmlFor="emailAdress">Email Adress *</label>
        <input
      
          name="email"
          value={formData.email}
          onChange={handleOnchange}
          type="email"
        ></input>
        {errorsObject.email ? <label>this feild is required</label> : null}

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

        <label htmlFor="massege">Massege *</label>
        <textarea
        
          name="massege"
          value={formData.massege}
          onChange={handleOnchange}
        ></textarea>
        <div>
          <input
            name="ruleAccepted"
            type="checkbox"
            onChange={handleOnchange}
            checked={formData.ruleAccepted}
          ></input>
          <label>I consent to being contacted by the team .</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;
