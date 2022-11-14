import "./Home.css";
import MainDash from "../../components/MainDash/MainDash";
import RightSide from "../../components/RightSide/RightSide";
import Sidebar from "../../components/Sidebar";
import { useEffect } from "react";

function Home({ setSelected, selected }) {
  useEffect(() => {
    setSelected(0);
  }, [setSelected]);
  return (
    <div className="Home">
      <div className="HomeGlass">
        <Sidebar setSelected={setSelected} selected={selected} />
        <MainDash />
        <RightSide />
      </div>
    </div>
  );
}

export default Home;
