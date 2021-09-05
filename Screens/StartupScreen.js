import React ,{useEffect} from "react";
import {View,Text,StyleSheet,ActivityIndicator} from"react-native";
import firebase from "firebase";



const StartupScreen=(props)=>{
 useEffect(()=>{
    const checkIfLoggedIn=()=>{
        firebase.auth().onAuthStateChanged( (user)=>{
            if(!user){
                props.navigation.navigate("login");
            }else{
                props.navigation.navigate("home")
            }
        })
    };
        checkIfLoggedIn();
    
 });
 


    return (
         <View style={styles.container}>
             <ActivityIndicator size="large" color="black"/>
         </View>
    );
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});

export default StartupScreen;