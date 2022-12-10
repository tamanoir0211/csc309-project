import { AppBar, Box, Toolbar, IconButton, Typography, 
    Menu, Container, Avatar, Button, 
    Link, Tooltip, MenuItem} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from "react";
import { LinkProps } from '@mui/material/Link';
import { useContext } from "react";
import PropTypes from 'prop-types'
import AuthContext from "../context/AuthContext";
const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
  });
  
  LinkBehavior.propTypes = {
    href: PropTypes.oneOfType([
      PropTypes.shape({
        hash: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
      }),
      PropTypes.string,
    ]).isRequired,
  };
  
  function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
      return <StaticRouter location="/">{children}</StaticRouter>;
    }
  
    return <MemoryRouter>{children}</MemoryRouter>;
  }
  
  Router.propTypes = {
    children: PropTypes.node,
  };
  
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  }
function MyAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {logoutUser, authTokens} = useContext(AuthContext);
    const [authed, setAuthed] = React.useState(false);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      const handleCloseUserMenu2 = () => {
        logoutUser();
        setAnchorElUser(null);
      };

    const pages = ['Studios', 'Classes']
    const settings = ['Profile', 'Logout']
    React.useEffect(() => {
        setAuthed(authTokens)
    }, [authTokens])


    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                TFC
              </Typography>
    
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
  
                    <MenuItem onClick={handleCloseNavMenu}>
                    <RouterLink to="/" style={linkStyle}>
                      <Typography textAlign="center">Studios</Typography>
                    </RouterLink>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                    <RouterLink to="/classes/search" style={linkStyle}>
                      <Typography textAlign="center">Classes</Typography>
                    </RouterLink>
                    </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                TFC
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <RouterLink to="/" style={linkStyle}>

                    <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                    Studio Search
                    </Button>
                </RouterLink>
                <RouterLink to="/studios/list" style={linkStyle}>
                    <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Studio List
                    </Button>
                </RouterLink>
                <RouterLink to="/classes/search" style={linkStyle}>
                    <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                    Classes
                    </Button>
                </RouterLink>
                <RouterLink to="/subscriptions" style={linkStyle}>
                    <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                    Subscriptions
                    </Button>
                </RouterLink>

              </Box>
              {authTokens ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                <MenuItem  onClick={handleCloseUserMenu} >
                    <RouterLink to="/account" style={linkStyle}>
                    <Typography textAlign="center" href="/account">Profile</Typography>
                    </RouterLink>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu} >
                    <RouterLink to="/user/subscription" style={linkStyle}>
                    <Typography textAlign="center" href="/user/subscription">Subscription</Typography>
                    </RouterLink>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu} >
                    <RouterLink to="/user/classes" style={linkStyle}>
                    <Typography textAlign="center" href="/user/classes">Classes</Typography>
                    </RouterLink>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu} >
                    <RouterLink to="/payment" style={linkStyle}>
                    <Typography textAlign="center" href="/payment">Payments</Typography>
                    </RouterLink>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu2} >
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                </Menu>
            </Box>
            ): (
                <RouterLink to="/login" style={linkStyle}>
                    <Typography textAlign="center" href="/login">Login</Typography>
                </RouterLink>
            )}
            </Toolbar>
          </Container>
        </AppBar>
        </ThemeProvider>
      );

}
export default MyAppBar;
