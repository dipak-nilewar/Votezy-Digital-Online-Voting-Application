package com.votezy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.votezy.entity.Candidate;
import com.votezy.entity.Vote;
import com.votezy.entity.Voter;
import com.votezy.exception.ResourceNotFoundException;
import com.votezy.exception.VoteNotAllowedException;
import com.votezy.repository.CandidateRepository;
import com.votezy.repository.VoteRepository;
import com.votezy.repository.VoterRepository;

import jakarta.transaction.Transactional;

@Service
public class VotingService {

    private VoteRepository voteRepository;
    private CandidateRepository candidateRepository;
    private VoterRepository voterRepository;

    public VotingService(VoteRepository voteRepository, CandidateRepository candidateRepository,
            VoterRepository voterRepository) {
        this.voteRepository = voteRepository;
        this.candidateRepository = candidateRepository;
        this.voterRepository = voterRepository;
    }

    @Transactional
    public Vote castVote(Long voterId, Long candidateId) {
        // Check voter
        if (!voterRepository.existsById(voterId)) {
            throw new ResourceNotFoundException(
                    "Voter not found with ID: " + voterId);
        }
        // Check candidate
        if (!candidateRepository.existsById(candidateId)) {
            throw new ResourceNotFoundException(
                    "Candidate not found with ID: " + candidateId);
        }
        // Get voter
        Voter voter = voterRepository.findById(voterId).get();
        // Check already voted
        if (voter.isHasVoted()) {
            throw new VoteNotAllowedException(
                    "Voter ID: " + voterId + " has already casted vote");
        }
        // Get candidate
        Candidate candidate = candidateRepository.findById(candidateId).get();
        // Create vote
        Vote vote = new Vote();
        vote.setVoter(voter);
        vote.setCandidate(candidate);
        // Save vote
        voteRepository.save(vote);

        // Increase candidate vote count
        candidate.setVoteCount(candidate.getVoteCount() + 1);
        candidateRepository.save(candidate);

        // Mark voter as voted
        voter.setVote(vote);
        voter.setHasVoted(true);
        voterRepository.save(voter);

        return vote;
    }

    public List<Vote> getAllVotes() {
        return voteRepository.findAll();

    }
}