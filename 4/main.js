const fs = require('fs').promises;

fs.readFile('input', 'utf-8')
    .then((data) => {
        const passportData = data.split('\n').map((d) => d.replace('\r', ''));

        const passportAccumulator = (remainingData, passports = []) => {
            const next = remainingData.shift();
            if (next) {
                currentPassport = passports.pop() ?? "";
                passports = [...passports, [currentPassport, next].join(" ").trimStart()]
            } else {
                passports = [...passports, next];
            }

            if (remainingData.length) passports = passportAccumulator(remainingData, passports);

            return passports;
        }

        const passportHasAllRequiredFields = (passport) => {
            const requiredFields = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:'];

            return requiredFields.every((requiredField) => passport.includes(requiredField));
        }

        const passportMatchesValidationRules = (passport) => {
            const rules = [{
                key: 'byr',
                validate: (value) => value.length == 4 && parseInt(value) >= 1920 && parseInt(value) <= 2002
            }, {
                key: 'iyr',
                validate: (value) => value.length == 4 && parseInt(value) >= 2010 && parseInt(value) <= 2020
            }, {
                key: 'eyr',
                validate: (value) => value.length == 4 && parseInt(value) >= 2020 && parseInt(value) <= 2030
            }, {
                key: 'hgt',
                validate: (value) => {
                    var result = value.match(/1([5-8][0-9]|9[0-3])cm|(59|[6][0-9]|[7][0-6])in/g);
                    return result && result[0] == value;
                }
            }, {
                key: 'hcl',
                validate: (value) => value.length == 7 && RegExp(/#([0-9]|[a-f]){6}/g).test(value)
            }, {
                key: 'ecl',
                validate: (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some((color) => value == color)
            }, {
                key: 'pid',
                validate: (value) => value.length == 9 && !isNaN(value)
            }, {
                key: 'cid',
                validate: (value) => true
            }];

            const passportParts = passport.split(' ');

            return passportParts.every((part) => {
                const partPair = part.split(':');
                const rule = rules.find((rule) => rule.key == partPair[0]);
                const isValid = rule.validate(partPair[1]);
                return isValid;
            })
        }

        const countNumberOfCorrectPasswordsForPartOne = (passports) => {
            return passports.filter((passport) => passportHasAllRequiredFields(passport)).length;
        }

        const countNumberOfCorrectPasswordsForPartTwo = (passports) => {

            const passportsWithAllRequiredFields = passports.filter((passport) => passportHasAllRequiredFields(passport));

            return passportsWithAllRequiredFields.filter((passport) => passportMatchesValidationRules(passport)).length;
        }

        const passports = passportAccumulator(passportData);

        console.log('Number of correct passports for part one: ' + countNumberOfCorrectPasswordsForPartOne(passports));

        console.log('Number of correct passports for part two: ' + countNumberOfCorrectPasswordsForPartTwo(passports));
    });