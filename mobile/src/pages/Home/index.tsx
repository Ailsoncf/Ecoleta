import React, { useState, useEffect, ChangeEvent } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, Image, StyleSheet, Text, ImageBackground, TextInput, KeyboardAvoidingView, Picker } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import RNPickerSelect from 'react-native-picker-select'


interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {

  const [ufs, setUfs] = useState<string[]>([])
  const [selectedUF, setSelectedUF] = useState('0')
  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState('0')

  const navigation = useNavigation()

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      selectedUF,
      selectedCity
    })
  }

  function handleSelectedUF(value: string) {
    setSelectedUF(value)
  }

  function handleSelectedCity(value: string) {
    setSelectedCity(value)
  }

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla)

        setUfs(ufInitials)
      })
  }, [])


  useEffect(() => {
    if (selectedUF === '0') {
      return
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome)

        setCities(cityNames)
      })

  }, [selectedUF])

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >

        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title} >Seu MarketPlace de Coleta de Resíduos.</Text>
            <Text style={styles.description} >Ajudamos pessoas a encontar pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.footer} >

          <RNPickerSelect
            style={PickerStyle}
            placeholder={{ label: 'Selecione um estado', value: '0' }}
            onValueChange={handleSelectedUF}
            useNativeAndroidPickerStyle={false}
            value={selectedUF}
            items={ufs.map(uf => (
              {
                label: uf,
                value: uf
              }
            ))}
          />

          <RNPickerSelect
            style={PickerStyle}
            placeholder={{ label: 'Selecione uma cidade', value: '0' }}
            onValueChange={handleSelectedCity}
            useNativeAndroidPickerStyle={false}
            value={selectedCity}
            items={cities.map(city => (
              {
                label: city,
                value: city
              }
            ))}
          />

          <RectButton style={styles.button} onPress={handleNavigateToPoints} >
            <View style={styles.buttonIcon} >
              <Text>
                <Icon name='arrow-right' color='#FFF' size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText} > Entrar </Text>
          </RectButton>
        </View>
      </ImageBackground >
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingBottom: 20,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
})

const PickerStyle = StyleSheet.create({
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingBottom: 20,
    paddingHorizontal: 24,
    fontSize: 16,
  }
})

export default Home