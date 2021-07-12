const Engineer = require('../library/Engineer');
//this tests the engineer code of name, id, email and github user name 
describe('employee', () => {
  describe('Initialization', () => {
    // Positive test
    it("should create an object with a 'text' property set to the 'text' argument provided when called with the 'new' keyword", () => {
      const e = new Engineer();

      expect(typeof e).toBe('object');
    });

    // Exception test
    it("should create a name with the constructor", () => {
      // Arrange
      const name = "Todd";
      const e = new Engineer(name);

      // Assert
      expect(e.name).toBe(name);
    });
  });
  it("should create a email with the constructor", () => {
    // Arrange
    const test = "email@email.com";
    const e = new Engineer('Todd', test, 4);

    // Assert
    expect(e.email).toBe(test);
  });
  it("should create an id with the constructor", () => {
    // Arrange
    const test = "12345";
    const e = new Engineer('Todd', 'email', '12345' );

    // Assert
    expect(e.id).toBe(test);
  });
  it("should create a Github user", () => {
    // Arrange
    const test = "GithubUser";
    const e = new Engineer('Todd', 'email', '12345', 'GithubUser' );

    // Assert
    expect(e.getGitHub()).toBe(test);
  });
});