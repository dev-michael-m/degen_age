import {createSlice,current} from '@reduxjs/toolkit';

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        address: '',
        cp: 0,
        created: '',
        faction: 0,
        faction_selected: false,
        games_lost: 0,
        games_won: 0,
        online: false,
        selected_char: 0,
        selected: {
            combatType: '',
            img: '',
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
        items: [],
        user_name: "KingSlayer69"
    },
    reducers: {
        setInit: (state,action) => {
            return action.payload;
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
            state.games_won = action.payload;
        },
        setPlayerState: (state,action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setItems: (state,action) => {
            state.items = [...action.payload];
        },
        setPlayerImg: (state,action) => {
            state.selected.img = action.payload;
        }
    }
});

export const {setPlayerImg, setItems, setInit, setCP, setFaction, setGamesLost, setGamesWon, setPlayerState} = playerSlice.actions;

export const selectPlayer = (state) => state.player;

export default playerSlice.reducer;