package com.votezy.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Data
public class ElectionResultRequestDTO {

    @NotBlank(message = "Electino name is required")
    private String electionName;

    
}

