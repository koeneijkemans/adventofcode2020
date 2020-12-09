const fs = require('fs').promises;

const partOne = () => {
    fs.readFile('input', 'utf-8').then((data) => {
        const input = data.split('\n');
        var numberOfMatchingPasswords = 0;
    
        input.forEach((elem) => {
            var rules = elem.split(' ');
            var minNumberOfOccurances = rules[0].split('-')[0];
            var maxNumberOfOccurances = rules[0].split('-')[1];
            var character = rules[1].replace(':', '');
            var password = rules[2];
    
            var numberOfOccurances = password.split(character).length - 1;
            if (numberOfOccurances >= minNumberOfOccurances && numberOfOccurances <= maxNumberOfOccurances){
                numberOfMatchingPasswords++;
            }
        });
    
        return numberOfMatchingPasswords;
    }).then((numberOfMatchingPasswords) => {
        console.log('---PART ONE---')
        console.log('the number of matching passwords is:');
        console.log(numberOfMatchingPasswords);
    })
}

const partTwo = () => {
    fs.readFile('input', 'utf-8').then((data) => {
        const input = data.split('\n');
        var numberOfMatchingPasswords = 0;

        // 1-3 k: bkktwhgktv
        input.forEach((elem) => {
            var rules = elem.split(' ');
            var firstOccurancIndex = parseInt(rules[0].split('-')[0]) - 1;
            var secondOccuranceIndex = parseInt(rules[0].split('-')[1]) - 1;
            var character = rules[1].replace(':', '');
            var password = rules[2];

            var firstIndexOfContainsCorrectCharacter = password[firstOccurancIndex] == character;
            var secondIndexOfContainsCorrectCharacter = password[secondOccuranceIndex] == character;

            if ((firstIndexOfContainsCorrectCharacter || secondIndexOfContainsCorrectCharacter) 
                && !(firstIndexOfContainsCorrectCharacter && secondIndexOfContainsCorrectCharacter)) {

                numberOfMatchingPasswords++;
            }
        });

        return numberOfMatchingPasswords;
    }).then((numberOfMatchingPasswords) => {
        console.log('---PART TWO---')
        console.log('the number of matching passwords is:');
        console.log(numberOfMatchingPasswords);
    })
}

partOne();

partTwo();