import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";

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
    title: "Reports",
    path: "/report",
    icon: <AssessmentIcon />,
  },
];

export default SidebarItems;
