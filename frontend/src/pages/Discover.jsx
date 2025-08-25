import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../util/UserContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { Nav } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import ProfileCard from "./ProfileCard.jsx";

const Discover = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [discoverUsers, setDiscoverUsers] = useState([]);   
  const [webDevUsers, setWebDevUsers] = useState([]);
  const [mlUsers, setMlUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/register/getDetails`);
        setUser(data.data);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Session expired");
        localStorage.removeItem("userInfo");
        setUser(null);
        await axios.get("/logout");
        navigate("/login");
      }
    };
    const getDiscoverUsers = async () => {
      try {
        const { data } = await axios.get("/users/discover");
        setDiscoverUsers(data.data.forYou);
        setWebDevUsers(data.data.webDev);
        setMlUsers(data.data.ml);
        setOtherUsers(data.data.others);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Error fetching users");
        localStorage.removeItem("userInfo");
        setUser(null);
        await axios.get("/logout");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    getUser();
    getDiscoverUsers();
  }, []);

  return (
    <div className="bg-[#2d2d2d] min-h-screen text-white">
      <div className="flex ml-[30vw]">
        {/* Sidebar Nav */}
        <div className="bg-[#013e38] fixed top-0 left-0 h-screen w-[20vw] p-5 hidden md:flex flex-col justify-center items-center">
          <Nav className="flex flex-col gap-2 w-full">
            <Nav.Link href="#for-you" className="!text-[#f56664] text-xl ml-[-1rem]">
              For You
            </Nav.Link>
            <Nav.Link href="#popular" className="!text-[#3bb4a1] text-xl ml-[-1rem]">
              Popular
            </Nav.Link>
            <Nav.Link href="#web-development" className="!text-white">
              Web Development
            </Nav.Link>
            <Nav.Link href="#machine-learning" className="!text-white">
              Machine Learning
            </Nav.Link>
            <Nav.Link href="#others" className="!text-white">
              Others
            </Nav.Link>
          </Nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-full">
          {loading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              {/* For You */}
              <h1
                id="for-you"
                className="font-josefin text-3xl text-[#fbf1a4] mt-8 mb-4"
              >
                For You
              </h1>
              <div className="flex flex-wrap gap-6 px-4">
                {discoverUsers?.length > 0 ? (
                  discoverUsers.map((user) => (
                    <ProfileCard
                      key={user?.username}
                      profileImageUrl={user?.picture}
                      name={user?.name}
                      rating={user?.rating || 5}
                      bio={user?.bio}
                      skills={user?.skillsProficientAt}
                      username={user?.username}
                    />
                  ))
                ) : (
                  <h1 className="text-[#fbf1a4]">No users to show</h1>
                )}
              </div>

              {/* Popular */}
              <h1
                id="popular"
                className="font-josefin text-3xl text-[#fbf1a4] mt-4 mb-12"
              >
                Popular
              </h1>

              {/* Web Dev */}
              <h2
                id="web-development"
                className="font-montserrat text-2xl mt-20"
              >
                Web Development
              </h2>
              <div className="flex flex-wrap gap-6 px-4">
                {webDevUsers?.length > 0 ? (
                  webDevUsers.map((user) => (
                    <ProfileCard
                      key={user?.username}
                      profileImageUrl={user?.picture}
                      name={user?.name}
                      rating={4}
                      bio={user?.bio}
                      skills={user?.skillsProficientAt}
                      username={user?.username}
                    />
                  ))
                ) : (
                  <h1 className="text-[#fbf1a4]">No users to show</h1>
                )}
              </div>

              {/* Machine Learning */}
              <h2
                id="machine-learning"
                className="font-montserrat text-2xl mt-20"
              >
                Machine Learning
              </h2>
              <div className="flex flex-wrap gap-6 px-4">
                {mlUsers?.length > 0 ? (
                  mlUsers.map((user) => (
                    <ProfileCard
                      key={user?.username}
                      profileImageUrl={user?.picture}
                      name={user?.name}
                      rating={4}
                      bio={user?.bio}
                      skills={user?.skillsProficientAt}
                      username={user?.username}
                    />
                  ))
                ) : (
                  <h1 className="text-[#fbf1a4]">No users to show</h1>
                )}
              </div>

              {/* Others */}
              <h2 id="others" className="font-montserrat text-2xl mt-20">
                Others
              </h2>
              <div className="flex flex-wrap gap-6 px-4">
                {otherUsers?.length > 0 ? (
                  otherUsers.map((user) => (
                    <ProfileCard
                      key={user?.username}
                      profileImageUrl={user?.picture}
                      name={user?.name}
                      rating={4}
                      bio={user?.bio}
                      skills={user?.skillsProficientAt}
                      username={user?.username}
                    />
                  ))
                ) : (
                  <h1 className="text-[#fbf1a4]">No users to show</h1>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
