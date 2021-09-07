import React,{useEffect,useCallback} from "react";
import {View,Text,StyleSheet,TouchableOpacity,Platform} from"react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import {SocialIcon} from "react-native-elements"


const LoginScreen=(props)=>{
   useEffect(()=>{
       initAsync();
   });
   
     const initAsync = async () => {
        await GoogleSignIn.initAsync();
        _syncUserWithStateAsync();
      };
    
      const _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
      };
    
    
      const signInAsync = async () => {
        try {
          await GoogleSignIn.askForPlayServicesAsync();
          const { type, user } = await GoogleSignIn.signInAsync();
          console.log(user);
          if (type === 'success') {
            _syncUserWithStateAsync();
            props.navigation.navigate("home");
          }
        } catch ({ message }) {
          alert('login: Error:' + message);
        }
      };

   
    return (
        <View style={style.screen}>
             <SocialIcon type="google" button title="Sign In With Google" raised="true" onPress={signInAsync} style={{padding:"2%",backgroundColor:'white'}}
             iconColor="red" fontStyle={{color:'black'}}
             />
         </View>
    );
}


const style=StyleSheet.create({
    screen : {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#e6ffff"
    }
});

export default LoginScreen;