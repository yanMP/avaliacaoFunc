import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const API_URL = 'https://calendarific.com/api/v2/holidays';
const API_KEY = 'NkMEqJftL4xfv8OM5s8nUjb6uZTuJDYx';

const HomeScreen = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}&country=BR&year=2024`);
        if (!response.ok) {
          throw new Error('Erro ao obter os feriados');
        }
        const data = await response.json();
        setHolidays(data.response.holidays);
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feriados de 2024 no Brasil:</Text>
      <ScrollView style={styles.scrollView}>
        {holidays.map(holiday => (
          <View key={holiday.date.iso} style={styles.holidayContainer}>
            <Text style={styles.holidayName}>{holiday.name}</Text>
            <Text>Data: {holiday.date.iso}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  holidayContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  holidayName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeScreen;
