import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './Register';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider>
        <Register />
    </MuiThemeProvider>,
    document.getElementById('root')
);
