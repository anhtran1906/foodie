import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Home from './Home';
import Login from './Login';
import Filter from './Filter';
import { combineReducers, createStore } from 'redux';
import React from 'react';
import {connect, Provider} from 'react-redux';

const AppRouteConfigs = {
  Login: {
    screen: Login,
  },
  Home: {
    screen: Home,
  },
  Filter: {
    screen: Filter,
  },
}
const AppNavigator = StackNavigator(AppRouteConfigs);
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const appReducer = combineReducers({
  nav: navReducer,
});

class App extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })
    } />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
export default Root;
