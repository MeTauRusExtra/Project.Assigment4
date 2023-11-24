class Node {
    constructor(englishWord, thaiTranslation, wordType) {
        this.englishWord = englishWord;
        this.thaiTranslation = thaiTranslation;
        this.wordType = wordType;
        this.next = null;
        this.previous = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }

    findNode(englishWord) {
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.englishWord === englishWord) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }

        return null; // ไม่พบ node ที่ตรงกับคำศัพท์ที่ระบุ
    }


    addNode(englishWord, thaiTranslation, wordType) {
        const newNode = new Node(englishWord, thaiTranslation, wordType);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
        } else {
            this.tail.next = newNode;
            newNode.previous = this.tail;
            this.tail = newNode;
        }
    }

    displayCurrentWord() {
        var currentWordDisplay = document.getElementById("currentWordDisplay");
        currentWordDisplay.innerHTML = `<p>English: ${this.current.englishWord}</p><p>Thai: ${this.current.thaiTranslation}</p><p>Type: ${this.current.wordType}</p>`;
    }

    showNextWord() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
        } else if (this.head) {
            this.current = this.head;
        }
        this.displayCurrentWord();
    }

    showPreviousWord() {
        if (this.current && this.current.previous) {
            this.current = this.current.previous;
        } else if (this.tail) {
            this.current = this.tail;
        }
        this.displayCurrentWord();
    }
}

var wordList = new DoubleLinkedList();



// ใส่ข้อมูลตัวอย่าง
wordList.addNode("apple", "แอปเปิ้ล", "noun");
wordList.addNode("banana", "กล้วย", "noun");
wordList.addNode("cat", "แมว", "noun");
wordList.addNode("dog", "หมา", "noun");
wordList.addNode("elephant", "ช้าง", "noun");
wordList.addNode("flower", "ดอกไม้", "noun");
wordList.addNode("happy", "มีความสุข", "adjective");
wordList.addNode("jazz", "แจ๊ส", "noun");
wordList.addNode("king", "กษัตริย์", "noun");
wordList.addNode("lion", "สิงโต", "noun");
wordList.addNode("mountain", "ภูเขา", "noun");
wordList.addNode("notebook", "สมุดโน้ต", "noun");
wordList.addNode("orange", "ส้ม", "noun");
wordList.addNode("pizza", "พิซซ่า", "noun");
wordList.addNode("quiet", "เงียบ", "adjective");
wordList.addNode("rain", "ฝน", "noun");
wordList.addNode("sun", "พระอาทิตย์", "noun");
wordList.addNode("tree", "ต้นไม้", "noun");
wordList.addNode("umbrella", "ร่ม", "noun");
wordList.addNode("victory", "ชัยชนะ", "noun");
// ... (โค้ดอื่น ๆ)




function translateWord(resultDiv) {
    var englishWordInput = document.getElementById("englishWord");
    var resultDiv = document.getElementById("result");
    // Get the English word from the input
    var englishWord = englishWordInput.value;
    // Perform a mock translation (replace this with your actual logic)
    var translation = mockTranslate(englishWord);
    // Display the result
    resultDiv.innerHTML = `<p>Translation: ${translation.thai}</p><p>Type: ${translation.type}</p>`;
    document.getElementById('translateButton').addEventListener('click', function () {
        translateWord();
        wordList.displayCurrentWord();
        
    });
}

document.getElementById('translateButton').addEventListener('click', function () {
    var englishWordInput = document.getElementById("englishWord");

    // Get the English word from the input
    var englishWord = englishWordInput.value;

    // Perform a mock translation (replace this with your actual logic)
    var translation = mockTranslate(englishWord);

    // Set current node to the node corresponding to the translated word
    wordList.current = wordList.findNode(englishWord);
    var resultDiv = document.getElementById("result");
    translateWord(resultDiv);
    // Display the result
    resultDiv.innerHTML = `<p>Translation: ${translation.thai}</p><p>Type: ${translation.type}</p>`;
    wordList.displayCurrentWord(); // แสดงผลลัพธ์ใน currentWordDisplay
    
});


var translations = {
    "apple": { thai: "แอปเปิ้ล", type: "noun" },
    "banana": { thai: "กล้วย", type: "noun" },
    "cat": { thai: "แมว", type: "noun" },
    "dog": { thai: "หมา", type: "noun" },
    "elephant": { thai: "ช้าง", type: "noun" },
    "flower": { thai: "ดอกไม้", type: "noun" },
    "happy": { thai: "มีความสุข", type: "adjective" },
    "jazz": { thai: "แจ๊ส", type: "noun" },
    "king": { thai: "กษัตริย์", type: "noun" },
    "lion": { thai: "สิงโต", type: "noun" },
    "mountain": { thai: "ภูเขา", type: "noun" },
    "notebook": { thai: "สมุดโน้ต", type: "noun" },
    "orange": { thai: "ส้ม", type: "noun" },
    "pizza": { thai: "พิซซ่า", type: "noun" },
    "quiet": { thai: "เงียบ", type: "adjective" },
    "rain": { thai: "ฝน", type: "noun" },
    "sun": { thai: "พระอาทิตย์", type: "noun" },
    "tree": { thai: "ต้นไม้", type: "noun" },
    "umbrella": { thai: "ร่ม", type: "noun" },
    "victory": { thai: "ชัยชนะ", type: "noun" }
    // Add more translations as needed
};

function showAllWords() {
    var wordDisplay = document.getElementById("wordDisplay");

    // สร้าง HTML string สำหรับแสดงผลคำศัพท์ทั้งหมด
    var htmlString = "<ul>";
    for (var key in translations) {
        htmlString += "<li>" + key + ": " + translations[key].thai + " (" + translations[key].type + ")</li>";
    }
    htmlString += "</ul>";

    // แสดงผลลัพธ์ใน element ที่กำหนด
    wordDisplay.innerHTML = htmlString;
}

document.getElementById('showAllButton').addEventListener('click', function () {
    showAllWords();
});

document.getElementById('showAllButton').addEventListener('click', function () {
    showAllWords(translations);
});


// Mock translate function (replace this with your actual translation logic)
function mockTranslate(englishWord) {
    return translations[englishWord] || { thai: "Not found", type: "unknown" };
}

function addWord() {
    var continueAdding = true;

    while (continueAdding) {
        var englishWord = prompt("ป้อนคำศัพท์ภาษาอังกฤษ:");

        if (englishWord === null) {
            // ถ้าผู้ใช้กด "Cancel" ใน prompt
            break; // ออกจากลูป
        }

        if (englishWord) {
            var thaiTranslation = prompt("ป้อนคำแปลภาษาไทย:");
            var wordType = prompt("ป้อนชนิดของคำ:");

            // เพิ่มคำศัพท์ใหม่ลงใน dictionary
            translations[englishWord] =  { thai: thaiTranslation, type: wordType };
            wordList.addNode(englishWord, thaiTranslation, wordType);

            // แสดงผลลัพธ์ใหม่
            showAllWords();
            wordList.displayCurrentWord();
            // แปลคำศัพท์ทันที
            translateWord(englishWord);

            // สั่งการยืนยันจากผู้ใช้ว่าต้องการเพิ่มคำศัพท์อีกหรือไม่?
            continueAdding = confirm("เพิ่มคำศัพท์เรียบร้อย คุณต้องการเพิ่มคำศัพท์อีกหรือไม่?");
        } else {
            // ถ้าผู้ใช้ไม่ป้อนคำศัพท์, หรือกด "ยกเลิก" ใน prompt ในรอบแรก
            continueAdding = false;
        }
    }
}

document.getElementById('addWordButton').addEventListener('click', function () {
    addWord();
    wordList.displayCurrentWord();
});
