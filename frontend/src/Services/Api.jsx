const BASE_URL=import.meta.env.VITE_API_URL;

export const AuthApi={
    VOTER_LOGIN_API:BASE_URL+"/voter/login",
    VOTER_REGISTER_API:BASE_URL+"/voter/register",
    SEND_OTP:BASE_URL+"/voter/sendOtp",
    ADMIN_LOGIN_API:BASE_URL+"/admin/login",
    ADMIN_REGISTER_API:BASE_URL+"/admin/register"
}

export const candidateApi={
    CANDIDATES_API:BASE_URL+"/voter/candidates",
    CANDID_API:BASE_URL+"/voter/candid",
    IS_CANDIDATE_API:BASE_URL+"/voter/iscandidate",
    CANDIDATE_API:BASE_URL+"/voter/candidate",
    DELETE_CANDIDATE_API:BASE_URL+"/admin/candidate",
    RESET_CANDIDATE_API:BASE_URL+"/admin/resetCandidates"
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
    RESET_POSITIONS_API:BASE_URL+"/admin/resetPositions"
}