import {View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


const DetailsScreen = () => {
    const router = useRouter();
  return (
    <View style={{flex:1, paddingHorizontal:0, paddingVertical: 0, backgroundColor:'#7d4ef3ff', alignContent:'center', justifyContent:'center'}}>
        <View style= {{ flex:1, padding:16,  borderRadius: 20, backgroundColor:'#fff', alignContent:'center', justifyContent:'center'}}> 
            <View style= {{ alignContent:'center', justifyContent:'center',height: 150, width: 150, backgroundColor:'#7d4ef3ff', alignSelf:'center', borderRadius: 40, shadowColor: "#000",margin: 50}}>
                <Image 
                    source={{uri:'https://img.freepik.com/premium-vector/paper-clipper-pencil_451797-75.jpg'}}
                    style={{ width: 110, height: 110, alignSelf:'center', margin:50, borderRadius: 40}}
                    
                />
            </View>
            <Text style={{ fontSize:37, fontWeight:'bold', color:'#020202', textAlign:'center'}}> TaskFlow</Text>
            <Text style={{ fontSize:23, fontWeight:'light', color:'#837f7ffc', textAlign:'center', marginTop:25, marginBottom:35}}> Organize your life, one task at a time. Stay productive and never miss a deadline.</Text>
                <TouchableOpacity
                    onPress= {() => router.push("/Create account")} 
                style= {{marginTop: 50, width: '100%', height: '9%', borderRadius: 10, backgroundColor: '#7d4ef3ff',  flexDirection: 'row',alignContent:'center', justifyContent:'center', shadowColor: "#000",}}>
                    <Image 
                    source={{uri:'https://upload.wikimedia.org/wikipedia/commons/3/33/Cartoon_space_rocket.png'}}
                    style={{ width: 30, height: 30, alignSelf:'center',  marginRight:5}}
                    resizeMode="contain"
                    
                />   
                    <Text style= {{ fontSize:19, fontWeight:'bold', color:'#fff', textAlign:'center', marginTop: 25}}> Get Started </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 onPress= {() => router.push("/signin")}
                style= {{marginTop: 20, width: '100%', height: '9%', borderRadius: 10, backgroundColor: '#fff', borderWidth: 2, borderColor:'#7d4ef3ff', alignContent:'center', justifyContent:'center', shadowColor: "#000", flexDirection: 'row'}}
                       >
                    <Image 
                    source={{uri:'https://media.istockphoto.com/id/1328395217/vector/clapping-hands-emoji-icon.jpg?s=612x612&w=0&k=20&c=V2sNrd_vqfO_cv9h199RF1SmbgXE_wxBN0b9p0pPhGA='}}
                    style={{ width: 30, height: 30, alignSelf:'center',  marginRight:5}}
                    resizeMode="contain"
                     />   
                    <Text style= {{ fontSize:19, fontWeight:'bold', color:'#7d4ef3ff', textAlign:'center', marginTop: 25}}> I already have an account </Text>
                </TouchableOpacity>
                 
               
                
                 
            
        </View>

    </View>
  );
}
export default DetailsScreen;