export   const registercolumns = [
    {
      title: 'Código',
      dataIndex: 'code',
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
      required: true,
      message: 'o Nome do Produto é obrigatório',
    },
    {
      title: 'Preço unitario',
      dataIndex: 'price',
      sorter: true,
      hideInForm: true,
      renderText: val => `${val} MZN`,
    },
    {
      title: 'Unidade',
      dataIndex: 'unity',
      required: true,
    },
    {
      title: 'Tipo de Produto',
      dataIndex: 'type',
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
          <a href="">Actualizar Stock</a>

        </>
      ),
    },
  ];
