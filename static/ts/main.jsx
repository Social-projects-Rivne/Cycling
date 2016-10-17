import React from 'react';
import ReactDOM from 'react-dom';
import {Parent} from './parent.jsx';
import {Profile} from './profile.jsx';

ReactDOM.render(
<div>
<Parent />
<Profile />
</div>,
document.getElementById('app')
);
