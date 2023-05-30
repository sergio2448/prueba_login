import React, {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    console.log(phoneNumber)
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation pilas pues', confirmation)
    if (confirmation) {
      setConfirm(confirmation);
    } else {
      console.log('no hay confimation')
    }
  }

  async function confirmCode() {
    try {
      if (confirm) {
        const confirmationCode = await confirm.confirm(code);
        console.log('todo okay', confirmationCode)
      }
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+573214459929')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}

export default PhoneSignIn;