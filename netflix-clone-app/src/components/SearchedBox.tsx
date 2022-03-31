import { motion } from "framer-motion";
import { url } from "inspector";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { searchedIdAtom } from "../atoms";
import { ISearchedResult } from "../searchApi";
import { makeImagePath } from "../utils";

const SearchedTitle = styled.p`
    color: white;
    font-weight: bold;
    font-size: 32px;
    opacity: 0;
    transition: all 1s;
    position: absolute;
    top: 18px;
    bottom: 0;
    left: 12px;
    right: 0;
    margin: auto;
    width: 220px;
`;

const Box = styled(motion.span)`
    position: relative;
    &:hover {
        ${SearchedTitle} {
            opacity: 1;
        }
    }
`;

const SearchedImg = styled.div<{ path: string }>`
    width: 100%;
    height: 100%;
    background-image: url(${props => props.path});
    background-size: cover;
    background-position: center center;
    border-radius: 12px;
    padding: 12px;
    box-sizing: border-box;
    filter: grayscale(0%) blur(0px);
    transition: all 1s;
    &:hover {
        filter: grayscale(90%) blur(2.5px);
    }
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NoImage = styled.p`
    color: white;
    padding: 0 12px;
`;

function SearchedBox({ searched }: { searched: ISearchedResult }) {

    const setSearchedId = useSetRecoilState(searchedIdAtom);

    return (
        <Box
        onClick={() => setSearchedId(searched.id)}
        >
            <SearchedImg 
            path={
                searched.backdrop_path ?
                makeImagePath(String(searched.backdrop_path), 'w500') :
                searched.poster_path ?
                makeImagePath(String(searched.poster_path)) :
                makeImagePath(String(searched.profile_path))
            }>
                {
                    searched.backdrop_path || searched.poster_path || searched.profile_path ?
                    null : <NoImage>No image available</NoImage>
                }
            </SearchedImg>
            <SearchedTitle>{ searched.name ? searched.name : searched.title }</SearchedTitle>
        </Box>
    )
};

export default React.memo(SearchedBox);