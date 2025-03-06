const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const cors = require('cors');
const Spellchecker = require("hunspell-spellchecker"); 
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        console.error(`Error loading en-AU dictionary:`, err);
        return null;
    }
}


app.get('/', (req, res) => {
    res.send('Hello, welcome to the server!');
});

app.get('/GetData', (req, res) => {
    try {
        const data = req.query.data;
        if (!data) {
            return res.status(400).json({ Message: "No data received!" });
        }
        class CountWordsHashTable {
          constructor() {
              this.wordCount = {}; // Persistent hash table
          }
      
          countWords(text) {
              const words = text.toLowerCase().match(/\b\w+\b/g);
      
              if (!words) return {}; 
      
              words.forEach(word => {
                  this.wordCount[word] = (this.wordCount[word] || 0) + 1;
              });
      
              return this.wordCount;
          }
      }
      
      
      const counter = new CountWordsHashTable();
        console.log(`GetData request received: ${data}`);
        const countedData = counter.countWords(data);
        console.log(`Counted words:`, countedData);

        res.json({ Message: "Received data successfully", data: countedData });
    } catch (error) {
        console.error(`Failed to receive and process data: ${error}`);
        res.status(500).json({ Message: "Internal server error" });
    }
});

app.get('/CorrectText', (req, res) => {
    try {
        const data = req.query.text;
        if (!data) {
            return res.status(400).json({ Message: "No text received!" });
        }
        class TypoCorrecter {
          constructor() {
              this.spellchecker = loadDictionary();
          }
      
          fixTypos(text) {
              if (!this.spellchecker) {
                  console.error("Spellchecker failed to load.");
                  return text; // Return original text if dictionary is missing
              }
      
              return text.split(" ").map(word => {
                  return this.spellchecker.check(word) ? word : (this.spellchecker.suggest(word)[0] || word);
              }).join(" ");
          }
        }      
        const corrector = new TypoCorrecter();
        console.log(`CorrectText request received: ${data}`);
        const correctedData = corrector.fixTypos(data);
        console.log(`Corrected Text: ${correctedData}`);

        res.json({ Message: "Received data successfully", data: correctedData });
    } catch (error) {
        console.error(`Failed to receive and process data: ${error}`);
        res.status(500).json({ Message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
