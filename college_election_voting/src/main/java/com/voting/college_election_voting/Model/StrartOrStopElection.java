package com.voting.college_election_voting.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StrartOrStopElection {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private boolean startOrStop;

    public StrartOrStopElection(){
        
    }
    public StrartOrStopElection(int id, boolean startOrStop) {
        this.id = id;
        this.startOrStop = startOrStop;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public boolean isStartOrStop() {
        return startOrStop;
    }
    public void setStartOrStop(boolean startOrStop) {
        this.startOrStop = startOrStop;
    }

    
}
