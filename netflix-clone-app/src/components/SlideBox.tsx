import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { INowPlayingResult } from "../api";
import { makeImagePath } from "../utils";

const BoxElem = styled(motion.div)`
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 100%;
`;

const Info = styled(motion.div)`
    background-color: red;
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

const boxVariant = {
    hover: {
        scale: 1.4,
        y: -125,
        zIndex: 99,
        transition: {
            type: 'tween'
        }
    }
};

const infoVariant = {
    hover: {
        opacity: 1
    }
};


function SlideBox({ movieInfo }: { movieInfo?: INowPlayingResult }) {

    const nav = useNavigate();

    return (
        <BoxElem
        variants={boxVariant}
        whileHover="hover"
        onClick={() => nav(`/movie/${movieInfo?.id}`)}
        layoutId={movieInfo?.id + ''}
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