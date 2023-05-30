
import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import PhoneSignIn from '../components/LoginPhone';

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <PhoneSignIn />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 60,
  },
});