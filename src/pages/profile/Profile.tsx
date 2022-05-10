import "./profile.css";
import { useEffect, useState } from "react";
import { Footer, Loading, Navbar } from "../../components";
import { getErrorMessage, getUserDocument } from "../../utils";
import { useAuth } from "../../hooks";

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: "N",
    lastName: "A",
    email: "NA",
    totalAttemptedQuiz: 0,
    totalScore: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { firstName, lastName, email, totalAttemptedQuiz, totalScore } = userData;
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
            totalAttemptedQuiz: userProfile?.totalAttemptedQuiz,
            totalScore: userProfile?.totalScore,
          });
        }
        setIsLoading(false);
      } catch (err) {
        setError(`Error Occurred, Try again: ${getErrorMessage(err)}`);
      }
    })();
  }, [uid]);

  const evaluateLevel = () => {
    if (totalAttemptedQuiz === 0) return "Rookie";

    const ratio = totalScore / totalAttemptedQuiz;

    if (ratio > 40) {
      return "Master";
    } else if (20 <= ratio && ratio <= 40) {
      return "Advanced";
    } else if (ratio < 20) {
      return "Rookie";
    }
  };

  return (
    <div className="profile-wrapper">
      <Navbar />

      <main className="profile-container flex-column">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="profile flex-total-center flex-column">
            <h2 className="text-center">User Profile</h2>
            {error && <span className="text-center text-danger">{error}</span>}
            <div className="profile-info flex-total-center">
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
                  <span className="text-bold text-center">Name</span>
                  <span className="text-center">{`${firstName} ${lastName}`}</span>
                </div>

                <div className="info">
                  <span className="text-bold text-center">Email</span>
                  <span className="text-center">{email}</span>
                </div>
                <div className="quiz-stats">
                  <div className="stats-info">
                    <span className="text-bold">Total Attempted Quiz</span>
                    <span>{totalAttemptedQuiz}</span>
                  </div>
                  <div className="sub-stats">
                    <div className="sub-stats-info">
                      <span className="text-bold">Total Score</span>
                      <span>{totalScore}</span>
                    </div>
                    <div className="sub-stats-info">
                      <span className="text-bold">Level</span>
                      <span>{evaluateLevel()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-cta">
              <button
                title="Log Out"
                className="btn btn-outline-danger signout-btn text-center"
                onClick={() => logout()}
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export { Profile };
