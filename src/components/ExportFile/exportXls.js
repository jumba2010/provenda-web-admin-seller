import React from "react";
//import ReactExport from "react-data-export";
import { SaveTwoTone  } from '@ant-design/icons';
import { Button } from 'antd';
import { formatMessage } from 'umi';

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportXLS = ({ dataset,
    collumns, sheetName }) => {

    return (
        <div>The file will go here</div>
        // <ExcelFile element={<Button size='middle' style={{ 'margin-left': '10px' }}> <SaveTwoTone twoToneColor="#13cf7d" /> {formatMessage({ id: 'product.export' })}</Button>}>
        //     <ExcelSheet data={dataset} name={sheetName}>
        //         {
        //      collumns.map((c) => <ExcelColumn key={c.dataIndex} label={c.title} value={String(c.dataIndex).trim()}  />)
        //         }
        //     </ExcelSheet>
        // </ExcelFile>
    );
}

export default ExportXLS;
