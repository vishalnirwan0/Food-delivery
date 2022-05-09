import React, { useState } from 'react';
import { 
    View, 
    Text, 
    // Button, 
    TouchableOpacity, 
    // Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, addDoc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import db from "../firebase";


const AddMenu = ({navigation}) => {

    const auth = getAuth();

    const [data, setData] = useState({
        restaurantName: '',
        restaurantEmail: '',
        restaurantAddress: '',
        restaurantPostCode: '',
        // coordinates: {
        //     longitude: '',
        //     latitude: '', 
        // },
        restaurantPhone: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
    const [ menuItems, setMenuItems ] = useState([
        {
            key: '',
            foodName: '',
            foodPrice: '',
            foodDescription: '',
            foodImage: '',
        }
    ]);


    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    //     {label: 'Customer', value: 'customer'},
    //     {label: 'Owner', value: 'owner'}
    // ]);

    const restaurantNameInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                restaurantName: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                restaurantName: val,
                check_textInputChange: false
            });
        }
    }
    const restaurantEmailInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                restaurantEmail: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                restaurantEmail: val,
                check_textInputChange: false
            });
        }
    }
    const restaurantAddressInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                restaurantAddress: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                restaurantAddress: val,
                check_textInputChange: false
            });
        }
    }
    const restaurantPostCodeInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                restaurantPostCode: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                restaurantPostCode: val,
                check_textInputChange: false
            });
        }
    }
    const menuItemFoodName = (val) => {
        setData({
            ...menuItems,
            foodName: val,
            check_textInputChange: true
        });
    }
    // const roleSelectChange = (val) => {
    //     console.log(">>>>>>>>val", val);
    //     setData({
    //         ...data,
    //         role: val.value,
    //         check_textInputChange: true
    //     })
    // }

    // const handlePasswordChange = (val) => {
    //     setData({
    //         ...data,
    //         password: val
    //     });
    // }

    // const handleConfirmPasswordChange = (val) => {
    //     setData({
    //         ...data,
    //         confirm_password: val
    //     });
    // }

    // const updateSecureTextEntry = () => {
    //     setData({
    //         ...data,
    //         secureTextEntry: !data.secureTextEntry
    //     });
    // }

    // const updateConfirmSecureTextEntry = () => {
    //     setData({
    //         ...data,
    //         confirm_secureTextEntry: !data.confirm_secureTextEntry
    //     });
    // }

    const handleSubmit = () => {
        console.log(">>>>>>> coming here");
        // createUserWithEmailAndPassword(auth, data.email, data.password)
        //     .then((res) => {
                console.log(">>>>>>>. data", data);
                const updatedData = data.menuItems;
                console.log(">>>>>> updated Data")
                const collectionRef = collection(db, "menuItems");
                    addDoc(collectionRef, updatedData)
                    .then(() => {
                        alert("addition of menu succesful");

                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            }

    const handleAddMoreMenuItems = () => {
        const allMenuItems = [...menuItems];
	    allMenuItems.push({ key: "", foodName: "", foodPrice: "", foodDescription: "", foodImage: "" });
	    setMenuItems(allMenuItems);
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Restaurant Menu</Text>
        </View>
         <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Reataurant Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Full Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => restaurantNameInputChange(val)}
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
                marginTop: 10
            }]}>Reataurant Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => restaurantEmailInputChange(val)}
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
            
            {menuItems.map((input, key) => (
                <View key={(key+1)} style={styles.AddItemCol}>
                <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10,
            }]}>Food Item Name</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Name of the Food"
                    // value={input.foodName}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => menuItemFoodName(val)}
                />
            </View>

            <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Food Item Description</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Description of the Food"
                    // value={input.foodDescription}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => restaurantEmailInputChange(val)}
                />
            </View>
            <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Food Item Image</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Name of the Food"
                    // value={input.foodImage}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => restaurantEmailInputChange(val)}
                />
            </View>
            <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Food Item Price</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Price of the Food"
                    // value={input.foodName}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => restaurantEmailInputChange(val)}
                />
            </View>
            </View>
            ))}
            <View style={styles.buttonAddItems}>
            <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => handleAddMoreMenuItems()}
                >
                <LinearGradient
                    colors={['#000000', '#000000']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Add Menu Items</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Reataurant Address</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="location-arrow"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => restaurantAddressInputChange(val)}
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
                marginTop: 10
            }]}>Reataurant Post Code</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="location-arrow"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Post Code"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => restaurantPostCodeInputChange(val)}
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

            {/* <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Role</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <DropDownPicker
                    textStyle={styles.text_footer}
                    zIndex={10000}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onSelectItem={(item) => roleSelectChange(item)}
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
                marginTop: 30
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
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

            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
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
            </View> */}

            <View style={styles.textPrivate}>
                {/* <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text> */}
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
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
                    }]}>Update Menu</Text>
                </LinearGradient>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => navigation.navigate("SignInScreen")}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity> */}
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default AddMenu;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#000000'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    footer: {
        flex: 9,
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
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    AddItemCol: {
        flex: 1,
        width: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 1,
        paddingRight: 1,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    buttonAddItems: {
        alignItems: 'center',
        flex: 1,
        width: '25%',
    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15
    },
    color_textPrivate: {
        color: 'grey'
    }
  });