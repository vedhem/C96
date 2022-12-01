import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class WorkScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          work: []
        };
      }
    fetchRemindersWork = () => {
        firebase.database().ref('/work/').on('value', (snapshot) => {
          let work = []
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function(keys) {
              events.push({key:key,value:snapshot.val()[key]})
            })
          }
        this.setState({work:work})
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed :(' + errorObject.code)
        }
        )
      }
      componentDidMount () {
        this.fetchRemindersWork();
      }
      renderItem = ({ item: story }) => {
        return <HealthScreen work={work} navigation={this.props.navigation} />;
      };
      async addStory() {
        if (this.state.deadline && this.state.detail && this.state.people && this.state.steps && this.state.task && this.state.type) {
          let storyData = {
            preview_image: this.state.previewImage,
            deadline: this.state.deadline,
            detail: this.state.detail,
            people: this.state.people,
            steps: this.state.steps,
            task: this.state.task,
            type: this.state.type,
            author: firebase.auth().currentUser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            likes: 0
          }
          await firebase.database().ref('/work/' + (Math.random().toString(36).slice(2))).set(workData)
          .then(function(Snapshot){})
          this.props.navigation.navigate('Work')
        }
        else {
          Alert.alert('Error', 'all fields are required', [{text:'okay',onPress:()=>console.log('okay pressed')}], {cancelable:false})
        }
      }
      const addWork = (dispatch) => {
        return () => {
          let tep = new Date(Date.now());
          let time = new Date(Date.now());
          tep.setHours(0, 0, 0, 0);
          time.setHours(0, 0, 0, 0);
          time.setFullYear(tep.getFullYear() + 1);
          let id = notif(" ", time.getTime() / 1000 - tep.getTime() / 1000);
          id.then((value) => {
            time.setFullYear(tep.getFullYear());
            dispatch({ type: "add_work", payload: { time, value } });
          }).catch((e) => {
            console.error(e);
          });
        };
      };
      const delete_work = (dispatch) => {
        return (id) => {
          Cancle_Notif(id.notificationId);
          dispatch({ type: "delete_work", payload: id });
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
        <Text>Work Screen!</Text>
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