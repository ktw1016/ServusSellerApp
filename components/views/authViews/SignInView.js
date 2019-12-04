import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      // continue with password (sign in)
      <ImageBackground
      source={require("../../../image/back.jpg")}
      style={st.authContainer}
    >
      <View style={st.logoContainer}>
        <Image
          source={require("../../../image/React.js_logo-512.png")}
          style={st.logo}
        />
        <Text style={st.servus}>Welcome back, {this.props.firstName}!</Text>
      </View>
      <Text style={st.heading2}> To continue, please verify it's you </Text>

      <View style={st.inputContainer}>
        <Icon
          name={"lock-outline"}
          size={28}
          color={"rgba(255,255,255,0.7)"}
          style={st.inputIcon}
        />
        <TextInput
          style={st.input}
          type="text"
          placeholder="Password"
          placeholderTextColor={"rgba(255,255,255,0.7)"}
          onChangeText={text => this.setState({ password: text })}
          underlineColorAndroid="transparent"
          secureTextEntry={this.props.showPass}
        />
        <TouchableOpacity
          style={st.btnEye}
          onPress={this.props.showPass}
        >
          <Icon
            name={this.props.press == false ? "eye" : "eye-off"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={st.btn} onPress={() => this.props.signIn(this.state.password)}>
        <Text style={st.btnText}>LOGIN</Text>
      </TouchableOpacity>
    </ImageBackground>
    );
  }
}

const st = require("../../../styles/style.js");
export default SignIn;
