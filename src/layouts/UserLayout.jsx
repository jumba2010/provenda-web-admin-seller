import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect } from 'umi';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';
import { GithubOutlined } from '@ant-design/icons';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>PROVENDA</span>
              </Link>
            </div>
            <div className={styles.desc}>
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
    copyright={`${new Date().getFullYear()} All rights reserved`}
    links={[
      {
        key: 'Judiao Mbaua',
        title: 'Judiao Mbaua',
        href: 'https://www.linkedin.com/in/judiao-mbaua-56b39946/',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/jumba2010',
        blankTarget: true,
      },
      {
        key: 'Judiao Mbaua',
        title: 'Judiao Mbaua',
        href: 'https://www.linkedin.com/in/judiao-mbaua-56b39946/',
        blankTarget: true,
      },
    ]}
  />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
