import { Fragment } from 'react';
import './App.css';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';

function App() {
  return (
    <Fragment>
      <PostCreate/>
      <PostList/>
    </Fragment>
  );
}

export default App;
