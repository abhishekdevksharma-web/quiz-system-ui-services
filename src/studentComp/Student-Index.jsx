import React, { useContext, useEffect, useState } from "react";
import HeroBanner from "./components/HeroBanner";
import AttemptQuizHistory from "./components/AttemptQuizHistory";
import RecentPerformance from "./components/RecentPerformance";
import QuickActions from "./components/QuickActions";
import SearchModal from "./ModalComp/SearchModal";
import StudentContext from "../context/studentContext/studentContext";

function StudentIndex() {
  const { colorMode, userMeta, studentIsAuth, viewDevice, setViewDevice } =
    useContext(StudentContext);

  useEffect(() => {
    const updateDevice = () => {
      if (window.innerWidth < 768) {
        setViewDevice("mobile");
      } else if (window.innerWidth < 1024) {
        setViewDevice("tablet");
      } else {
        setViewDevice("desktop");
      }
    };

    updateDevice();

    window.addEventListener("resize", updateDevice);

    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, []);

  const [heroBannerLoading, setHeroBannerLoading] = useState(false);

  const [recentPerformance, setRecentPerformance] = useState({});
  const [recentPerformanceLoading, setRecentPerformanceLoading] =
    useState(false);
  const [quickActionsLoading, setQuickActionsLoading] = useState(false);

  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

  useEffect(() => {
    if (!studentIsAuth) return; 
  }, [studentIsAuth]);

  return (
    <div className="mx-auto w-screen h-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Section - Premium Look */}
      <HeroBanner
        name={userMeta.student.name}
        colorMode={colorMode}
        loading={heroBannerLoading}
        setSearchModalIsOpen={setSearchModalIsOpen}
      />

      {/* Main Content Area */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
        {/* Recent Activity */}
        <AttemptQuizHistory
          setRecentPerformance={setRecentPerformance}
          colorMode={colorMode}
          studentIsAuth={studentIsAuth}
        />

        {/* Today's Goal */}
        <RecentPerformance
          colorMode={colorMode}
          loading={recentPerformanceLoading}
          recentPerformance={recentPerformance}
        />

        {/* Quick Actions */}
        <QuickActions
          colorMode={colorMode}
          setSearchModalIsOpen={setSearchModalIsOpen}
          loading={quickActionsLoading}
        />
      </section>

      <SearchModal
        isOpen={searchModalIsOpen}
        onClose={() => setSearchModalIsOpen(false)}
      />
    </div>
  );
}

export default StudentIndex;
