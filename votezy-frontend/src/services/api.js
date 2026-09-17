 import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// Candidate APIs
// =========================

export const getCandidates = () => {
  return API.get("/api/candidate");
};

export const getCandidateById = (id) => {
  return API.get(`/api/candidate/${id}`);
};

export const addCandidate = (candidate) => {
  return API.post("/api/candidate/add", candidate);
};

export const updateCandidate = (id, candidate) => {
  return API.put(`/api/candidate/update/${id}`, candidate);
};

export const deleteCandidate = (id) => {
  return API.delete(`/api/candidate/delete/${id}`);
};

// =========================
// Voter APIs
// =========================

export const getVoters = () => {
  return API.get("/api/voters");
};

export const getVoterById = (id) => {
  return API.get(`/api/voters/${id}`);
};

export const registerVoter = (voter) => {
  return API.post("/api/voters/register", voter);
};

export const updateVoter = (id, voter) => {
  return API.put(`/api/voters/update/${id}`, voter);
};

export const deleteVoter = (id) => {
  return API.delete(`/api/voters/delete/${id}`);
};

// =========================
// Vote APIs
// =========================

export const getVotes = () => {
  return API.get("/api/votes");
};

export const castVote = (voteData) => {
  return API.post("/api/votes/cast", voteData);
};

// =========================
// Election Result APIs
// =========================

export const getElectionResults = () => {
  return API.get("/api/election-result");
};

export const declareElectionResult = (data) => {
  return API.post("/api/election-result/declare", data);
};

export const deleteElectionResult = (id) => {
  return API.delete(`/api/election-result/${id}`);
};

export default API;