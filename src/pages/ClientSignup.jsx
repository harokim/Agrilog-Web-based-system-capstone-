import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientSignup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthday: "",
    civilStatus: "",
    contactNumber: "",
    email: "",
    password: "",
    association: "",
    idType: "",
    idNumber: "",
    region: "",
    province: "",
    city: "",
    barangay: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1 && (!form.firstName || !form.lastName)) {
      alert("Please complete personal information");
      return;
    }

    if (step === 2 && (!form.email || !form.password)) {
      alert("Please complete contact information");
      return;
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!form.association || !form.idNumber) {
      alert("Please complete all required fields");
      return;
    }

    const fullName = `${form.firstName} ${form.middleName} ${form.lastName}`;

    const newUser = {
      id: "client-" + Date.now(),
      email: form.email,
      role: "client",
      name: fullName
    };

    localStorage.setItem("mc41_user", JSON.stringify(newUser));

    alert("Registration Successful");

    navigate("/client");
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>Client Registration</h1>

    
      <div className="card">
        Step {step} of 3
        <div
          style={{
            height: 5,
            background: "#ddd",
            marginTop: 10
          }}
        >
          <div
            style={{
              width: `${(step / 3) * 100}%`,
              height: "100%",
              background: "green"
            }}
          />
        </div>
      </div>

    
      {step === 1 && (
        <div className="card">
          <h3>Personal Information</h3>

          <input name="firstName" placeholder="First Name" onChange={handleChange} />
          <input name="middleName" placeholder="Middle Name" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} />

          <input type="date" name="birthday" onChange={handleChange} />

          <select name="civilStatus" onChange={handleChange}>
            <option value="">Civil Status</option>
            <option>Single</option>
            <option>Married</option>
            <option>Widowed</option>
            <option>Separated</option>
          </select>
        </div>
      )}

    
      {step === 2 && (
        <div className="card">
          <h3>Contact Information</h3>

          <input name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />

          <input name="association" placeholder="Association Name" onChange={handleChange} />
        </div>
      )}

    
      {step === 3 && (
        <div className="card">
          <h3>Verification & Address</h3>

          <select name="idType" onChange={handleChange}>
            <option value="">Select ID Type</option>
            <option>National ID</option>
            <option>Driver's License</option>
            <option>Passport</option>
            <option>Voter's ID</option>
          </select>

          <input name="idNumber" placeholder="ID Number" onChange={handleChange} />

          <input name="region" placeholder="Region" onChange={handleChange} />
          <input name="province" placeholder="Province" onChange={handleChange} />
          <input name="city" placeholder="City/Municipality" onChange={handleChange} />
          <input name="barangay" placeholder="Barangay" onChange={handleChange} />
        </div>
      )}

    
      <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
        <button
          onClick={prevStep}
          style={{
            flex: 1,
            background: "#ccc"
          }}
        >
          {step === 1 ? "Cancel" : "Back"}
        </button>

        {step < 3 ? (
          <button
            onClick={nextStep}
            style={{
              flex: 1,
              background: "green",
              color: "white"
            }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              background: "blue",
              color: "white"
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
