 import { useEffect, useState } from "react";

import {
  getVoters,
  getCandidates,
  castVote,
} from "../services/api";

import {
  successAlert,
  errorAlert,
  warningAlert,
  confirmAlert,
} from "../utils/alert";


function Vote() {

  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [voterId, setVoterId] = useState("");
  const [candidateId, setCandidateId] = useState("");

  const [loading, setLoading] = useState(false);


  // =========================
  // Load Voting Data
  // =========================

  const loadData = async () => {

    try {

      const [voterResponse, candidateResponse] =
        await Promise.all([
          getVoters(),
          getCandidates(),
        ]);

      setVoters(voterResponse.data);
      setCandidates(candidateResponse.data);

    } catch (error) {

      console.error(error);

      errorAlert("Unable to load voting data.");

    }

  };


  useEffect(() => {

    loadData();

  }, []);


  // =========================
  // Cast Vote
  // =========================

  const handleVote = async (e) => {

    e.preventDefault();


    // Voter validation

    if (!voterId) {

      warningAlert("Please select a voter.");

      return;

    }


    // Candidate validation

    if (!candidateId) {

      warningAlert("Please select a candidate.");

      return;

    }


    // Find voter

    const voter = voters.find(
      (voter) => voter.id === Number(voterId)
    );


    // Already voted

    if (voter?.hasVoted) {

      warningAlert(
        "This voter has already cast their vote."
      );

      return;

    }


    // Find candidate

    const candidate = candidates.find(
      (candidate) => candidate.id === Number(candidateId)
    );


    if (!candidate) {

      errorAlert("Candidate not found.");

      return;

    }


    // Confirmation popup

    const confirmed = await confirmAlert(
      `Cast your vote for ${candidate.name} from ${candidate.party}?`
    );


    if (!confirmed) {

      return;

    }


    try {

      setLoading(true);


      // API call

      const response = await castVote({

        voterId: Number(voterId),

        candidateId: Number(candidateId),

      });


      // Success popup

      await successAlert(
        response.data.message ||
        "Your vote has been cast successfully!"
      );


      // Reset

      setVoterId("");

      setCandidateId("");


      // Refresh data

      await loadData();

    } catch (error) {

      console.error(error);

      errorAlert(
        error.response?.data?.message ||
        "Unable to cast vote."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-[#07111F] px-6 py-12 text-white">

      <div className="mx-auto max-w-3xl">


        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <div className="mb-10 text-center">

          <p className="font-semibold tracking-[0.3em] text-[#D4AF37]">
            VOTEZY
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Cast Your Vote
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Make your choice securely and confidently
            through the Votezy digital voting platform.
          </p>

        </div>


        {/* ================================= */}
        {/* VOTING CARD */}
        {/* ================================= */}

        <div className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.05]
          p-8
          shadow-2xl
          backdrop-blur-xl
        ">


          {/* Voting Icon */}

          <div className="mb-8 text-center">

            <div className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              border
              border-blue-400/20
              bg-blue-500/10
              text-4xl
              shadow-lg
              shadow-blue-500/10
            ">
              🗳️
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Secure Voting
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Select a registered voter and their preferred candidate.
            </p>

          </div>


          <form
            onSubmit={handleVote}
            className="space-y-6"
          >


            {/* ================================= */}
            {/* SELECT VOTER */}
            {/* ================================= */}

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-300
              ">
                Select Voter
              </label>

              <select
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-[#07111F]
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              >

                <option value="" className="bg-[#07111F]">
                  -- Select Voter --
                </option>


                {voters.map((voter) => (

                  <option
                    key={voter.id}
                    value={voter.id}
                    disabled={voter.hasVoted}
                    className="bg-[#07111F]"
                  >

                    {voter.name}

                    {voter.hasVoted
                      ? " — Already Voted"
                      : ""}

                  </option>

                ))}

              </select>

            </div>


            {/* ================================= */}
            {/* SELECT CANDIDATE */}
            {/* ================================= */}

            <div>

              <label className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-300
              ">
                Select Candidate
              </label>

              <select
                value={candidateId}
                onChange={(e) => setCandidateId(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-[#07111F]
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              >

                <option value="" className="bg-[#07111F]">
                  -- Select Candidate --
                </option>


                {candidates.map((candidate) => (

                  <option
                    key={candidate.id}
                    value={candidate.id}
                    className="bg-[#07111F]"
                  >

                    {candidate.name}
                    {" — "}
                    {candidate.party}

                  </option>

                ))}

              </select>

            </div>


            {/* ================================= */}
            {/* SELECTED CANDIDATE PREVIEW */}
            {/* ================================= */}

            {candidateId && (

              <div className="
                rounded-xl
                border
                border-[#D4AF37]/20
                bg-[#D4AF37]/5
                p-5
              ">

                <p className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[#D4AF37]
                ">
                  Selected Candidate
                </p>

                <div className="mt-2 flex items-center gap-4">

                  <div className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#D4AF37]/20
                    bg-[#D4AF37]/10
                    text-xl
                  ">
                    👤
                  </div>

                  <div>

                    <h3 className="font-bold">

                      {
                        candidates.find(
                          (candidate) =>
                            candidate.id === Number(candidateId)
                        )?.name
                      }

                    </h3>

                    <p className="text-sm text-slate-400">

                      {
                        candidates.find(
                          (candidate) =>
                            candidate.id === Number(candidateId)
                        )?.party
                      }

                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* ================================= */}
            {/* CAST VOTE BUTTON */}
            {/* ================================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-blue-500
                py-4
                font-bold
                shadow-lg
                shadow-blue-600/20
                transition
                hover:-translate-y-0.5
                hover:from-blue-500
                hover:to-blue-400
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {loading
                ? "Casting Vote..."
                : "🗳️ Cast Vote"}

            </button>

          </form>


          {/* Security Message */}

          <div className="
            mt-6
            rounded-xl
            border
            border-green-400/10
            bg-green-500/5
            p-4
            text-center
          ">

            <p className="text-sm text-green-400">
              🔒 Your vote is securely recorded.
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Vote;