import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Link } from 'react-router-native'

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>SPOT a book 📚</Text>
            <Text style={styles.smallText}>(c'est SPOT mais pas trop SPOT)</Text>
            <View style={styles.conn}>
                <View style={styles.card}>
                    <Link to={'/emprunter'}><Image style={styles.img} source={require('../assets/worldbook.png')}></Image></Link>
                    <Text style={styles.txt}>Emprunter un livre</Text>
                </View>
                <View style={styles.card}>
                    <Link to={'/rendre'}><Image style={styles.img} source={require('../assets/back.png')}></Image></Link>
                    <Text style={styles.txt}>Rendre un livre</Text>
                </View>
            </View>
            <Text style={styles.textFooter}>Made with ❤️ by Pete</Text>
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
        marginBottom: "3%",
        fontSize: 30,
        color: "#ffffff",
        fontWeight: "bold",
    },
    conn: {
        width: '60%',
        backgroundColor: '#3f3fef',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderColor: "#003147",
        borderWidth: 1,
    },
    card: {
        alignItems: 'center',
        marginVertical: 50,
    },
    img: {
        width: 150,
        height: 150,
    },
    txt: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: "bold",
    },
    textFooter: {
        position: 'absolute',
        bottom: 20,
    },
    smallText: {
        fontSize: 15,
        color: "#ffffff",
        marginBottom: 40,
    }
});