# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### 헤더 디렉토리 위치
헤더 폴더 위치: src/pages/layout/index/_component/Header
📦 기술 스택

Frontend: React, TypeScript, styled-components, scroll-snap 기반 페이지 구성

Backend: Flask, FastAPI 기반 AI 필터링 API

AI 모델: 욕설 탐지 및 대체 모델 (BERT 기반 + FastText 임베딩)

UI 효과: fullPage.js (GPLv3 조건하 사용), GSAP 일부 활용 가능

🧪 기능

실시간 댓글/게시글 비속어 감지 및 대체

비속어 사용 통계 시각화

사용자 키 발급 및 관리


# 🧼 Purgo: AI Profanity Filtering Web App

Purgo는 사용자 게시글 및 댓글의 욕설을 감지하고 정제된 언어로 대체해주는 웹 애플리케이션입니다.  
해당 프로젝트는 오픈소스이며 GNU GPL v3 라이선스를 따릅니다.

## 🧾 License

This project is licensed under the **GNU General Public License v3.0**.

- 자유롭게 소스코드를 사용할 수 있으며, 수정 및 배포도 가능합니다.
- Purgo는 수익을 창출하지 않는 비영리 목적의 오픈소스 프로젝트입니다.
- 단, 이 소스를 이용한 파생 프로젝트도 **동일한 GPLv3 조건**을 따라야 합니다.
- 자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.

⚠️ 이 프로젝트는 [fullPage.js](https://alvarotrigo.com/fullPage/)를 **GPLv3 라이선스 하에서 사용**하고 있습니다.
