import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React,{useEffect}  from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
import {db} from '../../services/firebase';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout ,currentUser} = props;
  let className = styles.right;
  const {dispatch} = props;

  const openNotification = name => {
    notification.info({
      message: `New Order has been placed ${name}`,
      description:
        'New Order has been placed from:',
      name,
    });
  };

  useEffect(() => { 
    dispatch({
     type: 'product/fetchUnities',
     payload: currentUser.id,
   });

   dispatch({
     type: 'product/fetchCategories',
     payload: currentUser.id,
   });

   dispatch({
     type: 'product/fetchTaxes',
     payload: currentUser.id,
   });

  //Monitorando Alteracoes da Base de Dados
  db.collection("products").where("seller.id","==",currentUser.id)
  .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {

          if (change.type === "added") {
            dispatch({
                type: 'product/add',
                payload: change.doc.data(),
              });
          }
          if (change.type === "modified") {
            dispatch({
                type: 'product/update',
                payload: change.doc.data(),
              });
          }
          if (change.type === "removed") {
            dispatch({
                type: 'product/remove',
                payload: change.doc.data(),
              });
          }
      });
  });

    db.collection("stocks").where("sucursalId","==",currentUser.sucursals[0].id)
    .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
              dispatch({
                  type: 'product/addStock',
                  payload: change.doc.data(),
                });
            }
            if (change.type === "modified") {
              dispatch({
                  type: 'product/updateStock',
                  payload: change.doc.data(),
                });
            }
            if (change.type === "removed") {
              dispatch({
                  type: 'product/deleteStock',
                  payload: change.doc.data(),
                });
            }
        });
    });

  db.collection("orders").where("seller.id","==",currentUser.id)
  .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            openNotification(change.doc.data().client.name);
            dispatch({
                type: 'order/add',
                payload: change.doc.data(),
              });
          }
          if (change.type === "modified") {
            dispatch({
                type: 'order/update',
                payload: change.doc.data(),
              });
          }
      });
  });

      //Monitorando Alteracoes da Base de Dados
      db.collection("orders").where("seller.id","==",currentUser.id)
      .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
              if (change.type === "added") {
                if(change.doc.data().payment.status==='refunded'){
                  dispatch({
                    type: 'sale/addrefunded',
                    payload: change.doc.data(),
                  });
                }

                else{
                  dispatch({
                    type: 'sale/add',
                    payload: change.doc.data(),
                  });
                }

               
              }
              if (change.type === "modified") {
                if(change.doc.data().status==='refunded'){
                  dispatch({
                    type: 'sale/remove',
                    payload: change.doc.data(),
                  });

                  dispatch({
                    type: 'sale/addrefunded',
                    payload: change.doc.data(),
                  });
                }
                else{
                  dispatch({
                    type: 'sale/update',
                    payload: change.doc.data(),
                  });
                }
               
              }
          });
      });

    //  message.warning({ content: `Please update your profile to activate your account `, key,duration:864000 });
      // var myVar=setInterval(() => {
      //   if(false){
      //     clearInterval(myVar);
      //   }
    
      // }, 1000);

    },[]);
  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]} // onSearch={value => {
        //   //console.log('input', value);
        // }}
      />
      <Tooltip title="使用文档">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <NoticeIconView />
      <Avatar menu />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings,user }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  currentUser:user.currentUser
}))(GlobalHeaderRight);
