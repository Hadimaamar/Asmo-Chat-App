import Feed from "../components/Feed";
import { Rightbar } from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <TopBar />
      <main className="flex w-full ">
        <Sidebar />
        <Feed />
        <Rightbar />
      </main>
    </div>
  );
}
