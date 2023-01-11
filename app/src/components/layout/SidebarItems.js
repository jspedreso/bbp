import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";

const SidebarItems = [
  {
    title: "Home",
    path: "/",
    icon: <MailIcon />,
  },
  {
    title: "Users",
    path: "/user",
    icon: <PersonIcon />,
  },
  {
    title: "Permits",
    path: "/permit",
    icon: <ReceiptIcon />,
  },
  {
    title: "Near Expiration",
    path: "/nearExpiration",
    icon: <EmergencyShareIcon />,
  },
  {
    title: "Reports",
    path: "/report",
    icon: <AssessmentIcon />,
  },
];

export default SidebarItems;
