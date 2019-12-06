import Barcode from './views/Barcode';
import Login from './views/User/login/login'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: Login},
  Barcode: {screen: Barcode}
});

const App = createAppContainer(MainNavigator);

export default App;
