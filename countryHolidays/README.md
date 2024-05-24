# BlkRckTst
Storage for blackrock assessment

Using fs for writing to CSV files, and Axios for posting data the file in main.ts should be able to write to the accompanying CSV.

For documentation, I overcomplicated the issue at first before settling for fs and axios to make things easier.

    - FS ran into installation complications which was solved by clean initiation and install of NPM.
    - For holiday entries I ran into an issue with the typeset of descriptions as strings, solved by defining it as a number after it's set
    - Left in some console logs for troubleshooting in case of further breakage and left in a catch for unexpected errors

I do know the task isn't complete, and unfortunately I can't complete it prior to end of day friday as I've been sick. The best I can do is talk through the next steps;

    - Following completion of the typescript file, it has to be compiled into Javascript. So make sure that Typescript is installed locally.
    - The creation of a tsconfig.json file is a good next step for configuring the output of the build, and where to find the source files. As well as syntax and module targeting.
    - This will then output a compiled JavaScript file which can then be run using "node build/main.js", as that will be the filename equivalent to main.ts generated.
    - If we're feeling real fancy, should be able to have the Typescript get recompiled automatically with tsc - tsconfig.json --watch functionality.


Also to answer the question at the end of the assessment document; I do think this is a great assignment for testing candidate skills. Lot that can go wrong, but nothing that can't be fixed by switching to powershell if scripts have permission problems or tidying up your approach to modules. Makes sure we're looking at API documentation and are able to follow instructions. I'm a bit of a testing maniac, so maybe writing some simple tests in your framework of choice might be a fun addition to the test.

