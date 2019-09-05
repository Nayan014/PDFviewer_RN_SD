import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import Pdf from 'react-native-pdf';

export default class App extends Component {

  state = {
    totalPages: 0,
    currentPage: 0
  }

  totalNumberOfPages = (totalPages) => {
    this.setState({
      totalPages: totalPages
    })
  }

  currentPageChanged = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    })
  }

  render() {
    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,..."};

    return (
      <View style={styles.container}>
      
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            this.totalNumberOfPages(numberOfPages)
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            this.currentPageChanged(page);
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          style={styles.pdf} />

        <View style={{ padding: 6, position: "absolute", bottom: 5, backgroundColor: 'black', opacity: 0.7, borderRadius: 15 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>{` ${this.state.currentPage} / ${this.state.totalPages} `}</Text>
        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  }
});
