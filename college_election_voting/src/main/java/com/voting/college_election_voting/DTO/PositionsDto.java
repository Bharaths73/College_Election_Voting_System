package com.voting.college_election_voting.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.*;

import com.voting.college_election_voting.Model.Votes;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PositionsDto {
    private Integer id;
    private String positionName;
}
