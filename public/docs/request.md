### **요청과 응답 예시**

Purgo API의 핵심 기능은 아래의 엔드포인트를 통해 제공됩니다:

```bash
POST /proxy/analyze
```


이 API는 사용자가 보낸 문장이 욕설인지 **판별**하고, 욕설일 경우 **정제된 문장으로 대체**합니다.

---

### **요청 헤더 예시**

```bash
Authorization: Bearer {API_KEY}
X-Auth-Token: {JWT}
Content-Type: application/json
```

---

### **요청 바디 예시**

```bash
{
  "text": "죽어버려 진짜"
}
```

| 필드   | 타입     | 설명           |
| ---- | ------ | ------------ |
| text | string | 욕설 필터링 대상 문장 |


이 text 필드가 JWT 서명에 사용될 해시 대상이므로, 본문을 SHA-256 해싱하여 JWT에 넣어야 합니다.


---

### **응답 예시**
```bash
{
  "result": {
    "rewritten_text": "조용히 해",
    "abusive_score": 0.91
  },
  "final_decision": "1"
}
```

| 필드명             | 설명                          |
| --------------- | --------------------------- |
| rewritten\_text | 욕설을 정제한 대체 문장               |
| abusive\_score  | 욕설 확률 (0.0 \~ 1.0 사이 부동소수점) |
| final\_decision | "1": 욕설 있음 / "0": 욕설 아님     |

---

### **참고 사항**
> - rewritten_text는 사용자에게 바로 보여줄 수 있는 **정제 문장**입니다.

> - abusive_score는 내부 모델이 예측한 **욕설 확률**입니다.

> - final_decision은 필터링 여부를 나타내는 **확정값**입니다.
