import "./Home.css";
import MainDash from "../MainDash/MainDash";
import RightSide from "../RigtSide/RightSide";
import Sidebar from "../Sidebar";

function Home({ api, setSelected, selected }) {
  return (
    <div className="Home">
      <div className="HomeGlass">
        <Sidebar  />
        <MainDash api={api} />
        <RightSide api={api} />
      </div>
    </div>
  );
}

export default Home;
