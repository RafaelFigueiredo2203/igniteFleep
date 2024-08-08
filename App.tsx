import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { AppProvider, UserProvider } from '@realm/react';
import { StatusBar } from 'react-native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import './src/libs/dayjs';

import theme from './src/theme';

import { REALM_APP_ID } from '@env';

import { RealmProvider, SyncConfig } from './src/libs/realm';
import { Routes } from './src/routes';

import { useNetInfo } from '@react-native-community/netinfo';
import { WifiSlash } from 'phosphor-react-native';
import { Loading } from './src/components/Loading';
import { TopMessage } from './src/components/TopMessage';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  const netInfo = useNetInfo()

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if(!fontsLoaded) {
    return ( 
      <Loading />
    )
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}> 
      <SafeAreaProvider style={{ backgroundColor: theme.COLORS.GRAY_800 }}>
       {
        !netInfo.isConnected && 
        <TopMessage
        title='Você esta offline'
        icon={WifiSlash}
        />
       }
          <StatusBar 
            barStyle="light-content" 
            backgroundColor="transparent" 
            translucent 
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider sync={SyncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
    
  );
}


