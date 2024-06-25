import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { auth } from '../Firebase';

const { width, height } = Dimensions.get('window');

const HomePage2 = ({ route, navigation }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 2,
                        duration: 2500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        duration: 2500,
                        useNativeDriver: true,
                    })
                ]),
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 0,
                        useNativeDriver: true,
                    })
                ])
            ]),
            {
                iterations: 2,
            }
        ).start();

        setTimeout(() => {
            navigation.navigate('List');
        }, 4500); 
    };

    const handleChange = () => {
        Animated.sequence([
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
        ]).start(() => {
            rotateAnim.setValue(0);
            navigation.navigate('Home');
        });
    };

    const handleHisto = () => {
        navigation.navigate('History');
    };

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    };

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Image style={styles.logo} source={require('../assets/real_logo2.png')} />
                <Image style={styles.iconProfil} source={require('../assets/icon_profil2.png')} />
            </View>
            <View style={styles.mainContentContainer}>
                <View style={styles.sloganContainer}>
                    <Text style={styles.slogan1}>AIxplorez</Text>
                    <Text style={styles.slogan2}>EN DEHORS DE VOTRE</Text>
                    <Text style={styles.slogan2}>ZONE DE CONFORT !!!</Text>
                </View>
                <View style={styles.logoContainer}>
                    <Pressable onPress={startAnimation}>
                        <Animated.Image source={require('../assets/icon_location2.png')}
                            style={[styles.search,
                                {
                                    transform: [{ scale: scaleAnim }],
                                    opacity: opacityAnim,
                                }]}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.changeContainer}>
                    <Pressable onPress={handleChange}>
                        <Animated.Image style={[styles.change, { transform: [{ rotate: rotation }] }]} source={require('../assets/icon_uzumaki2.png')} />
                    </Pressable>
                </View>
            <View style={styles.botContainer}>
                <Pressable onPress={handleHisto}>
                    <Image style={styles.iconHisto} source={require('../assets/icon_histo2.png')} />
                </Pressable>
                <Pressable onPress={handleHome}>
                    <Image style={styles.iconHome} source={require('../assets/icon_home2.png')} />
                </Pressable>
                <Pressable onPress={handleLogout}>
                    <Image style={styles.iconOut} source={require('../assets/icon_out2.png')} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384454'
    },
    topContainer: {
        width: '100%',
        height: '15%',
        backgroundColor: '#232B35',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: height * -0.07
    },
    logo: {
        width: width * 0.3,
        height: height * 0.08,
        resizeMode: 'contain',
        marginTop: height * 0.075
    },
    iconProfil: {
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: 'contain',
        marginTop: height * 0.075
    },
    mainContentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sloganContainer: {
        marginTop: height * 0.05,
    },
    slogan1: {
        fontSize: 50,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowRadius: 10,
    },
    slogan2: {
        fontSize: 25,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowRadius: 10,
    },
    logoContainer: {
        marginTop: height * -0.25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        width: width * 0.62,
        height: width * 0.85,
        resizeMode: 'contain'
    },
    changeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: height * 0.08,
        bottom: height * 0.12
    },
    change: {
        width: width * 0.16,
        height: width * 0.16,
    },
    botContainer: {
        width: '100%',
        height: height * 0.08,
        backgroundColor: '#232B35',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0
    },
    iconHisto: {
        width: width * 0.12,
        height: width * 0.12,
    },
    iconHome: {
        marginTop: height * 0.005,
        width: width * 0.12,
        height: width * 0.12,
    },
    iconOut: {
        width: width * 0.12,
        height: width * 0.12,
    }
});

export default HomePage2;
