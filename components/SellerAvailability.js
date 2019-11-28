import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Agenda } from 'react-native-calendars';
import Moment from 'moment';
import StarRating from "react-native-star-rating";

const fetch = require("node-fetch");

class SellerAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerId: '',
      shiftInfo: [],
      shiftDays: [],
      availableDates: {},
      serviceInfo: [],
      selectedDay: ''
    }
  };

  componentDidMount() {
    this.loadData();
  }


  loadData = () => {
    AsyncStorage.getItem('userId', (err, result) => {
      fetch(`http://localhost:8080/api/getSellerAvailability?sellerId=${result}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            shiftInfo: responseJson.shiftInfo,
          }, function () {
            if (this.state.shiftInfo) {
              this.setState({ sellerId: result });
              this.state.shiftInfo.map((s) => {
                let day = Moment(s.day).format('YYYY-MM-DD');

                // push all unqiue days that the seller is available to an array
                this.state.shiftDays.indexOf(day) === -1 ? this.state.shiftDays.push(day) : console.log('Day already exists');
              });

              // get all the shifts, for all the unique days
              this.getDailyShifts();

            } else {
              // no availabilities
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  // save the selected day for ScheduleService component
  selectDay = (day) => {
    this.setState({
      selectedDay: day
    })
  }

  addAvailability = () => {
    this.props.navigation.navigate('SetSchedule', {
      onGoBack: () => this.loadData()
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>


        <Agenda
          items={this.state.availableDates}
          loadItemsForMonth={this.getDailyShifts.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyData={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // callback that gets called on day press
          onDayPress={(day) => { this.selectDay(day) }}
          // callback that gets called when day changed while scrolling through agenda
          onDayChange={(day) => { this.selectDay(day) }}
        />

        <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity
            style={st.btn}
            onPress={this.addAvailability}>
            <Text style={st.btnText}>Add Availability</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // TODO: If there is no agenda items for the current day, create an empty one so
  // so that future ones will show up and agenda doesnt get stuck loading

  // set all the items for the Agenda based on the days and shifts on those days
  getDailyShifts() {
    let availableDates = {};
    if (this.state.shiftDays) {
      this.state.shiftDays.forEach((day) => {
        availableDates[day] =
          this.getShiftsForDay(day)
      });
      this.setState({ availableDates: availableDates });
    }
  }

  // for each day the seller is available, push all the shifts for that day to an array
  getShiftsForDay(day) {
    let shifts = [];
    this.state.shiftInfo.map((si) => {
      let siDay = Moment(si.day).format('YYYY-MM-DD');
      if (siDay == day) {
        shifts.push({ startHour: si.startHour, endHour: si.endHour });
      }
    });
    return shifts;
  }

  // the view that each agenda card will take
  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={{ fontSize: 15 }}>Availability</Text>
        <Text style={{ justifyContent: 'center', fontSize: 27, fontWeight: '200', color: '#636e72' }}>
          {Moment(item.startHour).format('hh:mm A')} - {Moment(item.endHour).format('hh:mm A')}
        </Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text style={{ fontSize: 20 }}> No Availabilities </Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }


}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 100
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }
});
const st = require("./../styles/style.js");

export default SellerAvailability;
