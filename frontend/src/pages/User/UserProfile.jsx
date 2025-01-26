import Dashboard from "../../components/Dashboard";
import Account from "./AccountDetails";
import Order from "../Orders/Order";
import Favorites from "../Products/Favorites";
import { useSelector } from "react-redux";

function UserProfile() {
  const activeTab = useSelector((state) => state.auth.activeTab);
  console.log(activeTab);
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
      <Dashboard>
        <ChildComponent />
      </Dashboard>
    </div>
  );
}

export default UserProfile;
