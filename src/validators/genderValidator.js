function genderTester (gender) {
    const tester = /^(M|F|Other)$/;
    if (!tester.test(gender)) return false;
    return true;
  };

  module.exports = genderTester;