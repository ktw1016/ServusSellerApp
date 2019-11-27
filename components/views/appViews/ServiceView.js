import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import StarRating from "react-native-star-rating";
import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

class ServiceView extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log(this.props.ratings);
  }

  getRatings = () => {
    if (this.props.ratings !== null) {
      return (this.props.ratings.map((rating) => {
        return (
          <View style={{ backgroundColor: '#f2f2f2', padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <View style={{ width: 100 }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={rating.rating}
                starSize={16}
                fullStarColor="orange"
                emptyStarColor="orange"
                style={{}}
              />
            </View>
            <Text>{rating.comment}</Text>
          </View>);
      }))
    } else {
      console.log('she null');
      return null;
    }

  }


  render() {
    console.log(this.props);
    if (this.props.ratings !== undefined) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{
            flexDirection: "row",
            padding: 10,
            paddingBottom: 5,
            borderBottomColor: "#dfe6e9",
            borderBottomWidth: 2,
          }}>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                marginLeft: 20,
                paddingBottom: 10
              }}
            >
              <Text style={{ fontSize: 30, color: "#000" }}>
                {this.props.serviceName}
              </Text>
              <Text style={{ fontSize: 15, color: '#7f8c8d' }}>
                {this.props.serviceCategory} Service
                </Text>
              <View style={{ width: 100, paddingTop: 10 }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={4.5}
                  starSize={16}
                  fullStarColor="orange"
                  emptyStarColor="orange"
                  style={{}}
                />
              </View>
            </View>
            <Image
              source={{uri: this.props.sellerPhoto}}
              style={{
                width: 90,
                height: 90,
                borderRadius: 55
              }}
            />
          </View>

          <View style={{ flex:1 }}>
            <View style={{ flex: 1.5, marginLeft: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 22, paddingBottom: 10, fontWeight: 'bold' }}>Details</Text>

              <View style={{ marginLeft: 10, marginBottom: 20 }}>
                {/*               <View style={{marginBottom:10}}>
                <Text style={{marginLeft:5, fontSize:18}}>{this.props.sellerName}</Text>
              </View> */}
                <View style={{}}>
                  <Text style={{ marginLeft: 5, fontSize: 18 }}>{this.props.serviceDescription}</Text>
                </View>
              </View>

              <View style={{ marginLeft: 10, marginRight: 30}}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon2 color='#E88D72' name="map-marker-radius" size={45} />
                    <Text style={{ fontSize: 20 }}>{this.props.city}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon color='#E88D72' name="dollar" size={40} />
                    <Text style={{ fontSize: 20 }}>{this.props.price} / Hr</Text>
                  </View>
                </View>
              </View>


            </View>

            <View style={{ marginLeft: 20, flex: 2 }}>
              <Text style={{ fontSize: 22, paddingBottom: 15, fontWeight: 'bold' }}>Reviews</Text>
              <ScrollView style={{ marginLeft: 10 }}>{this.getRatings()}</ScrollView>
            </View>

          </View>

        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <LottieView style={{ flex: 1 }} source={require('../../../image/loading.json')} autoPlay loop={true} />
        </View>
      )
    }

  }
}

const st = require("./../../../styles/style.js");

export default ServiceView;
