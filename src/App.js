import React, { Component } from 'react';
import { Button } from 'antd';
import TestTs from './test'
import logo from './logo.svg'
import { Provider } from 'react-redux'
import RouteViews from './route/index.js'
import {store} from './store'
import './App.less';

class App extends Component {
  render() {
    return (
        // <div className="App">
        //     {/* <img src={logo} />
        //     <Button type="primary">Button</Button> */}
        //     {/* <TestTs
        //         testProps={'xx'}
        //     >
        //     </TestTs> */
        //     <RouteViews />
        //     }
        // </div>
        <Provider store={store}>
            <RouteViews />
        </Provider>
    );
  }
}

export default App;
