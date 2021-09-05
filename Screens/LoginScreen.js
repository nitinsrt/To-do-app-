import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from"react-native";
import * as GoogleAuthentication from "expo-google-app-auth";

import firebase from "firebase";

const LoginScreen=(props)=>{
    const signInWithGoogle = async() => {
          try{
                const result= await GoogleAuthentication.logInAsync({
                    androidClientId: '747317285915-fifgr4it5ful4kkjjp03a902qj4b1m6n.apps.googleusercontent.com',
                    iosClientId: '747317285915-ssiiea0r08t4cntlolkc60mheo7b8jff.apps.googleusercontent.com',
                    scopes: ['profile', 'email']
                });
            if (result.type === 'success') {
                const { idToken, accessToken } = result;
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    idToken,
                    accessToken
                );
                firebase.auth().signInWithCredential(credential);
               
                props.navigation.navigate('home');
              
            }else{
                return{cancelled:true};
            }
        }catch(error){
            console.log(error);
        }
           
    }

   
    return (
        <View style={style.screen}>
            <TouchableOpacity onPress={signInWithGoogle}>
                <View style={style.googleButton}>
                <Text> Login with google</Text>
                </View>
             </TouchableOpacity>
         </View>
    );
}


const style=StyleSheet.create({
    screen : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
      googleButton:{
          width: '80%',
          height: '25%',
          backgroundColor:"white",
          borderColor:"black",
          elevation:5,
          padding:10
      }
});

export default LoginScreen;