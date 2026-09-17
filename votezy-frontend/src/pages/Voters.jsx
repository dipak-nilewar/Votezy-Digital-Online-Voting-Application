 import { useEffect, useState } from "react";

import {
  getVoters,
  registerVoter,
  updateVoter,
  deleteVoter,
} from "../services/api";

import {
  successAlert,
  errorAlert,
  warningAlert,
  confirmAlert,
} from "../utils/alert";


function Voters() {

  const [voters, setVoters] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);


  // =========================
  // Load Voters
  // =========================

  const loadVoters = async () => {

    try {

      const response = await getVoters();

      setVoters(response.data);

    } catch (error) {

      console.error(error);

      errorAlert("Unable to load voters.");

    }

  };


  useEffect(() => {

    loadVoters();

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
  // Form Submit
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Name validation

    if (!form.name.trim()) {

      warningAlert("Voter name is required.");

      return;

    }


    // Email validation

    if (!form.email.trim()) {

      warningAlert("Email is required.");

      return;

    }


    // Email format validation

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {

      warningAlert(
        "Please enter a valid email address."
      );

      return;

    }


    try {

      setLoading(true);


      // UPDATE

      if (editingId) {

        await updateVoter(editingId, form);

        await successAlert(
          "Voter has been updated successfully!"
        );

      }


      // REGISTER

      else {

        await registerVoter(form);

        await successAlert(
          "Voter has been registered successfully!"
        );

      }


      // Reset form

      setForm({
        name: "",
        email: "",
      });

      setEditingId(null);


      // Reload voters

      await loadVoters();

    } catch (error) {

      console.error(error);

      errorAlert(
        error.response?.data?.message ||
        "Unable to save voter."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // Edit
  // =========================

  const handleEdit = (voter) => {

    setEditingId(voter.id);

    setForm({
      name: voter.name,
      email: voter.email,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =========================
  // Cancel Edit
  // =========================

  const handleCancel = () => {

    setEditingId(null);

    setForm({
      name: "",
      email: "",
    });

  };


  // =========================
  // Delete
  // =========================

  const handleDelete = async (id) => {

    const confirmed = await confirmAlert(
      "This voter will be permanently deleted."
    );


    if (!confirmed) {

      return;

    }


    try {

      await deleteVoter(id);

      await successAlert(
        "Voter has been deleted successfully!"
      );

      await loadVoters();

    } catch (error) {

      console.error(error);

      errorAlert(
        error.response?.data?.message ||
        "Unable to delete voter."
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
            Voter Management
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Register and manage voters securely through
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
                ? "Update Voter"
                : "Register New Voter"}

            </h2>

            <p className="mt-2 text-sm text-slate-400">

              {editingId
                ? "Update the voter information below."
                : "Enter voter details to register a new voter."}

            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >


            {/* Name */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Voter Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter voter name"
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


            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={form.email}
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
                    ? "Update Voter"
                    : "Register Voter"}

              </button>


              {editingId && (

                <button
                  type="button"
                  onClick={handleCancel}
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
        {/* VOTER LIST HEADER */}
        {/* ================================= */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Registered Voters
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Total voters: {voters.length}
            </p>

          </div>

        </div>


        {/* ================================= */}
        {/* EMPTY STATE */}
        {/* ================================= */}

        {voters.length === 0 && (

          <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-12
            text-center
          ">

            <div className="mb-4 text-5xl">
              👥
            </div>

            <h3 className="text-xl font-semibold">
              No Voters Found
            </h3>

            <p className="mt-2 text-slate-400">
              Register your first voter using the form above.
            </p>

          </div>

        )}


        {/* ================================= */}
        {/* VOTER LIST */}
        {/* ================================= */}

        <div className="space-y-4">

          {voters.map((voter) => (

            <div
              key={voter.id}
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                p-5
                shadow-xl
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-1
                hover:border-blue-400/30
              "
            >

              <div className="
                flex
                flex-col
                gap-5
                md:flex-row
                md:items-center
                md:justify-between
              ">


                {/* Voter Information */}

                <div className="flex items-center gap-4">

                  <div className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-blue-400/20
                    bg-blue-500/10
                    text-2xl
                  ">
                    👤
                  </div>


                  <div>

                    <h3 className="text-lg font-bold">
                      {voter.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {voter.email}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Voter ID: #{voter.id}
                    </p>

                  </div>

                </div>


                {/* Actions */}

                <div className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                ">


                  {/* Voting Status */}

                  <span
                    className={`
                      rounded-full
                      border
                      px-4
                      py-2
                      text-xs
                      font-semibold
                      ${
                        voter.hasVoted
                          ? "border-green-400/20 bg-green-500/10 text-green-400"
                          : "border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]"
                      }
                    `}
                  >

                    {voter.hasVoted
                      ? "✓ Vote Cast"
                      : "○ Not Voted"}

                  </span>


                  {/* Edit */}

                  <button
                    onClick={() => handleEdit(voter)}
                    className="
                      rounded-lg
                      border
                      border-[#D4AF37]/30
                      px-4
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


                  {/* Delete */}

                  <button
                    onClick={() => handleDelete(voter.id)}
                    className="
                      rounded-lg
                      border
                      border-red-400/20
                      px-4
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

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Voters;