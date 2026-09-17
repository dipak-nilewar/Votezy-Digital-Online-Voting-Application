// package com.votezy.dto;

// import lombok.Data;

// @Data
// public class ElectionResultResponseDTO {

//     private String electionName;
//     private int totalVotes;
//     private Long winnerId;
//     private int winnerVotes;
// }

package com.votezy.dto;

import lombok.Data;

@Data
public class ElectionResultResponseDTO {

    private String electionName;
    private int totalVotes;

    private Long winnerId;
    private String winnerName;
    private String winnerParty;
    private int winnerVotes;
}