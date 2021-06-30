
import { FormattedMessage, formatMessage }  from 'umi';
import React, { Component } from 'react';

import { List } from 'antd';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="BLOCK_NAME.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="BLOCK_NAME.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="BLOCK_NAME.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

class SecurityView extends Component {
  getData = () => [
    {
      title: formatMessage({ id: 'BLOCK_NAME.security.password' }, {}),
      description: (
        <>
          {formatMessage({ id: 'BLOCK_NAME.security.password-description' })}
          {passwordStrength.strong}
        </>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage id="BLOCK_NAME.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
 
    {
      title: formatMessage({ id: 'BLOCK_NAME.security.question' }, {}),
      description: formatMessage({ id: 'BLOCK_NAME.security.question-description' }, {}),
      actions: [
        <a key="Set">
          <FormattedMessage id="BLOCK_NAME.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
 

  ];

  render() {
    const data = this.getData();
    return (
      <>
        <List<Unpacked<typeof data>>
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default SecurityView;
