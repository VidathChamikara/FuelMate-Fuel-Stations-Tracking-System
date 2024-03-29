import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      userType: "",
      secretKey: "",
      verifyButton: false,
      verifyOtp: false,
      otp: "",
      verified: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();   
      const { name, email, password, mobile, userType, secretKey } =
        this.state;
      if (this.state.userType == "Admin" && this.state.secretKey != "admin") {
        e.preventDefault();
        alert("Invalid Admin");
      } else {
        e.preventDefault();
        console.log(name, email, password, mobile, userType);
        fetch("http://localhost:5000/register", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            mobile,
            userType,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "Data pass to api");
            if (data.status === "User Exists") {
              alert("User Exists.Can not sign up again");
            } else if (data.status === "ok") {
              alert("Successfully Sign Up");
            }
            window.location.reload();
          });
      }
    
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <div>
          <label>Register As</label> &nbsp;
          <input
            type="radio"
            name="UserType"
            value="User"
            onChange={(e) => this.setState({ userType: e.target.value })}
          />
          <label>User</label> &nbsp;
          <input
            type="radio"
            name="UserType"
            value="Fuel Station"
            onChange={(e) => this.setState({ userType: e.target.value })}
          />
          <label>Fuel Station</label> &nbsp;
          <input
            type="radio"
            name="UserType"
            value="Admin"
            onChange={(e) => this.setState({ userType: e.target.value })}
          />
          <label>Admin</label>
        </div>
        {this.state.userType == "Admin" ? (
          <div className="mb-3">
            <label>Secret Key</label>
            <input
              type="text"
              className="form-control"
              placeholder="Secret Key"
              onChange={(e) => this.setState({ secretKey: e.target.value })}
            />
          </div>
        ) : null}
        <div id="recaptcha-container"></div>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Mobile</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter mobile(+94xxxxxxxxx)"
            onChange={(e) => this.setState({ mobile: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
  }
}
