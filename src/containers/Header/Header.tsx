import { NavLink, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { RouterConfig } from '@/constants/routes';
import { useGetUserQuery } from '@/hooks/auth';

type LinkItem = {
  to: string;
  title: string;
  show: boolean;
};

export function Header() {
  const { isAuthenticated, isLoading } = useGetUserQuery();
  const navLinks: LinkItem[] = useMemo(() => {
    return [
      { to: RouterConfig.Home, title: 'Home', show: true },
      {
        to: RouterConfig.LoginPage,
        title: 'Sign in',
        show: !isAuthenticated && !isLoading,
      },
      {
        to: RouterConfig.SignUpPage,
        title: 'Sign up',
        show: !isAuthenticated && !isLoading,
      },
      {
        to: RouterConfig.Settings,
        title: 'Settings',
        show: isAuthenticated,
      },
      {
        to: RouterConfig.NewPost,
        title: 'New Post',
        show: isAuthenticated,
      },
    ];
  }, [isAuthenticated, isLoading]);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link
          className="navbar-brand"
          to={RouterConfig.Home}
        >
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {navLinks.map((link) =>
            link.show ? (
              <li
                className="nav-item"
                key={link.title}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
                >
                  {link.title}
                </NavLink>
              </li>
            ) : null,
          )}
        </ul>
      </div>
    </nav>
  );
}
