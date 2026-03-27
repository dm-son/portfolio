// Keycloak 설정
const keycloak = new Keycloak({
    url: 'https://dm-son.duckdns.org/auth',
    realm: 'portfolio',
    clientId: 'portfolio-client'
});

// 초기화 설정
keycloak.init({ 
    onLoad: 'login-required', // 접속하자마자 로그인 페이지로 이동
    checkLoginIframe: false 
}).then(authenticated => {
    if (authenticated) {
        console.log("인증 성공");
        
        // 1. ID Token에서 이름 가져오기
        const userName = keycloak.tokenParsed.name || keycloak.tokenParsed.preferred_username;
        
        // 2. 접속자 이름 alert 띄우기
        alert(userName + "님, 환영합니다!");

        // 3. UI 표시 및 이름 셋팅
        document.getElementById('app').style.display = 'block';
        document.getElementById('welcome-msg').innerText = userName + "님의 방문을 환영합니다.";
    }
}).catch(err => {
    console.error("인증 실패 또는 에러:", err);
    alert("로그인 세션 만료 또는 서버 연결 실패");
});

// 로그아웃 함수
function handleLogout() {
    // 로그아웃 후 다시 돌아올 주소 설정
    keycloak.logout({ redirectUri: 'https://dm-son.github.io' });
}