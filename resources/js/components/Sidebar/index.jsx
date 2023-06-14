import { Navigation } from "../Navigation";
import "./Sidebar.scss";

export const Sidebar = () => {
  
    return (
        <aside className={"sidebar"}>
                <Navigation
                    place={"sidebar"}
                />
        </aside>
    );
};
