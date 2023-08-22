import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Link,
  Collapse,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../redux/reducers/user.reducer';
import { RootState } from '../../redux/store';
import ToastAlert from '../../components/ToastAlert';
import logo from '../../assets/logo-white.png';
import links, { LinkType } from './links';
import useStyles from './styles';

interface DrawerProps {
  component: React.FC;
  path: string;
}

const ResponsiveDrawer: React.FC<DrawerProps> = ({
  component: Component,
  path,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state: RootState) => state.user);
  const anchorRef = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenuItem, setOpenMenuItem] = useState('');
  const [openUserMenu, setOpenUserMenu] = useState(false);

  useEffect(() => {
    links.forEach((link) => {
      if (
        link.highlightLinks.some((linkText) => path.indexOf(linkText) !== -1)
      ) {
        if (
          link.sublinks &&
          link.sublinks.length !== 0 &&
          openMenuItem !== link.text
        ) {
          setOpenMenuItem(link.text);
        }
      }
    });
  }, []);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickUserMenu = (): void => {
    setOpenUserMenu(true);
  };

  const handleCloseUserMenu = (): void => {
    setOpenUserMenu(false);
  };

  const goToPage = (link?: string) => (): void => {
    if (link) {
      navigate(`/${link}`);
      setMobileOpen(false);
    }
  };

  const linkAction = (link: LinkType) => (): void => {
    setOpenMenuItem(link.text);

    if (link.link) {
      goToPage(link.link)();
    }
  };

  const highLightItem = (link: LinkType): boolean => {
    const pathParts = path.split('/');
    if (link.highlightLinks.some((linkText) => pathParts[1] === linkText)) {
      return true;
    }

    return false;
  };

  const handleLogout = (): void => {
    dispatch(logoutUser());
  };

  const renderListItem = (link: LinkType, isSelected: boolean): JSX.Element => {
    return (
      <ListItem
        button
        component={React.forwardRef((props, _ref) => (
          <Link
            color="textPrimary"
            {...props}
            onClick={linkAction(link)}
            underline="none"
          >
            {props.children}
          </Link>
        ))}
        selected={isSelected}
        className={clsx({
          [classes.linkWithSublinks]: link.sublinks,
        })}
      >
        <ListItemIcon>{link.icon}</ListItemIcon>
        <ListItemText primary={link.text} />
      </ListItem>
    );
  };

  const renderUserName = (noWrap = true): JSX.Element => {
    return (
      <>
        <div className={clsx('mr-2', classes.userMenuAvatar)}>
          <Typography variant="h5" noWrap color="white">
            {stateUser.user?.first_name.charAt(0)}
            {stateUser.user?.last_name.charAt(0)}
          </Typography>
        </div>
        <div
          className={clsx({
            [classes.userMenuName]: noWrap,
          })}
        >
          <Typography variant="subtitle1" noWrap={noWrap} color="white">
            {stateUser.userCompany?.name}
          </Typography>
          <Typography
            variant="overline"
            noWrap={noWrap}
            component="div"
            color="white"
          >
            {stateUser.user?.email}
          </Typography>
        </div>
      </>
    );
  };

  const drawer = (
    <div className={classes.drawerInnerContainer}>
      <div>
        <img
          src={stateUser?.userCompany?.branding?.logo_url ?? logo}
          className={clsx('mt-9 mb-7 ml-6', classes.companyLogo)}
          alt="company-logo"
        />
      </div>
      <List className={classes.drawerList} component="div">
        <div>
          {links.map((link: LinkType, index: number) => {
            const isLinkSelected = highLightItem(link);
            return (
              <div key={`${link.text}-${index}`}>
                {link.sublinks ? (
                  <>
                    {renderListItem(link, isLinkSelected)}
                    <Collapse
                      in={openMenuItem === link.text}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        component="div"
                        disablePadding
                        className={classes.nestedList}
                      >
                        {link.sublinks.map((sublink: LinkType, i: number) => {
                          if (
                            sublink.readModel &&
                            stateUser?.permissions &&
                            stateUser?.permissions[sublink.readModel]
                          ) {
                            const showItem =
                              stateUser.permissions[sublink.readModel].read;
                            if (!showItem) {
                              return <></>;
                            }
                          }
                          const isSelected = highLightItem(sublink);
                          return (
                            <ListItem
                              key={`${sublink.text}-${i}`}
                              button
                              component={React.forwardRef((props, _ref) => (
                                <Link
                                  color="primary"
                                  {...props}
                                  onClick={goToPage(sublink.link)}
                                  underline="none"
                                >
                                  {props.children}
                                </Link>
                              ))}
                              selected={isSelected}
                            >
                              <ListItemText primary={sublink.text} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  renderListItem(link, isLinkSelected)
                )}
              </div>
            );
          })}
        </div>
        <div ref={anchorRef} className="px-6">
          <ListItem
            button
            component={React.forwardRef((props, _ref) => (
              <Button
                variant="text"
                disableElevation
                onClick={handleClickUserMenu}
                endIcon={
                  !openUserMenu ? (
                    <KeyboardArrowDown style={{ color: 'white' }} />
                  ) : (
                    <KeyboardArrowUp style={{ color: 'white' }} />
                  )
                }
                className={clsx('p-4', classes.userMenuButton, {
                  [classes.userMenuButtonFocused]: openUserMenu,
                  'br-2': openUserMenu,
                })}
              >
                {renderUserName()}
                {props.children}
              </Button>
            ))}
          ></ListItem>
          <Menu
            anchorEl={anchorRef.current}
            open={openUserMenu}
            onClose={handleCloseUserMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            className={classes.userMenu}
          >
            <MenuItem onClick={handleCloseUserMenu} disableRipple>
              {renderUserName(false)}
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu} disableRipple>
              <Button variant="text" disableElevation onClick={handleLogout}>
                Sign out
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Hidden only={['md', 'lg', 'xl']} implementation="css">
        <AppBar position="fixed" color="transparent" elevation={2}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h2" color="textPrimary" gutterBottom={false}>
              {/* {getPageTitle(path)} */}
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden only={['md', 'lg', 'xl']} implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaperMobile,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden only={['xs', 'sm']} implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={clsx('scrollbar', classes.content)}>
        <ToastAlert />
        <Component></Component>
      </main>
    </div>
  );
};

export default ResponsiveDrawer;
