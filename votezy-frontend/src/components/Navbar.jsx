 import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Candidates", path: "/candidates" },
    { name: "Voters", path: "/voters" },
    { name: "Vote", path: "/vote" },
    { name: "Results", path: "/results" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07111F]/95 text-white shadow-2xl backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-blue-500/10 text-xl shadow-lg">
            🗳️
          </div>

          <span className="text-2xl font-bold tracking-wide">
            Vote
            <span className="text-[#D4AF37]">
              zy
            </span>
          </span>

        </Link>


        {/* Navigation */}
        <div className="flex items-center gap-2">

          {navItems.map((item) => {

            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  rounded-lg
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {item.name}
              </Link>
            );

          })}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;