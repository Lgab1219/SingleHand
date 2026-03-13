import { createIconSetFromFontello } from "@expo/vector-icons";

const AppIcons = createIconSetFromFontello(
    require("../../assets/fonts/app-icons/config.json"),
    "app-icons",
    "app-icons.ttf"
);

export default AppIcons;