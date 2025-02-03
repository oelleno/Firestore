// Firebase SDK 추가
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔹 Firebase 설정 (본인 프로젝트 정보 입력!)
const firebaseConfig = {
    apiKey: "AIzaSyAxlXZTfOgO4ZrIfXp4t6sAjArTmMQrwuQ",
    authDomain: "fitgirlviki.firebaseapp.com",
    projectId: "fitgirlviki",
    storageBucket: "fitgirlviki.firebasestorage.app",
    messagingSenderId: "207468197936",
    appId: "1:207468197936:web:70ea3baa845e40372255f5"
};

// 🔹 Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 입력 정보 Firestore에 저장
document.getElementById("info-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    // 입력값 가져오기
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (name === "" || phone === "") {
        alert("모든 필드를 입력해주세요!");
        return;
    }

    try {
        // Firestore에 데이터 저장
        const userId = "everyone"; // 원하는 문서 ID
        await addDoc(collection(db, "users"), {
            name: name,
            phone: phone,
            createdAt: new Date()
        });

        alert("정보 저장 완료!");
        document.getElementById("info-form").reset(); // 입력 필드 초기화
    } catch (error) {
        console.error("오류 발생:", error);
        alert("저장 실패!");
    }
});
