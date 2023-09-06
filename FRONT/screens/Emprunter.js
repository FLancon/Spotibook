import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Link } from 'react-router-native'
import { AuthContext } from '../src/AuthContext'
import { BASE_URL } from '../src/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

    const { login, failLog, logged } = useContext(AuthContext);
    const [failCheck, setFailCheck] = useState(true)
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [Res, setRes] = useState();
    const [textTop, setTextTop] = useState('Scannez votre carte 🪪');
    const [codeUser, setCodeUser] = useState('')

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        if (!logged) {
            setScanned(true);
            setRes(data)
            try {
                login(JSON.parse(data))
                alert(`Hello ${JSON.parse(data).name} !`)
                setTextTop('Scanner un livre 📚')
            } catch (error) {
                alert(`Le QRCode est invalide`)
            }
        } else {
            setScanned(true);
                AsyncStorage.getItem('userInfo', (err, result) => {
                setCodeUser(JSON.parse(`{"user_id":"${result}"}`))
            })
            try {
                axios.put(`${BASE_URL}/borrow/${data}`, codeUser)
                    .then(res => {
                        let livreInfo = res.data;
                        alert(`Le livre ${livreInfo.borrow.title} a bien été emprunté 🎉`)
                    })
                    .catch(error => {
                        alert(`Une erreur est survenue, veuillez réessayer ultérieurement`)
                    })
            } catch (error) {
                alert(`Livre invalide`)
            }
        }

    };

    if (hasPermission === null) {
        return <Text>En attente d'accès à la caméra</Text>;
    }
    if (hasPermission === false) {
        return <Text>Impossible d'accéder à la caméra</Text>;
    }

    if (failLog && failCheck) {
        alert(`Une erreur s'est produite, veuillez réessayer ultérieurement`)
        setFailCheck(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{textTop}</Text>

            <View style={styles.conn}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 800, width: 800 }}
                />
            </View>

            {scanned && <TouchableOpacity style={styles.appButtonContainer} onPress={() => setScanned(false) + setRes()}>
                <Text style={styles.appButtonText}>Scanner à nouveau</Text>
            </TouchableOpacity>}

            <Link to={'/'}><Text style={styles.text}>Retour</Text></Link>

        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5192c5',
        flex: 1,
        alignItems: 'center',
        margin: 0,
    },
    text: {
        marginTop: "6%",
        marginBottom: "3%",
        fontSize: 30,
        color: "#ffffff",
        fontWeight: "bold",
    },
    textRes: {
        marginTop: "3%",
        fontSize: 20,
        color: "#ffffff",
        fontWeight: "bold",
    },
    conn: {
        width: "90%",
        height: 350,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderColor: "#FFF",
        borderWidth: 10,
        overflow: 'hidden'
    },
    appButtonContainer: {
        marginVertical: "5%",
        borderRadius: 50,
        borderColor: "#FFF",
        borderWidth: 5,
        width: "75%",
    },
    appButtonText: {
        marginVertical: "5%",
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});