import { useContext, useState } from "react"; 
import StudentIndex from "../studentComp/Student-Index";
import StudentContext from "../context/studentContext/studentContext"; 
import { useEffect } from "react";

function Studenthome() {
  const { colorMode, setViewDevice } = useContext(StudentContext);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-500 ${
        colorMode ? "bg-[#0B1120] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <main >
        <StudentIndex />
      </main>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="relative z-10">{/* <QuizCard quizId={id} /> */}</div>
        </div>
      )}
    </div>
  );
}

export default Studenthome;
