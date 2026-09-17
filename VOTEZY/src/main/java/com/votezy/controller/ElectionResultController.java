// package com.votezy.controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.votezy.dto.ElectionResultRequestDTO;
// import com.votezy.dto.ElectionResultResponseDTO;
// import com.votezy.entity.ElectionResult;
// import com.votezy.service.ElectionResultService;

// import jakarta.validation.Valid;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.GetMapping;

// @RestController
// @RequestMapping("/api/election-result")
// @CrossOrigin(origins = "http://localhost:5173")
// public class ElectionResultController {

//     private ElectionResultService electionResultService;

//     @Autowired
//     public ElectionResultController(ElectionResultService electionResultService) {
//         this.electionResultService = electionResultService;
//     }

//     @PostMapping("/declare")

//     public ResponseEntity<ElectionResultResponseDTO> decleareElectionResult(
//             @RequestBody @Valid ElectionResultRequestDTO electionResultRequestDTO) {

//         ElectionResult result = electionResultService
//                 .decleareElectionResult(electionResultRequestDTO.getElectionName());

//         ElectionResultResponseDTO responseDTO = new ElectionResultResponseDTO();
//         responseDTO.setElectionName(result.getElectionName());
//         responseDTO.setTotalVotes(result.getTotalVotes());
//         responseDTO.setWinnerId(result.getWinnerId());
//         responseDTO.setWinnerVotes(result.getWinner().getVoteCount());
//         return ResponseEntity.ok(responseDTO);
//     }

//     @GetMapping

//     public ResponseEntity<List<ElectionResult>> getAllResults() {
//         List<ElectionResult> results = electionResultService.getAllResult();
//         return ResponseEntity.ok(results);

//     }

// }

package com.votezy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.votezy.dto.ElectionResultRequestDTO;
import com.votezy.dto.ElectionResultResponseDTO;
import com.votezy.entity.ElectionResult;
import com.votezy.service.ElectionResultService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/election-result")
@CrossOrigin(origins = "http://localhost:5173")
public class ElectionResultController {

    private ElectionResultService electionResultService;

    @Autowired
    public ElectionResultController(
            ElectionResultService electionResultService) {

        this.electionResultService = electionResultService;
    }


    // ==========================================
    // DECLARE ELECTION RESULT
    // ==========================================

    @PostMapping("/declare")
    public ResponseEntity<ElectionResultResponseDTO> declareElectionResult(
            @RequestBody @Valid ElectionResultRequestDTO electionResultRequestDTO) {

        ElectionResult result =
                electionResultService.declareElectionResult(
                        electionResultRequestDTO.getElectionName()
                );

        ElectionResultResponseDTO responseDTO =
                new ElectionResultResponseDTO();

        responseDTO.setElectionName(
                result.getElectionName()
        );

        responseDTO.setTotalVotes(
                result.getTotalVotes()
        );

        if (result.getWinner() != null) {

            responseDTO.setWinnerId(
                    result.getWinner().getId()
            );

            responseDTO.setWinnerName(
                    result.getWinner().getName()
            );

            responseDTO.setWinnerParty(
                    result.getWinner().getParty()
            );

            responseDTO.setWinnerVotes(
                    result.getWinner().getVoteCount()
            );
        }

        return ResponseEntity.ok(responseDTO);
    }


    // ==========================================
    // GET ALL ELECTION RESULTS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<ElectionResultResponseDTO>> getAllResults() {

        List<ElectionResultResponseDTO> results =
                electionResultService.getAllResult();

        return ResponseEntity.ok(results);
    }


    
    // DELETE ELECTION RESULT
    

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResult(
            @PathVariable Long id) {

        electionResultService.deleteResult(id);

        return ResponseEntity.ok(
                "Election result with ID " + id +
                " deleted successfully"
        );
    }
}

