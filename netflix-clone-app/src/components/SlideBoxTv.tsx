import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { INowPlayingResult } from "../api";
import { ITvPopular, ITvPopularResult } from "../tvApi";
import { makeImagePath } from "../utils";

const BoxElem = styled(motion.div)`
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 100%;
    color: white;
`;

const Info = styled(motion.div)`
    background-color: rgb(34, 34, 36);
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0;
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    margin-bottom: -5px;
`;

const infoVariant = {
    hover: {
        opacity: 1
    }
};


function SlideBox({ tvInfo, theme }: { tvInfo?: ITvPopularResult, theme: string }) {

    const nav = useNavigate();

    return (
        <BoxElem
        onClick={() => nav(`/tv/${theme}/${tvInfo?.id}`)}
        layoutId={theme + tvInfo?.id}
        >
            <Thumbnail 
            src={makeImagePath(tvInfo?.backdrop_path || '', 'w500')}
            />
            <Info
            variants={infoVariant}
            >{ tvInfo?.name }</Info>
        </BoxElem>
    )
};

export default React.memo(SlideBox);