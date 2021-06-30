
import { Button, Card,Rate,Table} from 'antd';
import React, { useState, useRef ,useEffect}   from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { Page, Text, View,PDFViewer, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const PDFViewerComponent = (props) => {

  return (
    <PageHeaderWrapper>
     
     <Card  bordered={false}  >

     <PDFViewer width={600} height={800}>
    <MyDocument />
  </PDFViewer>

</Card>
    </PageHeaderWrapper>
  );
};

export default PDFViewerComponent;

