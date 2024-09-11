iProc adalah web-app untuk management users

Tech stack:
Language: JavaScript
Frontend: React Js, Next Js, Zustand, React Hook Form, Zod, Axios, React Query, Tailwind

Data API diambil dari https://dummyjson.com/docs

Feature:

1. Authentication (signup and login)
2. Authorization (Only admin can create and delete users, Cannot access other users' profiles)
3. CRUD users
4. Sort
5. Search

How to use the application:

1. Lakukan authentication (signup atau login) bisa dilogin page atau signup page karena dari API https://dummyjson.com/user tidak menyediakan API register/signup maka atuhentication bisa dilakukan di login maupun disignup page karena memakai API yang sama
2. Masukkan username dan password: - Untuk role admin:
   username: "emilys",
   password: "emilyspass", - Untuk role selain admin:
   username: "alexanderj",
   password: "alexanderjpass",
   Jika ingin menggunakan user yang lain bisa mengunjungi alamat ini https://dummyjson.com/user
3. Setelah proses athentication maka bisa melakukan CRUD, seperti yang dijelaskan sebelumnya jika rolenya bukan admin maka tidak bisa melakukan create dan delete users
