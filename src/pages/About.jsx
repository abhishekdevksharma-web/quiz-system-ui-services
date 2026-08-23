import React from "react";
import {
  BookOpen,
  Users,
  Trophy,
  ShieldCheck,
  Target,
  Clock,
} from "lucide-react";

function About({ colorMode = true }) {
  const features = [
    {
      icon: <BookOpen size={28} />,
      title: "Smart Quiz Management",
      description:
        "Create, organize, and manage quizzes with an intuitive dashboard.",
    },
    {
      icon: <Clock size={28} />,
      title: "Timed Assessments",
      description:
        "Run duration-based or scheduled quizzes with automatic timer support.",
    },
    {
      icon: <Users size={28} />,
      title: "Student Friendly",
      description:
        "Simple interface that allows students to join and complete quizzes effortlessly.",
    },
    {
      icon: <Trophy size={28} />,
      title: "Instant Results",
      description:
        "View scores, rankings, and performance immediately after submission.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Platform",
      description:
        "Reliable submission process with protected quiz data and responses.",
    },
    {
      icon: <Target size={28} />,
      title: "Performance Tracking",
      description:
        "Analyze attempts, completion rates, and student progress over time.",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        colorMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="inline-block rounded-full bg-blue-500/10 text-blue-500 px-4 py-1 text-sm font-medium">
          About Our Platform
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Smarter Online Quiz Experience
        </h1>

        <p
          className={`mt-6 max-w-3xl mx-auto text-lg ${
            colorMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Our platform helps educators create engaging quizzes and enables
          students to participate seamlessly. Whether it's classroom
          assessments, practice tests, or competitive examinations, we make the
          entire process fast, secure, and user-friendly.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div
          className={`rounded-3xl p-10 border ${
            colorMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>

          <p
            className={`leading-8 ${
              colorMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            We aim to simplify digital assessments by providing an efficient,
            secure, and interactive quiz system. Our goal is to empower
            teachers, institutions, and organizations with tools that make
            learning measurable and enjoyable.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-7 transition hover:-translate-y-2 hover:shadow-xl ${
                colorMode
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <p
                className={
                  colorMode ? "text-slate-400" : "text-slate-600"
                }
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div
          className={`grid md:grid-cols-4 gap-6 rounded-3xl p-10 ${
            colorMode
              ? "bg-gradient-to-r from-slate-900 to-slate-800"
              : "bg-gradient-to-r from-blue-50 to-indigo-100"
          }`}
        >
          {[
            ["10K+", "Students"],
            ["500+", "Quizzes"],
            ["100+", "Teachers"],
            ["99.9%", "Uptime"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <h3 className="text-4xl font-bold text-blue-500">{value}</h3>
              <p
                className={`mt-2 ${
                  colorMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div
          className={`rounded-3xl p-12 text-center ${
            colorMode
              ? "bg-blue-600"
              : "bg-blue-500 text-white"
          }`}
        >
          <h2 className="text-4xl font-bold">
            Ready to Start Your Learning Journey?
          </h2>

          <p className="mt-4 text-lg opacity-90">
            Join thousands of students and educators using our platform to make
            online assessments easier and more effective.
          </p>

          <button className="mt-8 rounded-xl bg-white text-blue-600 px-8 py-3 font-semibold hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;