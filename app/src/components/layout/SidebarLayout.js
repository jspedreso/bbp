import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import SidebarItems from "./SidebarItems";
const drawerWidth = 240;

const Link = React.forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

const ListItemLink = (props) => {
  const { icon, primary, to } = props;
  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const SideBarLayout = () => {
  return (
    <div>
      <>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
          anchor='left'
          open={true}
          variant='permanent'
        >
          <Box sx={{ width: 250, mt: 10 }}>
            <List aria-label='main mailbox folders'>
              {SidebarItems.map((item, index) => {
                return <ListItemLink key={index} to={item.path} primary={item.title} icon={item.icon} />;
              })}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </>
    </div>
  );
};

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SideBarLayout;
