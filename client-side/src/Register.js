import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { API_BASE_URL } from './config';
import './index.css';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insurance: false,
      carrier: "",
      errorText1: "",
      errorText2: "",
      errorText3: "",
      errorText4: ""
    };
    this.values = { first_name: "", last_name: "", DOB: "", phone: "", insurance_carrier: "", insurance_ID: "" };
  }


  validate = () => {
    if (this.values.first_name === "" || this.values.first_name === undefined || this.values.first_name.trim() === '') {
      this.setState({ errorText1: 'Required' });
      return false;
    }
    else if (this.values.last_name === "" || this.values.last_name === undefined || this.values.last_name.trim() === '') {
      this.setState({ errorText2: 'Required' });
      return false;
    }
    else if (this.values.DOB === "" || this.values.DOB === undefined) {
      this.setState({ errorText3: 'Required' });
      return false;
    }
    else if (this.values.phone === "" || this.values.phone === undefined) {
      this.setState({ errorText4: 'Required' });
      return false;
    }
    else {
      return true;
    }
  }

  register = () => {
    if (this.validate()) {
      const user = this.values;
      fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => {
          if (res.status === 201) {
            console.log("success");
            window.location.assign("https://www.gohealthuc.com/about");
          }
        })
        .catch(err => {
          return (err);
        });
    }
  }

  render() {
    return (
      <Grid fluid >
        <Row>
          <div className="container" >
            <h1> GoHealth Urgent Care Registration </h1>

            <Col xs className="style">

              <TextField
                floatingLabelText="First Name"
                onChange={(e) => { this.values.first_name = e.currentTarget.value }}
                errorText={this.state.errorText1} />
              <br />

              <TextField
                floatingLabelText="Last Name"
                onChange={(e) => { this.values.last_name = e.currentTarget.value }}
                errorText={this.state.errorText2} />
              <br /><br />

              <DatePicker errorText={this.state.errorText3} hintText="Date of Birth" openToYearSelection={true} autoOk={true}
                onChange={(e, date) => { this.values.DOB = date }} />

              <TextField
                floatingLabelText="Phone Number"
                onChange={(e) => { this.values.phone = e.currentTarget.value }}
                errorText={this.state.errorText4}
                type="tel" />
              <br /><br />

              <SelectField className="left"
                floatingLabelText="Insurance?"
                value={this.state.insurance}
                onChange={(event, index, value) => this.setState({ insurance: value })} >

                <MenuItem value={false} primaryText="No" />
                <MenuItem value={true} primaryText="Yes" />
              </SelectField>
              <br />

              <SelectField className="left"
                disabled={!this.state.insurance}
                underlineShow={this.state.insurance}
                floatingLabelText="Insurance Carrier"
                value={this.state.carrier}
                onChange={(event, index, value) => {this.setState({ carrier: value }); this.values.insurance_carrier=value;}} >

                <MenuItem value={"Aetna"} primaryText="Aetna" />
                <MenuItem value={"Blue Cross/Blue Shield"} primaryText="Blue Cross/Blue Shield" />
                <MenuItem value={"United Health Care"} primaryText="United Health Care" />
              </SelectField>
              <br />


              <TextField
                floatingLabelText="Insurance ID"
                disabled={!this.state.insurance}
                underlineShow={this.state.insurance}
                onChange={(e) => { this.values.insurance_ID = e.currentTarget.value }}
                errorText="" />
              <br /><br />
              <RaisedButton label="Register" primary={true} onClick={this.register} />

            </Col>
          </div>
        </Row>
      </Grid>

    );
  }
}



