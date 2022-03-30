import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { INowPlayingResult } from "../api";
import { makeImagePath } from "../utils";

export const BoxElem = styled(motion.div)`
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 100%;
    color: white;
`;

export const Info = styled(motion.div)`
    background-color: rgb(34, 34, 36);
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0;
    transition: opacity 1.5s;
`;

export const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    margin-bottom: -5px;
`;

const infoVariant = {
    hover: {
        opacity: 1
    }
};


function SlideBox({ movieInfo, theme }: { movieInfo?: INowPlayingResult, theme: string }) {

    const nav = useNavigate();

    return (
        <BoxElem
        onClick={() => nav(`/movie/${theme}/${movieInfo?.id}`)}
        layoutId={theme + movieInfo?.id}
        >
            <Thumbnail 
            src={makeImagePath(movieInfo?.backdrop_path || '', 'w500')}
            />
            <Info
            variants={infoVariant}
            >{ movieInfo?.title }</Info>
        </BoxElem>
    )
};

export default React.memo(SlideBox);