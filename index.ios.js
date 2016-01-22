var formatTime = require('minutes-seconds-milliseconds');
var React = require('react-native');

var {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} = React;

var StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      runningElapse:null,
      running: false,
      startTime:null,
      laps: []
    }
  },
  render: function() {
    return (
      <View style = {styles.container}>
        <View style = {styles.header}>
          <View style = {styles.timerWrapper}>
            <Text style={styles.smalltimer}>
            {formatTime(this.state.runningElapse)}
            </Text>
            <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style = {styles.buttonWrapper}>
            {this.lapButton()}
            {this.startStopButton()}
          </View>
        </View>


        <View style = {styles.footer}>
          {this.laps()}
        </View>

      </View>
  );
},
  laps: function() {
    return this.state.laps.map(function(time, index){
      return (
      <View style={styles.lap}>
        <Text style={styles.lapText}>
            Lap {index + 1}
        </Text>
        <Text style={styles.lapText}>
            {formatTime(time)}
        </Text>
      </View>
    );
    })
  },
  startStopButton: function() {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return (
        <TouchableHighlight
          underlayColor="#ccc"
          onPress={this.handleStartPress}
          style={[styles.button, style]}
          >
          <Text style={styles.buttonText}>
            {this.state.running ? 'Stop': 'Start'}
          </Text>
        </TouchableHighlight>
    );
  },
  lapButton: function() {
    return (
      <TouchableHighlight
        underlayColor="#ccc"
        style={this.state.timeElapsed ? styles.button : styles.resetButton}
        onPress={this.state.running ? this.handleLapPress : this.handleResetPress }
        >
        <Text style={this.state.timeElapsed ? styles.buttonText : styles.resetText}>
          {this.state.running ? 'Lap': 'Reset'}
        </Text>
      </TouchableHighlight>
    );
  },
  handleLapPress: function() {
    var lap = this.state.timeElapsed;
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  },
  handleResetPress: function() {
    this.setState({
      timeElapsed: null,
      runningElapse:null,
      laps:[]
    });
  },
  handleStartPress: function() {
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running:false});
      return
    }

    var startTime = new Date();
    this.setState({startTime: new Date()})

    this.interval = setInterval(() => {
    this.setState({
      timeElapsed: new Date() - this.state.startTime,
      runningElapse: new Date() - startTime,
      running:true
    });
  }, 30);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, //Fill the entire screen
    alignItems: 'stretch'
  },
  header: { //Yellow
    flex: 1
  },
  footer: { //Blue
    flex:1,
    backgroundColor: '#eee'
  },
  timerWrapper: { //Red
    flex: 5, //takes up 5/8ths of the available space
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: { //Blue
    flex: 3, //takes up 5/8ths of the available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  timer: {
    fontSize: 60,
    fontWeight: "200"
  },
  smalltimer: {
    fontSize: 20,
    color: '#888',
    fontWeight: "300"
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#888',
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resetButton: {
    backgroundColor: '#ccc',
    borderColor: '#aaa',
    borderWidth: 0,
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  buttonText: {
    fontSize: 16
  },
  resetText: {
    color: '#999',
    fontSize: 16
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  lapText: {
    fontSize: 20,
    color: '#444',
    padding: 10
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
