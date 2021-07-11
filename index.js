const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const teamList = [];


// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the Managers name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the employee ID?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the managers email address?',
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'What is their office number?',
      },
  ])
  .then ((res) => {
        const manager1 = new Manager(res.id, res.name, res.email, res.officeNumber);
       
        console.log(manager1);
        teamList.push(manager1);
        console.log(teamList);
        startHtmlFile(manager1);
        mainMenu();

    });
   
    
};

const mainMenu = () => {
    
    //() => {
      inquirer.prompt([
          {
            type: 'list',
            name: 'options',
            message: 'What action would you like to take?',
            choices: [
              
              "ADD AN ENGINEER",
              "ADD AN INTERN",
              "EXIT"
            ],
          },
        ])
        .then ((res) => {
            switch (res.options) {
               
                case "ADD AN ENGINEER":
                  addEngineer();
                  break;
                case "ADD AN INTERN":
                  addIntern();
                  break;
                case "EXIT":
                    endHtmlFile();
                    break;
              }
    
      });
    
}

function addEngineer(){
    console.log("add Engineer");
    //const promptU = () => {
     inquirer.prompt([
          {
              type: 'input',
              name: 'name',
              message: 'What is the Engineers sname?',
            },
            {
              type: 'input',
              name: 'id',
              message: 'What is the employee ID?',
            },
            {
              type: 'input',
              name: 'email',
              message: 'What is the engineers email address?',
            },
            {
              type: 'input',
              name: 'gitHub',
              message: 'What is their github Username?',
            },
        ])
        .then ((res) => {
              const engineer = new Engineer(res.id, res.name, res.email, res.gitHub);
              console.log(engineer);
              teamList.push(engineer);
              console.log(teamList);
              generateEngCard (engineer);
              mainMenu();
      
        });
      
   
};

function addIntern(){
    console.log("add Intern");
    //const promptU =() => {
         inquirer.prompt([
          {
              type: 'input',
              name: 'name',
              message: 'What is the Interns sname?',
            },
            {
              type: 'input',
              name: 'id',
              message: 'What is the employee ID?',
            },
            {
              type: 'input',
              name: 'email',
              message: 'What is the engineers email address?',
            },
            {
              type: 'input',
              name: 'school',
              message: 'What is their school name?',
            },
        ])
        .then ((res) => {
              const intern = new Intern(res.id, res.name, res.email, res.school);
              console.log(intern);
              teamList.push(intern);
              console.log(teamList);
              generateIntCard (intern)
              mainMenu();
          
        });
    
   
};

function startHtmlFile(employee) {

  const htmlString = 
  `  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <title>Document</title>
      <style>
          .card-header { background-color: red;}
      </Style>
  </head>
  <body>
      <nav class="navbar navbar-dark bg-dark mb-5">
          <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
      </nav>
      <div class="container">
          <div class="row">
          <div class="card" style="width: 18rem;">
          <div class="card-header">
            <h5 class="card-title"> ${employee.getName()}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${employee.getRole()}</h6>
          </div>
          <div class="card-body">  
            <p class="card-text">Id: ${employee.getId()}</p>
            <a href="mailto:${employee.getEmail()}" class="card-link">Email: ${employee.getEmail()}</a><br>
            <a href="#" class="card-link">Office # ${employee.getOfficeNumber()}</a>
          </div>
        </div>`;

  fs.writeFile("./index.html",htmlString, function(err) {
      if (err) {
          console.log(err);
      }
  });
  console.log("start");
}


function generateEngCard (eng) {

  const htmlString = 
   `   <div class="card" style="width: 18rem;">
         <div class="card-header">
            <h5 class="card-title"> ${eng.getName()}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${eng.getRole()}</h6>
          </div>
          <div class="card-body">
            <p class="card-text">${eng.getId()}</p>
            <a href="mailto:${eng.getEmail()}" class="card-link">Email: ${eng.getEmail()}</a><br>
            <a href="https://github.com/${eng.getGithub()}" class="card-link" target="_blank">${eng.getGithub()}</a>
          </div>
        </div>`;

  fs.appendFile("./index.html",htmlString, function(err) {
      if (err) {
          console.log(err);
      }
  });
  
}


function generateIntCard (intern1) {

  const htmlString = 
   `   <div class="card" style="width: 18rem;">
          <div class="card-header">
            <h5 class="card-title"> ${intern1.getName()}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${intern1.getRole()}</h6>
           </div>
          <div class="card-body">  
            <p class="card-text">${intern1.getId()}</p>
            <a href="mailto:${intern1.getEmail()}" class="card-link">Email: ${intern1.getEmail()}</a><br>
            <a href="#" class="card-link">${intern1.getSchool()}</a>
          </div>
        </div>
      </div>`;
      
  fs.appendFile("./index.html",htmlString, function(err) {
      if (err) {
          console.log(err);
      }
  });
  
}


function endHtmlFile() {

  const htmlString = 
   `   </body>
   </html>`;

  fs.appendFile("./index.html",htmlString, function(err) {
      if (err) {
          console.log(err);
      }
  });
}



// const generateHTML = (answers) => console.log("test");
//   `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
//   <title>Document</title>
// </head>
// <body>
//   <div class="jumbotron jumbotron-fluid">
//   <div class="container">
//     <h1 class="display-4">Hi! My name is ${answers.name}</h1>
//     <p class="lead">I am from ${answers.location}.</p>
//     <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
//     <ul class="list-group">
//       <li class="list-group-item">My GitHub username is ${answers.github}</li>
//       <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
//     </ul>
//   </div>
// </div>
// </body>
// </html>`;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser();
    //.then((answers) => writeFileAsync('index.html', generateHTML(answers)))
   // .then(() => console.log('Successfully wrote to index.html'));
   // .catch((err) => console.error(err));
   // mainMenu();
};

init();