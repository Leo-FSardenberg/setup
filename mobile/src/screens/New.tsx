import { useState } from "react";
import { View, ScrollView,Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import {Feather} from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays =
 ['Domingo', 
'Segunda-feira',
'Terça-feira',
'Quarta-feira',
'Quinta-feira',
'Sábado'] 

export function New(){
    const [weekDays, setWeekDays] = useState<number[]>([])
    const [title, setTitle] = useState('')


    function handleToggleWeekDay(weekDayIndex: number){
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }
    async function handleCreateNewHabit() {
        try {
            if(!title.trim() || weekDays.length === 0 ){
                Alert.alert('Novo hábito', 'Informe o nome do hábito e/ou a recorrência')
            }

            await api.post('/habits', {title, weekDays})

            setTitle('')
            setWeekDays([])

            Alert.alert('Novo hábito', 'Hábit criado com sucesso')

        } catch (error) {
            console.log(error)
            Alert.alert('ops', 'Não foi possível criar o novo hábito')
        }
    }

    return(
        <View className=" flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            >
             
                <BackButton/>
                <Text className= "mt-6 text-white font-extrabold text-2xl">
                    Criar Hábito
                </Text>
                <Text className= "mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>
                <TextInput
                className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                placeholder="ex: Exercícios"
                placeholderTextColor={colors.zinc[400]}
                onChangeText={setTitle}
                value={title}
                />
                <Text className="font-semibold mt-4 mb-4 text-white text-base">
                    Qual a recorrência?
                </Text>
                {
                    availableWeekDays.map((weekDay, index)=> (
                        <Checkbox 
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={()=> handleToggleWeekDay(index)}
                        />
                    ))
                }
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={handleCreateNewHabit}
                className="w-full h-14 flex-row items-center justify-center rounded-md mt-6 bg-green-600"
                >
                    <Feather
                    name="check"
                    size={20}
                    color= {colors.white}
                    />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}