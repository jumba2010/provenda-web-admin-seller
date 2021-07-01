import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { connect } from 'dva';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {signOut} from './../../services/auth';
import {useHistory} from 'react-router-dom';



const  AvatarDropdown =(props)=> {
  const {
    currentUser = {
      avatar: '',
      name: '',
    },
    menu,
  } = props;

  const   history=useHistory();

  const onMenuClick = event => {
 
    const { key } = event;
    if (key === 'logout') {
      signOut();
      history.push('/user/login')
      console.log("Logged Out")
    }
  
    //this.props.push(`/account/${key}`);
  };
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
         Profile
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          Setings
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
