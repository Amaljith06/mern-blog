import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //update current tab
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // Sign Out User
  const handleSignOut = async (e) => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full mid:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Profile */}
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            onClick={() => navigate("/dashboard?tab=profile")}
          >
            Profile
          </Sidebar.Item>
          {/* Sign Out */}
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
