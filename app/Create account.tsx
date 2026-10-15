import {Text, TextInput, View, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView} from "react-native";
import { useState }  from "react"; 
import { useRouter } from "expo-router";
import api from './axios';





const Create_account_Screen = ({navigation} : any) => {
    const router = useRouter();
    const [Fullname, setFullname] = useState("");
      const [isFocused, setIsFocused] = useState(false);
    const [username, setusername] = useState("");
      const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
      const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
      const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
      const [error,setError] = useState('');
      
    const registerUser = async () => {
      try {
          const response = await api.post("/create-user", {
              Name: Fullname,
              username: username,
              password: password,
          }
          );
          alert("Account created successfully! Please sign in.");
          console.log("Account Created:", response.data);
          router.push("/signin");
          

      }
      catch (error: any) {
              setError( "Error failed:" + error.response.data.detail || JSON.stringify(error.response.data));
              alert("Sign In Failed: " + error.response.data.detail || JSON.stringify(error.response.data));
      console.log("Registration error:", error);
      }
  };

  return (
    <View style={{flex:1, backgroundColor: '#7d4ef3ff', padding:0}}>
    
        <View style= {{ flex:1, padding:10,  borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor:'#7245e3ff', alignContent:'center', justifyContent:'center'}}>
        <Text style={{  fontSize: 35 , fontWeight: 'bold', textAlign:'center', color:'#fff', marginTop: 50}}>Create Account</Text>
        <Text style={{  fontSize: 20 , fontWeight: 'condensedBold', textAlign:'center', color:'#fff', marginTop: 3, marginBottom: 20}}>Join thousands of productive users</Text>
        </View>
        
        <KeyboardAvoidingView style= {{flex: 4,}} behavior="padding">
        <ScrollView 
        keyboardShouldPersistTaps="handled"
        style={{flex:5, backgroundColor:'#fff', flexGrow:3}}>
        <View style= {{flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#000', marginTop: 20}}>Full Name</Text>
        <TextInput
              placeholder="Enter your Full name"
              placeholderTextColor="gray"
              onChangeText={newText => setFullname(newText)}
              defaultValue={Fullname}
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
            <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#000', marginTop: 20}}>Username</Text>
        <TextInput
              placeholder="Enter your username"
              placeholderTextColor="gray"
              onChangeText={newText =>  setusername(newText)}
              defaultValue={username}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
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
                borderColor:  isEmailFocused? "#007aFF": '#aaa',
                shadowColor: isEmailFocused ? "#007aFF" : "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: isEmailFocused ? 0.25 : 0.1,
                shadowRadius: isEmailFocused ? 3.84 : 2,
                
              }}
                />
            
            
            <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#000', marginTop: 20}}>Password</Text>
        <TextInput
              placeholder="Create a  Strong password"
              placeholderTextColor="gray"
              onChangeText={newText => setPassword(newText)}
              defaultValue={password}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
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
            
            <View style={{height: 4, width:'96%', backgroundColor: '#dfd9d9ff', marginVertical: 10 , borderRadius: 20}}/>
            <Text style={{  fontSize: 10 , fontWeight: 'bold', textAlign:'center', color:'#cbc3c3ff', marginBottom: 20}}>Enter a password</Text>


            <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#000', marginTop: 10}}>Confirm Password</Text>
        <TextInput
              placeholder="Confirm your password"
              placeholderTextColor="gray"
              onChangeText={newText => setConfirmPassword(newText)}
              defaultValue={confirmPassword}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
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
                borderColor:  isConfirmPasswordFocused? "#007aFF": '#aaa',
                shadowColor: isConfirmPasswordFocused ? "#007aFF" : "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: isConfirmPasswordFocused ? 0.25 : 0.1,
                shadowRadius: isConfirmPasswordFocused ? 3.84 : 2,
                
              }}
                />
            
            


            <TouchableOpacity
                onPress= {registerUser}
            
             style= {{ width: '96%', height: 60, borderRadius: 10, backgroundColor: '#7d4ef3ff',  flexDirection: 'row',alignContent:'center', justifyContent:'center', shadowColor: "#000", marginTop: 20,}}>
               <Image 
                    source={{uri:'https://cdn-icons-png.flaticon.com/128/18356/18356731.png'}}
                    style={{ width: 30, height: 30, alignSelf:'center',  marginRight:5}}
                    resizeMode="contain"
                                
                    />   
                    <Text style= {{ fontSize:19, fontWeight:'bold', color:'#fff', textAlign:'center', marginTop: 20}}>Create Account</Text>
            </TouchableOpacity>                 
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        {error ? <Text style= {{color: 'red'}}></Text>: null}
    
    </View>

       
  );
};
export default Create_account_Screen;