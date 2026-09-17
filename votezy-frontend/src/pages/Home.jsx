 import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#07111F] text-white">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07111F] via-[#0B1B33] to-[#102A56]" />

        {/* Blue Glow */}
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        {/* Gold Glow */}
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />

        {/* Decorative Circle */}
        <div className="absolute right-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-blue-400/10" />

        <div className="absolute right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-[#D4AF37]/10" />


        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl items-center px-6">

          <div className="max-w-3xl">

            {/* Small Heading */}
            <p className="mb-5 font-semibold tracking-[0.3em] text-[#D4AF37]">
              SECURE • DIGITAL • TRUSTED
            </p>


            {/* Main Heading */}
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">

              The Future of

              <span className="block bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Digital Voting
              </span>

            </h1>


            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">

              Vote securely, transparently and confidently
              with Votezy's modern digital voting platform.

            </p>


            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              {/* Vote Button */}
              <Link
                to="/vote"
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-500
                  px-7
                  py-3
                  font-semibold
                  shadow-lg
                  shadow-blue-600/30
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:from-blue-500
                  hover:to-blue-400
                "
              >
                Cast Your Vote →
              </Link>


              {/* Candidate Button */}
              <Link
                to="/candidates"
                className="
                  rounded-xl
                  border
                  border-[#D4AF37]/50
                  px-7
                  py-3
                  font-semibold
                  text-[#D4AF37]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#D4AF37]/10
                "
              >
                View Candidates
              </Link>

            </div>


            {/* Trust Information */}
            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-6">

              <div>
                <p className="text-2xl font-bold">
                  100%
                </p>

                <p className="text-sm text-slate-400">
                  Secure
                </p>
              </div>


              <div>
                <p className="text-2xl font-bold">
                  24/7
                </p>

                <p className="text-sm text-slate-400">
                  Available
                </p>
              </div>


              <div>
                <p className="text-2xl font-bold">
                  🔒
                </p>

                <p className="text-sm text-slate-400">
                  Protected
                </p>
              </div>

            </div>

          </div>


          {/* Right Side Voting Illustration */}
          <div className="absolute right-10 hidden lg:block">

            <div className="relative flex h-80 w-80 items-center justify-center">

              {/* Outer Ring */}
              <div className="absolute h-80 w-80 rounded-full border border-blue-400/10" />

              {/* Middle Ring */}
              <div className="absolute h-64 w-64 rounded-full border border-[#D4AF37]/10" />

              {/* Voting Box */}
              <div className="
                relative
                flex
                h-44
                w-52
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.06]
                shadow-2xl
                backdrop-blur-xl
              ">

                <div className="text-6xl">
                  🗳️
                </div>

                <p className="mt-3 text-sm font-semibold tracking-wider text-slate-300">
                  SECURE VOTING
                </p>

              </div>

              {/* Gold Dot */}
              <div className="absolute right-4 top-10 h-3 w-3 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50" />

              {/* Blue Dot */}
              <div className="absolute bottom-10 left-4 h-3 w-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />

            </div>

          </div>

        </div>

      </section>


      {/* Features Section */}
      <section className="border-t border-white/10 bg-[#07111F] px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">

            <p className="font-semibold tracking-[0.25em] text-[#D4AF37]">
              WHY VOTEZY
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Simple. Secure. Transparent.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Everything you need for a modern digital election experience.
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              p-7
              shadow-xl
              backdrop-blur-xl
              transition
              duration-300
              hover:-translate-y-2
              hover:border-blue-400/30
            ">

              <div className="mb-5 text-4xl">
                🔐
              </div>

              <h3 className="text-xl font-bold">
                Secure Voting
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Designed to keep the voting process safe,
                controlled and reliable.
              </p>

            </div>


            {/* Card 2 */}
            <div className="
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              p-7
              shadow-xl
              backdrop-blur-xl
              transition
              duration-300
              hover:-translate-y-2
              hover:border-[#D4AF37]/30
            ">

              <div className="mb-5 text-4xl">
                ⚡
              </div>

              <h3 className="text-xl font-bold">
                Fast & Easy
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                A simple interface makes registration,
                candidate selection and voting easy.
              </p>

            </div>


            {/* Card 3 */}
            <div className="
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              p-7
              shadow-xl
              backdrop-blur-xl
              transition
              duration-300
              hover:-translate-y-2
              hover:border-blue-400/30
            ">

              <div className="mb-5 text-4xl">
                📊
              </div>

              <h3 className="text-xl font-bold">
                Transparent Results
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                View candidate vote counts and election
                results through a clear dashboard.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;