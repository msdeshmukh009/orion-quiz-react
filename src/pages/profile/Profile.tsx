import "./profile.css";
import { useEffect, useState } from "react";
import { Footer, Loading, Navbar } from "../../components";
import { getUserDocument } from "../../utils";
import { useAuth } from "../../hooks";

const Profile = () => {
  const [userData, setUserData] = useState({ firstName: "N", lastName: "A", email: "NA" });
  const [isLoading, setIsLoading] = useState(false);
  const { firstName, lastName, email } = userData;
  const {
    logout,
    authState: { uid },
  } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const userProfile = await getUserDocument(uid);
        if (userProfile) {
          setUserData({
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            email: userProfile?.email,
          });
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [uid]);

  return (
    <div className="profile-wrapper">
      <Navbar />
      <main className="profile-container flex-column">
        <h2 className="text-center">User Profile</h2>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="profile">
            <div className="profile-info flex-total-center flex-column">
              <div
                className="avatar avatar-lg-size text-avatar cursor-pointer flex-total-center"
                role="img"
                title={`${firstName} ${lastName}`}
              >
                {isLoading ? (
                  <span className="text-sm">Loading...</span>
                ) : (
                  <span>{firstName[0].toUpperCase() + lastName[0].toUpperCase()}</span>
                )}
              </div>

              <div className="details flex-total-center flex-column">
                <div className="info">
                  <span className="text-bold">Name</span>
                  <span>{`${firstName} ${lastName}`}</span>
                </div>

                <div className="info">
                  <span className="text-bold">Email</span>
                  <span>{email}</span>
                </div>
              </div>
              <div className="profile-cta">
                <button className="btn btn-primary block-btn" onClick={() => logout()}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export { Profile };
