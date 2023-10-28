import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { register } from "../api/users";
import { useNavigate } from "react-router-dom";

const Logourl = process.env.PUBLIC_URL + "/images/Logo-Dark.png";
const Loginurl = process.env.PUBLIC_URL + "/images/Login.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    await register(email, password, name);
    alert("Register successfully!");
    navigate("/login");
  }

  const pageTitle = "Register";
  const pageContent = (
    <section className="vh-100" style={{ backgroundColor: "#111C43" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={Loginurl}
                    alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <img src={Logourl}
                          alt="ATN Company Logo" style={{ width: "30%" }} />
                      </div>

                      <h1 className="mb-3 pb-3 pt-3" style={{ letterSpacing: "1px", fontSize: "25px" }}>Create an account</h1>

                      <div className="form-outline mb-3">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control form-control-lg" />
                        <label className="form-label">Name</label>
                      </div>

                      <div className="form-outline mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" />
                        <label className="form-label">Email address</label>
                      </div>

                      <div className="form-outline mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                        <label className="form-label">Password</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-primary btn-lg btn-block" type="button" onClick={handleSubmit}>Register</button>
                        <input type="hidden" value={role} onChange={(e) => setRole(e.target.value)}></input>
                      </div>

                      <p className="mb-3 pb-lg-2" style={{ color: "#393f81" }}>Do have an account? <a href="/login"
                        style={{ color: "#393f81" }}>Login here</a></p>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {pageContent}
    </div>
  )
};

export default Register;