// นี้คือคลาส Node ที่ใช้เก็บข้อมูลของคำศัพท์ โดยใช้โครงสร้างของ Doubly Linked List ให้มัน next และ previous ของแต่ละโหนด
class Node {
    constructor(englishWord, thaiTranslation, wordType) {
        this.englishWord = englishWord;
        this.thaiTranslation = thaiTranslation;
        this.wordType = wordType;
        this.next = null;
        this.previous = null;
    }
}

// นี้คือคลาส DoubleLinkedList ที่ใช้เพิ่ม และ ค้นหา Node 
class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }
    // ฟังก์ชั่นนี้ใช้ในการค้นหา Node จากคำศัพท์ภาษาอังกฤษ
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

    // ฟังก์ชั่นนี้ใช้ในการเพิ่ม Node ใหม่
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
    // ฟังก์ชั่นนี้ใช้ในการแสดงข้อมูลของ Node ปัจจุบัน
    displayCurrentWord() {
        var currentWordDisplay = document.getElementById("currentWordDisplay");
        currentWordDisplay.innerHTML = `<p>English: ${this.current.englishWord}</p><p>Thai: ${this.current.thaiTranslation}</p><p>Type: ${this.current.wordType}</p>`;
    }
    // ฟังก์ชั่นนี้ใช้ในการแสดงข้อมูลของ Node ถัดไป
    showNextWord() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
        } else if (this.head) {
            this.current = this.head;
        }
        this.displayCurrentWord();
    }
    // ฟังก์ชั่นนี้ใช้ในการแสดงข้อมูลของ Node ก่อนหน้า
    showPreviousWord() {
        if (this.current && this.current.previous) {
            this.current = this.current.previous;
        } else if (this.tail) {
            this.current = this.tail;
        }
        this.displayCurrentWord();
    }
}
// สร้างอ็อบเจ็กต์ของ DoubleLinkedList
var wordList = new DoubleLinkedList();

// ใส่คลังคำศัพท์
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



// ฟังก์ชั่นนี้ใช้ในการแปลคำศัพท์
function translateWord(resultDiv) {
    var englishWordInput = document.getElementById("englishWord");
    var resultDiv = document.getElementById("result");
    // สร้างตัวแปรรับinput เป็นคำศัพท์ภาษาอังกฤษ เพื่อแปลเป็นภาษาไทย
    var englishWord = englishWordInput.value;
    // เรียกใช้งานฟังก์ชั่นนี้ถ้าไม่มีคำศัพท์ จะขึ้น error
    var translation = mockTranslate(englishWord);
    // แสดงผลออกหน้าเว็ป
    resultDiv.innerHTML = `<p>Translation: ${translation.thai}</p><p>Type: ${translation.type}</p>`;
    document.getElementById('translateButton').addEventListener('click', function () {
        translateWord();
        wordList.displayCurrentWord();
        
    });
}
//Event เมื่อกดปุ่ม translate เพื่อแปลคำศัพท์
document.getElementById('translateButton').addEventListener('click', function () {
    var englishWordInput = document.getElementById("englishWord");
    var englishWord = englishWordInput.value;
    var translation = mockTranslate(englishWord);

    // เซ็ตคำศัพท์ที่แปลให้เป็น current node เพื่อที่จะสามารถกด next และ previous ในการเรียกดูคำศัพท์ถัดไปและก่อนหน้าได้
    wordList.current = wordList.findNode(englishWord);
    var resultDiv = document.getElementById("result");
    translateWord(resultDiv);
    // แสดงผล
    resultDiv.innerHTML = `<p>Translation: ${translation.thai}</p><p>Type: ${translation.type}</p>`;
    wordList.displayCurrentWord(); // แสดงผลลัพธ์ใน currentWordDisplay
    
});

//สร้างตัวแปล เพื่อให้ปุ่ม translate เรียกใช้งาน ซึ่งจะเหมือนกับที่ใส่ในโหนด
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
    // สามารถเพิ่มคำศัพท์เริ่มต้นได้
};

//ฟังก์ชั่นแสดงคลังคำศัพท์ที่มีทั้งหมด
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
//Event ของปุ่ม "ดูคำศัพท์ทั้งหมดให้เรียกใช้งานฟังก์ชั่น showAllWords()
document.getElementById('showAllButton').addEventListener('click', function () {
    showAllWords();
});

document.getElementById('showAllButton').addEventListener('click', function () {
    showAllWords(translations);
});


// ฟังก์ชั่นแสดง not found ของคำศัพท์ในกรณีที่ไม่มีคำศัพท์ในคลัง
function mockTranslate(englishWord) {
    return translations[englishWord] || { thai: "Not found", type: "unknown" };
}

// ฟังก์ชั่น addWord ทำงานโดยให้ป้อนคำศัพท์ คำแปล และชนิดของคำเข้าไป
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

//event ของปุ่ม "เพิ่มคำศัพท์"
document.getElementById('addWordButton').addEventListener('click', function () {
    addWord();
    wordList.displayCurrentWord();
});
