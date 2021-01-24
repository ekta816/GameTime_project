import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function App () {
const [borderSearch, setSearch] = useState('#1D1C1C');
const [searched, setSearched] = useState(false);
const [dataEvents, setDataEvents] = useState("");
const [dataPerformers, setDataPerformers] = useState("");
const [dataVenues, setDataVenues] = useState("");

const setSearchActive=()=>{
    setSearch("#00EF9F");
}

const setSearchInActive=()=>{
  setSearch("#1D1C1C");
}

const getSearchResults=(text)=>{
  try{
    fetch(`https://mobile-staging.gametime.co/v1/search?q=`+text)
    .then(res=>res.json())
    .then(results=>{
      if(results.events.length===0 && results.performers.length===0 && results.venues.length===0){
        setSearched(false);
      }
      setDataEvents(results.events.slice(0,3));
      setDataPerformers(results.performers.slice(0,3))
      setDataVenues(results.venues.slice(0,3));
      setSearched(true);
    })
  }catch(err){
    console.log("Error here: " , err);
  }
} 


function getWeekDay(date){
  var getWeekDay = new Date(date);
  var weekdays = new Array(
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  );
  var day = getWeekDay.getDay();
  return weekdays[day];
}

function getDayAndMonth(date){
var formatDate = new Date(date);
var month = formatDate.getMonth()+1;
var date = formatDate.getDate();
return month+'/'+date;
}

const renderItemEvents = (item) => (
  <View key={item.event.id} style={{flexDirection:'row', width:screenWidth-16, marginBottom:1, backgroundColor:'#1C1C1E', padding:20}}>
    <View style={{flexDirection:'column'}}>
      <Text style={{color:'#FCFCFC', marginRight:30,fontSize:20 }}>{getDayAndMonth(item.event.datetime_local)}</Text>
      <Text style={{color:'#9C9C9E',  }}>{getWeekDay(item.event.datetime_local)}</Text>
    </View>
    <View style={{flexDirection:'column'}}>
      <Text style={{color:'#FCFCFC', fontSize:15,}}>{item.event.name}</Text>
      <Text style={{color:'#9C9C9E', fontSize:12, marginTop:5}}>{item.venue.name}</Text>
    </View>
  </View>
);

const renderItemPerformers = (item) => (
  <View key={item.id} style={{flexDirection:'row', width:screenWidth-16, marginBottom:1, backgroundColor:'#1C1C1E', padding:20}}>
    <Image style={{width:50, height:50, borderRadius:50, marginHorizontal:10}} source={{uri:item.hero_image_url}} />
    <View style={{flexDirection:'column'}}>
      <Text style={{color:'#FCFCFC', fontSize:15,}}>{item.name}</Text>
      <Text style={{color:'#9C9C9E', fontSize:12,marginTop:5}}>{item.category.toUpperCase()}</Text>
    </View>
  </View>
);

const renderItemVenues = (item) => (
  <View  key={item.id} style={{flexDirection:'row', width:screenWidth-16, marginBottom:1, backgroundColor:'#1C1C1E', padding:20}}>
     <Image style={{width:50, height:50, borderRadius:50, marginHorizontal:10}} source={{uri:item.image_url}} />
    <View style={{flexDirection:'column'}}>
      <Text style={{color:'#FCFCFC', fontSize:15,}}>{item.name}</Text>
      <Text style={{color:'#9C9C9E', fontSize:12,marginTop:5}}>VENUE·{item.city}, {item.state}</Text>
    </View>
  </View>
);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {/* Search */}
        <View style={[styles.searchBar, {borderBottomColor:borderSearch}]} >
        <Icon name='search' size={20} color="grey" style={{paddingLeft:10}}/>
        <TextInput
          style={styles.searchInput}
          onFocus={setSearchActive}
          onBlur={setSearchInActive}
          onChangeText={text => getSearchResults(text)}
          selectionColor={'grey'}
          placeholder={"Search for Events, Performers or Venues"}
          placeholderTextColor={'grey'}
        />
        </View>
        {searched ?
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* Section Header Events*/}
          <View  style={styles.sectionBackground}> 
              <Text style={styles.sectionText}>Events</Text>
          </View>
           {/* Section Data Events*/}
          {dataEvents.map((item)=>{
            return renderItemEvents(item);
          })}
           {/* Section Header Performers */}
          <View  style={styles.sectionBackground}>
              <Text style={styles.sectionText}>Performers</Text>
          </View>
           {/* Section Data Performers*/}
          {dataPerformers.map((item)=>{
            return renderItemPerformers(item);
          })}
           {/* Section Header Venues*/}
          <View  style={styles.sectionBackground}>
              <Text style={styles.sectionText}>Venues</Text>
          </View>
           {/* Section Data Venues*/}
          {dataVenues.map((item)=>{
            return renderItemVenues(item);
          })}
        </ScrollView>
        :
        <View></View>
        }
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchBar:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2d2d2d',
    marginTop:5,
    marginBottom: 5,
    alignItems: 'center',
    width: screenWidth-10,
    borderWidth: 1,
    borderRadius: 25
  },
  searchInput:{
    flex:1,
    paddingHorizontal:10,
    fontSize: 15,
    color: '#fff',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionBackground:{
    backgroundColor:'#262628', 
    width:screenWidth-16, 
    padding:8, 
    marginTop:5
  },
  sectionText:{
    color:'#ABABAD',
    fontWeight: 'bold'
  }
});

export default App;
