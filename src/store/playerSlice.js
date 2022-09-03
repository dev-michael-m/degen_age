import {createSlice} from '@reduxjs/toolkit';

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        address: '',
        cp: 0,
        created: null,
        faction: 0,
        faction_selected: false,
        games_lost: 0,
        games_won: 0,
        online: false,
        selected_char: 0,
        selected: {
            combatType: null,
            lvl: 0,
            mgc: 0,
            str: 0,
            rng: 0,
            def: 0
        },
        time_played: 0,
        tokens: 10000,
        total_cp: 0,
        total_earned: 0,
        user_name: ""
    },
    reducers: {
        setInit: (state,action) => {
            state = {...action.payload}
        },
        setCP: (state,action) => {
            state.cp += action.payload;
        },
        setFaction: (state,action) => {
            state.faction = action.payload;
        },
        setGamesLost: (state,action) => {
            state.games_lost = action.payload;
        },
        setGamesWon: (state,action) => {
            
        }
    }
})