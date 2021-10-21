const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


const generateHTML = require('./src/generateHTML');

const teamMembers = [];

const managerQuestions = [
{
    type: "input",
    message: "Please enter your name.",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
    validate: function (valid) {
      const emailValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      // if (valid == emailValid) { 
      if (valid.match(emailValid)) {
          return true
      } else {
          return 'Invalid E-mail format'
      }
  }
  },
  {
    type: "input",
    message: "What is your office number?",
    name: "officeNumber",
  },
];

const addGenerate = {
  type: "list",
  message: "Would you like to add a member or generate current team?",
  name: "addorgenerate",
  choices: ["Add Engineer", "Add Intern", "Generate Team"],
};

const engineerQuestions = [
{
    type: "input",
    message: "Your name",
    name: "name",
  },
  {
    type: "input",
    message: "What is your id Number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
    validate: function (valid) {
      const emailValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      if (valid.match(emailValid)) {
          return true
      } else {
          return 'Invalid E-mail format'
      }
  }
  },
  {
    type: "input",
    message: "What is your Github userName?",
    name: "github",
  },
]

const internQuestions = [
    {
      type: "input",
      message: "Please enter your name",
      name: "name",
    },
    {
      type: "input",
      message: "What is your id Number?",
      name: "id",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
      validate: function (valid) {
        const emailValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (valid.match(emailValid)) {
            return true
        } else {
            return 'Invalid E-mail format'
        }
    }
    },
    {
      type: "input",
      message: "What is your school?",
      name: "school",
    },
];
const addOrGen = () => {
    inquirer.prompt(addGenerate).then((answer) => {
      console.log(answer);
      if (answer.addorgenerate === "Add Intern") {
        internRole();
      } else if (answer.addorgenerate === "Add Engineer"){
        engineerRole();
      } else {
        return renderTeam();
      }
    })
}

const engineerRole = () => {
  inquirer.prompt(engineerQuestions).then((answer) => {
    console.log(answer)
    // let newEngineer = {}
    const newEngineer = new Engineer(
      answer.name,
      answer.id,
      answer.email,
      answer.github
    );
    teamMembers.push(newEngineer)
    addOrGen();
  })
}

const internRole = () => {
  inquirer.prompt(internQuestions).then((answer) => {
    console.log(answer)
    // let newIntern = {}
    const newIntern = new Intern(
      answer.name,
      answer.id,
      answer.email,
      answer.school
    );
    teamMembers.push(newIntern)
    // console.log(teamMembers.push(newIntern))
    addOrGen();
  })
}

const managerRole = () => {
  inquirer.prompt(managerQuestions).then((answer) => {
    // console.log(answer)
    // let newManager = {}
    const newManager = new Manager(
      answer.name,
      answer.id,
      answer.email,
      answer.officeNumber
    )
    teamMembers.push(newManager)
    addOrGen();
  })
}

function renderTeam () {
  console.log('team', JSON.stringify(teamMembers))
  const renderPageContent = generateHTML(teamMembers)
  fs.writeFile('./dist/myteam.html', renderPageContent, (err) =>
    err ? console.log(err) : console.log('team generated!')
  )
}

const init = () => managerRole();

init()