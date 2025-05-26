### **요청과 응답 예시**

Purgo API의 핵심 기능은 프록시 서버를 통해 다음 엔드포인트에서 제공됩니다:

```bash
POST /proxy/analyze/{target}

```

이 API는 사용자가 보낸 문장이 욕설인지 **판별**하고, 욕설일 경우 **정제된 문장으로 대체**해 반환합니다.

`{target}` 에는 다음 중 하나를 사용할 수 있습니다:
- **community**: 기본 설정. 평균적인 속도와 안정적인 성능을 제공합니다.
- **chat**: 실시간 채팅용. **속도는 빠르지만**, 성능은 다소 낮을 수 있습니다.

---

### **요청 헤더 예시**

```
Authorization: Bearer {API_KEY}
X-Auth-Token: {JWT}
Content-Type: application/json
```

> - `Authorization`: 발급받은 API Key  
> - `X-Auth-Token`: 요청 본문을 해시한 JWT (서버에서 생성해야 함)

---

### **요청 바디 예시**

```json
{
  "text": "죽어버려 진짜"
}
```

| 필드   | 타입     | 설명           |
|--------|----------|----------------|
| text   | string   | 욕설 필터링 대상 문장 |

> 이 `text` 필드가 JWT 서명 시 해시 대상이 됩니다.  
> 반드시 JSON을 정렬 후 직렬화하고 SHA-256 해시하여 JWT의 `hash` 필드에 포함해야 합니다.

---

### **응답 예시**

```json
{
  fasttext: { detected_words: [], is_bad: 0 },
  final_decision: 0,
  kobert: { confidence: 0.9933, is_bad: 0 },
  result: { original_text: '배고파요', rewritten_text: '배고파요' }
}
```

| 필드명(1dep) | 필드명(2dep) | 설명 | 비고 |
| --- | --- | --- | --- |
| **fasttext** | detected_words | fasttext모델이 감지한 비속어를 보여줍니다. |  |
|  | is_bad | fasttext의 비속어 탐지 결과입니다. | 필터링 여부는1(있음) 또는 0(없음) |
| **kobert** | confidence | kobert모델이 측정한 비속어 정확성입니다. |  |
|  | is_bad | kobert의 비속어 탐지 결과입니다. | 필터링 여부는1(있음) 또는 0(없음) |
| **result** | original_text | 비속어로 탐지된 단어 문장(단어)입니다. |  |
|  | rewritten_text | 비속어를 대체한 단어 문장(단어)입니다. |  |
| **final_decision** |  | 최종 비속어 탐지여부를 보여줍니다. | 필터링 여부는 1(있음) 또는 0(없음) |


