import "./Home.css";
import MainDash from "../MainDash/MainDash";
import RightSide from "../RigtSide/RightSide";
import Sidebar from "../Sidebar";
import { useEffect } from "react";

function Home({ api, setSelected, selected }) {
  useEffect(() => {
    setSelected(0);
  }, [setSelected]);
  return (
    <div className="Home">
      <div className="HomeGlass">
        <Sidebar setSelected={setSelected} selected={selected} />
        <MainDash api={api} />
        <RightSide api={api} />
      </div>
    </div>
  );
}

export default Home;
