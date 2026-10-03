import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const navigationItems = [
  {
    label: '홈',
    path: '/home',
    icon: 'Home.svg',
    activeIcon: 'HomeActive.svg',
  },
  {
    label: '메이트 찾기',
    path: '/findmates',
    icon: 'Matefind.svg',
    activeIcon: 'MatefindActive.svg',
  },
  {
    label: '모임',
    path: '/meetings',
    icon: 'Meeting.svg',
    activeIcon: 'MeetingActive.svg',
  },
  {
    label: '마이페이지',
    path: '/mypage',
    icon: 'Mypage.svg',
    activeIcon: 'MypageActive.svg',
  },
];

const Navigation = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 50%;
  z-index: 10;
  width: 100%;
  max-width: 430px;
  height: 123px;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 0.8px solid var(--Gray, #BDBDBD);
  background: var(--White, #FAFAFA);
  transform: translateX(-50%);
`;

const NavigationItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 35px;
  align-self: stretch;
`;

const NavigationLink = styled(NavLink)`
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const NavigationIcon = styled.img`
  width: 60px;
  height: 55px;
  display: block;
  object-fit: contain;
`;

export default function NavigationBar() {
  return (
    <Navigation aria-label="메뉴">
      <NavigationItems>
        {navigationItems.map(({ label, path, icon, activeIcon }) => (
        <NavigationLink
          key={path}
          to={path}
          end={path === '/home'}
          aria-label={label}
        >
          {({ isActive }) => (
            <NavigationIcon
              src={`${process.env.PUBLIC_URL}/images/${
                isActive ? activeIcon : icon
              }`}
              alt=""
            />
          )}
        </NavigationLink>
      ))}
      </NavigationItems>
    </Navigation>
  );
}
