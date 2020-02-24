import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faMicrochip, faMemory, faHdd, faNetworkWired, faMap, faTimes, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import App from './App';

import 'bootstrap/dist/css/bootstrap-grid.min.css';

library.add(faBars, faMicrochip, faMemory, faHdd, faNetworkWired, faMap, faTimes, faSearch, faSignOutAlt);


ReactDOM.render(<App />, document.getElementById('root'));
