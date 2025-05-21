import React, { useEffect, useState } from "react";
import * as S from "../DocsStyle";
import LanguageTabs from "../components/LanguageTabs";
import MarkdownRenderer from "../components/MarkdownRenderer";

const JwthashPage: React.FC = () => {
  const [mdTop, setMdTop] = useState<string>("");
  const [mdBottom, setMdBottom] = useState<string>("");

  useEffect(() => {
    fetch("/docs/jwthash.md")
      .then((res) => res.text())
      .then((text) => {
        const [top, bottom] = text.split("<!-- LANGUAGE_TABS_HERE -->");
        setMdTop(top);
        setMdBottom(bottom);
      })
      .catch(() => {
        setMdTop("❌ 문서를 불러오는 데 실패했습니다.");
        setMdBottom("");
      });
  }, []);

  return (
    <S.MainContent>
      <MarkdownRenderer content={mdTop} />

      <LanguageTabs
        codeMap={{
          Python: `# JSON 직렬화: 키 정렬 + 공백 포함 + 한글 유지
json_str = json.dumps(data, sort_keys=True, ensure_ascii=False)

# 해시 생성
hash_value = hashlib.sha256(json_str.encode("utf-8")).hexdigest()

# JWT 생성: 해시 포함
payload = {
    "sub": "test-user",
    "iat": int(time.time()),
    "exp": int(time.time()) + 3600,
    "hash": hash_value
}
jwt_token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

# 헤더 구성
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "X-Auth-Token": jwt_token,
    "Content-Type": "application/json"
}

# POST 요청 전송
response = requests.post(PROXY_URL, data=json_str.encode("utf-8"), headers=headers)
`,

          "Node.js": `// JSON 직렬화: 키 정렬 + 공백 포함 + 한글 유지
const jsonStr = JSON.stringify(data, Object.keys(data).sort());

// 해시 생성
const hashValue = crypto.createHash('sha256').update(jsonStr, 'utf8').digest('hex');

// JWT 생성: 해시 포함
const currentTime = Math.floor(Date.now() / 1000);
const payload = {
  sub: "test-user",
  iat: currentTime,
  exp: currentTime + 3600,
  hash: hashValue
};
const jwtToken = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });

// 헤더 구성
const headers = {
  'Authorization': \`Bearer \${API_KEY}\`,
  'X-Auth-Token': jwtToken,
  'Content-Type': 'application/json'
};

// POST 요청 전송
const response = await axios.post(API_URL, jsonStr, { headers });
`,

          Java: `// SHA-256 해시 생성
String hash = sha256(json);

// JWT 생성
String jwt = createJwt(hash);

// HTTP 요청 전송
HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_JSON);
headers.set("Authorization", "Bearer " + API_KEY);
headers.set("X-Auth-Token", jwt);

HttpEntity<String> request = new HttpEntity<>(json, headers);
RestTemplate restTemplate = new RestTemplate();

ResponseEntity<String> response = restTemplate.postForEntity(PROXY_URL, request, String.class);

// 응답 출력
System.out.println("Status Code: " + response.getStatusCodeValue());
System.out.println("Response Body: " + response.getBody());

// SHA-256 해시 생성 메서드
private String sha256(String input) throws Exception {
    MessageDigest digest = MessageDigest.getInstance("SHA-256");
    byte[] encoded = digest.digest(input.getBytes(StandardCharsets.UTF_8));
    StringBuilder sb = new StringBuilder();
    for (byte b : encoded) {
        sb.append(String.format("%02x", b));
    }
    return sb.toString();
}

// JWT 생성 메서드
private String createJwt(String hash) {
    Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
    return JWT.create()
            .withSubject("test-user")
            .withIssuedAt(Instant.now())
            .withExpiresAt(Instant.now().plusSeconds(3600))
            .withClaim("hash", hash)
            .sign(algorithm);
}
`
        }}
      />

      <MarkdownRenderer content={mdBottom} />
    </S.MainContent>
  );
};

export default JwthashPage;
