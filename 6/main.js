const fs = require('fs').promises;

const partOne = () => {
    fs.readFile('input', 'utf-8')
    .then((data) => {
        const splitData = data.split(/(\n\r)/).map((d) => d.split(/\n/).join("").split(/\r/).join("")).filter(d => d);
                
        const uniqueVotes = splitData.map((data) => {
            return data.split('').reduce((map, obj) => {
                map.set(obj, obj);
                return map;
            } , new Map())
        });

       uniqueVoteCount = uniqueVotes.reduce((a, b) => a + b.size, 0)

       console.log('Number of questions yes was answered to: ' + uniqueVoteCount);
    });
}

const partTwo = () => {
fs.readFile('input', 'utf-8')
    .then((data) => {
        const questionsPerGroup = data.split(/(\n\r)/).filter(d => d != '\n\r');
        
        const mapOfData = questionsPerGroup.map((qpg) => {
            // [abc] -> { count: 1, a: 1, b: 1, c: 1 }
            // [a, b, c] -> { count: 3, a: 1, b: 1, c: 2 }
            // [ab, ac] -> { count: 2, a: 2, b: 1, c: 1 }
            const questionsPerUser = qpg.split(/(\r\n)/).filter(d => d != '\r\n');

            return questionsPerUser.reduce((map, value) => {
                const nextCount = map.has('count') ? map.get('count') + 1 : 1;

                const questionsForThisUser = value.split('');
                questionsForThisUser.forEach((q) => {
                    const countForThisQuestion = map.has(q) ? map.get(q) + 1: 1
                    map.set(q, countForThisQuestion);
                });

                map.set('count', nextCount);

                return map;
            }, new Map());
        });

        var numberOfCorrectEntries = 0;
        mapOfData.forEach((d) => {
            const currentCount = d.get('count');
            d.forEach((value, key) => {
                if (key != 'count' && key != '\n' && key != '\r' && value == currentCount) {
                    numberOfCorrectEntries++;
                }
            })
        })

        console.log('Number of entries everyone answered yes to: ' + numberOfCorrectEntries);
    });
}

partOne();

partTwo();