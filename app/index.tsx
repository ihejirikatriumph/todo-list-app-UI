import { Text, TextInput, View,  Pressable, Button } from "react-native";
import { useState }  from "react";
import { useRouter } from "expo-router";


// This is the main screen of the JAMB Admission App
// It serves as the entry point for the application
// The app is built using Expo Router for navigation
const Newconst = (FirstName: string,
  LastName: string,
  MiddleName: string
) => {
  return (FirstName + " " + MiddleName + " " + LastName
  );
}
type CatProps = {
  name?: string;
  age?: number;
  
};
const Cat1 = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);
  return (
    <View>
      <Text>
        Hello, I am your Cat {props.name} , and I am {props.age} years old and I am {isHungry ? "hungry" : "full"}!
      </Text>
      <Pressable
        onPress={() => 
          setIsHungry(!isHungry)}>
        
        <Text>{isHungry ? "Pour me some milk, please!" : "Thank you Sir" }
        </Text>
      </Pressable>
      
    </View>
  );
} 

const Translator = () => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{flex:1, justifyContent: 'center'}}> 
    <TextInput
      placeholder="Type in your text  to translate"
      placeholderTextColor="gray"
      onChangeText={newText => setText(newText)}
      defaultValue={text}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style= {{
        height: 40,
        padding: 12,
        marginHorizontal: 8,
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
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && 'kappa').join(' ')}
      </Text>
    </View>
  );
};



const Cat = (props: CatProps) => {
  return (
    <View>
      <Text>Hello, I am your Cat {Newconst('Rum', 'Tugger', 'Tum')} {props.name} </Text>
      <TextInput style={{
        height:40,
        borderColor: 'gray',
        borderWidth: 1,
      }}
      defaultValue="Name me!"/>
    </View>
  );
}
 export default function HomeScreen() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24}}>JAMB Admission App is ready.</Text>
      <Button  
       title= "Go to Details"
       onPress= {() => router.push("/details")}
        />
      <Cat1 name="MARU" age={3}
       />
      <Cat1 name="Habu" />
      <Cat1 name="Jay"/>
      <Cat1 name="Kay"/>
      
      
        
    </View>
  );
}
