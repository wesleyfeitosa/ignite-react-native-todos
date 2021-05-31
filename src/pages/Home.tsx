import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';
import { light, dark } from '../styles/colors';
interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface ThemeColorsProps {
  themeColors: {
    background: string;
    header: string;
    backgroundInput: string;
    text: string;
    textTask: string;
    textTaskDone: string;
    submitButton: string;
    marker: string;
    markerDone: string;
    taskDoneBackground: string;
  }
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [themeColors, setThemeColors] = useState(light);

  function changeTheme() {
    setIsDark(oldState => !oldState);
  }

  useEffect(() => {
    if (isDark) {
      setThemeColors(dark);
    } else {
      setThemeColors(light);
    }
  }, [isDark]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle) {
      setTasks(oldState => [...oldState, {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }])
    }
  }

  function handleMarkTaskAsDone(id: number) {
    setTasks(oldState => oldState.map(task => task.id === id ? {...task, done: !task.done} : task)); 
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(task => task.id !== id));
  }

  return (
    <View style={{flex: 1, backgroundColor: themeColors.background}}>
      <Header themeColors={themeColors} isEnabled={isDark} changeTheme={changeTheme} />

      <TodoInput addTask={handleAddTask} themeColors={themeColors} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
        themeColors={themeColors} 
      />
    </View>
  )
}