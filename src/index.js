// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import rootReducer from './modules';

const store = createStore(rootReducer, devToolsEnhancer());

// Prevent React Router from restoring scroll
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// ── 여기부터 ──
// F5 키(또는 keyCode 116) 눌렀을 때 기본 리로드 차단하고
// 강제 풀 리로드를 수행
window.addEventListener('keydown', (e) => {
  const isF5 = e.key === 'F5' || e.keyCode === 116;
  if (isF5) {
    e.preventDefault();
    // true 파라미터는 구형 브라우저에서 강제 서버 리로드
    window.location.reload(true);
  }
});
// ── 여기까지 ──

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
