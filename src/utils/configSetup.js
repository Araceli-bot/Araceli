const inquirer = require("inquirer");
const fs = require("fs");

let configSetupBase = fs.readFileSync("./src/utils/configSetupBase.txt", "utf8");

var prompts = [ 
   { 
     type: "input", 
     name: "token", 
     message: "Enter the bot token from the application page."
   },
   {
   	  type: "input",
   	  name: "prefix",
   	  message: "Enter the prefix you want for the bot."
   },
   {
   	  type: "input",
   	  name: "db",
   	  message: "Enter your MongoDB HostIP."
   },
   {
   	  type: "input",
   	  name: "dbPort",
   	  message: "Enter your MongoDB Port."
   },
   {
   	  type: "input",
   	  name: "dbauthMechanism",
   	  message: "Enter the authmechanism of your MongoDB. (Only DEFAULT, GSSAPI, PLAIN, MONGODB-X509, SCRAM-SHA-1 or MONGODB-CR is supported by authMechanism)"
   },
   {
   	  type: "input",
   	  name: "dbName",
   	  message: "Enter the database name of your MongoDB."
   },
   {
   	  type: "input",
   	  name: "dbUser",
   	  message: "Enter the database user of your MongoDB."
   },
   {
   	  type: "input",
   	  name: "dbPass",
   	  message: "Enter the database password of your MongoDB."
   }
];

(async function() {
	const answers = await inquirer.prompt(prompts);
	
	configSetupBase = configSetupBase.replace("tokenInput", `${answers.token}`);

 configSetupBase = configSetupBase.replace("prefixInput", `${answers.prefix}`);

 configSetupBase = configSetupBase.replace("dbInput", `${answers.db}`);

 configSetupBase = configSetupBase.replace("dbPortInput", `${answers.dbPort}`);

 configSetupBase = configSetupBase.replace("dbauthMechanismInput", `${answers.dbauthMechanism}`);

 configSetupBase = configSetupBase.replace("dbNameInput", `${answers.dbName}`);

 configSetupBase = configSetupBase.replace("dbUserInput", `${answers.dbUser}`);

 configSetupBase = configSetupBase.replace("dbPassInput", `${answers.dbPass}`);

 fs.writeFileSync("./config.js", configSetupBase);

 console.log(`REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE AND ANY OTHER INFORMATION WHICH CAN BE USER AGAINST YOU TO ANYONE!`);
 
 console.log(`Configuration Successfully written!`);

}());