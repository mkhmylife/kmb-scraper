const request = require("request-promise-native");
const domain = "";
export const submitLead = async leadData => {
  try {
    return await request.post({
      method: "POST",
      uri: "https://" + domain + "/api/elms",
      body: leadData,
      headers: {
        "Content-Type": "application/json"
      },
      json: true
    });
  } catch (e) {
    throw e;
  }
};
