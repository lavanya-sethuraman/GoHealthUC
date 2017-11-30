const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  DOB: {
    type: String
  },
  phone: {
    type: String
  },
  insurance_carrier: {
    type: String
  },
  insurance_ID: {
    type: String
  }

});
UserSchema.methods.apiRepr = function () {
  return {
    userName: this.userName || '',
    fullName: this.fullName || ''
  };
}
const User = mongoose.model('User', UserSchema);

module.exports = { User };
