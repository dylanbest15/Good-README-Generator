// installs
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// prompt user to create readme function
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your application?"
        },
        {
            type: "input",
            name: "description",
            message: "Write a short description for your application."
        },
        {
            type: "input",
            name: "installation",
            message: "What are the steps required to install your application?"
        },
        {
            type: "input",
            name: "usage",
            message: "Provide instructions and examples for use."
        },
        {
            type: "input",
            name: "contributing",
            message: "What are the contribution guidelines for other developers?"
        },
        {
            type: "input",
            name: "tests",
            message: "What are the test instructions for your application?"
        },
        {
            choices: [
                "GNU AGPLv3",
                "GNU GPLv3",
                "GNU LGPLv3",
                "Mozilla Public License 2.0",
                "Apache License 2.0",
                "MIT License",
                "Boost Software License 1.0",
                "The Unlicense"
            ],
            name: "license",
            message: "Choose a license for your application."
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub username."
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address."
        }

    ])
}

// generate readme content function
function generateReadme(answers) {
    return `# ${answers.title}
## Description
${answers.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License

## Contributing
${answers.contributing}

## Tests
${answers.tests}
    
## Questions
Link to Github: https://github.com/${answers.github}
Please email ${answers.email} with additional questions.`
}

// write readme file
promptUser().then((answers) => {
    const text = generateReadme(answers);
    return writeFileAsync("README.md", text);
}).then(() => {
    console.log("Successfully wrote to index.html!");
}).catch((err) => {
    console.log(err);
})