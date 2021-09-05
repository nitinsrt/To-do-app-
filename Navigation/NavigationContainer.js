import { createAppContainer ,createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../Screens/HomeScreen";
import StartupScreen from "../Screens/StartupScreen";
import LoginScreen from "../Screens/LoginScreen";


const AppStack=createStackNavigator({
    homeScr: HomeScreen
});

const LoginStack=createStackNavigator({
    loginScr:LoginScreen
})

const switchNavigation = createSwitchNavigator({
    startupScreen: StartupScreen,
    login: LoginStack,
    home: AppStack
});

const NavigationContainer =createAppContainer(switchNavigation);

export default NavigationContainer;