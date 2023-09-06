import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Clipboard from 'expo-clipboard';
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
    const [textTop, setTextTop] = useState('Scannez votre carte');
    const [codeUser, setCodeUser] = useState('')

    const [log, setLog] = useState("");

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
            // alert(`QRCode : \n` + `${data}`);
            setRes(data)
            try {
                login(JSON.parse(data))
                alert('Vous êtes connecté')
                setTextTop('Scanner un livre')
            } catch (error) {
                // console.log(error)
                alert(`Le QRCode est invalide`)
            }
        } else {
            setScanned(true);
                AsyncStorage.getItem('userInfo', (err, result) => {
                console.log(result);
                setCodeUser(JSON.parse(`{"user_id":"${result}"}`))
            })
            try {
                axios.put(`${BASE_URL}/borrow/${data}`, codeUser)
                    .then(res => {
                        let livreInfo = res.data;
                        console.log('then', livreInfo);
                        alert("Le livre à bien etait emprunté")
                    })
                    .catch(error => {
                        console.log(`emprunt error : ${error}`);
                        alert(`Une erreur est survenue, veuillez réessayer ultérieurement`)
                        // AsyncStorage.getItem('userInfo', (err, result) => {
                        //     console.log(result, error);
                        //   })

                    })
            } catch (error) {
                console.log(error)
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

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(Res);
    };

    if (failLog && failCheck) {
        alert(`Une erreur s'est produite, veuillez réessayer ultérieurement`)
        setFailCheck(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{textTop}</Text>

            <View style={styles.conn}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 800, width: 800 }}
                />
            </View>

            {/* <View style={styles.Btn}>
                <Text style={styles.textRes} id="copy">{Res}</Text>
            </View> */}

            {scanned && <TouchableOpacity style={styles.appButtonContainer} onPress={() => setScanned(false) + setRes()}>
                <Text style={styles.appButtonText}>Scanner à nouveau</Text>
            </TouchableOpacity>}

            {/* {scanned && 
                <TouchableOpacity style={styles.appButtonContainer} onPress={copyToClipboard}>
                    <Text style={styles.appButtonText}>Copier le texte</Text>
                </TouchableOpacity>
            } */}

            <Link to={'/'}><Text style={styles.text}>Retour</Text></Link>

        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A6A6A6',
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        margin: 0,
    },
    text: {
        marginTop: "6%",
        marginBottom: "3%",
        fontSize: 40,
        color: "#003147",
        fontWeight: "bold",
    },
    textRes: {
        marginTop: "3%",
        fontSize: 20,
        color: "#003147",
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