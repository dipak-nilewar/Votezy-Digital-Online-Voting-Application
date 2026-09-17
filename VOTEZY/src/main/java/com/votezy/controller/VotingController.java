package com.votezy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.votezy.dto.VoteRequestDTO;
import com.votezy.dto.VoteResponseDTO;
import com.votezy.entity.Vote;
import com.votezy.service.VotingService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
 

@RestController
@RequestMapping("/api/votes")
@CrossOrigin(origins = "http://localhost:5173")
public class VotingController {

    private VotingService votingService;

    @Autowired
    public VotingController(VotingService votingService) {
        this.votingService = votingService;

    }

    @PostMapping("/cast")
    public ResponseEntity<VoteResponseDTO> castVote(
            @RequestBody @Valid VoteRequestDTO voteRequest) {

        Vote vote = votingService.castVote(voteRequest.getVoterId(), voteRequest.getCandidateId());

        VoteResponseDTO voteResponse = new VoteResponseDTO(
                "VoteCasted successfully", true, vote.getVoterId(), vote.getCandidateId());

        return new ResponseEntity<>(voteResponse, HttpStatus.CREATED);
    }

    @GetMapping

    public ResponseEntity<List<Vote>> getAllVotes() {
        List<Vote> voteList = votingService.getAllVotes();
        return new ResponseEntity<>(voteList, HttpStatus.OK);

    }
}
