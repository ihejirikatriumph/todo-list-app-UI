import {Text, View,ScrollView, Image, TouchableOpacity, TextInput,FlatList, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import {useRouter} from 'expo-router'
import api from './axios'; 



type Task = {
    name: string;
    color: string;

};



const Tasks = ({task, deleteTask}:{task: Task_sr, deleteTask: (id: number) => void}) => {
  const router = useRouter();

    return(
        <View style={{ height: 150, width: "100%", padding:16, paddingVertical: 3, backgroundColor:  "#fff", 
        flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#c7c1c1ff', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{ height:90, width: "70%", backgroundColor:  "#fff", justifyContent: 'center', alignItems:'flex-start', borderRadius: 12,}}>
            <Text style={{ fontSize: 28, color: '#000', fontWeight:'900',  marginBottom: 5,}}>
                 {task.task_name}
            </Text>
            <Text style={{ fontSize: 18, color: 'gray' ,fontWeight:'800'}}>
  {task.description}
            </Text>
            <Text style={{ fontSize: 18, color: '#b189f7ff' ,fontWeight:'600', marginTop: 2}}>
  {task.status}</Text>
            </View>
            <TouchableOpacity
            onPress={() => router.push({pathname: '/EditTask', params: { todo_id: task.todo_id, task_name: task.task_name, description: task.description, status: task.status}})}
            style={{  gap: 12, marginLeft: "auto", height: 50, width: 50, backgroundColor:'#f0e4c7ff', justifyContent: 'center', alignItems:'center', borderRadius: 12,}}>
                <Image 
                source={{uri:'https://cdn-icons-png.flaticon.com/128/505/505210.png'}}
                style={{ width: 25, height: 25,}}
                 resizeMode="contain"/>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => Alert.alert(
  "Delete Task",
  "Are you sure you want to delete this task?",
  [
    { text: "Cancel", style: "cancel" },
    { text: "Yes", onPress: () => deleteTask(task.todo_id) }
  ]
)}
            style={{ marginLeft: 10, height: 50, width: 50, backgroundColor:'#f3d4d4ff', justifyContent: 'center', alignItems:'center', borderRadius: 12,}}>
                <Image 
                source={{uri:'https://cdn-icons-png.flaticon.com/128/7491/7491835.png'}}
                style={{ width: 25, height: 25, }}
                 resizeMode="contain"/>
            </TouchableOpacity>

        </View>

    );
};

interface Task_sr{
               todo_id: number;
               task_name: string;
               description: string;
               status: string
    }
type UserData = {
    number_of_tasks: number;
};

type completeta = {
    number_of_completed_tasks: number;
};
const Pending_Tasks = () => {
    const router = useRouter();
        const [text, setText] = useState("");
        const [isFocused, setIsFocused] = useState(false);
        const [tasks, setTasks] = useState<Task_sr[]>([]);
        const [tasknos, setTasknos] = useState<UserData | null>(null);
        const [completetasknos, setCompletetasknos] = useState<completeta | null>(null);
        const [searchQuery, setSearchQuery] = useState("");

        useEffect(() => {
        fetchTaskData();
    }, []);

    
  const fetchTaskData = async () => {
    try {
      const response = await api.get("/Pending- Tasks");
      console.log("Tasks data:", response.data);
      const taskArray = response.data.Pending_Tasks ?? [];
      setTasks(taskArray);
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
    }}

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
  const deleteTask = async (todo_id: number) => {
    try {
      await api.delete(`/Delete-func/${todo_id}`);
      // Refresh the task list after deletion
      fetchTaskData();
      fetchtasknos();
      fetchcompletetasknos();
    } catch (error) {
      console.error("Error deleting task:", error);
    }};
    const filteredTasks = tasks.filter(task =>
  task.task_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  task.description.toLowerCase().includes(searchQuery.toLowerCase())
);
    return(
        <View style= {{ flex:1, padding:0, backgroundColor:'#7d4ef3ff'}}>
            <View style= {{ flex:1.5, padding:16,  borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor:'#7d5ef3ff', alignContent:'center', justifyContent:'center'}}>
                <Text style={{ fontSize: 39, fontWeight: 'bold', color:'#fff', textAlign:'center', marginTop: 'auto'}}> Pending Tasks </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color:'#fff', textAlign:'center', marginVertical:10}}> Stay organized, get things done </Text>
                
                
            
            </View>

            <View style= {{ flex:5,  backgroundColor:'#fff',}}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 22, borderBottomWidth:1, borderBottomColor:'#c7c1c1ff', backgroundColor:'#f2eff7ff'}}>
                    
                    <TextInput
              placeholder="Search for a  task..."
              placeholderTextColor="gray"
              onChangeText={(newText) => setSearchQuery(newText)}
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style= {{
                height: 69,
                width: '76%',
                padding: 12,
                marginVertical: 8,
                fontSize:18,
                fontStyle:'normal',
                fontWeight:'semibold',
                backgroundColor:'#fff',
                borderWidth: 2,
                borderRadius: 12,
                borderColor:  isFocused? "#007aFF": '#c7c1c1ff',
                shadowColor: isFocused ? "#007aFF" : "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: isFocused ? 0.25 : 0.1,
                shadowRadius: isFocused ? 3.84 : 2,
                
              }}
                />
                    <TouchableOpacity
                        onPress={() => {router.push("/AddnewTask")}}
                     style={{ width: 69, height: 69, backgroundColor: '#7d4ef3ff', borderRadius: 12, justifyContent:'center', alignItems:'center', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, marginLeft: 'auto'}}>
                        <Image 
                            source={{uri:'https://cdn-icons-png.flaticon.com/512/992/992651.png'}}
                            style={{ width: 30, height: 30, tintColor:'#fff'}}
                             resizeMode="contain"               
                            />
                    </TouchableOpacity>

                </View>
                <FlatList style={{ flex:1, padding:0, backgroundColor:'#fff'}}
                    contentContainerStyle={{  }}
                    data={filteredTasks}
                    keyExtractor={(item) => item.todo_id.toString()}
                    renderItem={({item}) => <Tasks task={item}  deleteTask={deleteTask}/>}
                    ListEmptyComponent={() => (
    <View style={{flex:1, padding: 5, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 28, color: 'gray'}}>
        No Pending Task Yet!</Text>
        <Image
                style={{ width: 160, height: 160,}}
                source={{uri:'https://cdn-icons-png.flaticon.com/128/7465/7465563.png'}}
                resizeMode="contain"/>
    </View>)}
                
                />
            </View>

            <View style= {{ flex:.5, padding:16,  borderBottomRightRadius: 20, borderBottomLeftRadius: 20, backgroundColor:'#fff', alignItems:'center', justifyContent:'flex-start', flexDirection: "row"}}>
                <Text style={{ fontSize: 19, fontWeight: '500', color:'#6e6a6aff', textAlign:'center'}}> {tasknos?.number_of_tasks} tasks, {completetasknos?.number_of_completed_tasks} completed </Text>
                <Image
                style={{ width: 30, height: 30, marginLeft: 'auto',}}
                source={{uri:'https://cdn-icons-png.flaticon.com/128/14669/14669075.png'}}
                resizeMode="contain"/>
                <Text 
                onPress={() => router.push("/Profile")}
                style={{ fontSize: 19, fontWeight: '500', color:'#6e6a6aff', textAlign:'center', }}> Todo App </Text>
                


                
            </View>

        </View>

    );
};
export default Pending_Tasks;