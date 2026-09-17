package com.votezy.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.votezy.entity.Candidate;
import com.votezy.entity.Vote;
import com.votezy.exception.ResourceNotFoundException;
import com.votezy.repository.CandidateRepository;

@Service
public class CandidateService {
    
 public  CandidateRepository  candidateRepository;
 @Autowired
 CandidateService(CandidateRepository  candidateRepository){
    this.candidateRepository = candidateRepository;

 }

 public Candidate addCandidate(Candidate candidate){
    return candidateRepository. save(candidate);
 }

 public List<Candidate> getAllCandidates(){
    return candidateRepository.findAll();
 }

 public Candidate getCandidateById(Long id){
    Candidate   candidate = candidateRepository.findById(id).orElse(null);
    if (candidate==null) {
         throw new ResourceNotFoundException("Candidate with id: "+ id+ " not found");
    }

    return candidate;
 }

public Candidate UpdateCandidate(Long id , Candidate updatedcandidate){
    Candidate candidate = getCandidateById(id);
    if(updatedcandidate.getName()!=null){
        candidate.setName(updatedcandidate.getName());
    }
    if (updatedcandidate.getParty()!=null) {
        candidate.setParty(updatedcandidate.getParty());
    }

    return candidateRepository.save(candidate);
}

public void deleteCandidate(Long id){
    Candidate candidate = getCandidateById(id);
     List<com.votezy.entity.Vote>votes = candidate.getVote();
     for(Vote v : votes){
        v.setCandidate(null);
     }
     candidate.getVote().clear();
     candidateRepository.delete(candidate);
}

}
