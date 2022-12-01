import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class FinanceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          finance: []
        };
      }
    fetchRemindersFinance = () => {
        firebase.database().ref('/finance/').on('value', (snapshot) => {
          let finance = []
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function(keys) {
              finance.push({key:key,value:snapshot.val()[key]})
            })
          }
          this.setState({finance:finance})
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed :(' + errorObject.code)
        }
        )
      }
      componentDidMount () {
        this.fetchRemindersFinance();
      }
      renderItem = ({ item: story }) => {
        return <FinanceScreen finance={finance} navigation={this.props.navigation} />;
      };
      async addStory() {
        if (this.state.amount && this.state.deadline && this.state.dedicatedMoney && this.state.owedTo) {
          let storyData = {
            preview_image: this.state.previewImage,
            amount: this.state.amount,
            deadline: this.state.amount,
            dedicatedMoney: this.state.amount,
            externalResources: this.state.externalResources,
            owedTo: this.state.owedTo,
            author: firebase.auth().currentUser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            likes: 0
          }
          await firebase.database().ref('/finance/' + (Math.random().toString(36).slice(2))).set(financeData)
          .then(function(Snapshot){})
          this.props.navigation.navigate('Finance')
        }
        else {
          Alert.alert('Error', 'all fields are required', [{text:'okay',onPress:()=>console.log('okay pressed')}], {cancelable:false})
        }
      }
      const addFinance = (dispatch) => {
        return () => {
          let tep = new Date(Date.now());
          let time = new Date(Date.now());
          tep.setHours(0, 0, 0, 0);
          time.setHours(0, 0, 0, 0);
          time.setFullYear(tep.getFullYear() + 1);
          let id = notif(" ", time.getTime() / 1000 - tep.getTime() / 1000);
          id.then((value) => {
            time.setFullYear(tep.getFullYear());
            dispatch({ type: "add_finance", payload: { time, value } });
          }).catch((e) => {
            console.error(e);
          });
        };
      };
      const delete_finance = (dispatch) => {
        return (id) => {
          Cancle_Notif(id.notificationId);
          dispatch({ type: "delete_finance", payload: id });
        };
      };
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
        <Text>Finance Screen!</Text>
                <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.stories}
              renderItem={this.renderItem}
            />
          </View>
          <View style={{ flex: 0.08 }} />
            </View>
        )
    }
}