import { View, Text , TextInput, TouchableOpacity, Image , KeyboardAvoidingView} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import api from "./axios"


const SignInScreen = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
      const [isFocused, setIsFocused] = useState(false);
    const [password, setPassword] = useState("");
      const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [error,setError] = useState('');
    const handleSignIn = async () => {
      try {
          const response = await api.post("/login", {
            
              username: username,
              password: password,});
          const { access_token, refresh_token } = response.data;
          globalThis.accessToken = access_token;
          globalThis.refreshToken = refresh_token;

    console.log("Saved Access Token:", globalThis.accessToken);
    console.log("Saved Refresh Token:", globalThis.refreshToken);
          router.push("/Profile");
            } catch(error: any){
              setError( "Error failed:" + error.response.data.detail || JSON.stringify(error.response.data));
              alert("Sign In Failed: " + error.response.data.detail || JSON.stringify(error.response.data));
            }
          };

  return (
    <KeyboardAvoidingView style={{flex:1, backgroundColor: '#7d4ef3ff', padding:0,}}
     behavior="padding">
        <View style= {{ flex:2, padding:16,  borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor:'#7245e3ff', alignContent:'center', justifyContent:'center'}}>
        <Text style={{  fontSize: 37 , fontWeight: 'bold', textAlign:'center', color:'#fff'}}> Welcome Back </Text>
        <Text style={{  fontSize: 22 , fontWeight: 'condensedBold', textAlign:'center', color:'#fff', marginTop: 20}}> Sign in to continue your productivity journey </Text>
        </View>

        <View style= {{flex: 5, padding: 20, backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#000', marginTop: 20}}>Username</Text>
        <TextInput
              placeholder="Enter your Username"
              placeholderTextColor="gray"
              onChangeText={newText => setUsername(newText)}
              defaultValue={username}
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
            <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#000', marginTop: 20}}>Password</Text>
        <TextInput
              placeholder="Enter your password"
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
            <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#7d4ef3ff', marginVertical: 40, alignSelf: 'flex-end', marginRight: 15}}>Forgot Password?</Text>
            <TouchableOpacity
            onPress= {handleSignIn}
            
             style= {{ width: '96%', height: 60, borderRadius: 10, backgroundColor: '#7d4ef3ff',  flexDirection: 'row',alignContent:'center', justifyContent:'center', shadowColor: "#000",}}>
               <Image 
                    source={{uri:'https://cdn-icons-png.flaticon.com/512/4208/4208454.png'}}
                    style={{ width: 30, height: 30, alignSelf:'center',  marginRight:0}}
                    resizeMode="contain"
                                
                    />   
                    <Text style= {{ fontSize:19, fontWeight:'bold', color:'#fff', textAlign:'center', marginTop: 20}}> Sign in </Text>
            </TouchableOpacity>                 
        </View>

        <View style= {{ flex:0.5, padding:16,  borderBottomLeftRadius: 0, borderBottomRightRadius: 0, backgroundColor:'#FFF', alignContent:'center', justifyContent:'center', borderTopWidth: 1, borderTopColor: '#ccc', flexDirection:'row'}}>
            <Text style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#837f7ffc', marginTop: 10}}> Don't have an account? </Text>
            <Text
             onPress= {() => router.push("/Create account")}
             style={{  fontSize: 18 , fontWeight: 'bold', textAlign:'center', color:'#7d4ef3ff', marginTop: 10}}> Sign Up </Text>

        </View>
    </KeyboardAvoidingView>
  );
};
export default SignInScreen;