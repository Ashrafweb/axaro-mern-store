import { useState } from "react";
import Dashboard from "../../components/Dashboard";
import Account from "./AccountDetails";
import Order from "../Orders/Order";
import Favorites from "../Products/Favorites";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("account");
  const ChildComponent = () => {
    switch (activeTab) {
      case "account":
        return <Account />;

      case "orders":
        return <Order />;

      case "favourites":
        return <Favorites />;

      case "address":
        return <div></div>;

      default:
        break;
    }
  };
  return (
    <div>
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab}>
        {/* {activeTab == 'account' && <Account />}
           {activeTab == "orders" && <Order />} */}
        <ChildComponent />
      </Dashboard>
    </div>
  );
}

export default UserProfile;
