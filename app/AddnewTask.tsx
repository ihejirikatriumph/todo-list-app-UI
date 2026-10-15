import { View, Text , TextInput, TouchableOpacity, Image , KeyboardAvoidingView , Keyboard, TouchableWithoutFeedback,} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import api from "./axios"


const AddnewtaskScreen = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
      const [isFocused, setIsFocused] = useState(false);
    const [description, setDescription] = useState("");
      const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [error,setError] = useState('');
    const handleSignIn = async () => {
      try {
          const response = await api.post("/Create-new-todos", {
            
              Title: title,
              Description: description,});
          
          router.push("/Tasks");
            } catch(error: any){
              setError( "Error failed:" + error.response.data.detail || JSON.stringify(error.response.data));
              alert("Sign In Failed: " + error.response.data.detail || JSON.stringify(error.response.data));
            }
          };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView style={{flex:1, backgroundColor: '#7d4ef3ff', padding:0,}}
     behavior="padding">
        <View style= {{ flex:1.5, padding:16,  borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor:'#7245e3ff', alignContent:'center', justifyContent:'center'}}>
        <Text style={{  fontSize: 37 , fontWeight: 'bold', textAlign:'center', color:'#fff', marginTop: 20}}> Create Task </Text>
        <Text style={{  fontSize: 22 , fontWeight: 'condensedBold', textAlign:'center', color:'#fff', marginTop: 20}}> Start your productivity journey by creating a new task </Text>
        </View>

        <View style= {{flex: 5, padding: 20, backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#000', marginTop: 20}}>Title</Text>
        <TextInput
              placeholder="Enter your Task Title"
              placeholderTextColor="gray"
              onChangeText={newText => setTitle(newText)}
              defaultValue={title}
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
              placeholder="Enter your Task Description......"
              placeholderTextColor="gray"
              onChangeText={newText => setDescription(newText)}
              defaultValue={description}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              style= {{
                height: 200,
                width: '96%',
                padding: 12,
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
            
            <TouchableOpacity
            onPress= {handleSignIn}
            
             style= {{ width: '96%', height: 60, borderRadius: 10, backgroundColor: '#7d4ef3ff',  flexDirection: 'row',alignContent:'center', justifyContent:'center', shadowColor: "#000", marginTop: 60,}}>
               <Image 
                    source={{uri:'https://cdn-icons-png.flaticon.com/128/14607/14607738.png'}}
                    style={{ width: 30, height: 30, alignSelf:'center',  marginRight:0}}
                    resizeMode="contain"
                                
                    />   
                    <Text style= {{ fontSize:19, fontWeight:'bold', color:'#fff', textAlign:'center', marginTop: 20}}> Create Task </Text>
            </TouchableOpacity>                 
        </View>

        
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default AddnewtaskScreen;