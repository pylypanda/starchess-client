import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

const getAllNews = () => api.get(`/news`);
const getNewsById = id => api.get(`/news/${id}`);
const getSomeNews = quantity => api.get(`/news/limit/${quantity}`);
const getTopStandartPlayers = () => api.get(`/top-standart`);
const getTopStandartWomPlayers = () => api.get(`/top-w-standart`);
const getTopRapidPlayers = () => api.get(`/top-rapid`);
const getTopRapidWomPlayers = () => api.get(`/top-w-rapid`);
const getTopBlitzPlayers = () => api.get(`/top-blitz`);
const getTopBlitzWomPlayers = () => api.get(`/top-w-blitz`);
const getOpeningByName = name => api.get(`/openings/${name}`);
const getOpeningsByType = opType => api.get(`/openings/type/${opType}`);
const getPuzzlesByType = puzType => api.get(`/puzzles/type/${puzType}`);
const getEngines = () => api.get(`/engines`);
const getChampions = () => api.get(`/champions`);
const getOldLeaders = () => api.get(`/old-leaders`);
const getWomChampions = () => api.get(`/w-champions`);
const getBooks = () => api.get(`/books`);

const apis = {
    getAllNews,
    getNewsById,
    getSomeNews,
    getTopStandartPlayers,
    getTopStandartWomPlayers,
    getTopRapidPlayers,
    getTopRapidWomPlayers,
    getTopBlitzPlayers,
    getTopBlitzWomPlayers,
    getOpeningByName,
    getOpeningsByType,
    getPuzzlesByType,
    getEngines,
    getChampions,
    getOldLeaders,
    getWomChampions,
    getBooks
}

export default apis
