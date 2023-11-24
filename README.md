# Project.Assigment4
Simple Dictionary Program ny HTML5 and JavaScript

URL ของเว็ปที่พํฒนา
https://metaurusextra.github.io/Project.Assigment4/


## Use Code
โค้ด HTML ที่ใช่ในเว็ปตัวนี้ดูได้จากไฟล์ index.html <br>
โค้ด JavaScript ดูได้จาก ไฟล์ app.js

### วิธีการทำงานและโครงสร้างข้อมูล

web simple dictionary นี้ได้จัดทำโดยมีโครงสร้างข้อมูล doubly linked list เป็นพื้นฐาน โดยสร้าง class Node ขึ้นมา โดยให้มี property เป็นคำศัพท์ คำแปล ชนิดของคำ และกำหนด next และ previous เป็น null ไว้ก่อน รอการเรียกใช้ <br>

จากนั้นจึงสร้าง class DoubleLinkedList ต่อมาโดยใส่ฟังก์ชั่นการทำงานที่สามารถแสดงคลังคำศัพท์ในโหนดทั้งหมดผ่านคีย์ได้และยังสามารถเรียกใช้งาน current.next และ current.previous ในการเรียกดูตัวถัดไปและตัวก่อนหน้าหลังจากแปลเสร็จแล้วได้อีกด้วย โดยวิธีการคือตอนสร้างฟังก์ชั่นการแปล (function translateWord) นั้นให้มีการเรียกใช้งาน
