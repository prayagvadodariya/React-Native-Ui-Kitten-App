import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';

const Loader = (props) => {
  const {loading, ...attributes} = props;
  const colors = useTheme(); 

  return (
    // <Modal
    //   transparent={true}
    //   animationType={'none'}
    //   visible={loading}
    //   onRequestClose={() => {
    //     console.log('close modal');
    //   }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.colors.background}}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color="#2196f3"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      </View>
    // </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: 'transparent',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});