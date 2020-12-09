const fs = require('fs').promises;

fs.readFile('input', 'utf-8')
    .then((data) => {
        var dataMap = data.split('\n').map(s => s.replace('\r', '')).map(s => [...s]);

        const countFunc = (stepY, stepX) => {
            var currentX = 0;
            var currentY = 0;
            var numberOfTrees = 0;
            
            do {
                currentY += stepY;
                currentX += stepX;
    
                if (currentX >= dataMap[currentY].length) {
                    currentX = currentX - dataMap[currentY].length;
                }
        
                if (dataMap[currentY][currentX] == '#') numberOfTrees++
            } while (dataMap.length > (currentY + 1))
    
            console.log('Number of trees')
            console.log(numberOfTrees);
            return numberOfTrees;
        }

        total = countFunc(1, 1) * countFunc(1, 3) * countFunc(1, 5) *  countFunc(1, 7) *  countFunc(2, 1);
        console.log('And the end result is')
        console.log(total);
});