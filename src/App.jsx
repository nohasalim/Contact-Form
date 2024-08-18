import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setformData] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      massege: "",
      ruleAccepted: false,
    },
  ]);
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
    console.log(formData);
    event.preventDefault();
  }
  return (
    <main>
      <form onSubmit={handelFormOnSubmit}>
        <label htmlFor="firstName">First Name *</label>
        <input
          required
          id="firstName"
          name="firstName"
          onChange={handleOnchange}
          value={formData.firstName}
          type="text"
        ></input>
        <label htmlFor="lastName">Last Name *</label>
        <input
          required
          name="lastName"
          value={formData.lastName}
          onChange={handleOnchange}
          type="text"
        ></input>
        <label htmlFor="emailAdress">Email Adress *</label>
        <input
          required
          name="email"
          value={formData.email}
          onChange={handleOnchange}
          type="email"
        ></input>
        <label htmlFor="gender">Gender *</label>
        <div>
          <input
            required
            type="radio"
            name="gender"
            value="male"
            onChange={handleOnchange}
          ></input>
          <label htmlFor="male"> Male</label>
        </div>
        <div>
          <input
            required
            type="radio"
            name="gender"
            value="female"
            onChange={handleOnchange}
          ></input>
          <label htmlFor="female">Female</label>
        </div>

        <label htmlFor="massege">Massege *</label>
        <textarea
          required
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

        <button type="submit" disabled={formData.ruleAccepted ? false : true}>
          Submit
        </button>
      </form>
    </main>
  );
}

export default App;
