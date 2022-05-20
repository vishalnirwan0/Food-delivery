import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    // Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs,addDoc } from "firebase/firestore";
import db from "../firebase";
import { async } from '@firebase/util';

const SignInScreen = ({ navigation }) => {

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleSubmit =() => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(async(res) => {
                console.log(res.user);
                 const q = query(collection(db, "userDetails"), where("email", "==", data.email));
                 localStorage.setItem('userData', res.user.email);
                 localStorage.setItem('userId', res.user.reloadUserInfo.localId)
                 const querySnapshot = await getDocs(q);
                 console.log(querySnapshot);
                 querySnapshot.forEach((doc) => {
                    localStorage.setItem('address', doc.data().address);
                    localStorage.setItem('postcode', doc.data().postCode);
                    localStorage.setItem('name',doc.data().fullName);
                    localStorage.setItem('role',doc.data().role);
                    // if(doc.data().role == 'Admin'){
                    //     localStorage.setItem('isAdmin',true);
                    // }
                  });
                  console.log(localStorage);
                  alert("Sign In Succesful");
                if(localStorage.getItem('role') == "Admin"){
                    window.location.reload();
                    navigation.navigate("Admin");
                }
                else if (localStorage.getItem('role') == "customer"){
                    navigation.navigate("Home");
                    window.location.reload();
                }else if (localStorage.getItem('role') == "owner"){
                    const q1 = query(collection(db, "restuarants"), where("owner_id", "==", res.user.reloadUserInfo.localId));
                    const querySnapshot1 = await getDocs(q1);
                    querySnapshot1.forEach((doc) => {
                        //console.log(doc.id, " => ", doc.data());
                        if(doc.data().restaurantName != null){
                            // console.log(">>>>>>> retaurantName", restaurantName)
                            localStorage.setItem('res', doc.data().restaurantName);
                            localStorage.setItem('address',doc.data().restaurantAddress);
                            localStorage.setItem('postcode',doc.data().restaurantPostCode);
                            localStorage.setItem('id', doc.id);
                        }
                      });
                    navigation.navigate("MerchantHome");
                    window.location.reload();
                }

            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(async(res) => {
                console.log(res.user);
                 
                const q = query(collection(db, "userDetails"), where("email", "==", res.user.email));
                localStorage.setItem('userData', JSON.stringify(res.user.email));
                const docSnap = await getDocs(q)
                console.log(docSnap);
                    docSnap.forEach(async(doc) => {
                        if(doc.data().email==res.user.email){
                            console.log(localStorage);
                            docSnap.forEach((doc) => {
                                localStorage.setItem('address', doc.data().address);
                                localStorage.setItem('postcode', doc.data().postCode);
                                localStorage.setItem('name',doc.data().fullName);
                                localStorage.setItem('role',doc.data().role);
                                localStorage.setItem('userId', res.user.reloadUserInfo.localId)
                             })
                        }else{
                            console.log('here')
                            //localStorage.setItem('userData', JSON.stringify(res.user.email));
                            localStorage.setItem('postcode', 'SO17 2BD');
                            localStorage.setItem('role','customer');
                            localStorage.setItem('userId', res.user.reloadUserInfo.localId)
                            const collectionRef = collection(db, "userDetails");
                            const docRef = await addDoc(collectionRef, {
                                fullName: res.user.email,
                                email: res.user.email,
                                address: '',
                                postCode: 'SO17 2BD',
                                role: 'customer',
                            })
                            
                        }
                     })
                
                alert("Sign In Succesful")
                
                
                // localStoelsrage.setItem('userData', JSON.stringify(res.user.email));
                // localStorage.setItem('postcode', 'SO17 2BD');
                // localStorage.setItem('role','customer');
                // localStorage.setItem('userId', res.user.reloadUserInfo.localId)
                // const collectionRef = collection(db, "userDetails");
                // const docRef = await addDoc(collectionRef, {
                //     fullName: res.user.email,
                //     email: res.user.email,
                //     address: '',
                //     postCode: 'SO17 2BD',
                //     role: 'customer',
                // })
                //console.log(localStorage);
                navigation.navigate("Home");
                window.location.reload();
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
            }]}
        >
            <Text style={[styles.text_footer, {
                // color: colors.text
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
          
            

            <TouchableOpacity onPress={() => handleGoogleSignIn()}>
                <Text style={{color: '#009387', marginTop:15}}>Sign In with Google</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => handleSubmit()}
                >
                <LinearGradient
                    colors={['#000000', '#000000']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#000000',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#000000'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#000000'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });