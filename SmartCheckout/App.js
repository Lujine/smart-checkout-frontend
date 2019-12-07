import Barcode from './views/Barcode';
import Login from './views/User/login/login'
import Profile from './views/User/profile/profile'
import Register from './views/User/register/register'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: Login},
  Barcode: {screen: Barcode},
  Register:{screen:Register},
  Profile:{screen:Profile},
  
});

const App = createAppContainer(MainNavigator);

export default App;
