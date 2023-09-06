import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native'
import { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Clipboard from 'expo-clipboard';
import { Link } from 'react-router-native';
import axios from 'axios';
import { BASE_URL } from '../src/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [Res, setRes] = useState();
    const [point, setPoint] = useState(false);
    const [textTop, setTextTop] = useState('Scannez un point');
    const [pointId, setPointId] = useState('')

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        if (!point) {
            setScanned(true);
            setRes(data)
            try {
                axios.get(`${BASE_URL}/selfservice/${data}`)
                .then(res =>{
                    let pointInfo = res.data;
                    console.log('then', pointInfo)
                    setPoint(true)
                    setTextTop('Scanner le livre à rendre')
                    AsyncStorage.setItem('pointId', data);
                    alert("Point scanné")
                })
                .catch(error => {
                    console.log(`point fail`, error)
                })
            }
            catch (error) {
                console.log(error)
                alert(`est invalide`)
            }
        } else {
            setScanned(true);
                AsyncStorage.getItem('pointId', (err, result) => {
                console.log('result ==',result);
                setPointId(JSON.parse(`{"self_service_id":"${result}"}`))
            })
            try {
                axios.put(`${BASE_URL}/render/${data}`, pointId)
                    .then(res => {
                        let livreInfo = res.data;
                        console.log('then', livreInfo);
                        alert("Livre rendu, merci !")
                    })
                    .catch(error => {
                        console.log(`rendre error : ${error}`);
                        alert(`Une erreur est survenue, veuillez réessayer ultérieurement`)
                        // AsyncStorage.getItem('userInfo', (err, result) => {
                        //     console.log(result, error);
                        //   })

                    })
            } catch (error) {
                console.log(error)
                alert(` invalide`)
            }
        }
    }

    if (hasPermission === null) {
        return <Text>En attente d'accès à la caméra</Text>;
    }
    if (hasPermission === false) {
        return <Text>Impossible d'accéder à la caméra</Text>;
    }

    // const copyToClipboard = async () => {
    //     await Clipboard.setStringAsync(Res);
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{textTop}</Text>

            <View style={styles.conn}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 800, width: 800 }}
                />
            </View>

            <View style={styles.Btn}>
                <Text style={styles.textRes} id="copy">{Res}</Text>
            </View>

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