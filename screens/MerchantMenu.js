import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import db, { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { collection, addDoc,updateDoc ,doc,getDoc} from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import MerchantBottomTabs from "../components/home/MerchantBottomTabs";



const AddMenu = ({navigation}) => {

    const auth = getAuth();
    const [data, setData] = useState({
        restaurantName: '',
        restaurantEmail: '',
        restaurantAddress: '',
        restaurantPostCode: '',
        restaurantPhone: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        admin_authorization: false,
        img: "",
        owner_id : localStorage.getItem('userId'),
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
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch(snapshot.state) {
                    case "paused":
                    console.log(">>>>> Upload is paused");
                    break;
                    case "running":
                    console.log(">>>>> Upload is running");
                    break;
                    default:
                    break;
                }
            }, (error) => {
                console.log(error);
            },
            () => {
                console.log(">>>>>>>>> coming here")
            getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log(">>>>>>>. download URl", downloadURL)
                        setData((prev) => ({ ...prev, img: downloadURL}));
                    })
            }
        );
    };
    file && uploadFile();
    }, [file])

    const restaurantNameInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                restaurantName: val,
                menuItems:{
                    ...menuItems
                },
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                restaurantName: val,
                menuItems:{
                    ...menuItems
                },
                check_textInputChange: false
            });
        }
    }
    const restaurantEmailInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                restaurantEmail: val,
                menuItems:{
                    ...menuItems
                },
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                restaurantEmail: val,
                menuItems:{
                    ...menuItems
                },
                check_textInputChange: false
            });
        }
    }
    const restaurantAddressInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                restaurantAddress: val,
                menuItems:{
                    ...menuItems
                },
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                restaurantAddress: val,
                menuItems:{
                    ...menuItems
                },
                check_textInputChange: false
            });
        }
    }
    const restaurantPostCodeInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                restaurantPostCode: val,
                menuItems:{
                    ...menuItems
                },
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                restaurantPostCode: val,
                menuItems:{
                    ...menuItems
                },
                check_textInputChange: false
            });
        }
    }
    //////////
    // adding items change 
    //////////

    const itemnameInputChange = (text,key) => {
        const _itemnameInputs = [...menuItems];
        _itemnameInputs[key].key = key;
        _itemnameInputs[key].foodName = text;
        setMenuItems(_itemnameInputs);
    }

    const itemdescriptionInputChange = (text,key) => {
        const _itemdescriptionInputs = [...menuItems];
        _itemdescriptionInputs[key].key = key;
        _itemdescriptionInputs[key].foodDescription = text;
        setMenuItems(_itemdescriptionInputs);
    }

    const itemimageInputChange = (text,key) => {
        const _itemimageInputs = [...menuItems];
        _itemimageInputs[key].key = key;
        _itemimageInputs[key].foodImage = text;
        setMenuItems(_itemimageInputs);
    }

    const itempriceInputChange = (text,key) => {
        const _itempriceInputs = [...menuItems];
        _itempriceInputs[key].key = key;
        _itempriceInputs[key].foodPrice = text;
        setMenuItems(_itempriceInputs);
    }
    /////

    const handleSubmit = () => {
                const updatedData = data;
                const collectionRef = collection(db, "restuarants");
                    addDoc(collectionRef, data)
                    .then((res) => {
                        alert("addition of menu succesful");
                        localStorage.setItem('id',res.id);
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
                    localStorage.setItem("res",data.restaurantName);
                    localStorage.setItem("address", data.restaurantAddress);
                    localStorage.setItem("postcode",data.restaurantPostCode);
                    navigation.navigate("MerchantHome");
            }
            const handleSubmitadditem = async() => {
                console.log(">>>>>>> coming here again");
                        console.log(">>>>>>>. data", data);
                        const updatedData = data;
                        const collectionRef = doc(db, "restuarants",localStorage.getItem('id'));
                        const docSnap= await getDoc(collectionRef)
                        const allMenuItems = [...menuItems];
                        console.log(">>>>>>. MmnuItems", allMenuItems);
                        if(docSnap.data().menuItems){
                            Object.keys(docSnap.data().menuItems).map((input, i) => (
                            allMenuItems.push(docSnap.data().menuItems[i])
                            ))
                        }else{
                            docSnap.data().menuItems.map((input, i) => (
                                allMenuItems.push(docSnap.data().menuItems[i])
                            ))
                        }
                            //console.log(">>>>>>. MmnuItems", allMenuItems);
                            //setMenuItems(allMenuItems);
                            //console.log(">>>>>>. MmnuItems", menuItems);
                            updateDoc(collectionRef, {
                                menuItems:allMenuItems
                            })
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
     <View>
         <MerchantBottomTabs navigation={navigation}/>
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Restaurant Menu</Text>
        </View>
         <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
                {localStorage.getItem('res')?(
                    // having the restuarants 
                <>
                 <Text style={styles.text_footer}>Reataurant Name</Text>
            <View style={styles.action}>
            <Text style={styles.text_footer}>{localStorage.getItem('res')}</Text>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Reataurant Email</Text>
            <View style={styles.action}>
            <Text style={styles.text_footer}>{localStorage.getItem('userData')}</Text>
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Reataurant Address</Text>
            <View style={styles.action}>
            <Text style={styles.text_footer}>{localStorage.getItem('address')}</Text>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Reataurant Post Code</Text>
            <View style={styles.action}>
            <Text style={styles.text_footer}>{localStorage.getItem('postcode')}</Text>
            </View>
            <View style={styles.textPrivate}>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>

            {menuItems.map((input, key) => (
                                // Item part
                <View key={(key+1)} style={styles.AddItemCol}>
                <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10,
            }]}>Food Name</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="pencil"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Name of the Food"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => itemnameInputChange(val,key)}
                />
            </View>

            <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Food Description</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="list"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Description of the Food"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => itemdescriptionInputChange(val,key)}
                />
            </View>
            <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Food Image</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="image"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Image of the Food"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => itemimageInputChange(val,key)}
                />
            </View>
            <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Food Price</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="tag"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Price of the Food"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => itempriceInputChange(val,key)}
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
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => handleSubmitadditem()}
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
            </View>
                </>
                ):(
                // another condition with no restuarant in the account 
                <>
                 <Text style={styles.text_footer}>Reataurant Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="location-arrow"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Restuarant name"
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
                    placeholder="Restuarant email"
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
                    placeholder="Restuarant address"
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
                    placeholder="Restuarant Post Code"
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
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Upload Restaurant Photo</Text>

            <form>
                <input 
                 label="Upload"
                 type="file"
                 onChange={(e) => setFile(e.target.files[0])}
                />
            </form>
                    
            <View style={styles.textPrivate}>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>

            {menuItems.map((input, key) => (
                // Item part
                <View key={(key+1)} style={styles.AddItemCol}>
                <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10,
            }]}>Food Name</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="pencil"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Name of the Food"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => itemnameInputChange(val,key)}
                />
            </View>

            <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Food Description</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="list"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Description of the Food"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => itemdescriptionInputChange(val,key)}
                />
            </View>
            <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Food Image</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="image"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Image of the Food"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => itemimageInputChange(val,key)}
                />
            </View>
            <View style={{ alignSelf: 'center', padding: 12}}>
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Food Price</Text>
            </View>
            <View style={styles.action}>
                <FontAwesome 
                    name="tag"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Price of the Food"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => itempriceInputChange(val,key)}
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
                    }]}>Add new restaurant</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
                </>
                )}
        </Animatable.View>
      </View>
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