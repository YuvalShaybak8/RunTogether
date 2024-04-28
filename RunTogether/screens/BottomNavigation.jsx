// import React from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import { Feather } from "@expo/vector-icons";

// const [showMenu, setShowMenu] = useState(false);

// const BottomNavigation = ({ activeScreen, navigation }) => {
//   const goToHomeScreen = () => {
//     navigation.navigate('Home');
//   }

//   const goToPostScreen = () => {
//     navigation.navigate('Create Post');
//   }

//   const goToProfileScreen = () => {
//     navigation.navigate('Profile Details');
//   }

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
// };

//   return (
//     <View style={styles.bottomNavigation}>
//       <TouchableOpacity onPress={goToHomeScreen}>
//         <View style={[styles.icon, activeScreen === 'Home' && styles.activeIcon]}>
//           <Feather name="home" size={22} color="#F7706EFF" />
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={goToPostScreen}>
//         <View style={[styles.icon, activeScreen === 'Create Post' && styles.activeIcon]}>
//           <Feather name="plus-circle" size={32} color="#F7706EFF" />
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={toggleMenu}>
//         <View style={[styles.icon, activeScreen === 'Menu' && styles.activeIcon]}>
//           <Feather name="menu" size={22} color="#F7706EFF" />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   bottomNavigation: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//   },
//   icon: {
//     opacity: 0.5,
//   },
//   activeIcon: {
//     opacity: 1,
//   },
// });

// export default BottomNavigation;