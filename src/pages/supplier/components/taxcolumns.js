 const columns = [
    {
      title: 'Designação',
      dataIndex: 'description',
    },

    {
      title: 'Tipo',
      dataIndex: 'type',
    render:(text)=><div>{text==1?'Percentagem':'Valor Fixo'}</div>
    },

    {
      title: 'Valor',
      dataIndex: 'value',
      render:(text,record)=><div>{record.type==1?`${text} %`:`${text} MZN`}</div>
    },
  ];

  export default columns;