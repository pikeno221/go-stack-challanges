import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';


import api from './services/api';


export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projecto ${Date.now()}`,
            owner: 'gabs'
        });

        setProjects([...projects, response.data]);

    }

    return (
        <>
            <StatusBar barStyle="light-content" />

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>{project.title}</Text>
                    )}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddProject}>
                    <Text style={styles.buttonText}>Clique aqui</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>

    );
    {/*
            <View style={styles.container}>
                {projects.map(project =>(
                     <Text style={styles.project} key={project.id}>{project.title}</Text>
                     ))}
            </View>
            */}


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center',
    },

    project: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: 'bold',
    },

    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        width: 300,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }

});

