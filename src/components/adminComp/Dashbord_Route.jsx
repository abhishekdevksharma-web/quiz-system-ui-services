import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminContext from "../../context/adminContext/adminContext"; 
import StatCard from "./Dashbord_Stats";
 
import QuizPreview from "../components/QuizPreview";
import RecentQuizList from "../components/RecentQuizList";
import QuickActions from "../components/QuickActions"; 
import NotifyModal from "./NotifyModal";

function Home() {
  const {
    fetchRecentQuizes,
    adminRecentQuizHistory,
    setadminRecentQuizHistory,
    userDetails,
    setuserDetails,
    colorMode,
    Dashboard,
    IsAuthenticate,
  } = useContext(AdminContext);

  const navigate = useNavigate();

  const [isfechedRecentQuiz, setisfechedRecentQuiz] = useState(false);
  const [isFetchingStats, setIsFetchingStats] = useState(false);
  const [stats, setStats] = useState([]);
  const [selectedPreviewQuizId, setSelectedPreviewQuizId] = useState(0);

  const [notify, setNotify] = useState(null);

  const confirm = (options) => {
    return new Promise((resolve) => {
      setNotify({
        ...options,
        resolve,
      });
    });
  };

  const handleConfirm = () => {
    notify?.resolve(true);
    setNotify(null);
  };

  const handleClose = () => {
    notify?.resolve(false);
    setNotify(null);
  };

  useEffect(() => {
    initialMounting();
    if (!IsAuthenticate) {
      return;
    }
    async function initialMounting() {
 
      setStats([
        {
          title: "Total Quizzes",
          value: "--",
        },
        {
          title: "Active Quizzes",
          value: "--",
        },
      ]);
    }
    async function initialFetches() {
      try {
        setisfechedRecentQuiz(true);
        setIsFetchingStats(true);

        const { user, activeQuizzes } = await Dashboard();

        setStats((prev) => [
          {
            title: "Total Quizzes",
            value: user.totalQuizs,
          },
          {
            title: "Active Quizzes",
            value: activeQuizzes.length,
          },
        ]);

        setuserDetails({
          name: user.name,
          email: user.email,
        });

        setadminRecentQuizHistory(user.recentQuizzes);
      } catch (error) {
      } finally {
        setisfechedRecentQuiz(false);
        setIsFetchingStats(false);
      }
    }
    initialFetches();
  }, [IsAuthenticate]);

  return (
    <div
      className={
        "min-h-screen h-fit transition-colors duration-300 " +
        (colorMode
          ? "bg-slate-950 text-slate-100"
          : "bg-amber-100/20 text-slate-900")
      }
    >
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(isFetchingStats ? new Array(4).fill({ span: 1 }) : stats).map(
            (item, i) => (
              <div key={i}>
                <StatCard colorMode={colorMode} data={item} />
              </div>
            ),
          )}
        </div>

        {/* Recent Quizzes + Actions */}
        <div className="grid 100 gap-6 lg:grid-cols-3 items-start">
          {/* Recent Quizzes */}
          <RecentQuizList
            setSelectedPreview={setSelectedPreviewQuizId}
            colorMode
            quizHistory={adminRecentQuizHistory}
          />

          {/* Quiz Preview */}
          <QuizPreview
            key={0}
            quiz={adminRecentQuizHistory[selectedPreviewQuizId] || {}}
            colorMode
          />

          {/* Right Panel - Quick Actions */}
          <QuickActions colorMode confirm={confirm} />
        </div>
      </main>

      {/* Notify Modal  */}
      {notify && (
        <NotifyModal
          type="confirm"
          title={notify.title}
          message={notify.message}
          onConfirm={handleConfirm}
          onClose={handleClose}
          colorMode={colorMode}
        />
      )}
    </div>
  );
}

export default Home;
