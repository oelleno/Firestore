// Firebase SDK 추가
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 연결 상태 확인을 위한 함수
function checkConnection() {
    return db != null;
}


// 🔹 Firebase 설정 (본인 프로젝트 정보 입력!)
const firebaseConfig = {
    apiKey: "AIzaSyAxlXZTfOgO4ZrIfXp4t6sAjArTmMQrwuQ",
    authDomain: "fitgirlviki.firebaseapp.com",
    projectId: "fitgirlviki",
    storageBucket: "fitgirlviki.appspot.com",
    messagingSenderId: "207468197936",
    appId: "1:207468197936:web:70ea3baa845e40372255f5"
};

// 🔹 Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, {
    cache: {
        enabled: true,
    }
});

console.log("Firebase 연결 성공!");

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
        const userDoc = {
            name: String(name),
            phone: String(phone),
            createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, "users", "everyone"), userDoc, { merge: true });
        
        alert("정보 저장 완료!");
        document.getElementById("info-form").reset(); // 입력 필드 초기화
    } catch (error) {
        console.error("오류 발생:", error);
        let errorMessage = "저장 실패! ";
        if (error.code) {
            switch (error.code) {
                case 'permission-denied':
                    errorMessage += "권한이 없습니다.";
                    break;
                case 'unavailable':
                    errorMessage += "서비스에 연결할 수 없습니다.";
                    break;
                default:
                    errorMessage += error.message;
            }
        }
        alert(errorMessage);
    }
});
