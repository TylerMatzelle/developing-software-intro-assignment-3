import { Arguments, Argv } from "yargs";
import { calculateHouseRequirements } from "../wallCalculator";

export function calcWoodNeeded(yargs: Argv): void {
    
    // create a new yargs "command"
    yargs.command(
        
        // name the command with no spaces
        "calc-wood-needed",

        // describe the command so that the --help flag is helpful
        "Calculate the number of studs required to stick frame a house for Gerald",

        // define the parameters we need for our command
        {
            width: {
                type: "number",
                alias: "w",
                description: "The width of the house",
            },

            length: {
                type: "number",
                alias: "l",
                description: "The length of the house",
            },

            units: {
                type: "string",
                alias: "u",
                description: "changes width and length to inches"
            }
        },

        // define the function we want to run once the arguments are parsed
        function (
            args: Arguments<{
                width: number;
                length: number;
                units: string;
                w: number;
                l: number;
                u: string;
            }>
        ) {
            
        const requirements = calculateHouseRequirements(
            args.width,
            args.length
        );

        console.log( requirements );

        }
    );
}
