const BASE_URL=import.meta.env.VITE_API_URL;

export const AuthApi={
    VOTER_LOGIN_API:BASE_URL+"/voter/login",
    VOTER_REGISTER_API:BASE_URL+"/voter/register",
    SEND_OTP:BASE_URL+"/voter/sendOtp",
    ADMIN_LOGIN_API:BASE_URL+"/admin/login",
    REGISTER_API:BASE_URL+"/voter/register",
    ADMIN_SEND_OTP:BASE_URL+"/admin/sendOtp",
}

export const electionApi={
    ELECTION_STATUS:BASE_URL+"/admin/status",
    UPDATE_ELECTION_STATUS:BASE_URL+"/admin/start_or_stop"
}

export const candidateApi={
    CANDIDATES_API:BASE_URL+"/voter/candidates",
    CANDID_API:BASE_URL+"/voter/candid",
    IS_CANDIDATE_API:BASE_URL+"/voter/iscandidate",
    CANDIDATE_API:BASE_URL+"/voter/candidate",
    DELETE_CANDIDATE_API:BASE_URL+"/admin/candidate",
    RESET_CANDIDATE_API:BASE_URL+"/admin/resetCandidates",
    SEARCH_CANDIDATE_API:BASE_URL+"/voter/search_candidate",
}

export const votersApi={
    VOTERS_API:BASE_URL+"/admin/voters",
    DELETE_VOTERS_API:BASE_URL+"/admin/voters",
    RESET_VOTERS_API:BASE_URL+"/admin/resetVoters",
    SEARCH_VOTERS_API:BASE_URL+"/admin/search_voter",
}

export const votesApi={
    VOTES_API:BASE_URL+"/admin/votes",
    VOTE_API:BASE_URL+"/voter/vote",
    IS_VOTED_API:BASE_URL+"/voter/isvoted",
    RESET_VOTES_API:BASE_URL+"/admin/resetVotes",
}

export const dashboardApi={
    DASHBOARD_API:BASE_URL+"/admin/dashboard",
}


export const positionApi={
    POSITIONS_API:BASE_URL+"/voter/positions",
    POSITION_API:BASE_URL+"/admin/position",
    EDIT_POSITION_API:BASE_URL+"/admin/position",
    DELETE_POSITION_API:BASE_URL+"/admin/position",
    SEARCH_POSITION_API:BASE_URL+"/voter/search_position",
    RESET_POSITIONS_API:BASE_URL+"/admin/resetPositions"
}