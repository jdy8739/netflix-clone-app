import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { INowPlayingResult } from "../api";
import { ITvPopular, ITvPopularResult } from "../tvApi";
import { makeImagePath } from "../utils";
import { BoxElem, Info, Thumbnail } from "./SlideBox";

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