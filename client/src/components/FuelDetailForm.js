import React, { Component } from 'react'
export default class FuelStationSignUp extends Component {
    constructor(props){
      super(props);
      this.state = {
  
        nDesel: 0,
        sDesel: 0,
        nPetrol: 0,
        sPetrol: 0,
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
      e.preventDefault();
      const { nDesel, sDesel, nPetrol, sPetrol} = this.state;
      console.log(nDesel, sDesel, nPetrol, sPetrol);
      fetch("http://localhost:5000/fuel", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            nDesel,
            sDesel,
            nPetrol,
            sPetrol,
        }),
      }).then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister"); });
  
    }
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <h3>Fuel Details</h3>
    
            <div className="mb-3">
              <label>Normal Desel (L)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Normal Desel Quantity"
                onChange={(e) => this.setState({ nDesel: e.target.value })}
              />
            </div>
    
            <div className="mb-3">
              <label>Super Diesel (L)</label>
              <input type="text" className="form-control" placeholder="Super Diesel Quantity"  onChange={(e) => this.setState({  sDesel: e.target.value })}/>
             
            </div>
    
            <div className="mb-3">
              <label>Normal Petrol (L)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Normal Petrol Quantity"
                onChange={(e) => this.setState({ nPetrol: e.target.value })}
              />
            </div>
    
            <div className="mb-3">
              <label>Super Petrol (L)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Super Petrol Quantity"
                onChange={(e) => this.setState({ sPetrol: e.target.value })}
              />
            </div>
            
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
        )
      }































}