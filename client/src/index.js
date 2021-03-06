import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import BaseLayout from './components/BaseLayout';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './components/App';
import Register from './components/Register';
import Login from './components/Login';
import MyBooks from './components/MyBooks';

ReactDOM.render(
    <BrowserRouter>
        <BaseLayout>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/my-books" component={MyBooks} />
            </Switch>
        </BaseLayout>
     </BrowserRouter>
     ,
     document.getElementById('root')
     );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
