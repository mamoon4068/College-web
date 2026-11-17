
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Images, Megaphone, CalendarDays,
  ArrowUpRight, Plus, Activity,
} from "lucide-react";
import { api, getError } from "../lib/api";
import {
  PageHeader, Reveal, Loading, Alert, panelClass,
} from "../components/AdminUI";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([
      api.get("/admin/notices"),
      api.get("/admin/events"),
      api.get("/admin/gallery"),
    ])
      .then(([notices, events, gallery]) => {
        if (!active) return;
        setStats({
          notices: notices.data.notices?.length ?? 0,
          events: events.data.events?.length ?? 0,
          gallery: gallery.data.gallery?.length ?? 0,
        });
      })
      .catch((err) => {
        if (active) setError(getError(err));
      });

    return () => { active = false; };
  }, []);

  const cards = [
    {
      title: "Total Notices",
      value: stats?.notices,
      icon: Megaphone,
      path: "/admin/notices",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "School Events",
      value: stats?.events,
      icon: CalendarDays,
      path: "/admin/events",
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Gallery Photos",
      value: stats?.gallery,
      icon: Images,
      path: "/admin/gallery",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <Reveal watch={Boolean(stats)}>
      <div data-gsap-reveal>
        <PageHeader
          title="Dashboard Overview"
          subtitle="Welcome back! Here's your school content overview."
        />
      </div>

      <Alert message={error} />

      {!stats && !error ? (
        <Loading />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map(({ title, value, icon: Icon, path, color }) => (
              <Link
                data-gsap-reveal
                key={title}
                to={path}
                className={`${panelClass} group p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className="flex items-start justify-between">
                  <div className={`rounded-2xl p-4 ${color}`}>
                    <Icon size={26} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </div>
                <p className="mt-7 text-4xl font-black text-[#102C50]">
                  {value ?? "—"}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  {title}
                </p>
              </Link>
            ))}
          </div>

          <div
            data-gsap-reveal
            className={`${panelClass} mt-7 overflow-hidden p-7`}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Activity size={23} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#102C50]">
                  Quick Actions
                </h2>
                <p className="text-sm text-slate-500">
                  Manage your school website content
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {cards.map((card) => (
                <Link
                  key={card.path}
                  to={card.path}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-[#102C50] transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50"
                >
                  <Plus size={17} />
                  Manage {card.title}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </Reveal>
  );
}
