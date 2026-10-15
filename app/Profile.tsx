import { Text, View, TouchableOpacity, ScrollView, Image,} from 'react-native';
import { router, useRouter } from 'expo-router';
import { useEffect,  useState } from 'react';

import api from './axios';



type EditProfileProps = {
    name?: string;
    imageUri?: string;
    borderno?: number;
    press?: string;

};
type UserData = {
    Full_name: string;
    username: string;
};  


const Profile = (props: EditProfileProps) => {
    
    return (
        <View style={{height: 100 ,  width: '95%',flex:1, padding:5, paddingVertical: 5, backgroundColor:'#fff', flexDirection: 'row', borderBottomWidth: props.borderno, borderBottomColor: '#f9f0f0ff', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View  style={{ width: 40, height: 40,borderRadius: 12,  justifyContent: 'center', alignItems:'center', backgroundColor: '#f9f9e5ff'}}>
            <Image 
                source={{uri: props.imageUri }}
                style={{ width: 24, height: 24,borderRadius: 2}}/>
                </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color:'#000', marginLeft: 15}}>{props.name}</Text>
            <TouchableOpacity 
            onPress={() => router.push(props.press as any)}
            style={{ width: 25, height: 25,borderRadius: 60, marginLeft: 'auto', justifyContent: 'center', alignItems: 'center'}}>
            <Image 
                
                source={{uri:'https://cdn0.iconfinder.com/data/icons/multimedia-solid-30px/30/chevron_right_next_arrow-512.png'}}
                style={{ width: 25, height: 25,borderRadius: 60,}}/>
                </TouchableOpacity>
        </View>
            );
            };


type completeta = {
    number_of_completed_tasks: number;};

type taskta = {
    number_of_tasks: number;};




const Display = () => {
    
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [completetasknos, setCompletetasknos] = useState<completeta | null>(null);
    const [tasknos, setTasknos] = useState<taskta | null>(null);
    const logout = () => {
  try {
    // Clear global tokens
    globalThis.accessToken = null;
    globalThis.refreshToken = null;

    // Also clear axios header if used
    delete api.defaults.headers.common["Authorization"];

    router.replace("/signin");

    alert("You have been logged out successfully.");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await api.get("/User_data");
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
    fetchcompletetasknos();
  }, []);

  const fetchcompletetasknos = async () => {
    try {
      const response = await api.get("/number-of-completed-tasks");
      setCompletetasknos(response.data);
      console.log("Task numbers data:", response.data);

      // 🟩 load data into editable inputs
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

 useEffect(() => {
    fetchtasknos();
  }, []);
const fetchtasknos = async () => {
    try {
      const response = await api.get("/number-of-tasks");
      setTasknos(response.data);
      console.log("Task numbers data:", response.data);

      // 🟩 load data into editable inputs
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


    return (
        <View style={{flex:1, padding:0, backgroundColor:'#7d4ef3ff'}}>
        <View style={{flex:1, padding:0, backgroundColor:'#7d4ef3ff'}}
        
       
        >
            
            <View style={{flex: 1,backgroundColor:'#7d4ef3ff', alignItems: 'center', justifyContent: 'center',}}>
                <View style= {{ alignContent:'center', justifyContent:'center',height: 78, width: 78, backgroundColor:'#fff', alignSelf:'center', borderRadius: 60, shadowColor: "#000",marginVertical: 30, marginTop: 70}}>
                <Image 
                    source={{uri:'https://www.shutterstock.com/shutterstock/videos/1106317659/thumb/8.jpg?ip=x480'}}
                    style={{ width: 75, height: 75, alignSelf:'center', borderRadius: 60}}
                     resizeMode="contain"               
                    />                
                    </View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: -15 , color:'#fff'}}>{user?.Full_name}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color:'#fff', textAlign:'center', marginVertical:5, marginBottom: 30}}>{user?.username}</Text>
            </View>
            </View>
            <ScrollView style ={{flex:4, backgroundColor:'#fff', flexGrow:3}}>
                <View style={{ flex: 1, padding: 9, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity
                 onPress= {() => router.push("/Tasks")}
                 
                
                 style={{ alignSelf: 'flex-start',width: 157, height: 100, padding: 16, borderWidth: 1, borderColor: '#e4cfefbd', borderRadius: 22, margin: 16, justifyContent:'center', alignItems:'center'}}>
                    
                    <Text style={{ fontSize: 35, fontWeight: 'bold', color:'#7d4ef3ff', marginBottom: 4}}>{tasknos?.number_of_tasks}</Text>
                    <Text style={{ fontSize: 14,  fontWeight: 'bold', color:'#aaa'}}>All Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => router.push("/Completed tasks")}
                style={{ alignSelf: 'flex-start',width: 157, height: 100, padding: 16, borderWidth: 1, borderColor: '#e4cfefbd', borderRadius: 22, margin: 16, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ fontSize: 35, fontWeight: 'bold', color:'#7d4ef3ff', marginBottom: 4}}>{completetasknos?.number_of_completed_tasks}</Text>
                    <Text style={{ fontSize: 14,  fontWeight: 'bold', color:'#aaa'}}>Completed Tasks </Text>
                </TouchableOpacity>
                </View>
                <View style={{ flex: 1, padding: 9, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                <Profile name="Edit Profile" imageUri="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" borderno={2} press='/Update_profile'/>
                <Profile name="All Tasks" imageUri="https://cdn-icons-png.flaticon.com/128/839/839860.png"   borderno={2} press='/Tasks'/>
                <Profile name="Completed Tasks" imageUri="https://cdn-icons-png.flaticon.com/128/9918/9918829.png"   borderno={2} press='/Completed tasks'/>
                <Profile name="Pending Tasks" imageUri="https://cdn-icons-png.flaticon.com/128/11830/11830778.png"   borderno={2} press='/PendingTasks'/>
                <Profile name="About Task flow" imageUri="https://cdn-icons-png.flaticon.com/128/75/75340.png"/>

                 <TouchableOpacity
                                onPress= {logout}
                            
                             style= {{ width: '96%', height: 60, borderRadius: 10, backgroundColor: '#eb0d0dff',  flexDirection: 'row',alignContent:'center', justifyContent:'center', shadowColor: "#000", marginTop: 40,}}>
                               <Image 
                                    source={{uri:'https://cdn-icons-png.flaticon.com/128/1864/1864771.png'}}
                                    style={{ width: 20, height: 20, alignSelf:'center',  marginRight:5}}
                                    resizeMode="contain"
                                                
                                    />   
                                    <Text style= {{ fontSize:19, fontWeight:'bold', color:'#fff', textAlign:'center', marginTop: 20, }}>Sign Out</Text>
                            </TouchableOpacity>
                            

                </View>
                </ScrollView>
        </View>
            
            
           
            

    );
};
export default Display;