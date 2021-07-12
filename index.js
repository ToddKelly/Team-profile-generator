// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
//calls the manager page
const Manager = require('./library/Manager')
//calls the engineer page
const Engineer = require('./library/Engineer')
//calls the intern page 
const Intern = require('./library/Intern')
//calls the buildtemp page
const generateHTML = require('./library/buildTemp')
//Creates the array based off the responses to the promted questions 
const team = [];
 
const writeFileAsync = util.promisify(fs.writeFile);

//Asks the user what it is they would like to do
const continueBuild = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'teamMember',
      message: 'what team member do you want to build',
      choices: ['Intern', 'Engineer', 'I dont not want to add more team members'],
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    }
  ])
    .then((answer) => {
      switch (answer.teamMember) {
        case 'Intern':
          return promptIntern();
        case 'Engineer':
          return promptEngineer();
        default:
          console.log("Writing your file")
          return renderTeamPage(team)

      }
    })
}

//Manager input
const promptUserManager = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    },
    {
      type: 'input',
      name: 'email',
      message: 'what is your email?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your ID number?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    },
    {
      type: 'input',
      name: 'office',
      message: 'what is your office number?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    }
  ]).then((response) => {
    //Creates Manager 
    const manager = new Manager(response.name, response.email, response.id, response.office)
    team.push(manager);
    //continues to build a team until told otherwise
    continueBuild()
  })
};
const init = () => {
  promptUserManager()

};


//Engineer Input
const promptEngineer = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your Id?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },

    },
    {
      type: 'input',
      name: 'github',
      message: 'what is your Git Hub username?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    }
  ])
    .then((response) => {
      
      console.log(response)
      //Creates Engineer and add them to the team array
      const engineer = new Engineer(response.name, response.email, response.id, response.github)
      team.push(engineer);
      //continue to build team members until told otherwise
      continueBuild()
    })
};
//Intern Input
const promptIntern = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your Id?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    },
    {
      type: 'input',
      name: 'school',
      message: 'what is your School name?',
      validate: (value) => {
        if (value) { return true }
        else { return 'please enter a value' }
      },
    }
  ])
    .then((response) => {
      //Creates Intern and add them to the team array
      console.log(response)
      const intern = new Intern(response.name, response.email, response.id, response.school)
      team.push(intern);
      //continue to build team members until told otherwise
      continueBuild()
    })
};


//This function is called when no more team memebers are to be added and html page is to be generated
function renderTeamPage(response) {
  writeFileAsync('index.html', generateHTML(response))
    .catch(err => console.error(err))
  console.log('index.html', generateHTML(response))

}
init();