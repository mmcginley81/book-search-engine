import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import Apollo
import ApolloProvider from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
//import pages
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: 'localhost:3001/graphql'
});



function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;