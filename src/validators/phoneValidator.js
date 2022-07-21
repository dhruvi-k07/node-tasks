function phoneTester(number) {
  const tester = /^[789]\d{9}$/;
  if (!tester.test(number)) return false;
  return true;
}

module.exports = phoneTester;
