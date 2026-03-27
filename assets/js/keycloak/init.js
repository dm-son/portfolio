const keycloak = new Keycloak({
    url: 'https://dm-son.duckdns.org/auth',
    realm: 'portfolio',
    clientId: 'portfolio-client'
});

keycloak.init({ 
    onLoad: 'check-sso', // 페이지 로드 시 로그인 상태 확인
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' 
}).then(authenticated => {
    if (!authenticated) {
        console.log('로그인 안됨');
        // 로그인 버튼 클릭 시 keycloak.login() 호출하도록 설정
    } else {
        console.log('로그인 성공!', keycloak.tokenParsed);
        document.getElementById('user-name').innerText = keycloak.tokenParsed.preferred_username + "님 환영합니다!";
    }
}).catch(err => {
    console.error('인증 실패:', err);
});