import { Text, View, StyleSheet, Image } from 'react-native'
import { Link } from 'react-router-native'

const Home = () => {



    return (
        <View style={styles.container}>

            <Text style={styles.title}>📚SPOTIBOOK 📚</Text>

            <Text style={styles.text}>Que souhaitez-vous faire ?</Text>
            <View style={styles.conn}>

                <View style={styles.card}>

                    <Link to={'/emprunter'}><Image style={styles.image} source={require('../assets/biblio.png')}></Image></Link>
                    <Text style={styles.txt}>Emprunter un livre 📔</Text>
                </View>
                <View style={styles.card}>
                    <Link to={'/rendre'}><Image style={styles.img} source={require('../assets/back.png')}></Image></Link>
                    <Text style={styles.txt}>Rendre un livre 📥</Text>
                </View>
            </View>

        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECE0BF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    title: {
        marginTop: "1%",
        marginBottom: "3%",
        fontSize: 50,
        color: "#181818",
        fontWeight: "bold",
    },
    text: {
        marginTop: "6%",
        marginBottom: "3%",
        fontSize: 30,
        color: "#2d2d2d",
        fontWeight: "bold",
    },
    conn: {
        width: '90%',
        backgroundColor: '#E6BD57',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderColor: "#181818",
        borderWidth: 1,
    },
    card: {
        alignItems: 'center',
        marginVertical: 25,
    },
    img: {
        width: 350,
        height: 150,
    },
    txt: {
        fontSize: 20,
        color: "#003147",
        fontWeight: "bold",
        marginTop: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 70,
    }
});