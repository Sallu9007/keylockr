import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Context from './components/ContextProvider/context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context>
)

// ReactDOM.render(<Dashboard />, document.getElementById('root'));

