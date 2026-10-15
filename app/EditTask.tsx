import { View, Text , TextInput, TouchableOpacity, Image , KeyboardAvoidingView,  ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import {Picker} from "@react-native-picker/picker";
import api from "./axios"




type UserData = {
    Full_name: string;
    username: string;
}; 
type status = "pending" | "in-progress" | "completed";


const UpdateTaskScreen = () => {
    const router = useRouter();
    const raw = useLocalSearchParams();

const todo_id = Array.isArray(raw.todo_id) ? raw.todo_id[0] : raw.todo_id || "";
const task_name = Array.isArray(raw.task_name) ? raw.task_name[0] : raw.task_name || "";
const description = Array.isArray(raw.description) ? raw.description[0] : raw.description || "";
const status = Array.isArray(raw.status) ? raw.status[0] : raw.status || "";

    const [title, setTitle] = useState(task_name);  // controlled
  const [descrip, setDescrip] = useState(description);  // controlled
  const[selectedStatus, setSelectedStatus] = useState(status);

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error,setError] = useState('');

  const [user, setUser] = useState<UserData | null>(null);

  
  const updateTask = async () => {
    try {
      const response = await api.post(`/Edit-TodoList/${todo_id}/${selectedStatus}`, {
        Title: title,
        Description: descrip

      });

      alert("Task Updated Successfully.");
      router.push("/Tasks");

    } catch (error: any) {
              setError( "Error failed:" + error.response.data.detail || JSON.stringify(error.response.data));
              alert("Sign In Failed: " + error.response.data.detail || JSON.stringify(error.response.data));
    }
  };

    

  return (
    <KeyboardAvoidingView style={{flex:1, backgroundColor: '#7d4ef3ff', padding:0,}}
     behavior="padding">
      
        <View style= {{ flex:2, padding:16,  borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor:'#7245e3ff', alignContent:'center', justifyContent:'center'}}>
        <Text style={{  fontSize: 37 , fontWeight: 'bold', textAlign:'center', color:'#fff'}}> Edit Task </Text>
        <Text style={{  fontSize: 22 , fontWeight: 'condensedBold', textAlign:'center', color:'#fff', marginTop: 20}}> Edit your Task to your style </Text>
        </View>

        <ScrollView 
        keyboardShouldPersistTaps="handled"
        style= {{flex: 5, flexGrow:5, backgroundColor:'#fff',}}
        contentContainerStyle={{ padding: 20, backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#000', marginTop: 20}}>Title</Text>
        <TextInput
              placeholder={title}
              placeholderTextColor="black"
              
              value={title}
              onChangeText={setTitle}
              
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style= {{
                height: 60,
                width: '96%',
                padding: 12,
                marginVertical: 8,
                fontSize:18,
                fontStyle:'normal',
                fontWeight:'semibold',
                backgroundColor: '#f3f2f2ff',
                borderWidth: 1,
                borderRadius: 10,
                borderColor:  isFocused? "#007aFF": '#aaa',
                shadowColor: isFocused ? "#007aFF" : "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: isFocused ? 0.25 : 0.1,
                shadowRadius: isFocused ? 3.84 : 2,
                
              }}
                />
            <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#000', marginTop: 20}}>Description</Text>
        <TextInput
              multiline
              placeholder={descrip}
              placeholderTextColor="black"
              value={descrip}
              onChangeText={setDescrip}
              
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              style= {{
                height: 200,
                width: '96%',
                padding: 12,
                backgroundColor: '#f3f2f2ff',
                marginVertical: 8,
                fontSize:18,
                fontStyle:'normal',
                fontWeight:'semibold',
                borderWidth: 1,
                borderRadius: 10,
                borderColor:  isPasswordFocused? "#007aFF": '#aaa',
                shadowColor: isPasswordFocused ? "#007aFF" : "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: isPasswordFocused ? 0.25 : 0.1,
                shadowRadius: isPasswordFocused ? 3.84 : 2,
                
              }}
                />
                <View
  style={{
    width: '96%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    borderColor: '#aaa',
    backgroundColor: '#fff',
  }}
>
  <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: "500" }}>Select your task status:</Text>

  <Picker
    selectedValue={selectedStatus}
    onValueChange={(itemValue) => setSelectedStatus(itemValue)}
    itemStyle={{ color: '#d0a3edff', fontSize: 16 }}
    style={{ width: '100%',  color: 'black', marginVertical: -90,  }}
  >
    <Picker.Item 
    
    label="pending" value="pending" />
    <Picker.Item label="completed" value="completed" />
  </Picker>

  <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "500" }}>
    Selected: {selectedStatus}
  </Text>
</View>
            <Text 
            onPress={() => router.push("/Tasks")}
            style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#7d4ef3ff', marginVertical: 40, alignSelf: 'flex-end', marginRight: 15}}>Back To All task?</Text>
            <TouchableOpacity
                onPress={updateTask}
            
             style= {{ width: '96%', height: 60, borderRadius: 10, backgroundColor: '#7d4ef3ff',  flexDirection: 'row',alignContent:'center', justifyContent:'center', shadowColor: "#000",}}>
               <Image 
                    source={{uri:'https://cdn-icons-png.flaticon.com/128/4536/4536827.png'}}
                    style={{ width: 30, height: 30, alignSelf:'center',  marginRight:0}}
                    resizeMode="contain"
                                
                    />   
                    <Text style= {{ fontSize:19, fontWeight:'bold', color:'#fff', textAlign:'center', marginTop: 20}}> Update </Text>
            </TouchableOpacity>                 
        </ScrollView>

        <View style= {{ flex:1, padding:0,  borderBottomLeftRadius: 0, borderBottomRightRadius: 0, backgroundColor:'#FFF', alignContent:'center', justifyContent:'center', borderTopWidth: 1, borderTopColor: '#ccc', flexDirection:'column'}}>
            <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#837f7ffc', marginTop: 0}}> Todo List App </Text>
            <Text
             
             style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#7d4ef3ff', marginTop: 1}}> Organizing has never been better </Text>

        </View>
    </KeyboardAvoidingView>
  );
};
export default UpdateTaskScreen;