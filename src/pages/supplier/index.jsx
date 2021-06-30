import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef,useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, removeRule } from './service';


/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('A Processar...');

  try {
    await updateRule({
      name: fields.name,
      alertquantity:fields.alertquantity,
      unitId:fields.unitId,
      price:fields.price,
      taxes:fields.taxes,
      barcode: fields.barcode,
      id: fields.id,
    });
    hide();
    message.success('Operação realizada com sucesso');
    
    return true;
  } catch (error) {
    hide();
    message.error('Erro ao processar a requisição');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('A processar');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('Operação realizada com sucesso');
    return true;
  } catch (error) {
    hide();
    message.error('Erro ao processar a requisição');
    return false;
  }
};

const TableList = () => {
  const [sorter, setSorter] = useState('');
  const [createModalVisible, handleCreadeModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [createFormValues, setCreateFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'Código',
      dataIndex: 'barcode',
      rules: [
        {
          required: true,
          message: 'o código do Produto é obrigatório',
        },
      ],
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      valueType: 'text',
      render:(text)=><a>{text}</a>,
      required: true,
      message: 'o Nome do Produto é obrigatório',
    },
    {
      title: 'Preço unitario',
      dataIndex: 'price',
      sorter: true,
      hideInForm: true,
      render: (val) => val==0?`Nao especificado`:`${val} MZN`,
    },
    {
      title: 'Unidade',
      dataIndex: 'unity',
      required: true,
    },
    {
      title: 'Quantidade de alerta',
      dataIndex: 'alertquantity',
      render:(_,record)=><div>{record.alertquantity} </div>,
      sorter: true,

    },
    {
      title: 'Operações',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Editar
          </a>
          <Divider type="vertical" />
          <a href="">Comprar</a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="Lista de Produtos"
        actionRef={actionRef}
        rowKey="id"
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
          <Button type="primary" onClick={() => handleCreadeModalVisible(true)}>
            <PlusOutlined /> Adicionar
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
                  <Menu.Item key="remove">Remover </Menu.Item>
                  <Menu.Item key="approval">Exportar</Menu.Item>
                </Menu>
              }
            >
              <Button>
                Mais operações  <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            Selecionados {' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            produtos&nbsp;&nbsp;
          
          </div>
        )}
        request={params => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />
  
        <CreateForm
        onSubmit={async value => {
            handleCreadeModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          
        }}
       
          onCancel={() => {
            handleCreadeModalVisible(false);
          }}
          createModalVisible={createModalVisible}
        />
    
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
