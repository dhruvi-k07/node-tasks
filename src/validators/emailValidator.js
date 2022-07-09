function emailTester (email) {
    const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  
    if (!email) return false;
  
    if (email.length > 254) return false;
  
    if (!tester.test(email)) return false;
  
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    if (parts[0].length > 64) return false;
  
    return true;
  };
module.exports = emailTester