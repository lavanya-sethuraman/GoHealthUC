const ELIGIBILITY_API_URL = "https://apistage.gohealthuc.com:1981/v1/eligibility_demo";
const Client = require('node-rest-client').Client;
const client = new Client();



const Eligibility = {
    getDetails: function () {

        const params = {
  
            data:{
            
                member:{first_name:"Rita",last_name:"Book",id:"345123987",birth_date:"1991-10-31"},
                provider:{first_name:"Marty",last_name:"Seeger",npi:"1234567890"},
                trading_partner_id:"united_health_care"
               
        },
        headers:{ authtoken: "ghlavanya8708",
        "Content-Type": "application/json"},
        rejectUnauthorized: false
      };

      return new Promise(function (resolve, reject) {
        client.post(ELIGIBILITY_API_URL, params, function (data, response) {
          console.log('response',response)
          if (response.statusCode === 200) {
           console.log('in eligibility api',data)
            resolve(data);
          } else {
            reject(response.statusCode);
          }
        });
      });
    }
};


module.exports = { Eligibility };
  