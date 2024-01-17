const responseObject = (data, message = "Response from Back-end") => {
  return {
    message: message,
    data: data,
  };
};

module.exports = responseObject;
