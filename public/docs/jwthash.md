### **JWT 해시 생성 가이드**

>JWT에는 요청 본문(text)을 SHA-256으로 해시한 값이 포함되어야 합니다. 이때 **JSON 직렬화 규칙**을 반드시 지켜야 합니다.

---

### **직렬화 규칙**

| 항목       | 설정                          |
|------------|-------------------------------|
| 키 정렬     | `sort_keys = True`            |
| 공백 제거   | `separators=(',', ':')` 사용 |
| 인코딩     | UTF-8                         |
| 해싱 방식  | SHA-256 해시 알고리즘 사용    |

>이 기준을 지키지 않으면 동일한 본문이라도 해시값이 달라져 JWT 인증이 실패합니다.

---

### **Python 예시**

```python
import json
import hashlib

body = { "text": "안녕" }
text_json = json.dumps(
    body,
    sort_keys=True,
    separators=(',', ':')
)

body_hash = hashlib.sha256(
    text_json.encode('utf-8')
).hexdigest()
print(body_hash)
```
---

### **Java 예시**

```java
ObjectMapper mapper = new ObjectMapper();

mapper.configure(SerializationFeature.ORDER_MAP_ENTRIES_BY_KEYS, true); // 키 정렬
mapper.configure(SerializationFeature.INDENT_OUTPUT, false);            // 들여쓰기 제거

Map<String, String> body = Map.of("text", "안녕");

String jsonBody = mapper.writeValueAsString(body);

String hash = DigestUtils.sha256Hex(
    jsonBody.getBytes(StandardCharsets.UTF_8)
);

```

>이 해시값은 JWT payload의 hash 필드에 포함되어야 하며, 전체 JWT는 `HS256` 알고리즘으로 비밀키(SECRET_KEY)를 사용해 서명해야 합니다.