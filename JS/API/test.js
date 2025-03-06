const Spellchecker = require("hunspell-spellchecker");
const fs = require("fs");
const path = require("path");

function loadDictionary() {
    const affPath = path.join(__dirname, "dictionaries/en-AU", "index.aff");
    const dicPath = path.join(__dirname, "dictionaries/en-AU", "index.dic");

    try {
        const aff = fs.readFileSync(affPath, "utf8");
        const dic = fs.readFileSync(dicPath, "utf8");

        const spellchecker = new Spellchecker();
        const dictionary = spellchecker.parse({ aff, dic });

        spellchecker.use(dictionary);
        return spellchecker;
    } catch (err) {
        console.error("Error loading en-AU dictionary:", err);
        return null;
    }
}

class TypoCorrector {
    constructor() {
        this.spellchecker = loadDictionary();
    }

    fixTypos(word) {
        if (!this.spellchecker) return word;
        if (this.spellchecker.check(word)) {
            return word;
        }

        const suggestions = this.spellchecker.suggest(word);
        return suggestions.length > 0 ? suggestions[0] : word;
    }
}

class WordCounter {
    countWords(text) {
        const words = text.match(/\b\w+\b/g); // Extract words using regex
        return words ? words.length : 0; // Return the total number of words
    }
}

// Example Usage:
const corrector = new TypoCorrector();
console.log(corrector.fixTypos("welcme")); // Output: "welcome" (or closest match)
console.log(corrector.fixTypos("hello"));  // Output: "hello" (unchanged)

const counter = new WordCounter();
console.log(counter.countWords("Hello world! Hello ChatGPT.")); // Output: 4


//Test
// class TypoCorrector {
//     constructor() {
//         this.dictionary = {
//             "typoos": "typos",
//             "recieve": "receive",
//             "teh": "the",
//             "adress": "address",
//             "definately": "definitely"
//         };
//     }

//     fixTypos(word) {
//         return this.dictionary[word] || word; // Return corrected word or original if not found
//     }
// }

// const corrector = new TypoCorrector();
// console.log(corrector.fixTypos("typoos")); // Output: "typos"
// console.log(corrector.fixTypos("hello"));  // Output: "hello" (unchanged)
