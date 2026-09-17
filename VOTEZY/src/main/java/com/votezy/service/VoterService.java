package com.votezy.service;

import com.votezy.repository.VoterRepository;
import java.util.DuplicateFormatFlagsException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.votezy.entity.Candidate;
import com.votezy.entity.Vote;
import com.votezy.entity.Voter;
import com.votezy.exception.ResourceNotFoundException;
import com.votezy.repository.CandidateRepository;
import com.votezy.repository.VoteRepository;

@Service
public class VoterService {

    private final VoterRepository voterRepository;
    private VoteRepository voteRepository;
    private CandidateRepository candidateRepository;

    public VoterService(
            VoteRepository voteRepository,
            CandidateRepository candidateRepository, VoterRepository voterRepository) {

        this.voteRepository = voteRepository;
        this.candidateRepository = candidateRepository;
        this.voterRepository = voterRepository;
    }

    public Voter registerVoter(Voter voter) {
        if (voterRepository.existsByEmail(voter.getEmail())) {
            throw new DuplicateFormatFlagsException("Voter with email id " + voter.getEmail() + " already Exists");

        }

        return voterRepository.save(voter);

    }

    public List<Voter> getAllVoters() {
        return voterRepository.findAll();
    }

    public Voter getVoterById(Long id) {
        Voter voter = voterRepository.findById(id).orElse(null);
        if (voter == null) {
            throw new ResourceNotFoundException("voter with id: " + id + " not found");
        }
        return voter;
    }

    public Voter updateVoter(Long id, Voter updateVoter) {
        Voter voter = voterRepository.findById(id).orElse(null);
        if ((voter == null)) {
            throw new ResourceNotFoundException("voter with id: " + id + " not found");

        }
        if ((updateVoter.getName() != null)) {
            voter.setName(updateVoter.getName());
        }

        if (updateVoter.getEmail() != null) {
            voter.setEmail(updateVoter.getEmail());
        }

        return voterRepository.save(voter);
    }

    @Transactional
    public void deleteVoter(Long id) {
        Voter voter = voterRepository.findById(id).orElse(null);
        if (voter == null) {

            throw new ResourceNotFoundException("cannot delete voter with id: " + id + " not found");

        }
        Vote vote = voter.getVote();
        if (vote != null) {

            Candidate candidate = vote.getCandidate();
            candidate.setVoteCount(candidate.getVoteCount() - 1);
            candidateRepository.save(candidate);
        }

        voterRepository.delete(voter);

    }
}