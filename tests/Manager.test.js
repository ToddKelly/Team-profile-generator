const Manager = require('../library/Manager');

describe('employee', () => {
  describe('Initialization', () => {
    // Positive test
    it("should create an object with a 'text' property set to the 'text' argument provided when called with the 'new' keyword", () => {
      const e = new Manager();

      expect(typeof e).toBe('object');
    });

    // Exception test
    it("should create a name with the constructor", () => {
      // Arrange
      const name = "Todd";
      const e = new Manager(name);

      // Assert
      expect(e.name).toBe(name);
    });
  });
  it("should create a email with the constructor", () => {
    // Arrange
    const test = "email@email.com";
    const e = new Manager('Todd', test, 4);

    // Assert
    expect(e.email).toBe(test);
  });
  it("should create an id with the constructor", () => {
    // Arrange
    const test = "12345";
    const e = new Manager('Todd', test, test );

    // Assert
    expect(e.id).toBe(test);
  });
  it("should create an office number with the constructor", () => {
    // Arrange
    const test = "54321";
    const e = new Manager('Todd', test, test , test );

    // Assert
    expect(e.officeNumber).toBe(test);
  });
});