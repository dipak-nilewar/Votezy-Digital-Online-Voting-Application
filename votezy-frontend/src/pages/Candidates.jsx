 import { useEffect, useState } from "react";

import {
  getCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} from "../services/api";

import {
  successAlert,
  errorAlert,
  warningAlert,
  confirmAlert,
} from "../utils/alert";


function Candidates() {

  const [candidates, setCandidates] = useState([]);

  const [form, setForm] = useState({
    name: "",
    party: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);


  // =========================
  // Load Candidates
  // =========================

  const loadCandidates = async () => {

    try {

      const response = await getCandidates();

      setCandidates(response.data);

    } catch (error) {

      console.error(error);

      errorAlert("Unable to load candidates.");

    }

  };


  useEffect(() => {

    loadCandidates();

  }, []);


  // =========================
  // Input Change
  // =========================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  // =========================
  // Submit
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Validation

    if (!form.name.trim()) {

      warningAlert("Candidate name is required.");

      return;

    }


    if (!form.party.trim()) {

      warningAlert("Political party is required.");

      return;

    }


    try {

      setLoading(true);


      // UPDATE

      if (editingId) {

        await updateCandidate(editingId, form);

        await successAlert(
          "Candidate has been updated successfully!"
        );

      }


      // ADD

      else {

        await addCandidate(form);

        await successAlert(
          "Candidate has been added successfully!"
        );

      }


      // Reset

      setForm({
        name: "",
        party: "",
      });

      setEditingId(null);


      // Reload

      await loadCandidates();

    } catch (error) {

      console.error(error);

      errorAlert(
        error.response?.data?.message ||
        "Unable to save candidate."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // Edit
  // =========================

  const handleEdit = (candidate) => {

    setEditingId(candidate.id);

    setForm({
      name: candidate.name,
      party: candidate.party,
    });


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =========================
  // Cancel
  // =========================

  const cancelEdit = () => {

    setEditingId(null);

    setForm({
      name: "",
      party: "",
    });

  };


  // =========================
  // Delete
  // =========================

  const handleDelete = async (id) => {

    const confirmed = await confirmAlert(
      "This candidate will be permanently deleted."
    );


    if (!confirmed) {

      return;

    }


    try {

      await deleteCandidate(id);

      await successAlert(
        "Candidate has been deleted successfully!"
      );

      await loadCandidates();

    } catch (error) {

      console.error(error);

      errorAlert(
        error.response?.data?.message ||
        "Unable to delete candidate."
      );

    }

  };


  return (

    <div className="min-h-screen bg-[#07111F] px-6 py-12 text-white">

      <div className="mx-auto max-w-6xl">


        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <div className="mb-10 text-center">

          <p className="font-semibold tracking-[0.3em] text-[#D4AF37]">
            VOTEZY
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Candidate Management
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Add and manage election candidates through
            the Votezy digital voting platform.
          </p>

        </div>


        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <div className="
          mb-12
          rounded-2xl
          border
          border-white/10
          bg-white/[0.05]
          p-8
          shadow-2xl
          backdrop-blur-xl
        ">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">

              {editingId
                ? "Update Candidate"
                : "Add New Candidate"}

            </h2>

            <p className="mt-2 text-sm text-slate-400">

              {editingId
                ? "Update candidate information below."
                : "Enter candidate details to add them to the election."}

            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >


            {/* Candidate Name */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Candidate Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter candidate name"
                value={form.name}
                onChange={handleChange}
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
                  placeholder:text-slate-600
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />

            </div>


            {/* Party */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Political Party
              </label>

              <input
                type="text"
                name="party"
                placeholder="Enter political party"
                value={form.party}
                onChange={handleChange}
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
                  placeholder:text-slate-600
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />

            </div>


            {/* Buttons */}

            <div className="flex gap-4 md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="
                  flex-1
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-500
                  py-3
                  font-semibold
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
                  ? "Please wait..."
                  : editingId
                    ? "Update Candidate"
                    : "Add Candidate"}

              </button>


              {editingId && (

                <button
                  type="button"
                  onClick={cancelEdit}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-8
                    font-semibold
                    text-slate-300
                    transition
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </div>


        {/* ================================= */}
        {/* CANDIDATE LIST HEADER */}
        {/* ================================= */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Election Candidates
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Total candidates: {candidates.length}
            </p>

          </div>

        </div>


        {/* ================================= */}
        {/* EMPTY STATE */}
        {/* ================================= */}

        {candidates.length === 0 && (

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-12
            text-center
          ">

            <div className="mb-4 text-5xl">
              🧑‍💼
            </div>

            <h3 className="text-xl font-semibold">
              No Candidates Found
            </h3>

            <p className="mt-2 text-slate-400">
              Add your first candidate using the form above.
            </p>

          </div>

        )}


        {/* ================================= */}
        {/* CANDIDATE CARDS */}
        {/* ================================= */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {candidates.map((candidate) => (

            <div
              key={candidate.id}
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                p-6
                shadow-xl
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-2
                hover:border-blue-400/30
              "
            >


              {/* Candidate Icon */}

              <div className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                border
                border-blue-400/20
                bg-blue-500/10
                text-3xl
              ">
                👤
              </div>


              {/* Name */}

              <h3 className="mt-5 text-center text-xl font-bold">
                {candidate.name}
              </h3>


              {/* Party */}

              <p className="
                mt-2
                text-center
                text-sm
                font-medium
                text-[#D4AF37]
              ">
                {candidate.party}
              </p>


              {/* Votes */}

              <div className="
                mt-6
                rounded-xl
                border
                border-white/10
                bg-[#07111F]/70
                p-5
                text-center
              ">

                <p className="text-sm text-slate-400">
                  Total Votes
                </p>

                <p className="
                  mt-1
                  text-4xl
                  font-bold
                  text-blue-400
                ">
                  {candidate.voteCount ?? 0}
                </p>

              </div>


              {/* Actions */}

              <div className="mt-5 flex gap-3">

                <button
                  onClick={() => handleEdit(candidate)}
                  className="
                    flex-1
                    rounded-lg
                    border
                    border-[#D4AF37]/30
                    py-2
                    text-sm
                    font-semibold
                    text-[#D4AF37]
                    transition
                    hover:bg-[#D4AF37]/10
                  "
                >
                  Edit
                </button>


                <button
                  onClick={() => handleDelete(candidate.id)}
                  className="
                    flex-1
                    rounded-lg
                    border
                    border-red-400/20
                    py-2
                    text-sm
                    font-semibold
                    text-red-400
                    transition
                    hover:bg-red-500/10
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Candidates;