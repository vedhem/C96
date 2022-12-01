import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class OtherScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          other: []
        };
      }
    fetchRemindersOther = () => {
        firebase.database().ref('/other/').on('value', (snapshot) => {
          let other = []
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function(keys) {
              other.push({key:key,value:snapshot.val()[key]})
            })
          }
        this.setState({other:other})
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed :(' + errorObject.code)
        }
        )
      }
      componentDidMount () {
        this.fetchRemindersOther();
      }
      renderItem = ({ item: story }) => {
        return <OtherScreen other={other} navigation={this.props.navigation} />;
      };
      async addStory() {
        if (this.state.date && this.state.detail && this.state.externalResources&& this.state.steps && this.state.title) {
          let storyData = {
            preview_image: this.state.previewImage,
            externalResources: this.state.externalResources,
            date: this.state.date,
            detail: this.state.detail,
            steps: this.state.steps,
            title: this.state.title,
            author: firebase.auth().currentUser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            likes: 0
          }
          await firebase.database().ref('/other/' + (Math.random().toString(36).slice(2))).set(otherData)
          .then(function(Snapshot){})
          this.props.navigation.navigate('Other')
        }
        else {
          Alert.alert('Error', 'all fields are required', [{text:'okay',onPress:()=>console.log('okay pressed')}], {cancelable:false})
        }
      }
      const addOther = (dispatch) => {
        return () => {
          let tep = new Date(Date.now());
          let time = new Date(Date.now());
          tep.setHours(0, 0, 0, 0);
          time.setHours(0, 0, 0, 0);
          time.setFullYear(tep.getFullYear() + 1);
          let id = notif(" ", time.getTime() / 1000 - tep.getTime() / 1000);
          id.then((value) => {
            time.setFullYear(tep.getFullYear());
            dispatch({ type: "add_other", payload: { time, value } });
          }).catch((e) => {
            console.error(e);
          });
        };
      };
      const delete_Other = (dispatch) => {
        return (id) => {
          Cancle_Notif(id.notificationId);
          dispatch({ type: "delete_other", payload: id });
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
        <Text> Other Screen!</Text>
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