import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Mock walking data
const walkingData = [
  { day: 'Day 1', distance: '2.5 km' },
  { day: 'Day 2', distance: '3.2 km' },
  { day: 'Day 3', distance: '1.8 km' },
  { day: 'Day 4', distance: '4.1 km' },
  { day: 'Day 5', distance: '2.9 km' },
  { day: 'Day 6', distance: '3.7 km' },
  { day: 'Day 7', distance: '2.3 km' },
];

// Hamburger Menu Component
const HamburgerMenu = () => (
  <TouchableOpacity style={styles.hamburgerButton}>
    <View style={styles.hamburgerLine} />
    <View style={styles.hamburgerLine} />
    <View style={styles.hamburgerLine} />
  </TouchableOpacity>
);

// Balance Button Component
const BalanceButton = () => (
  <TouchableOpacity style={styles.balanceButton}>
    <Text style={styles.balanceText}>BALANCE</Text>
  </TouchableOpacity>
);

// Map Component (Simulated)
const MapView = () => (
  <View style={styles.mapContainer}>
    <View style={styles.mapContent}>
      {/* Simulated map lines */}
      <View style={[styles.mapLine, { top: 20, left: 30, width: 80, transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.mapLine, { top: 60, left: 100, width: 120, transform: [{ rotate: '-30deg' }] }]} />
      <View style={[styles.mapLine, { top: 100, left: 20, width: 100, transform: [{ rotate: '60deg' }] }]} />
      <View style={[styles.mapLine, { top: 140, left: 150, width: 90, transform: [{ rotate: '15deg' }] }]} />
      <View style={[styles.mapLine, { top: 180, left: 40, width: 110, transform: [{ rotate: '-45deg' }] }]} />
      <View style={[styles.mapLine, { top: 220, left: 120, width: 80, transform: [{ rotate: '30deg' }] }]} />
      <View style={[styles.mapLine, { top: 260, left: 60, width: 130, transform: [{ rotate: '-60deg' }] }]} />
      <View style={[styles.mapLine, { top: 300, left: 170, width: 70, transform: [{ rotate: '75deg' }] }]} />
      
      {/* Location marker */}
      <View style={styles.locationMarker}>
        <View style={styles.locationPin} />
      </View>
    </View>
  </View>
);

// Distance Badge Component
const DistanceBadge = () => (
  <View style={styles.distanceBadge}>
    <Text style={styles.distanceText}>— m</Text>
  </View>
);

// Walking History Row Component
const WalkingRow = ({ day, distance, isLast }) => (
  <View style={[styles.walkingRow, !isLast && styles.walkingRowBorder]}>
    <Text style={styles.walkingDay}>{day}</Text>
    <Text style={styles.walkingDistance}>{distance}</Text>
  </View>
);

const ZoneWarsAreaWalked = () => {
  const [currentPage, setCurrentPage] = useState(0); // 0 = My Area, 1 = Walked
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 20 && Math.abs(gestureState.dx) < 100;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy < 0 && currentPage === 0) {
        // Scrolling up from My Area to Walked
        const progress = Math.min(Math.abs(gestureState.dy) / 200, 1);
        scrollY.setValue(progress * height);
      } else if (gestureState.dy > 0 && currentPage === 1) {
        // Scrolling down from Walked to My Area
        const progress = Math.max(1 - (gestureState.dy / 200), 0);
        scrollY.setValue(progress * height);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy < -100 && currentPage === 0) {
        // Switch to Walked page
        setCurrentPage(1);
        Animated.timing(scrollY, {
          toValue: height,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dy > 100 && currentPage === 1) {
        // Switch to My Area page
        setCurrentPage(0);
        Animated.timing(scrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        // Return to current page
        Animated.timing(scrollY, {
          toValue: currentPage * height,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const MyAreaPage = () => (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <HamburgerMenu />
        <Text style={styles.pageTitle}>MY AREA</Text>
        <BalanceButton />
      </View>
      
      <View style={styles.mapSection}>
        <MapView />
        <DistanceBadge />
      </View>
      
      <View style={styles.scrollHint}>
        <Text style={styles.scrollHintText}>↑ Scroll up for walking history</Text>
      </View>
    </View>
  );

  const WalkedPage = () => (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <HamburgerMenu />
        <Text style={styles.pageTitle}>WALKED</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.walkingSection}>
        <View style={styles.walkingHeader}>
          <Text style={styles.walkingHeaderText}>Day</Text>
          <Text style={styles.walkingHeaderText}>Distance</Text>
        </View>
        
        <ScrollView style={styles.walkingList} showsVerticalScrollIndicator={false}>
          {walkingData.map((item, index) => (
            <WalkingRow 
              key={index}
              day={item.day}
              distance={item.distance}
              isLast={index === walkingData.length - 1}
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.scrollHint}>
        <Text style={styles.scrollHintText}>↓ Scroll down for map</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a1a1a" />
      <View style={styles.mainContainer} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.pagesContainer,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, height],
                    outputRange: [0, -height],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <MyAreaPage />
          <WalkedPage />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1a1a',
  },
  mainContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  pagesContainer: {
    height: height * 2,
  },
  pageContainer: {
    height: height,
    backgroundColor: '#0a1a1a',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  hamburgerButton: {
    width: 30,
    height: 30,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  hamburgerLine: {
    width: 25,
    height: 3,
    backgroundColor: '#00ff88',
    borderRadius: 2,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff88',
    letterSpacing: 2,
  },
  balanceButton: {
    borderWidth: 2,
    borderColor: '#00ff88',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  balanceText: {
    color: '#00ff88',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  placeholder: {
    width: 80,
    height: 35,
  },
  mapSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    width: width - 60,
    height: width - 60,
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00ff88',
    overflow: 'hidden',
    position: 'relative',
  },
  mapContent: {
    flex: 1,
    position: 'relative',
  },
  mapLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'rgba(0, 255, 136, 0.3)',
    borderRadius: 1,
  },
  locationMarker: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    left: '50%',
    marginLeft: -10,
  },
  locationPin: {
    width: 20,
    height: 20,
    backgroundColor: '#00ff88',
    borderRadius: 10,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
  distanceBadge: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#00ff88',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
  },
  distanceText: {
    color: '#00ff88',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  walkingSection: {
    flex: 1,
    paddingTop: 20,
  },
  walkingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#00ff88',
    marginBottom: 20,
  },
  walkingHeaderText: {
    color: '#00ff88',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  walkingList: {
    flex: 1,
  },
  walkingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  walkingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 255, 136, 0.3)',
  },
  walkingDay: {
    color: '#00ff88',
    fontSize: 16,
    fontWeight: '500',
  },
  walkingDistance: {
    color: '#00ff88',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollHint: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  scrollHintText: {
    color: 'rgba(0, 255, 136, 0.6)',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default ZoneWarsAreaWalked;
