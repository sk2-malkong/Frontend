### 인증 방식 이해하기

>Purgo API는 다음 두 가지 인증 방식을 함께 사용합니다:

>1. **API Key 인증** - Header: `Authorization`
>2. **JWT 서명 기반 본문 해시 검증** - Header: `X-Auth-Token`

>이중 구조를 통해 단순 사용자 인증뿐 아니라, 요청 내용의 무결성까지 함께 검증합니다.

---

### 인증 헤더 예시

```bash
Authorization: Bearer {API_KEY}
X-Auth-Token: {JWT}
```

> 위 두 개의 헤더는 **모두 필수**입니다.  
> 하나라도 누락되면 `401 Unauthorized` 에러가 발생합니다.

---

### JWT 필드 구성 예시

```bash
{
  "iss": "your-system",
  "hash": "본문의 SHA256 해시값",
  "iat": 1747314728,
  "exp": 1747315028
}
```

각 필드의 의미는 다음과 같습니다:

| 필드명 | 설명 |
|--------|------|
| `iss`  | 발급자 (예: 서비스 시스템명) |
| `hash` | 요청 본문에 대한 SHA-256 해시값 |
| `iat`  | 토큰 발행 시각 (Unix Timestamp) |
| `exp`  | 토큰 만료 시각 (일반적으로 iat + 300초) |

> JWT는 반드시 `HS256` 알고리즘으로 **서버에서** 서명해야 하며, 클라이언트에서 직접 생성하지 않아야 합니다.