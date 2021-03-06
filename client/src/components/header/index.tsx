import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../../shared/routes';
import { APP_NAME } from '../../shared/constants';
import { FlexRow, FlexColumn } from '../../shared/styles/flex';
import { logout } from '../../shared/user/actions';
import { getUser } from '../../shared/user/selectors';

const Container = styled(FlexRow)`
  height: 10vh;
`;

const Logo = styled(FlexRow)`
  flex: 0.2;
  font-size: 24px;
`;

const Spacing = styled.div`
  flex: 0.4;
`;

const Navigation = styled(FlexColumn)`
  flex: 0.4;
  align-items: flex-end;
`;

const Account = styled(FlexRow)`
  margin-bottom: 8px;
`;

const AccountLink = styled(Link)`
  padding: 0px 16px;
  text-decoration: none;
`;

const Tabs = styled(FlexRow)``;

const TabLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 16px;
  padding: 6px;
  width: 64px;
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
`;

export const Header = React.memo(() => {
  const { displayName, id: userId, session } = useSelector(getUser);
  const { token } = session;

  let accountLinks: React.ReactElement = (
    <>
      <AccountLink to={routes.login.pathname}>Login</AccountLink>
      <AccountLink to={routes.signup.pathname}>Signup</AccountLink>
    </>
  );

  if (token) {
    accountLinks = (
      <>
        <AccountLink to={`${routes.profiles.pathname}/${userId}`}>{displayName}</AccountLink>
        <AccountLink to={routes.index.pathname} onClick={() => logout()}>
          Logout
        </AccountLink>
      </>
    );
  }

  return (
    <Container>
      <Logo>{APP_NAME}</Logo>
      <Spacing />
      <Navigation>
        <Account>
          <AccountLink to={routes.about.pathname}>About</AccountLink>
          {accountLinks}
        </Account>
        <Tabs>
          <TabLink to="#">Me</TabLink>
          <TabLink to="#">Stuff</TabLink>
          <TabLink to="#">Games</TabLink>
          <TabLink to={routes.rooms.pathname}>Rooms</TabLink>
          <TabLink to="#">Groups</TabLink>
          <TabLink to="#">Shop</TabLink>
        </Tabs>
      </Navigation>
    </Container>
  );
});
