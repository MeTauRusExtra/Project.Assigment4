class Node:
    def __init__(self, english, thai, word_type):
        self.english = english
        self.thai = thai
        self.word_type = word_type
        self.next = None
        self.prev = None

class Dictionary:
    def __init__(self):
        self.head = None
        self.tail = None

    def add_word(self, english, thai, word_type):
        new_word = Node(english, thai, word_type)
        if not self.head:
            self.head = new_word
            self.tail = new_word
        else:
            new_word.prev = self.tail
            self.tail.next = new_word
            self.tail = new_word

    def get_word(self, english):
        current = self.head
        while current:
            if current.english == english:
                return {'english': current.english, 'thai': current.thai, 'type': current.word_type}
            current = current.next
        return None

    def update_word(self, english, thai=None, word_type=None):
        current = self.head
        while current:
            if current.english == english:
                if thai:
                    current.thai = thai
                if word_type:
                    current.word_type = word_type
                return
            current = current.next

    def delete_word(self, english):
        current = self.head
        while current:
            if current.english == english:
                if current.prev:
                    current.prev.next = current.next
                else:
                    self.head = current.next

                if current.next:
                    current.next.prev = current.prev
                else:
                    self.tail = current.prev
                return
            current = current.next

    def list_all_words(self):
        words = []
        current = self.head
        while current:
            words.append(current.english)
            current = current.next
        return words

    def get_next_word(self, english):
        current = self.head
        while current:
            if current.english == english:
                if current.next:
                    return {'english': current.next.english, 'thai': current.next.thai, 'type': current.next.word_type}
                else:
                    print(f"'{english}' คือคำศัพท์สุดท้ายในพจนานุกรม")
                    return None
            current = current.next
        return None

    def get_previous_word(self, english):
        current = self.head
        while current:
            if current.english == english:
                if current.prev:
                    return {'english': current.prev.english, 'thai': current.prev.thai, 'type': current.prev.word_type}
                else:
                    print(f"'{english}' คือคำศัพท์แรกในพจนานุกรม")
                    return None
            current = current.next
        return None
    
def display_menu():
    print("\nกรุณาเลือกทำรายการ:")
    print("1. แปลคำศัพท์")
    print("2. เพิ่มคำศัพท์ใหม่")
    print("3. เรียกดูคลังคำศัพท์ทั้งหมด")
    print("4. ลบคำศัพท์")
    print("5. ปิดโปรแกรม")
    
def display_menu2():
    print("\nกรุณาเลือกทำรายการ:")
    print("1. ดูคำศัพท์ก่อนหน้า")
    print("2. ดูคำศัพท์ถัดไป")
    print("3. กลับไปหน้าแรก")
    print("4. ปิดโปรแกรม")
    


def add_default_words(dictionary):
    default_words = [
        {'english': 'apple', 'thai': 'แอปเปิ้ล', 'type': 'นาม'},
        {'english': 'banana', 'thai': 'กล้วย', 'type': 'นาม'},
        {'english': 'cat', 'thai': 'แมว', 'type': 'นาม'},
        {'english': 'dog', 'thai': 'หมา', 'type': 'นาม'},
        {'english': 'elephant', 'thai': 'ช้าง', 'type': 'นาม'},
        {'english': 'flower', 'thai': 'ดอกไม้', 'type': 'นาม'},
        {'english': 'happy', 'thai': 'มีความสุข', 'type': 'คำคม'},
        {'english': 'jazz', 'thai': 'แจ๊ส', 'type': 'นาม'},
        {'english': 'king', 'thai': 'กษัตริย์', 'type': 'นาม'},
        {'english': 'lion', 'thai': 'สิงโต', 'type': 'นาม'},
        {'english': 'mountain', 'thai': 'ภูเขา', 'type': 'นาม'},
        {'english': 'notebook', 'thai': 'สมุดโน้ต', 'type': 'นาม'},
        {'english': 'orange', 'thai': 'ส้ม', 'type': 'นาม'},
        {'english': 'pizza', 'thai': 'พิซซ่า', 'type': 'นาม'},
        {'english': 'quiet', 'thai': 'เงียบ', 'type': 'คำคม'},
        {'english': 'rain', 'thai': 'ฝน', 'type': 'นาม'},
        {'english': 'sun', 'thai': 'แสงอาทิตย์', 'type': 'นาม'},
        {'english': 'tree', 'thai': 'ต้นไม้', 'type': 'นาม'},
        {'english': 'umbrella', 'thai': 'ร่ม', 'type': 'นาม'},
        {'english': 'victory', 'thai': 'ชัยชนะ', 'type': 'นาม'},
    ]

    for word in default_words:
        dictionary.add_word(word['english'], word['thai'], word['type'])
def main():
    dictionary = Dictionary()
    add_default_words(dictionary)

    while True:
        display_menu()
        choice = input("กรุณาเลือกรายการ: ")

        if choice == '1':
            english_word = input("ป้อนคำศัพท์ภาษาอังกฤษ: ")
            word = dictionary.get_word(english_word)
            if word:
                print(f"{english_word}: {word['thai']} ({word['type']})")
                while word:
                    display_menu2()
                    choice2 = input("กรุณาเลือกรายการ: ")
                    if choice2 == '1':
                     prev_word = dictionary.get_previous_word(english_word)
                     if prev_word:
                        print(f"คำศัพท์ก่อนหน้า: {prev_word['english']}: {prev_word['thai']} ({prev_word['type']})")
                    elif choice2 == '2':
                        next_word = dictionary.get_next_word(english_word)
                        if next_word:
                            print(f"คำศัพท์ถัดไป: {next_word['english']}: {next_word['thai']} ({next_word['type']})")
                    elif choice2 == '3':
                        main()
                    elif choice2 == '4':
                        break
            else:
                print(f"{english_word} ไม่พบในพจนานุกรม")

        elif choice == '2':
            english_word = input("ป้อนคำศัพท์ภาษาอังกฤษ: ")
            thai_translation = input("ป้อนคำแปลภาษาไทย: ")
            word_type = input("ป้อนชนิดของคำ: ")
            dictionary.add_word(english_word, thai_translation, word_type)
            print(f"เพิ่มคำศัพท์ '{english_word}' เรียบร้อยแล้ว")

        elif choice == '3':
            all_words = dictionary.list_all_words()
            if all_words:
                print("\nคำศัพท์ทั้งหมด:")
                for word in all_words:
                    print(word)
            else:
                print("ยังไม่มีคำศัพท์ในพจนานุกรม")

        elif choice == '4':
            english_word = input("ป้อนคำศัพท์ภาษาอังกฤษที่ต้องการลบ: ")
            dictionary.delete_word(english_word)
            print(f"ลบคำศัพท์ '{english_word}' แล้ว")

        elif choice == '5':
            print("ปิดโปรแกรม")
            break
    
        else:
            print("กรุณาเลือกรายการให้ถูกต้อง")

if __name__ == "__main__":
    main()
