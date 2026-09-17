 
import { useEffect, useState } from "react";
import {
  getElectionResults,
  declareElectionResult,
} from "../services/api";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [declaring, setDeclaring] = useState(false);

  // Popup states
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Election name
  const electionName = "Delhi Election 2026";

  // =========================
  // GET RESULTS
  // =========================

  const loadResults = async () => {
    try {
      const response = await getElectionResults();

      console.log("Election Results:", response.data);

      setResults(response.data);
    } catch (error) {
      console.error("Error loading results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  // =========================
  // DECLARE RESULT
  // =========================

  const handleDeclareResult = async () => {
    try {
      setDeclaring(true);
      setErrorMessage("");

      const response = await declareElectionResult({
        electionName: electionName,
      });

      console.log("Declared Result:", response.data);

      // Refresh result
      await loadResults();

      // Show success popup
      setShowSuccess(true);

    } catch (error) {
      console.error("Error declaring result:", error);

      if (error.response) {
        setErrorMessage(
          error.response.data?.message ||
          "Unable to declare election result"
        );
      } else {
        setErrorMessage("Something went wrong!");
      }

    } finally {
      setDeclaring(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] px-6 py-12 text-white">

      <div className="mx-auto max-w-6xl">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="mb-10 text-center">

          <p className="font-semibold tracking-[0.3em] text-[#D4AF37]">
            VOTEZY
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Election Results
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            View officially declared election results and voting statistics.
          </p>

        </div>


        {/* ========================= */}
        {/* DECLARE RESULT */}
        {/* ========================= */}

        <div className="
          mb-10
          rounded-2xl
          border
          border-[#D4AF37]/20
          bg-white/[0.05]
          p-6
          text-center
          shadow-2xl
          backdrop-blur-xl
        ">

          <h2 className="text-xl font-bold">
            {electionName}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Ready to declare the official election result?
          </p>

          <button
            onClick={handleDeclareResult}
            disabled={declaring}
            className="
              mt-5
              rounded-xl
              bg-[#D4AF37]
              px-8
              py-3
              font-bold
              text-black
              transition
              duration-300
              hover:scale-105
              hover:bg-[#E5C158]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {declaring
              ? "Declaring Result..."
              : "🏆 Declare Result"}
          </button>

        </div>


        {/* ========================= */}
        {/* ERROR MESSAGE */}
        {/* ========================= */}

        {errorMessage && (

          <div className="
            mb-6
            rounded-xl
            border
            border-red-400/30
            bg-red-500/10
            p-4
            text-center
            text-red-400
          ">
            ❌ {errorMessage}
          </div>

        )}


        {/* ========================= */}
        {/* LOADING */}
        {/* ========================= */}

        {loading && (

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.05]
            p-12
            text-center
            shadow-2xl
            backdrop-blur-xl
          ">

            <div className="mb-4 text-5xl">
              ⏳
            </div>

            <h2 className="text-xl font-semibold">
              Loading Results
            </h2>

            <p className="mt-2 text-slate-400">
              Please wait while we fetch the election results.
            </p>

          </div>

        )}


        {/* ========================= */}
        {/* EMPTY */}
        {/* ========================= */}

        {!loading && results.length === 0 && (

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.05]
            p-12
            text-center
            shadow-2xl
            backdrop-blur-xl
          ">

            <div className="mb-4 text-6xl">
              🏆
            </div>

            <h2 className="text-2xl font-bold">
              No Election Results
            </h2>

            <p className="mt-3 text-slate-400">
              No election results have been declared yet.
            </p>

          </div>

        )}


        {/* ========================= */}
        {/* RESULTS */}
        {/* ========================= */}

        {!loading && results.length > 0 && (

          <div className="grid gap-6 md:grid-cols-2">

            {results.map((result, index) => (

              <div
                key={result.id ?? index}
                className="
                  group
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  p-8
                  shadow-2xl
                  backdrop-blur-xl
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D4AF37]/30
                "
              >

                {/* Trophy */}

                <div className="flex justify-center">

                  <div className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#D4AF37]/30
                    bg-[#D4AF37]/10
                    text-5xl
                  ">
                    🏆
                  </div>

                </div>


                {/* Election Name */}

                <div className="mt-6 text-center">

                  <h2 className="text-2xl font-bold">
                    {result.electionName}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Official Election Result
                  </p>

                </div>


                {/* Statistics */}

                <div className="mt-8 grid grid-cols-2 gap-4">

                  {/* Total Votes */}

                  <div className="
                    rounded-xl
                    border
                    border-white/10
                    bg-[#07111F]/80
                    p-5
                    text-center
                  ">

                    <p className="text-sm text-slate-400">
                      Total Votes
                    </p>

                    <p className="
                      mt-2
                      text-3xl
                      font-bold
                      text-blue-400
                    ">
                      {result.totalVotes}
                    </p>

                  </div>


                  {/* Winner Votes */}

                  <div className="
                    rounded-xl
                    border
                    border-[#D4AF37]/20
                    bg-[#D4AF37]/5
                    p-5
                    text-center
                  ">

                    <p className="text-sm text-slate-400">
                      Winner Votes
                    </p>

                    <p className="
                      mt-2
                      text-3xl
                      font-bold
                      text-[#D4AF37]
                    ">
                      {result.winnerVotes}
                    </p>

                  </div>

                </div>


                {/* Winning Candidate */}

                <div className="
                  mt-5
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                ">

                  <p className="
                    text-center
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400
                  ">
                    Winning Candidate
                  </p>


                  {/* Winner Name */}

                  <h3 className="
                    mt-3
                    text-center
                    text-3xl
                    font-bold
                    text-white
                  ">
                    {result.winnerName}
                  </h3>


                  {/* Winner Party */}

                  <p className="
                    mt-2
                    text-center
                    text-lg
                    font-semibold
                    text-[#D4AF37]
                  ">
                    {result.winnerParty}
                  </p>


                  {/* Winner ID */}

                  <p className="
                    mt-2
                    text-center
                    text-xs
                    text-slate-500
                  ">
                    Candidate ID: #{result.winnerId}
                  </p>

                </div>


                {/* Status */}

                <div className="mt-6 flex justify-center">

                  <span className="
                    rounded-full
                    border
                    border-green-400/20
                    bg-green-500/10
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    text-green-400
                  ">
                    ✓ Result Declared
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* ================================================= */}
      {/* SUCCESS POPUP */}
      {/* ================================================= */}

      {showSuccess && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          px-4
          backdrop-blur-sm
        ">

          <div className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-green-400/30
            bg-[#0B1929]
            p-8
            text-center
            shadow-2xl
          ">

            {/* Success Icon */}

            <div className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              border
              border-green-400/30
              bg-green-500/10
              text-5xl
            ">
              ✓
            </div>


            {/* Title */}

            <h2 className="
              mt-6
              text-2xl
              font-bold
              text-white
            ">
              Election Result Declared!
            </h2>


            {/* Message */}

            <p className="
              mt-3
              leading-relaxed
              text-slate-400
            ">
              Election result declared successfully!
            </p>


            {/* Election */}

            <div className="
              mt-5
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              p-4
            ">

              <p className="text-sm text-slate-400">
                Election
              </p>

              <p className="
                mt-1
                font-semibold
                text-[#D4AF37]
              ">
                {electionName}
              </p>

            </div>


            {/* Close */}

            <button
              onClick={() => setShowSuccess(false)}
              className="
                mt-6
                w-full
                rounded-xl
                bg-[#D4AF37]
                px-6
                py-3
                font-bold
                text-black
                transition
                hover:bg-[#E5C158]
              "
            >
              View Result
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Results;

