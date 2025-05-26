import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

// redux 추가
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import rootReducer from './modules';
import 'fullpage.js/dist/fullpage.min.css';

const store = createStore(rootReducer, devToolsEnhancer());

const rootElement = document.getElementById('root');
// rootElement가 null일 수 있으므로 타입 체크 추가
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

