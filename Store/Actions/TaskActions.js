import Tasks from '../../models/Tasks';
import firebase from 'firebase';


export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK= 'SET_TASK';

export const fetchProducts = ()=>{
    try {
        return async (dispatch,getState) =>{
            
            const currUser = firebase.auth().currentUser.email.slice(0,-10);
            const response = await fetch(`https://to-do-app-6cdc5-default-rtdb.asia-southeast1.firebasedatabase.app/Tasks/${currUser}`);
            if(!response.ok){
                throw new Error('Something went wrong')
            }
            const resData = await response.json();
             const loadedTasks = [];
                 for(key in resData){
                loadedTasks.push({ id : key, title : resData[key].title });
                 }

            dispatch({type: SET_TASK,
            userTask: loadedTasks});
    }
    }catch(err){
        throw err;
    }
   }


export const createProduct = (title) =>{
    return async (dispatch,getState) =>{
        const currUser = firebase.auth().currentUser.email.slice(0,-10);
        const response = await fetch(`https://to-do-app-6cdc5-default-rtdb.asia-southeast1.firebasedatabase.app/Tasks/${currUser}.json`,{
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                title:title
            })
        })
        const resData = await response.json();
        dispatch({
        type : CREATE_TASK,
        productData: {
            title:title
        }
        
    })}
};

