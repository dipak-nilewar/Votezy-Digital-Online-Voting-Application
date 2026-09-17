// package com.votezy.service;

// import java.util.List;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.votezy.entity.Candidate;
// import com.votezy.entity.ElectionResult;
// import com.votezy.exception.ResourceNotFoundException;
// import com.votezy.repository.CandidateRepository;
// import com.votezy.repository.ElectionResultRepository;
// import com.votezy.repository.VoteRepository;

// @Service
// public class ElectionResultService {
//     private CandidateRepository candidateRepository;
//     private ElectionResultRepository electionResultRepository;
//     private VoteRepository voteRepository;

// @Autowired
//     public ElectionResultService(CandidateRepository candidateRepository, ElectionResultRepository electionResultRepository, VoteRepository voteRepository){
//         this.candidateRepository = candidateRepository;
//         this.electionResultRepository = electionResultRepository;
//         this. voteRepository = voteRepository;
//     }

//     public ElectionResult decleareElectionResult(String electionName){
//         Optional<ElectionResult> existingResult=this.electionResultRepository.findByElectionName(electionName);
//         if (existingResult.isPresent()) {
//             return existingResult.get();
            
//         }
//         if (voteRepository.count() == 0) {
            
//             throw new IllegalStateException("Cannot declare the result as no votes have been cast");
//         }

//        List<Candidate> allCandidates =  candidateRepository.findAllByOrderByVoteCountDesc();
// if (allCandidates.isEmpty()) {
//     throw new ResourceNotFoundException( "NO Candidate Available ");
     
// }
//  Candidate winner = allCandidates.get(0);
//  int totalvotes=0;
//  for(Candidate candidate: allCandidates){
    
// totalvotes+=candidate.getVoteCount();

//  }

//  ElectionResult result = new ElectionResult();
//  result.setElectionName(electionName);
//  result.setWinner(winner);
//  result.setTotalVotes(totalvotes);
//  return electionResultRepository.save(result);
//     }

//     public List<ElectionResult> getAllResult(){
//         return electionResultRepository .findAll();
//     }
// }

package com.votezy.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.votezy.dto.ElectionResultResponseDTO;
import com.votezy.entity.Candidate;
import com.votezy.entity.ElectionResult;
import com.votezy.exception.ResourceNotFoundException;
import com.votezy.repository.CandidateRepository;
import com.votezy.repository.ElectionResultRepository;
import com.votezy.repository.VoteRepository;

@Service
public class ElectionResultService {

    private CandidateRepository candidateRepository;
    private ElectionResultRepository electionResultRepository;
    private VoteRepository voteRepository;

    @Autowired
    public ElectionResultService(
            CandidateRepository candidateRepository,
            ElectionResultRepository electionResultRepository,
            VoteRepository voteRepository) {

        this.candidateRepository = candidateRepository;
        this.electionResultRepository = electionResultRepository;
        this.voteRepository = voteRepository;
    }

    // ==========================================
    // DECLARE ELECTION RESULT
    // ==========================================

    public ElectionResult declareElectionResult(String electionName) {

        Optional<ElectionResult> existingResult =
                electionResultRepository.findByElectionName(electionName);

        if (existingResult.isPresent()) {
            return existingResult.get();
        }

        if (voteRepository.count() == 0) {
            throw new IllegalStateException(
                    "Cannot declare the result as no votes have been cast"
            );
        }

        List<Candidate> allCandidates =
                candidateRepository.findAllByOrderByVoteCountDesc();

        if (allCandidates.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No Candidate Available"
            );
        }

        // First candidate has highest vote count
        Candidate winner = allCandidates.get(0);

        // Calculate total votes
        int totalVotes = 0;

        for (Candidate candidate : allCandidates) {
            totalVotes += candidate.getVoteCount();
        }

        // Create result
        ElectionResult result = new ElectionResult();

        result.setElectionName(electionName);
        result.setWinner(winner);
        result.setTotalVotes(totalVotes);

        return electionResultRepository.save(result);
    }


    // ==========================================
    // GET ALL RESULTS
    // ==========================================

    public List<ElectionResultResponseDTO> getAllResult() {

        List<ElectionResult> results =
                electionResultRepository.findAll();

        return results.stream().map(result -> {

            ElectionResultResponseDTO dto =
                    new ElectionResultResponseDTO();

            dto.setElectionName(result.getElectionName());

            dto.setTotalVotes(result.getTotalVotes());

            Candidate winner = result.getWinner();

            if (winner != null) {

                dto.setWinnerId(winner.getId());

                dto.setWinnerName(winner.getName());

                dto.setWinnerParty(winner.getParty());

                dto.setWinnerVotes(winner.getVoteCount());
            }

            return dto;

        }).toList();
    }

    public void deleteResult(Long id) {

    ElectionResult result =
            electionResultRepository.findById(id)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Election result with id "
                                    + id + " not found"
                            )
                    );

    electionResultRepository.delete(result);
}
}
