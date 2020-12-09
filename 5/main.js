/*
128 rows of 8 seats

F -> Lower half (rows)
B -> Upper half (rows)

L -> Lower half (seats)
R -> Upper half (seats)

*/

const fs = require('fs').promises;

fs.readFile('input', 'utf-8')
    .then((data) => {
        const rows = data.split('\n').map((d) => d.replace('\r', ''));

        const parseRow = (remaining, range) => {
            const next = remaining.slice(0, 1);
            let nextRange;

            if (next == 'F' || next == 'L') {
                const nextUpper = Math.floor(range.reduce((a, b) => a + b) / 2);
                nextRange = [ range[0], nextUpper ];
            }
            else {
                const nextLower = Math.ceil(range.reduce((a, b) => a + b) / 2);
                nextRange = [ nextLower, range[1] ];
            }

            if (remaining.length >= 1)
                nextRange = parseRow(remaining.slice(1, remaining.length), nextRange);

            return nextRange;
        }

        const getSeatId = (code) => {
            const row = parseRow(code.slice(0,7), [0,127]).shift();
            const seat = parseRow(code.slice(7,10), [0,7]).shift();

            return (row * 8) + seat
        }

        const seatIds = rows.map((row) => getSeatId(row)).sort((a, b) => b - a);

        console.log('The highest seat id is: ' + seatIds.shift());
        console.log('The lowest seat id is: ' + seatIds.pop());

        for (var i = 1; i < seatIds.length;i++) {
            const currentId = seatIds[i];
            const previousId = seatIds[i + 1];
            
            if (currentId - previousId >= 2) {
                console.log((seatIds[i] - 1) + ' <= This is your seat:');
            }
        }
    });
