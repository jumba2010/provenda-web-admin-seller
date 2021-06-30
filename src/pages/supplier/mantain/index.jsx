import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown,Tabs,Card, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryRule, findProductById,removeRule } from '../service';
import { formatMessage } from 'umi';
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

/**
 * 
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading(formatMessage({ id: 'global.processing'}));
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success(formatMessage({ id: 'global.success'}));
    return true;
  } catch (error) {
    hide();
    message.error(formatMessage({ id: 'global.error.processing'}));
    return false;
  }
};

const TableList = () => {
  const [sorter, setSorter] = useState('');
  const history = useHistory();
  const [stepFormValues, setStepFormValues] = useState({});


  const actionRef = useRef();

  const editProduct=(record)=>{
    localStorage.setItem('PRODUCT',JSON.stringify(record))
  }
  const columns = [
  
    {
      title: formatMessage({ id: 'product.name'}),
      dataIndex: 'name',
      valueType: 'text',
      render:(text)=><a>{text}</a>,
      required: true,
      message: 'o Nome do Produto é obrigatório',
    },
    {
      title: formatMessage({ id: 'product.price'}),
      dataIndex: 'price',
      sorter: true,
      hideInForm: true,
      render: (val) => val==0?`Nao especificado`:`${val} MZN`,
    },
    {
      title: formatMessage({ id: 'product.availablequantity'}),
      dataIndex: 'availablequantity',
      render:(_,record)=><div>{record.availablequantity} {record.unity} </div>
  
    },
    {
      title: formatMessage({ id: 'product.alertquantity'}),
      dataIndex: 'alertquantity',
      render:(_,record)=><div>{record.alertquantity} {record.unity} </div>,
      sorter: true,

    },
    {
      title: formatMessage({ id: 'operations'}),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a href={`/product/edit/${record.id}`}
            onClick={() => {
              editProduct(record);
            }}
          >
            {formatMessage({ id: 'product.edit'})}
          </a>
          <Divider type="vertical" />
          <a href="">{formatMessage({ id: 'product.buy'})}</a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
       <Card bordered={false}>
  
  <Tabs defaultActiveKey="1" >
    <TabPane tab={formatMessage({ id: 'product.list'})} key="1" style={{ marginButton: 20 }} >
      <ProTable
      
        actionRef={actionRef}
        rowKey="id"
        search={false}
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter;

          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => history.push('/product/create')}>
            <PlusOutlined /> {formatMessage({ id: 'product.add'})}
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">{formatMessage({ id: 'product.remove'})} </Menu.Item>
                  <Menu.Item key="approval">{formatMessage({ id: 'product.export'})}</Menu.Item>
                </Menu>
              }
            >
              <Button>
                {formatMessage({ id: 'more.operations'})}  <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
             <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
    
            {formatMessage({ id: 'products'})} &nbsp;
          
            {formatMessage({ id: 'products.selected'})} {' '}
          </div>
        )}
        request={params => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />
      

</TabPane>


<TabPane tab={formatMessage({ id: 'product.stock'})} key="2"></TabPane>

</Tabs></Card>
    </PageHeaderWrapper>
  );
};

export default TableList;
