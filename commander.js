const { program } = require('commander');

program
  .option('-cn, --classname [string...]', "class name of java class");

program.parse();

const options = program.opts();

const path = require("path");
const glob = require("glob");
const { appendClasspath, ensureJvm } = require("java-bridge");
const { TypescriptBulkDefinitionGenerator } = require("java-ts-definition-generator");

let depJarFiles = glob.sync("**/*.jar", {
    root: path.join(__dirname, "./java-jars")
});

ensureJvm();
for (let i = 0; i < depJarFiles.length; i++) {
    appendClasspath(depJarFiles);
}

const generator = new TypescriptBulkDefinitionGenerator();

(async () => {
    // Generate definitions for the provided modules
    await generator.generate(options.classname);

    // Save the definitions to a directory
    await generator.save(path.join(__dirname, "./src/java-wrapper"));
})();