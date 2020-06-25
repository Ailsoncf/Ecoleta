import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, Image, Text, ImageBackground, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import RNPickerSelect from 'react-native-picker-select'

import {styles, PickerStyle} from './styles'


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
    if (selectedUF !== '0' && selectedCity !== '0') 
      navigation.navigate('Points', {
        selectedUF,
        selectedCity
      })
    else
      Alert.alert('Oooops...', 'Você precisa selecionar uma UF e uma cidade.')
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

export default Home