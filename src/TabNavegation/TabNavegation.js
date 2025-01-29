import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Para los íconos de la barra de navegación
import { HomeScreen } from "./Home_Setting/HomeScreen";
import { SettingScreen } from "./Home_Setting/SettingScreen";

export function TabNavegation() {
    const Tab = createBottomTabNavigator();
    

    return (
        <Tab.Navigator screenOptions= {({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size}) => {
                    let iconName;
                    if (route.name === "Publicaciones") {
                        iconName = focused ? "home" : "home";
                    } else if (route.name === "Añadir") {
                        iconName = focused ? "add-circle" : "add-circle";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#9fc63b',
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: "#23272a", // Estilo del fondo de la barra
                },
            })}
            >
            <Tab.Screen name="Publicaciones" component={HomeScreen}/>
            <Tab.Screen name="Añadir" component={SettingScreen}/>
        </Tab.Navigator>    
    )
}