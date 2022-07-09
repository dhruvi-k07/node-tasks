 function newPasswordTester (password) {
  const tester = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-.\/:;<=>?@[\\\]^_`{|}~]{8,}$/;
  if (!password) return false;
  if (!tester.test(password)) return false;
  return true;
};

module.exports = newPasswordTester

