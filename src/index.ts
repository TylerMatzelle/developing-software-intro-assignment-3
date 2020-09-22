// import yargs to re-use code from someone else that has already 
// solved the complexities of parsing command line arguments
// example with anonymous function
import yargs = require('yargs')
import { calcWoodNeeded } from './commands/calc-wood-needed'
import { Houses } from './house/houses'

// example with anonymous function
Houses.setWallSuppliesCalculator((inches:number) =>{

    // calculation of wall supplies for wall {inches} long here
    return{
        posts: 42, // how long the post is horizontally
        studs: 42, // how long the stud is horizontally
        plates: 96 // how long the plate is horizontally
    }
});

calcWoodNeeded( yargs );

// tell yargs to include the --help flag
yargs.help();

// tell yargs to parse the parameters
yargs.parse();