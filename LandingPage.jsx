import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Custom Runner Logo Component
const RunnerLogo = ({ size = 80 }) => (
  <View style={[styles.logoContainer, { width: size, height: size }]}>
    <View style={styles.hexagon}>
      <View style={styles.hexagonInner}>
        <Text style={styles.runnerIcon}>🏃‍♂️</Text>
      </View>
    </View>
  </View>
);

// Social Media Icon Component
const SocialIcon = ({ type }) => (
  <TouchableOpacity style={styles.socialIcon}>
    <View style={styles.socialIconInner}>
      <Text style={styles.socialIconText}>
        {type === 'facebook' ? 'f' : type === 'google' ? 'G' : 'T'}
      </Text>
    </View>
  </TouchableOpacity>
);

const ZoneWarsLanding = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome' or 'signup'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const WelcomeScreen = () => (
    <View style={styles.welcomeContainer}>
      <View style={styles.logoSection}>
        <RunnerLogo size={120} />
        <Text style={styles.appTitle}>ZONE WARS</Text>
        <Text style={styles.tagline}>RUN. CONQUER. DOMINATE.</Text>
      </View>
      
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setCurrentScreen('signup')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const SignUpScreen = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.signupContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoSection}>
          <RunnerLogo size={80} />
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor="#66ff99"
              value={formData.username}
              onChangeText={(text) => handleInputChange('username', text)}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📧</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="#66ff99"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#66ff99"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
            />
            <TouchableOpacity style={styles.passwordToggle}>
              <Text style={styles.passwordToggleText}>👁️</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleInputChange('agreeTerms', !formData.agreeTerms)}
          >
            <View style={[styles.checkbox, formData.agreeTerms && styles.checkboxChecked]}>
              {formData.agreeTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
          <Text style={styles.socialText}>Log in with your social media account</Text>
          
          <View style={styles.socialContainer}>
            <SocialIcon type="facebook" />
            <SocialIcon type="google" />
            <SocialIcon type="twitter" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a1a1a" />
      <View style={styles.gradient}>
        {currentScreen === 'welcome' ? <WelcomeScreen /> : <SignUpScreen />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1a1a',
  },
  gradient: {
    flex: 1,
    backgroundColor: '#0a1a1a',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  signupContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  hexagon: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#00ff88',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '0deg' }],
  },
  hexagonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  runnerIcon: {
    fontSize: 30,
    color: '#00ff88',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ff88',
    letterSpacing: 3,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 14,
    color: '#66ff99',
    letterSpacing: 2,
    opacity: 0.8,
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
  },
  formSection: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#00ff88',
  },
  inputIcon: {
    marginRight: 15,
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    color: '#00ff88',
    fontSize: 16,
  },
  passwordToggle: {
    padding: 5,
  },
  passwordToggleText: {
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#00ff88',
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#00ff88',
  },
  checkmark: {
    color: '#0a1a1a',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    color: '#66ff99',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#00ff88',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#0a1a1a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#66ff99',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  socialText: {
    color: '#66ff99',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00ff88',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconText: {
    color: '#00ff88',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ZoneWarsLanding;
