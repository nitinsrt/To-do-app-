import React, { useCallback, useState ,useEffect} from 'react';
import { StyleSheet, View, Button, FlatList,Alert,Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import {useDispatch,useSelector} from 'react-redux';
import * as GoogleSignIn from "expo-google-sign-in";

import TaskItem from '../components/TaskItem';
import TaskInput from '../components/TaskInput';
import * as TaskActions from "../Store/Actions/TaskActions";

const Home=(props)=> {
  const signOutAsync = async () => {
    await GoogleSignIn.disconnectAsync();
  };
  const [isLoading,setisLoading]=useState(true);

  const dispatch=useDispatch();

  const loadingProducts=useCallback(async()=>{
    try{
      await dispatch(TaskActions.fetchProducts());
    }catch (err){
      Alert.alert("Error","No Task to show, Lets add some",[{text:"Yes",style:"cancel" }])
    }
  },[dispatch]);

  useEffect(()=>{
  setisLoading(true);
loadingProducts().then(()=>{
    setisLoading(false)
})
},[loadingProducts]);

  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
  
    setIsAddMode(false);
    dispatch(TaskActions.createProduct(
      goalTitle
     ));
  };

  const Tasks=useSelector(state=>state.tasker.userTasks);


  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };
  
  if(isLoading){
    return(
      <View>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }
  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <TaskInput
        visible={isAddMode}
        onAddTask={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={Tasks}
        renderItem={itemData => (
          <TaskItem
            id={itemData.item.id}
            title={itemData.item.title}
          />
        )}
      />
      <View style={styles.logout}>
      <Button title="logout" onPress={()=>{
        Alert.alert("Log Out","Are You Sure you want to log out?",[{text:"Yes",onPress:{signOutAsync}}])
      }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  logout:{
    marginTop:'20%'
  }
});

export default Home;