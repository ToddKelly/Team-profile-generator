const Employee = require('../library/Employee'); 
describe('employee', () => {
  describe('Initialization', () => {
    
    it("should create an object with a 'text' property set to the 'text' argument provided when called with the 'new' keyword", () => {
      const e = new Employee();

      expect(typeof e).toBe('object');
    });

    it("should create a name with the constructor", () => {
      
      const name = "Todd";
      const e = new Employee(name);
  
      expect(e.name).toBe(name);
    });
  });
  it("should create a email with the constructor", () => {
    
    const test = "email@email.com";
    const e = new Employee('Todd', test, 4);
  
    expect(e.email).toBe(test);
  });
  it("should create an idwith the constructor", () => {
    
    const test = "12345";
    const e = new Employee('Todd', 'email', '12345' );

    expect(e.id).toBe(test);
  });
});