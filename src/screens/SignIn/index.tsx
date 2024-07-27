import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Realm, useApp } from '@realm/react';
import { useState } from 'react';
import { Alert } from 'react-native';
import backIMG from '../../assets/background.png';
import { Button } from '../../components/button';
import { Container, Slogan, Title } from './styles';

GoogleSignin.configure({
  scopes:['email', 'profile'],
  webClientId:WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  
})

export function SignIn() {

  const [isAuthenticating , setIsAuthenticating] = useState(false)
  const app = useApp()

  async function handleGoogleSignin(){
    try {
      setIsAuthenticating(true)

      const {idToken} = await GoogleSignin.signIn()
      
      if(idToken){
        const credentials = Realm.Credentials.jwt(idToken)

        await app.login(credentials)
      }else{
        Alert.alert("Entrar", "Você precisa permitir o acesso ao seu Google")
        setIsAuthenticating(false)
        return
      }

    } catch (error) {
      console.log(error)
      setIsAuthenticating(false)
      Alert.alert("Entrar", "Não foi possível conectar-se a sua conta ")
    }
  }

  return (
    <Container source={backIMG}>
      <Title>Ignite Fleet </Title>

      <Slogan>
        Gestão de veículos
      </Slogan>

      <Button title="Entrar com o google" isLoading={isAuthenticating} onPress={handleGoogleSignin}/>
    </Container>
  );
}


